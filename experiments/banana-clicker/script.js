// Load saved progress from local storage
let bananas = parseInt(localStorage.getItem("bananas")) || 0;
let bps = parseInt(localStorage.getItem("bps")) || 0;
let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
let upgrades = JSON.parse(localStorage.getItem("upgrades")) || [
    { name: "Banana Hands", cost: 10, bpsIncrease: 1, clickIncrease: 0, owned: 0 },
    { name: "Auto Clicker", cost: 50, bpsIncrease: 5, clickIncrease: 0, owned: 0 },
    { name: "Super Clicker", cost: 250, bpsIncrease: 0, clickIncrease: 1, owned: 0 },
    { name: "Banana Farm", cost: 1000, bpsIncrease: 50, clickIncrease: 0, owned: 0 },
    { name: "Banana Factory", cost: 5000, bpsIncrease: 100, clickIncrease: 0, owned: 0 },
    { name: "Golden Bananas", cost: 10000, bpsIncrease: 200, clickIncrease: 0, owned: 0 }
];

// Update UI function
function updateUI() {
    document.getElementById("bananaCount").innerText = bananas;
    document.getElementById("bps").innerText = bps;

    // Update upgrade costs
    upgrades.forEach((upgrade, i) => {
        document.getElementById(`cost${i + 1}`).innerText = upgrade.cost;
    });
}

// Function to add bananas per second
function generateBananas() {
    if (bps > 0) { // Only generate if BPS is > 0
        bananas += bps; 
        updateUI();
        saveProgress();
    }
}

// Start the BPS system
setInterval(generateBananas, 1000); // Run every second

// Click banana function
function clickBanana() {
    bananas += clickPower;
    updateUI();
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

// Buy Upgrade function
function buyUpgrade(index) {
    let upgrade = upgrades[index - 1];

    if (bananas >= upgrade.cost) {
        bananas -= upgrade.cost; // Spend bananas

        if (upgrade.bpsIncrease > 0) {
            bps += upgrade.bpsIncrease; // Increase BPS
        } 
        if (upgrade.clickIncrease > 0) {
            clickPower += upgrade.clickIncrease; // Increase click power
        }

        upgrade.owned++; // Track amount owned
        upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost after purchase

        updateUI();
        saveProgress();
    }
}

// Run UI update on page load
updateUI();
