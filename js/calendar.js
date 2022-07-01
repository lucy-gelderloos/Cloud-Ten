'use strict';

let cloudCalendar; //The full calendar object that holds all month objects that the user has previously used
let cloudCarousel;
let cloudValue = 0; //Used to define the inMonth: 0 => basis; x∊[-n,-1] => anteMonth; x∊[1,+n] => postMonth

let basis = new Date();
let basisYear = basis.getFullYear(); //Defines the basis year, which helps with anteMonth and postMonth calculations
let basisMonth = basis.getMonth(); //Defines the basis month, which helps with anteMonth and postMonth calculations
let month; //the most recently created month object
let anteMonth = new Date(basisYear, basisMonth - 1);
let postMonth = new Date(basisYear, basisMonth + 1);
let table = [document.getElementById('anteTable'), document.getElementById('basisTable'), document.getElementById('postTable')]; //Used in calFirstRow and createRow

function loadCloudCalendar() {
  const userMonths = JSON.parse(localStorage.getItem('epiOpus')) || [];
  cloudCalendar = new Calendar(userMonths);
  console.log(cloudCalendar);
  console.log(cloudCalendar.userCal.length);

  if(cloudCalendar.userCal.length >= 3){
    cloudCarousel = carouselMonths(cloudValue);
    printCloudCarousel(cloudCarousel, 0);

    let inMonthIndex = findBasis() + cloudValue + 1;
    let inMonth = basisMonth + cloudValue + 1;

    let length = getDaysInMonth(2022, inMonth, 0);

    //let inMonthYear = cloudCalendar.userCal[inMonth].year;
    for (let i = 0; i < length; i++) {
      printOpus(2022, inMonthIndex, i + 1, 0);
    }
  }
  else{
    cloudCarousel = carouselMonths(cloudValue);
    printCloudCarousel(cloudCarousel, 1);
  }
}

loadCloudCalendar();


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
  let days;
  if(index === 1){
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }
  else{
    days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  }
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

      //Creating day objects and putting them in the 
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
      taskDiv.setAttribute('id', 'id' + (i -firstDay + 1) + monthObj.getFullYear() + (monthObj.getMonth()+1));
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
      calRow.appendChild(calDate);

      let dateDiv = document.createElement('div');
      dateDiv.textContent = date;
      calDate.appendChild(dateDiv);

      let taskDiv = document.createElement('div');
      taskDiv.setAttribute('id', 'id' + (date) + monthObj.getFullYear() + (monthObj.getMonth()+1));
      calDate.appendChild(taskDiv);
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


function genCalendar(monthObj, index, shift){
  loadMonth(monthObj);
  headCreate(monthObj, index);
  let start = calFirstRow(monthObj, index);
  rowCreate(start, monthObj, index);
  let curMonth = monthObj.getMonth() + 1;
  let curYear = monthObj.getFullYear();
  let length = cloudCalendar.userCal.length;

  if(length > 2){
    let sum = 0;
    for(let i = 0; i < length; i++){
      sum = 0;
      if((curMonth === cloudCalendar.userCal[i].month) && (curYear === cloudCalendar.userCal[i].year)){
        sum++;
        break;
      }
    }
    if(sum < 1){
      cloudCalendar.addMonth(month, shift);
    }
  }
  else{
    cloudCalendar.addMonth(month, shift);
  }
  //Once import is working, we can add this to print the event/tasks of all inMonth days
  //printOpus();
}

//Defines the anteMonth, inMonth, and postMonth that will be on the carousel based on the value, which is typically the cloudValue for calendar html. This value could be 0 for the preview. I could add another parameter to defined the number of calendars to create. 1 for preview, 3 for calendar page.
function carouselMonths(value){
  let anteMonth = new Date(basisYear, basisMonth + value - 1);
  let inMonth = new Date(basisYear, basisMonth + value);
  let postMonth = new Date(basisYear, basisMonth + value + 1);
  let array = [anteMonth, inMonth, postMonth];
  return array;
}

//Sends an array of Date objects into the genCalendar function cycle.
function printCloudCarousel(array, shift){

  for(let i = 0; i < array.length; i++){
    genCalendar(array[i], i, shift);
  }
}

//Deletes all of the children of each calendar
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

function printOpus (year, month, day, category){
  let inMonth = basisMonth + cloudValue + 1;
  let eventArray = cloudCalendar.userCal[month].allDay[day - 1].event;
  let taskArray = cloudCalendar.userCal[month].allDay[day - 1].task;
  let listSpace = document.getElementById('id' + day + year + inMonth);

  if(eventArray.length > 0 || taskArray.length > 0){
    while(listSpace.firstChild){
      listSpace.removeChild(listSpace.firstChild);
    }
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
      ulEl.appendChild(liEl);
      let input = document.createElement('input');
      liEl.appendChild(input);

      input.setAttribute('type', 'checkbox');
      input.setAttribute('name', 'task' + (i+1) + day);
      input.addEventListener('change',strikeThrough);

      let label = document.createElement('label');
      label.setAttribute('for', 'task' + (i+1) + day);
      label.textContent = taskArray[i];
      liEl.appendChild(label);

      //liEl.textContent = taskArray[i];
    }
    // Find all checkboxes in document
    checkBoxArray = document.querySelectorAll('input[type=checkbox]');
    
    // Find all labels in document
    labelArray = document.querySelectorAll('label');
    
    // Add event listener to each checkbox
    for(let i=0; i < checkBoxArray.length; i++){
      checkBoxArray[i].addEventListener('change', strikeThrough);
    }
  }
}

