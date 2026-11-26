
const taskModel = require("../models/taskModel");

// GET - Retrieve all tasks
const getTasks = (req, res) => {
    taskModel.getAllTasks((err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.json(results);
    });
};

// POST - Create a new task
const createTask = (req, res) => {
    const title = req.body.title;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            message: "A task title is required"
        });
    }

    taskModel.createTask(title, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            id: result.insertId,
            title: title,
            completed: false
        });
    });
};

// PUT - Update an existing task
const updateTask = (req, res) => {
    const id = Number(req.params.id);
    const completed = req.body.completed;

    if (!Number.isInteger(id) || id <= 0 ||
        typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Valid task ID and completed value required"
        });
    }

    taskModel.updateTask(id, completed, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            id: id,
            completed: completed,
            message: "Task updated successfully"
        });
    });
};

// DELETE - Remove a task
const deleteTask = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    taskModel.deleteTask(id, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    });
};

// Export controller functions
module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
