function hideTextInImage(imageUrl, text) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        const encoded = steganography.encode(text, canvas);
        downloadImage(encoded);
    };
}
