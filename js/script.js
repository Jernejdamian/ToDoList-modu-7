{
    const tasks = [
        {
            content: "Zrobić herbatę", done: true,
        },
        {
            content: "Zjeść kolację", done: false,
        },
    ];

    const toggleDoneButton = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const deletedButton = (index) => {
        tasks.splice(index, 1);
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

    const render = () => {

        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="task">
            <button class="task__button task__button--done js-done">${task.done ? "✔️" : ""}</button>
            <span class="task__content ${task.done ? "task__content--done" : ""}">${task.content}</span>
            <button class="task__button task__button--remove js-remove">🗑</button>
            </li>`;
        }

        document.querySelector(".js-newTasks").innerHTML = htmlString;

        bindEvents();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("click", (event) => {
            event.preventDefault();

            const newTask = document.querySelector(".js-newTask");
            const addNewTask = newTask.value.trim();

            if (addNewTask !== "") {
                tasks.push({
                    content: addNewTask,
                })
            }
            newTask.value = "";
            newTask.focus();
            render();
        })
    };

    init();
}