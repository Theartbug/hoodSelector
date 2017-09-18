'use strict';

//GLOBAL CONSTANTS
const UNform = document.getElementById('form');
const hoodsInfo = {
  "inner_east": {
    "name" : "Inner East",
    "imgPath" : "img/inner_east.png",
    "hasDesires" : [true, true, true, true, true, true, true, true, true, true, false, false, true],
    "bio" : "This large area includes both North and South East. If you’re looking for urban living, historic homes, tree-lined streets, city parks, and street shopping instead of malls, you’ll want to consider Northeast Portland. The southeast has more of a middle-class feel, with charming old homes, packed coffeehouses and offbeat clothing stores. Some say that Southeast is where the “real” people live."
  },
  "outer_east": {
    "name" : "Outer East",
    "imgPath" : "img/outer_east.png",
    "hasDesires" : [false, true, true, false, true, true, false, false, false, false, true, true, false],
    "bio" : "This section homes ~25% of Portland population. The area includes rich nature areas such as Powell Butte Nature park and Kelly Butte Natural Area. This area of Portland is much more affordable but often not considered part of 'Portland Proper'. There are multiple major roadways for commuting into town, though may require a car."
  },
  "northwest": {
    "name" : "Northwest",
    "imgPath" : "img/northwest.png",
    "hasDesires" : [false, false, true, false, true, false, false, false, false, false, false, false, true],
    "bio" : "A majority of this area includes the Forest Park neighborhood; it combines rolling green pastures, views east, and west, and under a 20-minute drive to downtown. The Forest Park neighborhood residents have easy access to the City of Portland’s 5,000 plus acre Forest Park. Large single-family homes line the hills, owned by doctors, managers, small business owners, lawyers, and VPs."
  },
  "north": {
    "name" : "North",
    "imgPath" : "img/north.png",
    "hasDesires" : [false, true, true, false, true, true, false, true, true, true, false, true, true],
    "bio" : "North Portland is a diverse mixture of residential, commercial, and industrial areas. It includes the Portland International Raceway, the University of Portland, and massive cargo facilities of the Port of Portland. Slang-names for it include “NoPo” and “the Fifth Quadrant”. North Portland is connected to the industrial area of Northwest Portland by the St. Johns Bridge."
  },
  "southwest": {
    "name" : "Southwest",
    "imgPath" : "img/southwest.png",
    "hasDesires" : [false, true, true, false, true, true, false, true, false, false, true, false, true],
    "bio" : "A back-woodsy feel within 30 minutes drive to downtown area. Single-family suburban homes. You will find large nature areas such as River View Natural Area and Tryon Creek State Natural Area. For the last few years, the area’s riverfront has been converting from heavy industry to residential development."
  },
  "central": {
    "name" : "Central Downtown",
    "imgPath" : "img/central.png",
    "hasDesires" : [true, true, false, true, false, true, true, false, true, true, false, false, false],
    "bio" : "Portland’s compact, walkable downtown offers easy access to great food, green spaces, and shopping. Browse the city’s most diverse mix of retail brands, see a show and grab a bite at a food cart or fine restaurant. The long green lawns, riverside paths and fountains of Waterfront Park are a magnet for joggers, cyclists and Frisbee flingers, but also undesirables. Don't bother owning a car if you plan to live here."
  },
  "sur_cities": {
    "name" : "Surrounding Cities",
    "imgPath" : "img/sur_cities.png",
    "hasDesires" : [false, false, true, false, true, true, false, false, false, false, true, true, true],
    "bio" : "Perhaps you want nothing to do with the bustle and expense of the city, but would like to live within a managable distance. Towns such as Beaverton, Vancouver, Tigard, Gresham, and Milwaukie are excellent choices, especially if you do not mind long commute times. These will have affordable homes and rent, each with their own flavor of suburbia."
  }
};

//GLOBAL VARIABLES
let userNameSaved = localStorage.getItem('userName');
let intro = document.getElementsByClassName('intro')[0];
let savedUsers = JSON.parse(localStorage.getItem('savedUsers'));
let nameEntry = document.getElementsByClassName('nameEntry')[0];

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

//SHOW RESULTS

function showResults () {
  if (savedUsers != '' && savedUsers != 'null' && savedUsers !='undefined') {
    for (let a in hoodsInfo) {
      for (let b in savedUsers) {
        if (a === savedUsers[b].matchedHood) {
          document.getElementById('hood_results').textContent = hoodsInfo[a].bio;
          document.getElementById('result_img').setAttribute('src', hoodsInfo[a].imgPath);
          document.getElementById('hood_name').textContent = hoodsInfo[a].name;

          break;
        }
      }
    }
  }
}

showResults();


//CHANGE INTRO AFTER RETURNING

if (savedUsers) {
  intro.textContent = "Hello " + userNameSaved + ", welcome back. Your previous results are below. To use the neighborhood selector again, type in a new name below.";
  nameEntry.textContent = "Enter Your Name To Try Again:";
}
