const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let color = "#000000";
let brushSize = 5;
let shape = "free";
let startX, startY, snapshot;
let undoStack = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

// Resize canvas on window resize
window.addEventListener("resize", () => {
  let temp = document.createElement("canvas");
  temp.width = canvas.width;
  temp.height = canvas.height;
  temp.getContext("2d").drawImage(canvas, 0, 0);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
  ctx.drawImage(temp, 0, 0);
});

// Event Listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Mobile Touch Support
canvas.addEventListener("touchstart", (e) => startDrawing(e.touches[0]));
canvas.addEventListener("touchmove", (e) => draw(e.touches[0]));
canvas.addEventListener("touchend", stopDrawing);

// Update tools
document.getElementById("colorPicker").addEventListener("input", (e) => color = e.target.value);
document.getElementById("brushSize").addEventListener("input", (e) => brushSize = parseInt(e.target.value));
document.getElementById("shapeSelector").addEventListener("change", (e) => shape = e.target.value);

function startDrawing(event) {
  drawing = true;
  startX = event.clientX;
  startY = event.clientY;
  
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  
  // Save snapshot before drawing a shape
  if (shape !== "free") {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  
  saveState();
}

function draw(event) {
  if (!drawing) return;

  const x = event.clientX;
  const y = event.clientY;
  
  if (shape === "free") {
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.putImageData(snapshot, 0, 0);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

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

// Undo Function
function undo() {
  if (undoStack.length > 0) {
    const lastState = undoStack.pop();
    ctx.putImageData(lastState, 0, 0);
  }
}

// Save the current state for undo
function saveState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Clear Canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  undoStack = [];
}

// Save Drawing as an Image
function saveDrawing() {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL();
  link.click();
}
