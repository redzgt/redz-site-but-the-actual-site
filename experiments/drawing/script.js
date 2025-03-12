const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;

function startDrawing(event) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function draw(event) {
  if (!drawing) return;
  ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  ctx.stroke();
}

function stopDrawing() {
  drawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event Listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Function to generate AI-powered art
async function generateAIArt() {
  const response = await fetch('https://api.deepai.org/api/text2img', {
    method: 'POST',
    headers: {
      'Api-Key': 'YOUR_DEEPAI_API_KEY', // Replace with your DeepAI API key
    },
    body: JSON.stringify({
      text: 'a beautiful landscape painting', // You can modify the prompt
    })
  });

  const data = await response.json();
  const imageUrl = data.output_url;
  displayAIImage(imageUrl);
}

function displayAIImage(imageUrl) {
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Display AI-generated image
  };
}
