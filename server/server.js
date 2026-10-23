import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import pdfParse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

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

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text.trim();

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
