document.addEventListener("DOMContentLoaded", function () {
    const taskTitleInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const taskDateInput = document.getElementById("task-date");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const tasks = [];

    function addTask() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const taskDate = taskDateInput.value;

        if (!taskTitle || !taskDate) {
            alert("Please enter a task title and due date.");
            return;
        }

        const task = {
            title: taskTitle,
            description: taskDesc,
            dueDate: new Date(taskDate),
            isCompleted: false,
            isNotCompleted: false
        };

        tasks.push(task);
        renderTask(task);

        taskTitleInput.value = "";
        taskDescInput.value = "";
        taskDateInput.value = "";

        checkForDueTasks();
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="title">${task.title}</span>
            <span class="description">${task.description}</span>
            <span class="date">Due: ${task.dueDate.toLocaleString()}</span>
            <button class="complete-btn">Mark as Completed</button>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector(".complete-btn").addEventListener("click", function () {
            task.isCompleted = true;
            li.classList.add("completed");
            li.querySelector(".complete-btn").remove();
        });

        li.querySelector(".delete-btn").addEventListener("click", function () {
            taskList.removeChild(li);
            const taskIndex = tasks.indexOf(task);
            tasks.splice(taskIndex, 1);
        });

        taskList.appendChild(li);
    }

    function checkForDueTasks() {
        setInterval(function () {
            const now = new Date();
            tasks.forEach(task => {
                if (!task.isCompleted && !task.isNotCompleted && task.dueDate <= now) {
                    const confirmCompleted = confirm(`Task "${task.title}" is due. Do you want to cancel it?`);
                    
                    if (confirmCompleted) {
                        const taskListItems = Array.from(taskList.children);
                        taskListItems.forEach(item => {
                            if (item.querySelector(".title").textContent === task.title) {
                                taskList.removeChild(item);
                            }
                        });
                        tasks.splice(tasks.indexOf(task), 1);
                    } else {
                        task.isNotCompleted = true;
                        const taskListItems = Array.from(taskList.children);
                        taskListItems.forEach(item => {
                            if (item.querySelector(".title").textContent === task.title) {
                                item.classList.add("not-completed");
                                item.querySelector(".title").textContent += " (Not Completed)";
                            }
                        });
                    }
                }
            });
        }, 1000);
    }

    addTaskBtn.addEventListener("click", addTask);
});
