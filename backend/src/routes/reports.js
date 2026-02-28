const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Interview = require('../models/Interview');

// @route   GET /api/reports/:id
// @desc    Get post-interview report by Report ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('interviewId');
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found' });
        }

        res.status(200).json({ success: true, report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/reports/interview/:interviewId
// @desc    Get post-interview report by Interview ID
// @access  Public
router.get('/interview/:interviewId', async (req, res) => {
    try {
        const report = await Report.findOne({ interviewId: req.params.interviewId });
        if (!report) {
            return res.status(404).json({ success: false, message: 'Report not found for this interview' });
        }

        res.status(200).json({ success: true, report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
