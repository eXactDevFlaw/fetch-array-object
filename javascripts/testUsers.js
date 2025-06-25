let testUsersMode = "foreach";

function TestUserComponent(idx, testUserData) {
    const div = document.createElement('div');
    div.className = "test_user_card";
    div.style.width = "90%";
    div.style.margin = "6px auto";
    div.style.background = "#fff";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
    div.style.padding = "8px";
    div.style.overflow = "auto";
    div.innerHTML = `<b>${idx}</b>:<br><code>${JSON.stringify(testUserData, null, 2)}</code>`;
    return div;
}

async function ichCalleDieTestUsers() {
    const meineTestUsers = await fetchDasWasDuBrauchst("testUsers");
    const testUsersDiv = document.querySelector('.test_users');
    const headline = document.querySelector('.test_users_wrapper h1');
    const wrapper = document.querySelector('.test_users_wrapper');
    const btn = document.getElementById("toggle-testusers-for-foreach");
    testUsersDiv.innerHTML = "";

    headline.textContent = `Content aus testUser (${testUsersMode})`;
    wrapper.classList.remove('mode-foreach', 'mode-for');
    wrapper.classList.add('mode-' + testUsersMode);
    btn.textContent = `toggle for/foreach (aktuell: ${testUsersMode})`;

    if (!Array.isArray(meineTestUsers)) {
        headline.textContent = "Content aus testUser (keine Daten gefunden)";
        testUsersDiv.textContent = "Keine TestUser-Daten vorhanden!";
        return;
    }

    if (testUsersMode === "foreach") {
        meineTestUsers.forEach((value, idx) => {
            testUsersDiv.appendChild(TestUserComponent(idx, value));
        });
    } else {
        for (let i = 0; i < meineTestUsers.length; i++) {
            testUsersDiv.appendChild(TestUserComponent(i, meineTestUsers[i]));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-testusers-for-foreach").addEventListener("click", () => {
        testUsersMode = testUsersMode === "foreach" ? "for" : "foreach";
        ichCalleDieTestUsers();
    });
});