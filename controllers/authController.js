const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const db = require('../config/database');

// Register new user
exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const id = uuid.v4();

    const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [id, name, email, hashedPassword], (err) => {
        if (err) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const token = jwt.sign({ id, email }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });
};

// User login
exports.login = (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;

    db.get(query, [email], (err, user) => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials or user not exist' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    });
};
