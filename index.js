const API_URL = 'http://localhost:3000/durags';

const duragForm = document.getElementById('durag-form');
const colorInput = document.getElementById('color-input');
const imageInput = document.getElementById('image-input');
const duragContainer = document.getElementById('durag-container');

duragForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const newDurag = {
    color: colorInput.value,
    imageUrl: imageInput.value,
    name: `${colorInput.value} Durag`
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
    renderUserGalleryCard(savedDurag);
    duragForm.reset();
  })
  .catch(error => console.error('Error saving durag:', error));
}

function renderUserGalleryCard(durag) {
  const card = document.createElement('div');
  card.className = 'durag-card';

  const img = document.createElement('img');
  img.src = durag.imageUrl || durag.image;
  img.alt = `${durag.color} Card`;
  img.className = 'durag-card-img';
  card.appendChild(img);

  let likeCount = 0;
  const likeButton = document.createElement('button');
  likeButton.className = 'durag-like-btn';
  likeButton.textContent = `❤️ (${likeCount})`;
  likeButton.addEventListener('click', () => {
    likeCount++;
    likeButton.textContent = `❤️ (${likeCount})`;
  });
  card.appendChild(likeButton);

  const label = document.createElement('p');
  label.className = 'durag-card-label';
  label.textContent = durag.color;
  card.appendChild(label);

  const commentList = document.createElement('ul');
  commentList.className = 'durag-comment-list';

  const commentForm = document.createElement('form');
  commentForm.className = 'durag-comment-form';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  commentInput.className = 'durag-comment-input';
  commentInput.required = true;

  const commentSubmitButton = document.createElement('button');
  commentSubmitButton.type = 'submit';
  commentSubmitButton.textContent = 'Submit';
  commentSubmitButton.className = 'durag-comment-submit';

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentSubmitButton);
    
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCommentItem = document.createElement('li');
    newCommentItem.textContent = `• ${commentInput.value}`;
    commentList.appendChild(newCommentItem);
    commentForm.reset();
  });

  card.appendChild(commentForm);
  card.appendChild(commentList);
  duragContainer.appendChild(card);
}

function fetchDatabaseCollection() {
  fetch(API_URL)
    .then(response => response.json())
    .then(duragsArray => {
      duragContainer.replaceChildren();
      duragsArray.forEach(durag => {
        if (!durag.selfie) {
          renderUserGalleryCard(durag);
        }
      });
      buildColorWheelMenu(duragsArray);
    })
    .catch(error => console.error('Error fetching database collection:', error));
}

function buildColorWheelMenu(duragsArray) {
  const rainbowContainer = document.getElementById('rainbow-preview-area');
  const previewPlaceholder = document.getElementById('preview-placeholder');
  const previewImage = document.getElementById('preview-image');

  rainbowContainer.replaceChildren();

  const trackTitle = document.createElement('h4');
  trackTitle.className = 'rainbow-track-title';
  trackTitle.textContent = "Durag's I own already!:";
  rainbowContainer.appendChild(trackTitle);

  const colorTrack = document.createElement('div');
  colorTrack.className = 'rainbow-color-track';

  duragsArray.forEach(durag => {
    if (!durag.selfie) return; 

    const colorBtn = document.createElement('button');
    colorBtn.className = 'color-wheel-btn';
    colorBtn.textContent = durag.color;


    colorBtn.addEventListener('mouseenter', () => {
      previewPlaceholder.style.display = 'none';
      previewImage.src = durag.selfie;
      previewImage.style.display = 'block';
    });

    colorBtn.addEventListener('mouseleave', () => {
      previewImage.src = "";
      previewImage.style.display = 'none';
      previewPlaceholder.style.display = 'block';
    });

    colorTrack.appendChild(colorBtn);
  });

  rainbowContainer.appendChild(colorTrack);
}
document.addEventListener('DOMContentLoaded', fetchDatabaseCollection);

