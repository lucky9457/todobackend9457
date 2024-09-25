const express = require('express');
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, todoController.createTask);
router.get('/', authMiddleware, todoController.getTasks);
router.put('/:id', authMiddleware, todoController.updateTask);
router.delete('/:id', authMiddleware, todoController.deleteTask);

module.exports = router;
