
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const loadTasks = () => {
    fetch("/tasks")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load tasks");
            }

            return response.json();
        })
        .then(tasks => {
            taskList.innerHTML = "";

            tasks.forEach(task => {
                const li = document.createElement("li");

                const title = document.createElement("span");
                title.textContent = task.title;

                if (task.completed) {
                    title.style.textDecoration = "line-through";
                }

              
                const completeBtn = document.createElement("button");
                 completeBtn.className = "completeBtn";
                completeBtn.textContent = task.completed
                    ? "Undo"
                    : "Complete";

                completeBtn.addEventListener("click", () => {
                    updateTask(task.id, !task.completed);
                });

               
                const deleteBtn = document.createElement("button");
                deleteBtn.className = "deleteBtn";
                deleteBtn.textContent = "Delete";

                deleteBtn.style.marginLeft = "15px";
                
                

                deleteBtn.addEventListener("click", () => {
                    deleteTask(task.id);
                });

                li.appendChild(title);
                li.appendChild(completeBtn);
                li.appendChild(deleteBtn);

                taskList.appendChild(li);
            });
        })
        .catch(error => {
            console.error(error);
            alert("Could not load tasks");
        });
};

// POST - Create a new task
const createTask = () => {
    const title = taskInput.value.trim();

    if (title === "") {
        alert("Please enter a task!");
        return;
    }

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        return response.json();
    })
    .then(data => {
        taskInput.value = "";
        loadTasks();
    })
    .catch(error => {
        console.error(error);
        alert("Could not create task");
    });
};

// PUT - Update a task
const updateTask = (id, completed) => {
    fetch("/tasks/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: completed
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        return response.json();
    })
    .then(data => {
        loadTasks();
    })
    .catch(error => {
        console.error(error);
        alert("Could not update task");
    });
};


const deleteTask = (id) => {
    fetch("/tasks/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        return response.json();
    })
    .then(data => {
        loadTasks();
    })
    .catch(error => {
        console.error(error);
        alert("Could not delete task");
    });
};

addTaskBtn.addEventListener("click", createTask);

loadTasks();
