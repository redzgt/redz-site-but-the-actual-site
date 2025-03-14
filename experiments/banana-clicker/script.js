// Load saved progress
let bananas = localStorage.getItem("bananas") ? parseInt(localStorage.getItem("bananas")) : 0;
let bps = localStorage.getItem("bps") ? parseInt(localStorage.getItem("bps")) : 0;

document.getElementById("bananaCount").innerText = bananas;
document.getElementById("bps").innerText = bps;

// Click banana function
function clickBanana() {
    bananas++;
    document.getElementById("bananaCount").innerText = bananas;
    saveProgress();

    // Click effect (pops the banana)
    let banana = document.getElementById("banana");
    banana.classList.add("pop");
    setTimeout(() => banana.classList.remove("pop"), 100);
}

// Save progress to local storage
function saveProgress() {
    localStorage.setItem("bananas", bananas);
    localStorage.setItem("bps", bps);
}

// Upgrade system
let upgrades = [
    { name: "Banana Hands", cost: 10, bpsIncrease: 1 },
    { name: "Auto Clicker", cost: 50, bpsIncrease: 5 },
    { name: "Super Clicker", cost: 250, bpsIncrease: 20 },
    { name: "Banana Farm", cost: 1000, bpsIncrease: 50 },
    { name: "Banana Factory", cost: 5000, bpsIncrease: 100 },
    { name: "Golden Bananas", cost: 10000, bpsIncrease: 200 }
];

function buyUpgrade(index) {
    let upgrade = upgrades[index - 1];
    if (bananas >= upgrade.cost) {
        bananas -= upgrade.cost;
        bps += upgrade.bpsIncrease;
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
