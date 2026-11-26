
const db = require("../db");

// GET - Retrieve all tasks
const getAllTasks = (callback) => {
    db.query("SELECT * FROM tasks", callback);
};

// POST - Create a new task
const createTask = (title, callback) => {
    db.query(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        callback
    );
};

// PUT - Update an existing task
const updateTask = (id, completed, callback) => {
    db.query(
        "UPDATE tasks SET completed = ? WHERE id = ?",
        [completed, id],
        callback
    );
};

// DELETE - Remove a task
const deleteTask = (id, callback) => {
    db.query(
        "DELETE FROM tasks WHERE id = ?",
        [id],
        callback
    );
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
