async function generateImage() {
    const text = document.getElementById('secretText').value;
    const textLength = text.length;
    const category = getImageCategory(textLength);
    const imageUrl = await fetchRandomImage(category);
    hideTextInImage(imageUrl, text);
}

function getImageCategory(length) {
    if (length <= 10) return 'animal';
    else if (length <= 50) return 'scenery';
    else if (length <= 100) return 'fish';
}

async function fetchRandomImage(category) {
    const response = await fetch(`https://api.gemini.com/random-image?category=${category}`);
    const data = await response.json();
    return data.imageUrl;
}

function hideTextInImage(imageUrl, text) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const encoded = steganography.encode(text, canvas);
        downloadImage(encoded);
    };
}

function downloadImage(canvas) {
    const link = document.createElement('a');
    link.download = 'secret-image.png';
    link.href = canvas.toDataURL();
    link.click();
}
