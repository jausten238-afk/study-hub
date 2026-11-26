
require("dotenv").config();
const db = require("./db");
db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("Connected to MySQL successfully!");
    }
});
const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use("/tasks", taskRoutes);

app.get("/hello", (req, res) => {
    res.send("Hello from Study Hub!");
});
app.listen(3000, ()=>{
    console.log("Server running on port 3000")
});
