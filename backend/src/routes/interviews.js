const express = require('express');
const router = express.Router();
const multer = require('multer');
const Interview = require('../models/Interview');
const User = require('../models/User');
const Report = require('../models/Report');
const axios = require('axios'); // For communicating with Python AI service

// Configure multer for resume uploads
const upload = multer({ dest: 'uploads/' });

// @route   POST /api/interviews/setup
// @desc    Setup new interview session
// @access  Public
router.post('/setup', upload.single('resume'), async (req, res) => {
    try {
        const { clerkId, jobDescription, roleLevel } = req.body;

        // 1. Find or create user
        let user = await User.findOne({ clerkId });
        if (!user) {
            user = new User({
                clerkId,
                email: clerkId + "@placeholder.com",
                firstName: "Candidate",
            });
            await user.save();
        }

        // 2. Create interview record
        const interview = new Interview({
            userId: user._id,
            status: 'SETUP',
            context: {
                resumeUrl: req.file ? req.file.path : null, // Handle upload path
                jobDescription,
                roleLevel
            }
        });
        await interview.save();

        // 3. (Optional) Call Python AI to parse context and generate blueprint early
        // const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/v1/parse-context`, { ... });
        // interview.context.blueprintSummary = aiResponse.data.blueprint;
        // await interview.save();

        res.status(201).json({ success: true, interview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error setup' });
    }
});

// @route   GET /api/interviews/:id
// @desc    Get interview state
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ success: false, message: 'Not found' });

        res.status(200).json({ success: true, interview });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/interviews/:id/message
// @desc    Process user chat message and get AI response
// @access  Public
router.post('/:id/message', async (req, res) => {
    try {
        const { text } = req.body;
        const interview = await Interview.findById(req.params.id);
        if (!interview) return res.status(404).json({ success: false, message: 'Not found' });

        // 1. Append user msg
        interview.transcript.push({ role: 'user', content: text });

        // 2. Call Python AI Microservice
        let aiText = "I see. Let's continue.";
        try {
            const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/v1/chat`, {
                transcript: interview.transcript,
                blueprint_summary: "Standard technical interview flow based on resume."
            });
            aiText = aiResponse.data.agent_response;
        } catch (aiError) {
            console.error("AI Chat failed:", aiError.message);
        }

        // 3. Append agent msg
        interview.transcript.push({ role: 'agent', content: aiText });

        if (interview.status === 'SETUP') interview.status = 'IN_PROGRESS';
        await interview.save();

        res.status(200).json({ success: true, response: aiText, transcript: interview.transcript });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/interviews/:id/finalize
// @desc    End interview and trigger report generation
// @access  Public
router.post('/:id/finalize', async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);
        interview.status = 'COMPLETED';
        await interview.save();

        // Check if report already exists for this interview to prevent duplicates
        let report = await Report.findOne({ interviewId: interview._id });
        if (!report) {
            try {
                // Call Python AI for evaluation
                const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/v1/evaluate`, {
                    transcript: interview.transcript,
                    blueprint_summary: "Standard technical interview"
                });

                const evaluation = aiResponse.data.report;

                report = new Report({
                    interviewId: interview._id,
                    scores: evaluation.scores || { communication: 0, technical: 0, overall: 0 },
                    feedback: evaluation.feedback || { strengths: [], weaknesses: [], suggestions: [] }
                });
                await report.save();
            } catch (aiError) {
                console.error("AI Evaluation failed:", aiError.message);
                // Fallback mock if AI is unreachable
                report = new Report({
                    interviewId: interview._id,
                    scores: { communication: 50, technical: 50, overall: 50 },
                    feedback: {
                        strengths: ["Completed the interview."],
                        weaknesses: ["AI Evaluator was unreachable."],
                        suggestions: ["Please check the AI server logs."]
                    }
                });
                await report.save();
            }
        }


        res.status(200).json({ success: true, message: 'Interview finalized' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
