import mongoose from 'mongoose';

const analysisHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title is required for history tracking.'],
        trim: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    analysisResult: {
        matchScore: { type: String },
        matchingKeywords: [{ type: String }],
        missingKeywords: [{ type: String }],
        suggestions: [{ type: String }]
    }
}, {
    timestamps: true
});

const AnalysisHistory = mongoose.model('AnalysisHistory', analysisHistorySchema);

export default AnalysisHistory;
