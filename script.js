const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Add task when button is clicked
addButton.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    // Do not add an empty task
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");

    // Create task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Mark task as complete
    span.addEventListener("click", function() {
        span.classList.toggle("completed");
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Delete task
    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    // Add elements to list item
    li.appendChild(span);
    li.appendChild(deleteButton);

    // Add list item to task list
    taskList.appendChild(li);

    // Clear input box
    taskInput.value = "";
}