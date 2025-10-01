// import AnalysisHistory from '../models/analysisHistoryModel.js';
// async function callGeminiAPI(resumeText, jobDescription) {
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//         throw new Error("GEMINI_API_KEY is not defined in the .env file.");
//     }
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
//     const prompt = `
//         Analyze the following resume against the provided job description.
//         Provide a detailed analysis in a strict JSON format. Do not include any text outside of the JSON object.
        
//         The JSON object must have the following keys:
//         1. "matchScore": A string representing a percentage match (e.g., "85%").
//         2. "matchingKeywords": An array of strings listing the key skills and technologies from the job description that are present in the resume.
//         3. "missingKeywords": An array of strings listing the key skills and technologies from the job description that are MISSING from the resume.
//         4. "suggestions": An array of strings, where each string is a specific, actionable suggestion for improving the resume based on the job description. For example, "Consider adding a project that showcases your experience with REST APIs."
        
//         Resume Text:
//         ---
//         ${resumeText}
//         ---
        
//         Job Description:
//         ---
//         ${jobDescription}
//         ---
//     `;

//     const payload = { contents: [{ parts: [{ text: prompt }] }] };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         });

//         const responseData = await response.json();

//         if (!response.ok) {
//             console.error("Gemini API Error Response:", responseData);
//             throw new Error(`API call failed with status: ${response.status}`);
//         }

//         if (!responseData.candidates || responseData.candidates.length === 0) {
//             console.error("Gemini API did not return any candidates:", responseData);
//             throw new Error("AI analysis did not return a valid response.");
//         }

//         const rawText = responseData.candidates[0].content.parts[0].text;
//         const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
//         return JSON.parse(jsonText);

//     } catch (error) {
//         console.error("Error inside callGeminiAPI function:", error);
//         throw new Error("Failed to get analysis from AI.");
//     }
// }

// export const analyzeResume = async (req, res) => {
//     const userId = req.userId; 
//     const { resumeText, jobDescription, jobTitle } = req.body;

//     if (!resumeText || !jobDescription || !jobTitle) {
//         return res.status(400).json({ message: "Please provide resume text, a job description, and a job title." });
//     }

//     try {
//         const analysisResult = await callGeminiAPI(resumeText, jobDescription);

//         const newHistoryItem = new AnalysisHistory({
//             user: userId,
//             jobTitle,
//             jobDescription, 
//             analysisResult 
//         });
//         await newHistoryItem.save();
        
//         res.status(200).json(analysisResult);

//     } catch (error) {
//         console.error("Server error during resume analysis:", error);
//         res.status(500).json({ message: "Server error during resume analysis." });
//     }
// };

// export const getAnalysisHistory = async (req, res) => {
//     try {
//         const history = await AnalysisHistory.find({ user: req.userId }).sort({ createdAt: -1 });
//         res.status(200).json(history);
//     } catch (error) {
//         console.error("Server error while fetching history:", error);
//         res.status(500).json({ message: "Server error while fetching history." });
//     }
// };


import AnalysisHistory from '../models/analysisHistoryModel.js';

async function callCerebrasAPI(resumeText, jobDescription) {
    const apiKey = process.env.CEREBRAS_API_KEY;
    if (!apiKey) {
        throw new Error("CEREBRAS_API_KEY is not defined in the .env file.");
    }

    const url = 'https://api.cerebras.net/v1/chat/completions'; 

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
        model: "BTLM-3B-8K", 
        messages: [
            { role: "system", content: "You are a helpful AI assistant that provides analysis in JSON format." },
            { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 1024,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` 
            },
            body: JSON.stringify(payload)
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Cerebras API Error Response:", responseData);
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const rawText = responseData.choices[0].message.content; 
        const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error inside callCerebrasAPI function:", error);
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
        const analysisResult = await callCerebrasAPI(resumeText, jobDescription);

        const newHistoryItem = new AnalysisHistory({
            user: userId,
            jobTitle,
            jobDescription, 
            analysisResult 
        });
        await newHistoryItem.save();
        
        res.status(200).json(analysisResult);

    } catch (error) {
        console.error("Server error during resume analysis:", error);
        res.status(500).json({ message: "Server error during resume analysis." });
    }
};

export const getAnalysisHistory = async (req, res) => {
    try {
        const history = await AnalysisHistory.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        console.error("Server error while fetching history:", error);
        res.status(500).json({ message: "Server error while fetching history." });
    }
};

