import AnalysisHistory from '../models/analysisHistoryModel.js';

async function callGeminiAPI(resumeText, jobDescription) {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    const prompt = `
        Analyze the following resume against the provided job description.
        Provide a detailed analysis in a strict JSON format. Do not include any text outside of the JSON object.
        
        The JSON object must have the following keys:
        1. "matchScore": A string representing a percentage match (e.g., "85%").
        2. "matchingKeywords": An array of strings listing the key skills and technologies from the job description that are present in the resume.
        3. "missingKeywords": An array of strings listing the key skills and technologies from the job description that are MISSING from the resume.
        4. "suggestions": An array of strings, where each string is a specific, actionable suggestion for improving the resume based on the job description. For example, "Consider adding a project that showcases your experience with REST APIs."
        
        Resume Text:
        ---
        ${resumeText}
        ---
        
        Job Description:
        ---
        ${jobDescription}
        ---
    `;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        
        const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI.");
    }
}


export const analyzeResume = async (req, res) => {
    const userId = req.userId;
    const { resumeText, jobDescription, jobTitle } = req.body;

    if (!resumeText || !jobDescription || !jobTitle) {
        return res.status(400).json({ message: "Please provide resume text, a job description, and a job title." });
    }

    try {
        const analysisResult = await callGeminiAPI(resumeText, jobDescription);
        const newHistoryItem = new AnalysisHistory({
            user: userId,
            jobTitle,
            jobDescription, 
            analysisResult 
        });
        await newHistoryItem.save();
        res.status(200).json(analysisResult);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during resume analysis." });
    }
};

export const getAnalysisHistory = async (req, res) => {
    try {
        const history = await AnalysisHistory.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching history." });
    }
};
