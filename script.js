// JavaScript for image gallery
const images = [
    "images/banana_brawl_1.jpg",
    "images/banana_brawl_2.jpg",
    "images/banana_brawl_3.jpg"
]; // Add your image paths here

let currentIndex = 0;

function changeImage(direction) {
    // Update the current index
    currentIndex = (currentIndex + direction + images.length) % images.length;

    // Update the image source
    const galleryImage = document.getElementById("galleryImage");
    galleryImage.src = images[currentIndex];
}
