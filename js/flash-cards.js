'use strict';

let answerReturn = 0;
let lengthReturn = 0;

function Deck(deckLength, question, answer) {
  this.deckLength = deckLength,
  this.question = question,
  this.answer = answer,
  this.cards = [];

  this.addCard = function() {
    for (let i = 0; i < this.deckLength; i++) {
      this.cards.push(question);
    }
  },

  this.renderCard = function() {
    let divEl = document.getElementById('cardRender');
    let cardEl = document.createTextNode(this.question);
    divEl.appendChild(cardEl);
    answerReturn = this.answer;
    lengthReturn = this.deckLength;
  };

}
let checkAnswer = function() {
  let answerInput = document.getElementById('userAnswer');
  let score = 0;
  for (let i = 0; i < lengthReturn; i++) {
    if (answerReturn === answerInput) {
      score++;
    }
    console.log(score);
  }
};

let gMajor = new Deck(12, 'A B C D E F# G', 'G Major');
gMajor.addCard();
gMajor.renderCard();

checkAnswer();
