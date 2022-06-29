'use strict';

let cloudCalendar;
let cloudCarousel;
let cloudValue = 0;
let basis = new Date();
let basisYear = basis.getFullYear();
let basisMonth = basis.getMonth();
let month;
let anteMonth = new Date(basisYear, basisMonth - 1);
let postMonth = new Date(basisYear, basisMonth + 1);
let table = [document.getElementById('anteTable'), document.getElementById('basisTable'), document.getElementById('postTable')];

function loadCloudCalendar() {
  const userMonths = JSON.parse(localStorage.getItem('cloudCalendar')) || [];
  cloudCalendar = new Calendar(userMonths);
}

loadCloudCalendar();

// console.log(monthObj.getDay());
// console.log(basis.getDate());
// console.log(basis.getMonth());

//returns the length of the month if num is set to zero.
function getDaysInMonth(year, month, num) {
  return new Date(year, month, num).getDate();
}

function dayArray(number){
  let array = [];
  for (let i = 0; i < number; i++){
    array.push(i+1);
  }
  return array;
}


function loadMonth(monthObj) {
  const days = JSON.parse(localStorage.getItem('thisMonth')) || [];
  month = new Month(days, monthObj.getFullYear(), monthObj.getMonth() + 1);
}


function headCreate (monthObj, index){
  //Adding the month name at the top of the calendar
  let title = document.createElement('caption');
  title.textContent = monthObj.toLocaleString('default', {month: 'long'}) + ', ' + monthObj.getFullYear();
  table[index].appendChild(title);


  //Adding the names of the week in the first row
  let headRow = document.createElement('tr');
  headRow.setAttribute('class', 'calHead');
  table[index].appendChild(headRow);
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for(let i = 0; i < days.length; i++){
    let headEl = document.createElement('td');
    headEl.setAttribute('class', 'headEl');
    headRow.appendChild(headEl);
    headEl.textContent = days[i];
  }
}

function calFirstRow (monthObj, index){
  //Finding the day in the week the first day of 'this' month is on, i.e. Thursday.
  let newObj = new Date(monthObj.getFullYear(), monthObj.getMonth(), 1);
  let firstDay = newObj.getDay();

  //Creating the first row
  let firstRow = document.createElement('tr');
  let rowCreateStart;
  firstRow.setAttribute('class', 'calRow');
  firstRow.setAttribute('id', 'firstRow');
  table[index].appendChild(firstRow);

  if(firstDay === 7){
    for(let i = 0; i < 7; i++){
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'thisMonth');
      firstRow.appendChild(calDate);
      calDate.textContent = i+1;
      //we could create date objects at this point
      month.addDay();
    }
    rowCreateStart = 8;
  }
  else{
    let adjMonthLength = getDaysInMonth(monthObj.getFullYear(), monthObj.getMonth(), 0);
    for(let i = 0; i < firstDay; i++){
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'adjMonth');
      firstRow.appendChild(calDate);
      calDate.textContent = adjMonthLength - firstDay + 1 + i;
    }

    for(let i = firstDay; i < 7; i++){
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'thisMonth');
      firstRow.appendChild(calDate);

      let dateDiv = document.createElement('div');
      dateDiv.textContent = i - firstDay + 1;
      calDate.appendChild(dateDiv);

      let taskDiv = document.createElement('div');
      taskDiv.setAttribute('id', '0');
      calDate.appendChild(taskDiv);
      //we could create date objects at this point
      month.addDay();
    }
    rowCreateStart = 7 - firstDay + 1;
  }

  return rowCreateStart;
}

