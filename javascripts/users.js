let usersMode = "foreach";

function UserComponent(userId, userData) {
    const div = document.createElement('div');
    div.className = "user_card";
    div.style.width = "90%";
    div.style.margin = "6px auto";
    div.style.background = "#fff";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
    div.style.padding = "8px";
    div.style.overflow = "auto";
    div.innerHTML = `<b>${userId}</b>:<br><code>${JSON.stringify(userData, null, 2)}</code>`;
    return div;
}

async function ichCalleDieUsers() {
    const meineUsers = await fetchDasWasDuBrauchst("users");
    const usersDiv = document.querySelector('.users');
    const headline = document.querySelector('.users_wrapper h1');
    const wrapper = document.querySelector('.users_wrapper');
    const btn = document.getElementById("toggle-users-for-foreach");
    usersDiv.innerHTML = "";

    headline.textContent = `Content aus users (${usersMode})`;
    wrapper.classList.remove('mode-foreach', 'mode-for');
    wrapper.classList.add('mode-' + usersMode);
    btn.textContent = `toggle for/foreach (aktuell: ${usersMode})`;

    if (!meineUsers || typeof meineUsers !== "object") {
        usersDiv.textContent = "Keine Users vorhanden!";
        return;
    }

    if (usersMode === "foreach") {
        Object.entries(meineUsers).forEach(([key, value]) => {
            usersDiv.appendChild(UserComponent(key, value));
        });
    } else {
        const keys = Object.keys(meineUsers);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            usersDiv.appendChild(UserComponent(key, meineUsers[key]));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-users-for-foreach").addEventListener("click", () => {
        usersMode = usersMode === "foreach" ? "for" : "foreach";
        ichCalleDieUsers();
    });
});