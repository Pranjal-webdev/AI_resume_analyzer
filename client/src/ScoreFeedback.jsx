function ScoreFeedback({ score }) {
    const numericScore = Number(score) || 0;

    let title = "";
    let message = "";
    let color = "";

    if (numericScore >= 80) {
        title = "Excellent Match!";
        message =
            "Your resume matches the job requirements very well. Keep improving your skills and preparing for the interview.";
        color = "excellent";
    } else if (numericScore >= 60) {
        title = "Good Match!";
        message =
            "Your resume has a good match. Improve the missing skills to increase your chances.";
        color = "good";
    } else if (numericScore >= 40) {
        title = "Needs Improvement";
        message =
            "Your resume needs some improvement. Focus on the required skills and relevant projects.";
        color = "average";
    } else {
        title = "Low Match";
        message =
            "Your resume currently has a low match. Review the job description and update your resume accordingly.";
        color = "low";
    }

    return (
        <div className={`score-feedback ${color}`}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default ScoreFeedback;
