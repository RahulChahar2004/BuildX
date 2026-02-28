const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['SETUP', 'IN_PROGRESS', 'COMPLETED', 'FAILED'],
        default: 'SETUP'
    },
    context: {
        resumeUrl: String,
        resumeText: String,
        jobDescription: String,
        roleLevel: String,
        blueprintSummary: String
    },
    transcript: [{
        role: {
            type: String,
            enum: ['user', 'agent']
        },
        content: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Interview', InterviewSchema);
