
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const clearButton = document.getElementById("clearButton");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Load saved tasks from localStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display saved tasks when the page opens

renderTasks();

// Add task when button is clicked

addButton.addEventListener("click", addTask);

// Add task when Enter key is pressed

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});

// Function to add a task

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }

    // Create a task object

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };

    // Add task to array

    tasks.push(task);

    // Save tasks

    saveTasks();

    // Update display

    renderTasks();

    // Clear input

    taskInput.value = "";

}

// Function to display all tasks

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;

        // Mark completed tasks

        if (task.completed) {

            span.classList.add("completed");

        }

        // Toggle completed status

        span.addEventListener("click", function() {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });

        // Create delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");

        // Delete task

        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });

            saveTasks();

            renderTasks();

        });

        // Add elements

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

    updateCounter();

}

// Update task counter

function updateCounter() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

}

// Save tasks in localStorage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Clear all tasks

clearButton.addEventListener("click", function() {

    if (tasks.length === 0) {

        alert("There are no tasks to clear!");

        return;

    }

    const confirmation = confirm("Are you sure you want to delete all tasks?");

    if (confirmation) {

        tasks = [];

        saveTasks();

        renderTasks();

    }

});