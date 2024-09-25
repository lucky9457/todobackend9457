const uuid = require('uuid');
const db = require('../config/database');

// Create a new task
exports.createTask = (req, res) => {
    const { task, status } = req.body;
    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();
    const userId = req.user.id;

    const query = `INSERT INTO tasks (id, user_id, task, status, created_at) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [todoId, userId, task, status || 'pending', createdAt], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error creating task' });
        }
        res.json({ message: 'Task created successfully' });
    });
};

// Get all tasks for a user
exports.getTasks = (req, res) => {
    const userId = req.user.id;

    const query = `SELECT * FROM tasks WHERE user_id = ?`;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: 'Error fetching tasks' });
        }
        res.json({ tasks: rows });
    });
};

// Update task
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { task, status } = req.body;

    const query = `UPDATE tasks SET task = ?, status = ? WHERE id = ? AND user_id = ?`;
    db.run(query, [task, status, id, req.user.id], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error updating task' });
        }
        res.json({ message: 'Task updated successfully' });
    });
};

// Delete task
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    db.run(query, [id, req.user.id], (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error deleting task' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
};
