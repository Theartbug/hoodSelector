'use strict';

//GLOBAL CONSTANTS
const UNform = document.getElementById('form');

//GLOBAL VARIABLES
let bestHood = [];
let userNameSaved = localStorage.getItem('userName');
let hoodResults = document.getElementById('hood_results');
let intro = document.getElementsByClassName('intro')[0];
let resultsPresent = (userNameSaved !==undefined && bestHood.length > 0)

//CHECK FOR LOCAL STORAGE ABILITY

function supportLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null
  } catch(e) {
    return false;
  }
}

//USERNAME SUBMISSION

function toSelector() {
  window.location.href = 'selector.html';
}

if (supportLocalStorage()) {
    if(UNform) {
      UNform.addEventListener('submit', function(event) {
      event.preventDefault();
      let userInput = document.getElementById('userName');
      localStorage.setItem('userName', userInput.value.toLowerCase());
      if (userInput.value == false) {
        alert('Please enter a name to proceed.');
      } else {
        toSelector();
      }
    })
  }
}

//CHECK FOR RESULTS




//ADD RESULTS TO HOMEPAGE

function bestHoodToHomePage () {
  let pEl = document.createElement('p');
  let imgEl = document.createElement('img');
  pEl.appendChild(imgEl);
  // imgEl.setAttribute('src',)

}

//CHANGE INTRO AFTER RETURNING

if (resultsPresent) {
  intro.textContent = "Hello " + userNameSaved + ", welcome back. Your previous results are below. To use the neighborhood selector again, type in a new name below.";
}
