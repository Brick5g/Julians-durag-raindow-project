const API_URL = 'http://localhost:3000/durags';

const duragForm = document.getElementById('durag-form');
const colorInput = document.getElementById('color-input');
const imageInput = document.getElementById('image-input');
const duragContainer = document.getElementById('durag-container');

duragForm.addEventListener('submit', function(event) {
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
});

function renderUserGalleryCard(durag) {
  const card = document.createElement('div');
  card.className = 'durag-card';
  card.style.flexShrink = '0';
  card.style.border = '1px solid #444';
  card.style.padding = '10px';
  card.style.borderRadius = '6px';
  card.style.textAlign = 'center';
  card.style.backgroundColor = '#2d2d2d';
  card.style.minWidth = '160px';  
  card.style.maxWidth = '160px';  

  const img = document.createElement('img');
  img.src = durag.imageUrl || durag.image;
  img.alt = `${durag.color} Card`;
  img.style.width = '120px';
  img.style.height = '120px';
  img.style.objectFit = 'cover';
  img.style.display = 'block';
  img.style.margin = '0 auto 8px';
  card.appendChild(img);

  let likeCount = 0;
  const likeButton = document.createElement('button');
  likeButton.textContent = `❤️ (${likeCount})`;
  likeButton.style.padding = '4px 10px';
  likeButton.style.fontSize = '12px';
  likeButton.style.cursor = 'pointer';
  likeButton.style.display = 'block';
  likeButton.style.margin = '8px auto';
  likeButton.style.borderRadius = '4px';
  likeButton.style.border = '1px solid #bbb';
  likeButton.style.backgroundColor = '#fff';

  likeButton.addEventListener('click', function() {
    likeCount++;
    likeButton.textContent = `❤️ (${likeCount})`;
    });
    card.appendChild(likeButton);

  const label = document.createElement('p');
  label.textContent = durag.color;
  label.style.fontWeight = 'bold';
  label.style.color = '#ffffff'; 
  label.style.margin = '0';
  card.appendChild(label);

  const commentList = document.createElement('ul');
  commentList.style.listStyleType = 'none';
  commentList.style.padding = '0';
  commentList.style.marginTop = '10px';
  commentList.style.textAlign = 'left';
  commentList.style.fontSize = '12px';
  commentList.style.color = '#ffffff';

  const commentForm = document.createElement('form');
  commentForm.style.marginTop = '8px';

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  commentInput.style.width = '90%';
  commentInput.style.padding = '6px';
  commentInput.style.fontSize = '12px';
  commentInput.style.display = 'block';
  commentInput.style.margin = '0 auto 6px auto';
  commentInput.style.backgroundColor = '#333';
  commentInput.style.color = '#fff';
  commentInput.style.border = '1px solid #555';
  commentInput.required = true;

  const commentSubmitButton = document.createElement('button');
  commentSubmitButton.type = 'submit';
  commentSubmitButton.textContent = 'Submit';
  commentSubmitButton.style.padding = '4px 10px';
  commentSubmitButton.style.fontSize = '12px';
  commentSubmitButton.style.display = 'block';
  commentSubmitButton.style.margin = '0 auto';
  commentSubmitButton.style.cursor = 'pointer';

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentSubmitButton);
    
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newCommentItem = document.createElement('li');
    newCommentItem.textContent = `• ${commentInput.value}`;
    newCommentItem.style.wordBreak = 'break-word';
    newCommentItem.style.marginTop = '4px';
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
  trackTitle.textContent = "Durag's I own already!:";
  trackTitle.style.margin = "0 0 10px 0";
  trackTitle.style.color = "#ff8888";
  rainbowContainer.appendChild(trackTitle);

  const colorTrack = document.createElement('div');
  colorTrack.style.display = 'flex';
  colorTrack.style.flexWrap = 'wrap';
  colorTrack.style.gap = '8px';

  duragsArray.forEach(durag => {
    if (!durag.selfie) {
      return; 
    }

  const colorBtn = document.createElement('button');
  colorBtn.className = 'color-wheel-btn';
  colorBtn.textContent = durag.color;

  colorBtn.addEventListener('mouseenter', function() {
  previewPlaceholder.style.display = 'none';
  previewImage.src = durag.selfie;
  previewImage.style.display = 'block';
  });

  colorBtn.addEventListener('mouseleave', function() {
  previewImage.src = "";
  previewImage.style.display = 'none';
  previewPlaceholder.style.display = 'block';
  });

  colorTrack.appendChild(colorBtn);
  });

  rainbowContainer.appendChild(colorTrack);
}

document.addEventListener('DOMContentLoaded', fetchDatabaseCollection);

