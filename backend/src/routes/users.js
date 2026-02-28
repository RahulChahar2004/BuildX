const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/users/sync
// @desc    Sync user from Clerk webhook
// @access  Public (should use webhook secret in prod)
router.post('/sync', async (req, res) => {
    try {
        const { id, email_addresses, first_name, last_name } = req.body.data;

        // Check if user exists
        let user = await User.findOne({ clerkId: id });

        if (user) {
            // Update
            user.email = email_addresses[0].email_address;
            user.firstName = first_name;
            user.lastName = last_name;
            await user.save();
        } else {
            // Create
            user = new User({
                clerkId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name
            });
            await user.save();
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/users/profile/:clerkId
// @desc    Get user profile and interview stats
// @access  Public
router.get('/profile/:clerkId', async (req, res) => {
    try {
        const user = await User.findOne({ clerkId: req.params.clerkId });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // In actual implementation, aggregate interview history here
        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
