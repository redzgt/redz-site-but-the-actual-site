const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let color = "#000000";
let brushSize = 5;
let shape = "free"; // Default to free drawing
let startX, startY, snapshot;
let undoStack = [];
let redoStack = [];

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    const toolbarHeight = document.getElementById("toolbar").offsetHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolbarHeight;
    restoreCanvas();
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Mobile Support
canvas.addEventListener("touchstart", (e) => startDrawing(e.touches[0]));
canvas.addEventListener("touchmove", (e) => draw(e.touches[0]));
canvas.addEventListener("touchend", stopDrawing);

document.getElementById("colorPicker").addEventListener("input", (e) => {
    color = e.target.value;
});

document.getElementById("brushSize").addEventListener("input", (e) => brushSize = parseInt(e.target.value));
document.getElementById("shapeSelector").addEventListener("change", (e) => {
    shape = e.target.value;
    // Disable color picker if eraser is selected
    document.getElementById("colorPicker").disabled = shape === "eraser";
});

function startDrawing(event) {
    const pos = getMousePos(event);
    startX = pos.x;
    startY = pos.y;
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    if (shape !== "free" && shape !== "eraser") {
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    saveState(); // Save the state before drawing starts
}

function draw(event) {
    if (!drawing) return;

    const pos = getMousePos(event);
    const x = pos.x;
    const y = pos.y;

    ctx.lineWidth = brushSize;

    if (shape === "free" || shape === "eraser") {
        // Use eraser tool when "eraser" shape is selected
        ctx.strokeStyle = shape === "eraser" ? "rgba(255,255,255,1)" : color;
        ctx.lineCap = "round";
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.putImageData(snapshot, 0, 0);
        ctx.strokeStyle = color;
        if (shape === "line") {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(x, y);
            ctx.stroke();
        } else if (shape === "rectangle") {
            ctx.strokeRect(startX, startY, x - startX, y - startY);
        } else if (shape === "circle") {
            const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

function stopDrawing() {
    if (drawing) saveState();
    drawing = false;
}

// ✅ Undo Function (Fix: Only saves after drawing is finished)
function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        restoreCanvas();
    }
}

// ✅ Redo Function (Restores latest undone state)
function redo() {
    if (redoStack.length > 0) {
        undoStack.push(redoStack.pop());
        restoreCanvas();
    }
}

// ✅ Save the current state for Undo/Redo
function saveState() {
    if (undoStack.length > 20) undoStack.shift(); // Limit history size
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStack = []; // Clear redo stack when a new action is made
}

// ✅ Restore the last state from Undo
function restoreCanvas() {
    if (undoStack.length > 0) {
        ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
    } else {
        clearCanvas();
    }
}

// ✅ Clear Canvas (Fix: Also clears history)
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [];
    redoStack = [];
}

// ✅ Save Drawing as Image
function saveDrawing() {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
}
