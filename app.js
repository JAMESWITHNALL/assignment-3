const upgrades = [
    {"id":1,"name":"Auto-Clicker","cost":100,"increase":1},
    {"id":2,"name":"Enhanced Oven","cost":500,"increase":5},
    {"id":3,"name":"Cookie Farm","cost":1000,"increase":10},
    {"id":4,"name":"Robot Baker","cost":2000,"increase":20},
    {"id":5,"name":"Cookie Factory","cost":5000,"increase":50},
    {"id":6,"name":"Magic Flour","cost":10000,"increase":100},
    {"id":7,"name":"Time Machine","cost":20000,"increase":200},
    {"id":8,"name":"Quantum Oven","cost":50000,"increase":500},
    {"id":9,"name":"Alien Technology","cost":100000,"increase":1000},
    {"id":10,"name":"Interdimensional Baker","cost":200000,"increase":2000}
];

let cookies = localStorage.getItem("cookies") ? parseInt(localStorage.getItem("cookies")) : 0;
let cookiesPerSecond = 0;
let cookiesPerClick = 1;
let purchasedUpgrades = JSON.parse(localStorage.getItem("purchasedUpgrades")) || [];

const cookieCountElement = document.getElementById("cookie-count");
const upgradesContainer = document.getElementById("upgrades");

function updateUI() {
    cookieCountElement.textContent = cookies;
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("purchasedUpgrades", JSON.stringify(purchasedUpgrades));
}

document.getElementById("cookie").addEventListener("click", () => {
    cookies += cookiesPerClick;
    updateUI();
});

function incrementCookies() {
    cookies += cookiesPerSecond;
    updateUI();
}

setInterval(incrementCookies, 1000);

function createUpgradeButtons() {
    upgrades.forEach(upgrade => {
        const button = document.createElement("button");
        button.textContent = `${upgrade.name} (Cost: ${upgrade.cost})`;
        button.disabled = purchasedUpgrades.includes(upgrade.id);
        button.addEventListener("click", () => {
            if (cookies >= upgrade.cost) {
                cookies -= upgrade.cost;
                cookiesPerSecond += upgrade.increase;
                purchasedUpgrades.push(upgrade.id);
                button.disabled = true;
                updateUI();
            } else {
                alert("Not enough cookies!");
            }
        });
        upgradesContainer.appendChild(button);
    });
}

createUpgradeButtons();
updateUI();
