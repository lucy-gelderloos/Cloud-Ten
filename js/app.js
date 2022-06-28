'use strict';

// Cart constructor.
const Month = function(allDay) {
  this.allDay = allDay;
};


Month.prototype.addDay = function(product, quantity) {
  let adding = new Day(product, quantity);
  this.allDay.push(adding);
};

Month.prototype.saveToLocalStorage = function() {
  localStorage.setItem('month', JSON.stringify(this.allDay));
};

const Day = function(product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

// Month.prototype.removeItem = function(item) {
//   // TODO DONE: Fill in this instance method to remove one item from the cart.
//   for(let i = 0; i < month.allDay.length; i++){
//     if(month.allDay[i].product == item){
//       month.allDay.splice(i, 1);
//     }
//   }
//   // Note: You will have to decide what kind of parameter to pass in here!
// };
