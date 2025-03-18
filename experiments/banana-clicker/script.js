// Load saved progress
let bananas = parseInt(localStorage.getItem("bananas")) || 0;
let bps = parseInt(localStorage.getItem("bps")) || 0;
let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
let upgrades = JSON.parse(localStorage.getItem("upgrades")) || [
    { name: "Banana Hands", cost: 10, bpsIncrease: 1, owned: 0 },
    { name: "Auto Clicker", cost: 50, bpsIncrease: 5, owned: 0 },
    { name: "Super Clicker", cost: 250, clickIncrease: 1, owned: 0 },
    { name: "Banana Farm", cost: 1000, bpsIncrease: 50, owned: 0 },
    { name: "Banana Factory", cost: 5000, bpsIncrease: 100, owned: 0 },
    { name: "Golden Bananas", cost: 10000, bpsIncrease: 200, owned: 0 }
];

// Update UI on page load
function updateUI() {
    document.getElementById("bananaCount").innerText = bananas;
    document.getElementById("bps").innerText = bps;
    upgrades.forEach((upgrade, i) => {
        document.getElementById(`cost${i + 1}`).innerText = upgrade.cost;
    });
}
updateUI(); // Ensure values update when loading the game

// Click banana function
function clickBanana() {
    bananas += clickPower;
    document.getElementById("bananaCount").innerText = bananas;
    saveProgress();

    // Click pop effect
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
            bps += upgrade.bpsIncrease; // Fix BPS not increasing
        } 
        if (upgrade.clickIncrease) {
            clickPower += upgrade.clickIncrease; // Fix click power upgrades
        }

        upgrade.owned++;
        upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost after purchase

        updateUI();
        saveProgress();
    }
}

// Auto-generate bananas per second (BPS Fix)
setInterval(() => {
    if (bps > 0) {
        bananas += bps;
        document.getElementById("bananaCount").innerText = bananas;
        saveProgress();
    }
}, 1000);
