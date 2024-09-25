const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Get current user's profile
exports.getProfile = (req, res) => {
    const query = `SELECT name, email FROM users WHERE id = ?`;

    db.get(query, [req.user.id], (err, user) => {
        if (err) return res.status(400).json({ error: 'Unable to fetch profile' });
        res.json({ user });
    });
};

// Update user's profile
exports.updateProfile = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
    db.run(query, [name, email, hashedPassword, req.user.id], (err) => {
        if (err) return res.status(400).json({ error: 'Error updating profile' });
        res.json({ message: 'Profile updated successfully' });
    });
};

// Delete user's profile

exports.deleteProfile = (req, res) => {
    const query = `DELETE FROM users WHERE id = ?`;

    db.run(query, [req.user.id], (err) => {
        if (err) return res.status(400).json({ error: 'Error deleting profile' });
        res.json({ message: 'Profile deleted successfully' });
    });
};