function rowCreate (number, monthObj, index){
  let state = false;

  for (let i = 0; i < 5; i++) {
    let calRow = document.createElement('tr');
    calRow.setAttribute('class', 'calRow');
    table[index].appendChild(calRow);
    for (let j = 0; j < 7; j++) {
      let date = number + 7 * i + j;
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'thisMonth');
      calDate.textContent = date;
      calRow.appendChild(calDate);
      //we could create date objects at this point
      month.addDay();
      if (date === getDaysInMonth(monthObj.getFullYear(), monthObj.getMonth() + 1, 0)) {
        state = true;
      }
      if (state){
        let startAdjMonth = j + 1;
        for(let k = startAdjMonth; k < 7; k++){
          let calDate = document.createElement('td');
          calDate.setAttribute('class', 'adjMonth');
          calDate.textContent = k - startAdjMonth + 1;
          calRow.appendChild(calDate);
        }
        break;
      }
    }
    if (state) {
      break;
    }
  }
}

function genCalendar(monthObj, index){
  loadMonth(monthObj);
  headCreate(monthObj, index);
  let start = calFirstRow(monthObj, index);
  rowCreate(start, monthObj, index);
  cloudCalendar.addMonth(month);
  printOpus();
}

function carouselMonths(value){
  let anteMonth = new Date(basisYear, basisMonth + value - 1);
  let inMonth = new Date(basisYear, basisMonth + value);
  let postMonth = new Date(basisYear, basisMonth + value + 1);
  let array = [anteMonth, inMonth, postMonth];
  return array;
}

function printCloudCarousel(array){
  for(let i = 0; i < array.length; i++){
    genCalendar(array[i], i);
  }
}


function deleteCarousel(){
  let anteTable = document.getElementById('anteTable');
  while (anteTable.firstChild) {
    anteTable.removeChild(anteTable.firstChild);
  }

  let basisTable = document.getElementById('basisTable');
  while (basisTable.firstChild) {
    basisTable.removeChild(basisTable.firstChild);
  }

  let postTable = document.getElementById('postTable');
  while (postTable.firstChild) {
    postTable.removeChild(postTable.firstChild);
  }

}

cloudCarousel = carouselMonths(cloudValue);
printCloudCarousel(cloudCarousel);

document.getElementById('add-item-button').addEventListener('click', function(){
  document.getElementById('add-item-form').classList.remove('hidden');
});

function printOpus (){
  let eventArray = cloudCalendar.userCal[0].allDay[0].event;
  let taskArray = cloudCalendar.userCal[0].allDay[0].task;
  let listSpace = document.getElementById('0');

  if(eventArray.length > 1 || taskArray.length > 1){
    listSpace.removeChild(listSpace.firstChild);
  }

  let ulEl = document.createElement('ul');
  ulEl.setAttribute('id', 'opusList');
  listSpace.appendChild(ulEl);

  if(eventArray.length){
    for(let i = 0; i < eventArray.length; i++){
      let liEl = document.createElement('li');
      liEl.textContent = eventArray[i];
      ulEl.appendChild(liEl);
    }
  }

  if(taskArray.length){
    for(let i = 0; i < taskArray.length; i++){
      let liEl = document.createElement('li');
      liEl.textContent = taskArray[i];
      ulEl.appendChild(liEl);
    }
  }
}


document.getElementById('newOpus').addEventListener('submit', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.add('hidden');
  let opus = event.target.title.value;
  let date = event.target.date.value;
  let type = event.target.itemType.value;
  let category = event.target.category.value;
  if(type === ''){type = 'task';}

  let check = new Date(date);
  
  cloudCalendar.userCal[cloudValue].allDay[0].task.push(opus);

  printOpus();
});

document.getElementById('anteTable').addEventListener('click', function(event){
  event.preventDefault();
  cloudValue = cloudValue - 1;
  console.log(cloudValue);

  deleteCarousel();

  cloudCarousel = carouselMonths(cloudValue);
  printCloudCarousel(cloudCarousel);
});

document.getElementById('postTable').addEventListener('click', function(event){
  event.preventDefault();
  cloudValue = cloudValue + 1;
  
  deleteCarousel();

  cloudCarousel = carouselMonths(cloudValue);
  printCloudCarousel(cloudCarousel);
});

console.log(month.allDay);
console.log(month);
console.log(cloudCalendar);

genCalendar();

document.getElementById('cal-month-year').appendChild(document.createTextNode(`${monthName} ${now.getFullYear()}`));

