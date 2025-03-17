// Load saved progress
let bananas = parseInt(localStorage.getItem("bananas")) || 0;
let bps = parseInt(localStorage.getItem("bps")) || 0;
let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
let upgrades = JSON.parse(localStorage.getItem("upgrades")) || [
    { name: "Banana Hands", cost: 10, bpsIncrease: 1, owned: 0 },
    { name: "Auto Clicker", cost: 50, bpsIncrease: 5, owned: 0 },
    { name: "Super Clicker", cost: 250, bpsIncrease: 20, owned: 0 },
    { name: "Banana Farm", cost: 1000, bpsIncrease: 50, owned: 0 },
    { name: "Banana Factory", cost: 5000, bpsIncrease: 100, owned: 0 },
    { name: "Golden Bananas", cost: 10000, bpsIncrease: 200, owned: 0 },
    { name: "Banana Boost", cost: 15000, clickIncrease: 2, owned: 0 }, // New Upgrade
    { name: "Banana Mastery", cost: 50000, clickIncrease: 5, owned: 0 } // New Upgrade
];

// Update UI
document.getElementById("bananaCount").innerText = bananas;
document.getElementById("bps").innerText = bps;
upgrades.forEach((upgrade, i) => {
    document.getElementById(`cost${i + 1}`).innerText = upgrade.cost;
});

// Click banana function
function clickBanana() {
    bananas += clickPower;
    document.getElementById("bananaCount").innerText = bananas;
    saveProgress();

    // Click effect
    let banana = document.getElementById("banana");
    banana.classList.add("pop");
    setTimeout(() => banana.classList.remove("pop"), 100);
}

// Save progress to local storage
function saveProgress() {
    localStorage.setItem("bananas", bananas);
    localStorage.setItem("bps", bps);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

// Upgrade system
function buyUpgrade(index) {
    let upgrade = upgrades[index - 1];

    if (bananas >= upgrade.cost) {
        bananas -= upgrade.cost;

        if (upgrade.bpsIncrease) {
            bps += upgrade.bpsIncrease;
        } else if (upgrade.clickIncrease) {
            clickPower += upgrade.clickIncrease;
        }

        upgrade.owned++;
        upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost

        document.getElementById("bananaCount").innerText = bananas;
        document.getElementById("bps").innerText = bps;
        document.getElementById(`cost${index}`).innerText = upgrade.cost;

        saveProgress();
    }
}

// Auto-generate bananas per second
setInterval(() => {
    bananas += bps;
    document.getElementById("bananaCount").innerText = bananas;
    saveProgress();
}, 1000);
