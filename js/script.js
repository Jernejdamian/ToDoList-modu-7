{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task, done: true
        }))
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, {
                content: newTaskContent, done: false
            },
        ];
        render();
    };

    const toggleDoneButton = (index) => {
        tasks = [
            ...tasks.slice(0, index), {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const deletedButton = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ]
        render();
    };

    const bindEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done");
        const removeButtons = document.querySelectorAll(".js-remove");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleDoneButton(index);
            });
        });

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                deletedButton(index);
            });
        });
    };

    const renderTasks = () => {

        const htmlString = task =>
            `
            <li class="task ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""}">
            <button class="task__button task__button--done js-done">${task.done ? "✔️" : ""}</button>
            <span class="task__content ${task.done ? "task__content--done" : ""}">${task.content}</span>
            <button class="task__button task__button--remove js-remove">🗑</button>
            </li>`

        const taskElement = document.querySelector(".js-newTasks");
        taskElement.innerHTML = tasks.map(htmlString).join("");
    };

    const renderButtons = () => {

        const buttonElement = document.querySelector(".js-buttons");
        if (!tasks.length) {
            buttonElement.innerHTML = "";
            return;
        }
        buttonElement.innerHTML = `
        <button class="js-toggleHideDoneButton">${hideDoneTasks ? "Pokaż" : "Ukryj"}ukończone</button>
        <button class="js-markAllDone"${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszytskie</button>`
    };

    const bindEventsButtons = () => {

        const markAllDone = document.querySelector(".js-markAllDone");
        if (markAllDone) {
            markAllDone.addEventListener("click", markAllTaskDone);
        }

        const toggleHideDoneButton = document.querySelector(".js-toggleHideDoneButton");
        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks)
        };
    };

    const render = () => {
        renderTasks();
        bindEvents();
        renderButtons();
        bindEventsButtons();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("click", (event) => {
            event.preventDefault();

            const newTask = document.querySelector(".js-newTask");
            const newTaskContent = newTask.value.trim();

            if (newTaskContent !== "") {
                addNewTask(newTaskContent)
            };
            newTask.value = "";
            newTask.focus();
            render();
        })
    };

    init();
}