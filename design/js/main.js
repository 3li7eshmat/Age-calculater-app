let form = document.querySelector('form');

let day = document.querySelector('.day');
let month = document.querySelector('.mon');
let year = document.querySelector('.year');

let dayInput = document.querySelector('.day input');
let monthInput = document.querySelector('.mon input');
let yearInput = document.querySelector('.year input');

let daySpan = document.querySelector('.day span');
let monthSpan = document.querySelector('.mon span');
let yearSpan = document.querySelector('.year span');

let button = document.querySelector('.btn');

let resultDay = document.querySelector('.result .days span');
let resultMonth = document.querySelector('.result .months span');
let resultYear = document.querySelector('.result .years span');

let resultSpans = document.querySelectorAll('.result span');

let dayValid = false;
let monthValid = false;
let yearValid = false;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let currentDay = new Date().getDate();


form.onsubmit = function (e) {

    yearVAlidation();
    dateValidation();
    monthValidation();
    dayValidation();
    emptyValidation(e);

    e.preventDefault();
    getResult();

    moveButton();
    animateNumbers();

}

function emptyValidation (e) {

    if (dayValid === false || monthValid === false || yearValid === false) {
        e.preventDefault();

    }
}

function dayValidation() {

    if (dayInput.value === '') {

        day.classList.add('error');
        dayValid = false;
        daySpan.textContent = "This field is required"

    } else if (dayInput.value < 1 || dayInput.value > 31) {

        dayValid = false;
        day.classList.add('error');
        daySpan.textContent = "Must be a valid day"

    }

} 

function monthValidation() {

    if (!monthInput.value) {

        month.classList.add('error');
        monthValid = false;
        monthSpan.textContent = "This field is required"

    } else if (monthInput.value < 1 || monthInput.value > 12) {

        monthValid = false;
        month.classList.add('error');
        monthSpan.textContent = "Must be a valid month"

    } else {
        monthValid = true;
        month.classList.remove('error');
    }

}

function yearVAlidation() {

    if (!yearInput.value) {

        year.classList.add('error');
        yearValid = false;
        yearSpan.textContent = "This field is required"

    }  else if (yearInput.value > currentYear) {

        yearValid = false;
        year.classList.add('error');
        yearSpan.textContent = "Must be in the past"

    } else if (yearInput.value == currentYear && monthInput.value > currentMonth + 1) {

        yearValid = false;
        year.classList.add('error');
        yearSpan.textContent = "Must be in the past";

    } else if (yearInput.value == currentYear && monthInput.value == currentMonth + 1 && dayInput.value > currentDay) {

        yearValid = false;
        year.classList.add('error');
        yearSpan.textContent = "Must be in the past"

    } else {

        yearValid = true;
        year.classList.remove('error')
    }
}

function dateValidation() {

    if  ( (monthInput.value === '4' || monthInput.value === '6' || monthInput.value === '9' || monthInput.value === '11' ) && dayInput.value === '31') {

        day.classList.add('error');
        dayValid = false;
        daySpan.textContent = "Must be a valid date"

    } else if (monthInput.value === '2' && dayInput.value > 29) {

        day.classList.add('error');
        dayValid = false;
        daySpan.textContent = "Must be a valid date"

    } else {

            dayValid = true;
            day.classList.remove('error');
    }

}

function getResult() {
    
    let years = currentYear - Number(yearInput.value) - 1;
    let months = currentMonth + 12 - Number(monthInput.value);
    let days = 30 - Number(dayInput.value) + currentDay;

    if ((dayValid && monthValid && yearValid) === true) {

        if (months >= 12) {

            years += 1;
            months -= 12; 
        }
    
        if (days >= 30) {
            
            months += 1;
            days -= 30;
        }

        if (months === 11 && days === 30) {
            years += 1;
            months = 0;
            days = 0;
        }
    
        dayInput.value = '';
        monthInput.value = '';
        yearInput.value = '';
        
        // resultDay.textContent = days;
        // resultMonth.textContent = months;
        // resultYear.textContent = years;

        resultDay.dataset.num = days;
        resultMonth.dataset.num = months;
        resultYear.dataset.num = years;

        resultDay.textContent = 0;
        resultMonth.textContent = 0;
        resultYear.textContent = 0;
    }

}

function moveButton () {

    if (day.classList.contains('error') || month.classList.contains('error') || year.classList.contains('error')) {

        button.classList.add('error');

    } else {
        button.classList.remove('error');
    }
}

function animateNumbers() {
    if ((dayValid && monthValid && yearValid) === true) {

        resultSpans.forEach((span) => {

            let y = setInterval(() => {
                    
                if (span.innerHTML == span.dataset.num) {
                    clearInterval(y);
                } else {
                    span.innerHTML++
                }
    
            }, 50);
        })
    }
    
}


