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

function fetchDurags() {
  fetch(API_URL)
    .then(response => response.json())
    .then(duragsArray => {
      duragContainer.replaceChildren();
      duragsArray.forEach(durag => {
        renderDuragCard(durag);
      }); 
    }).catch(error => console.error('Error fetching durags:', error));
}

function renderDuragCard(durag) {
  const card = document.createElement('div');
  card.className = 'durag-card';

  card.style.display = 'inline-block';
  card.style.verticalAlign = 'top'; 
  card.style.border = '1px solid #ccc';
  card.style.padding = '10px';
  card.style.margin = '10px';
  card.style.borderRadius = '6px';
  card.style.textAlign = 'center';
  card.style.backgroundColor = '#f9f9f9';
  card.style.minWidth = '160px';  
  card.style.maxWidth = '160px';  

  const img = document.createElement('img');
  img.src = durag.imageUrl || durag.image;
  img.alt = `${durag.color} || 'Unknown Color'} Durag`;
  img.style.width = '120px';
  img.style.height = '120px';
  img.style.objectFit = 'cover';
  img.style.display = 'block';
  img.style.margin = '0 auto 6px auto';

  const colorLabel = document.createElement('p');
  colorLabel.textContent = durag.color || 'No Color Specified';
  colorLabel.style.fontWeight = 'bold';
  colorLabel.style.margin = '0';

  card.appendChild(img);
  card.appendChild(colorLabel);

  const commentList = document.createElement('ul');
  commentList.style.listStyleType = 'none';
  commentList.style.padding = '0';
  commentList.style.marginTop = '10px';
  commentList.style.textAlign = 'left';
  commentList.style.fontSize = '12px';

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
  commentInput.required = true;

  const commentSubmitButton = document.createElement('button');
  commentSubmitButton.type = 'submit';
  commentSubmitButton.textContent = 'Submit';
  commentSubmitButton.style.padding = '4px 10px';
  commentSubmitButton.style.fontSize = '12px';
  commentSubmitButton.style.marginLeft = '4px';
  commentSubmitButton.style.cursor = 'pointer';

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentSubmitButton);
  
  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const newCommentItem = document.createElement('li');
    newCommentItem.textContent = `${commentInput.value}`;
    newCommentItem.style.wordBreak = 'break-word';
    newCommentItem.style.marginTop = '4px';
    
    commentList.appendChild(newCommentItem);

    commentForm.reset();
  });

  card.appendChild(commentForm);
  card.appendChild(commentList);
  
  duragContainer.appendChild(card);
}

document.addEventListener('DOMContentLoaded', fetchDurags);