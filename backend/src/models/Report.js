const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
        required: true,
        unique: true
    },
    scores: {
        communication: Number,
        technical: Number,
        overall: Number
    },
    feedback: {
        strengths: [String],
        weaknesses: [String],
        suggestions: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', ReportSchema);
