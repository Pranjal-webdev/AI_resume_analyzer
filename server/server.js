import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import User from "./models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};


app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running!",
  });
});


app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Account created successfully!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered.",
      });
    }

    res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
});


app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});


const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  },
});

app.get("/", (req, res) => {
  res.json({ message: "AI Resume Analyzer API is running!" });
});

app.post("/api/resume/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }

    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();
    const resumeText = pdfData.text.trim();

    await parser.destroy();
    if (!resumeText) {
      return res.status(400).json({
        message: "No readable text found in the PDF.",
      });
    }

    res.json({
      message: "Resume uploaded and text extracted successfully!",
      fileName: req.file.originalname,
      text: resumeText,
    });
  } catch (error) {
    console.error("Resume extraction error:", error);

    res.status(500).json({
      message: "Could not extract text from this PDF.",
    });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "Resume must be smaller than 5 MB.",
    });
  }

  if (err.message === "Only PDF files are allowed.") {
    return res.status(400).json({ message: err.message });
  }

  next(err);
});


app.post("/api/resume/analyze", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        message: "Resume text and job description are required.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Analyze this resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return only valid JSON in this format:
{
  "score": 75,
  "matchedSkills": ["React", "JavaScript"],
  "missingSkills": ["Docker"],
  "suggestions": [
    "Add measurable achievements to projects.",
    "Highlight relevant technical skills.",
    "Improve project descriptions."
  ]
}

Give a score between 0 and 100.
Do not invent qualifications or experience.
`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const analysis = JSON.parse(response.text);

    res.json(analysis);
  } catch (error) {
    console.error("AI analysis error:", error);

    res.status(500).json({
      message: "Failed to analyze resume. Please try again.",
    });
  }
});


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "Resume must be smaller than 5 MB.",
    });
  }

  if (err.message === "Only PDF files are allowed.") {
    return res.status(400).json({
      message: err.message,
    });
  }

  console.error("Server Error:", err);

  res.status(500).json({
    message: "Something went wrong.",
  });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();