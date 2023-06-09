function convertJpgToWebp() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (!file) {
        showMessage('error', 'Please select an image file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            canvas.getContext('2d').drawImage(img, 0, 0);
            const webpDataUrl = canvas.toDataURL('image/webp');

            const link = document.createElement('a');
            link.href = webpDataUrl;
            link.download = 'converted.webp';
            link.click();
            showMessage('success', 'Image converted successfully!');
            URL.revokeObjectURL(webpDataUrl);
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function showMessage(type, message) {
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = message;
    resultMessage.classList = type;
}