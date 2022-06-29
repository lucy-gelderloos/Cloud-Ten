'use strict';

let now = new Date();

console.log(now.getDay());
console.log(now.getDate());
console.log(now.getMonth());

function getDaysInMonth(year, month, num) {
  return new Date(year, month, num).getDate();
}

let thisMonth = getDaysInMonth(now.getFullYear(), now.getMonth()+1, 0);

console.log(thisMonth);

let monthName = now.toLocaleString('default', {month: 'long'});

console.log(monthName);

function dayArray(number){
  let array = [];
  for (let i = 0; i < number; i++){
    array.push(i+1);
  }
  return array;
}

let days = dayArray(thisMonth);

console.log(days);

// let table = document.querySelector('table');
let table = document.getElementById('cal-table');

function headCreate (){
  let headRow = document.createElement('tr');
  headRow.setAttribute('class', 'calHead');
  table.appendChild(headRow);
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for(let i = 0; i < days.length; i++){
    let headEl = document.createElement('td');
    headEl.setAttribute('class', 'headEl');
    headRow.appendChild(headEl);
    headEl.textContent = days[i];
  }
}

function calFirstRow (){
  let newObj = new Date(now.getFullYear(), now.getMonth(), 1);
  let firstDay = newObj.getDay();
  console.log(firstDay);
  let firstRow = document.createElement('tr');
  let rowCreateStart;
  firstRow.setAttribute('class', 'calRow');
  firstRow.setAttribute('id', 'firstRow');
  table.appendChild(firstRow);

  if(firstDay === 7){
    for(let i = 0; i < 7; i++){
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'thisMonth');
      firstRow.appendChild(calDate);
      calDate.textContent = i+1;
      //we could create date objects at this point
    }
    rowCreateStart = 8;
  }
  else{
    let adjMonthLength = getDaysInMonth(now.getFullYear(), now.getMonth(), 0);
    for(let i = 0; i < firstDay; i++){
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'adjMonth');
      firstRow.appendChild(calDate);
      calDate.textContent = adjMonthLength - firstDay + 1 + i;
      //we could create date objects at this point
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
    }
    rowCreateStart = 7 - firstDay + 1;
  }

  return rowCreateStart;
}


function rowCreate (number){
  let state = false;

  for (let i = 0; i < 5; i++) {
    let calRow = document.createElement('tr');
    calRow.setAttribute('class', 'calRow');
    table.appendChild(calRow);
    for (let j = 0; j < 7; j++) {
      let date = number + 7 * i + j;
      let calDate = document.createElement('td');
      calDate.setAttribute('class', 'thisMonth');
      calDate.textContent = date;
      calRow.appendChild(calDate);
      //we could create date objects at this point
      if (date === getDaysInMonth(now.getFullYear(), now.getMonth() + 1, 0)) {
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

function genCalendar(){
  headCreate();
  let start = calFirstRow();
  rowCreate(start);
}

genCalendar();

document.getElementById('cal-month-year').appendChild(document.createTextNode(`${monthName} ${now.getFullYear()}`));
