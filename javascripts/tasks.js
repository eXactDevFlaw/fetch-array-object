let tasksMode = "foreach";

function TaskComponent(taskId, taskData) {
    const div = document.createElement('div');
    div.className = "task_card";
    div.style.width = "90%";
    div.style.margin = "6px auto";
    div.style.background = "#fff";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
    div.style.padding = "8px";
    div.style.overflow = "auto";
    div.innerHTML = `<b>${taskId}</b>:<br><code>${JSON.stringify(taskData, null, 2)}</code>`;
    return div;
}

async function ichCalleDieTasks() {
    const meineTasks = await fetchDasWasDuBrauchst("tasks");
    const tasksDiv = document.querySelector('.tasks');
    const headline = document.querySelector('.tasks_wrapper h1');
    const wrapper = document.querySelector('.tasks_wrapper');
    const btn = document.getElementById("toggle-tasks-for-foreach");
    tasksDiv.innerHTML = "";

    headline.textContent = `Content aus tasks (${tasksMode})`;
    wrapper.classList.remove('mode-foreach', 'mode-for');
    wrapper.classList.add('mode-' + tasksMode);
    btn.textContent = `toggle for/foreach (aktuell: ${tasksMode})`;

    if (!meineTasks || typeof meineTasks !== "object") {
        tasksDiv.textContent = "Keine Tasks vorhanden!";
        return;
    }

    if (tasksMode === "foreach") {
        Object.entries(meineTasks).forEach(([key, value]) => {
            tasksDiv.appendChild(TaskComponent(key, value));
        });
    } else {
        const keys = Object.keys(meineTasks);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            tasksDiv.appendChild(TaskComponent(key, meineTasks[key]));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-tasks-for-foreach").addEventListener("click", () => {
        tasksMode = tasksMode === "foreach" ? "for" : "foreach";
        ichCalleDieTasks();
    });
});