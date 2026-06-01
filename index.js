const API_URL = 'http://localhost:3000/durags';

const duragForm = document.getElementById('durag-form');
const colorInput = document.getElementById('color-input');
const imageInput = document.getElementById('image-input');
const duragContainer = document.getElementById('durag-container');

duragForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const color = colorInput.value;
    const imageUrl = imageInput.value;

    const newDurag = {
        color,
        imageUrl
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newDurag)
    })
    .then(response => response.json())
    .then(savedDurag => {
        console.log('Durag saved:', savedDurag);
        duragForm.reset();
    })
    .catch(error => {
        console.error('Error saving durag:', error);
    });
});