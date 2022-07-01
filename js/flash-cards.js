'use strict';

let answerReturn = 0;
let deck = [];

function Card(question, answer) {
  this.question = question,
  this.answer = answer,

  this.addCard = function() {
    for (let i = 0; i < this.deckLength; i++) {
      deck.push(answer);
    }
  },

  this.renderCard = function() {
    let divEl = document.getElementById('cardRender');
    let cardEl = document.createTextNode(this.question);
    divEl.appendChild(cardEl);
    answerReturn = this.answer;
  };
}

let score = 0;
function checkAnswer() {
  let answerInput = document.getElementById('userAnswer').value;
  for (let i = 0; i <= deck.length; i++) {
    if (answerReturn === answerInput) {
      score++;
    }
  }
  console.log(score);
}


let majorScale = [new Card('A B C D E F# G', 'G Major'), new Card('A B C# D# E F# G#', 'A Major')];

majorScale[0].addCard();
majorScale[0].renderCard();



checkAnswer();
