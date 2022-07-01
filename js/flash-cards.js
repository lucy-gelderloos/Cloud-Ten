'use strict';

let deck = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];

let flashcards = document.getElementById('flashcard');
let createBox = document.getElementById('createBox');

function delCards() {
  localStorage.clear();
  flashcards.innerHTML = '';
  deck = [];
}

function newCard() {
  createBox.style.display = 'block';
}
function hideBox() {
  createBox.style.display = 'none';
}

function renderCard(text) {
  let divEl = document.createElement('div');
  let questionEl = document.createElement('h3');
  let answerEl = document.createElement('h3');

  divEl.className = 'flashcard';

  questionEl.textContent = text.userQuestion;

  answerEl.setAttribute('style', 'color:red; display:none');
  answerEl.textContent = text.userAnswer;

  divEl.appendChild(questionEl);
  divEl.appendChild(answerEl);

  divEl.addEventListener('click', function() {
    if(answerEl.style.display === 'none') {
      answerEl.style.display = 'block';
    } else {
      answerEl.style.display = 'none';
    }
  });

  let flash = document.getElementById('flashcard');
  flash.appendChild(divEl);
}

deck.forEach(renderCard);

function addFlashCard() {
  let question = document.getElementById('question');
  let answer = document.getElementById('answer');

  let flashcardData = {
    'userQuestion' : question.value,
    'userAnswer' : answer.value
  };

  deck.push(flashcardData);
  localStorage.setItem('cards', JSON.stringify(deck));
  renderCard(deck[deck.length - 1], deck.length - 1);
  question.value = '';
  answer.value = '';
}

