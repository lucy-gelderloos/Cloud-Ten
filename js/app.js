'use strict';

const Calendar = function(userCal) {
  this.userCal = userCal;
};

const Month = function(allDay, year, month) {
  this.allDay = allDay;
  this.year = year;
  this.month = month;
};

const Day = function() {
  this.task = [];
  this.event = [];
};

Calendar.prototype.addMonth = function(monthObj) {
  this.userCal.push(monthObj);
};

Month.prototype.addDay = function() {
  let adding = new Day();
  this.allDay.push(adding);
};

Month.prototype.saveToLocalStorage = function() {
  localStorage.setItem('thisMonth', JSON.stringify(this.allDay));
};

const TaskCloud = function() {
  this.taskCloud = [];
};

const EventCloud = function() {
  this.eventCloud = [];
};

const Task = function(category, content) {
  this.category = category;
  this.content = content;
};

const Event = function(category, content) {
  this.category = category;
  this.content = content;
};