//Generates the initial cloudCarousel, which has the basis month as the inMonth


document.getElementById('newOpus').addEventListener('submit', function(event){
  event.preventDefault();
  document.getElementById('add-item-form').classList.add('hidden');
  let opus = event.target.title.value;
  let date = event.target.date.value;
  let type = event.target.itemType.value;
  let category = event.target.category.value;
  if(type === ''){type = 'task';}

  let [y, m, d] = date.split('-');

  let check = new Date(y, m-1, d);
  let inputDay = check.getDate();
  let inputMonth = check.getMonth();
  let inputYear = check.getFullYear();
  let inMonth = findBasis() + cloudValue + 1;

  if(type === 'task'){
    cloudCalendar.userCal[inMonth].allDay[inputDay - 1].task.push(opus);
  }
  else{
    cloudCalendar.userCal[inMonth].allDay[inputDay - 1].event.push(opus);
  }

  printOpus(inputYear, inMonth, inputDay, category);
  localStorage.setItem('epiOpus', JSON.stringify(cloudCalendar.userCal));
  let EPI = JSON.parse(localStorage.getItem('epiOpus'));
  console.log(EPI);
});

//Handles click event on the anteMonth element
document.getElementById('anteTable').addEventListener('click', function(event){
  event.preventDefault();
  cloudValue = cloudValue - 1;

  deleteCarousel();

  cloudCarousel = carouselMonths(cloudValue);
  printCloudCarousel(cloudCarousel, 0);

  let inMonthIndex = findBasis() + cloudValue + 1;
  let inMonth = basisMonth + cloudValue + 1;

  let length = getDaysInMonth(2022, inMonth, 0);

  //let inMonthYear = cloudCalendar.userCal[inMonth].year;
  for(let i = 0; i < length; i++){
    printOpus(2022, inMonthIndex , i+1, 0);
  }

  localStorage.setItem('epiOpus', JSON.stringify(cloudCalendar.userCal));
  let EPI = JSON.parse(localStorage.getItem('epiOpus'));
  console.log(EPI);
});

//Handles click event on the postMonth element
document.getElementById('postTable').addEventListener('click', function(event){
  event.preventDefault();
  cloudValue = cloudValue + 1;

  deleteCarousel();

  cloudCarousel = carouselMonths(cloudValue);
  printCloudCarousel(cloudCarousel, 1);
  let inMonthIndex = findBasis() + cloudValue + 1;
  let inMonth = basisMonth + cloudValue + 1;
  let length = getDaysInMonth(2022, inMonth, 0);

  //let inMonthYear = cloudCalendar.userCal[inMonth].year;
  for(let i = 0; i < length; i++){
    printOpus(2022, inMonthIndex, i+1, 0);
  }

  localStorage.setItem('epiOpus', JSON.stringify(cloudCalendar.userCal));
  let EPI = JSON.parse(localStorage.getItem('epiOpus'));
  console.log(EPI);

});

function findBasis(){
  let index;
  for(let i = 0; i < cloudCalendar.userCal.length; i++){

    if((cloudCalendar.userCal[i].month === basisMonth) && (cloudCalendar.userCal[i].year === basisYear)){
      index = i;
      break;
    }
  }
  return index;
}

localStorage.setItem('epiOpus', JSON.stringify(cloudCalendar.userCal));
let EPI = JSON.parse(localStorage.getItem('epiOpus'));
console.log(EPI);

if(document.getElementById('previewTable')){
  let now = new Date();
  let epiView = document.getElementById('previewTable');
  let title = document.createElement('caption');
  title.textContent = now.toLocaleString('default', {month: 'long'}) + ', ' + now.getFullYear();
  epiView.appendChild(title);
  let headRow = document.createElement('tr');
  headRow.setAttribute('class', 'calHead');
  epiView.appendChild(headRow);
  let days = ['Friday', 'Saturday', 'Sunday'];
  for(let i = 0; i < days.length; i++){
    let headEl = document.createElement('td');
    headEl.setAttribute('class', 'headEl');
    headRow.appendChild(headEl);
    headEl.textContent = days[i];
  }
  let firstRow = document.createElement('tr');
  firstRow.setAttribute('class', 'calRow');
  epiView.appendChild(firstRow);
  for(let i = 0; i < 3; i++){
    let calDate = document.createElement('td');
    calDate.setAttribute('class', 'thisMonth');
    firstRow.appendChild(calDate);
    calDate.textContent = i+1;
    let div = document.createElement('div');
    div.setAttribute('id', 'id'+(i+1)+'20227');
    calDate.appendChild(div);
    //Creating day objects and putting them in the 
    //month.addDay();
  }
}

//document.getElementById('cal-month-year').appendChild(document.createTextNode(`${monthName} ${now.getFullYear()}`));
