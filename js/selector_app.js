'use strict';

// CONSTANTS
const desiredNamesArray = ['walkable', 'transit', 'single_homes', 'apartments', 'hikeable_parks', 'activity_parks', 'nightlife', 'bikeable', 'unique_food', 'arts', 'traffic_ok', 'affordable', 'not_sketchy'];
const hoodForm = document.getElementById('hood_form');
const formDesiredChecks = document.querySelectorAll('input[type=checkbox]');
const hoodsInfo = {
  "inner_east": {
    "imgPath" : "../img/inner_east.png",
    "hasDesires" : [true, true, true, true, true, true, true, true, true, true, false, false, true],
    "bio" : "This large area includes both North and South East. If you’re looking for urban living, historic homes, tree-lined streets, city parks, and street shopping instead of malls, you’ll want to consider Northeast Portland. The southeast has more of a middle-class feel, with charming old homes, packed coffeehouses and offbeat clothing stores. Some say that Southeast is where the “real” people live."
  },
  "outer_east": {
    "imgPath" : "../img/outer_east.png",
    "hasDesires" : [false, true, true, false, true, true, false, false, false, false, true, true, false],
    "bio" : "This section homes ~25% of Portland population. The area includes rich nature areas such as Powell Butte Nature park and Kelly Butte Natural Area. This area of Portland is much more affordable but often not considered part of 'Portland Proper'. There are multiple major roadways for commuting into town, though may require a car."
  },
  "northwest": {
    "imgPath" : "../img/northwest.png",
    "hasDesires" : [false, false, true, false, true, false, false, false, false, false, false, false, true],
    "bio" : "A majority of this area includes the Forest Park neighborhood; it combines rolling green pastures, views east, and west, and under a 20-minute drive to downtown. The Forest Park neighborhood residents have easy access to the City of Portland’s 5,000 plus acre Forest Park. Large single-family homes line the hills, owned by doctors, managers, small business owners, lawyers, and VPs."
  },
  "north": {
    "imgPath" : "../img/north.png",
    "hasDesires" : [false, true, true, false, true, true, false, true, true, true, false, true, true],
    "bio" : "North Portland is a diverse mixture of residential, commercial, and industrial areas. It includes the Portland International Raceway, the University of Portland, and massive cargo facilities of the Port of Portland. Slang-names for it include “NoPo” and “the Fifth Quadrant”. North Portland is connected to the industrial area of Northwest Portland by the St. Johns Bridge."
  },
  "southwest": {
    "imgPath" : "../img/southwest.png",
    "hasDesires" : [false, true, true, false, true, true, false, true, false, false, true, false, true],
    "bio" : "A back-woodsy feel within 30 minutes drive to downtown area. Single-family suburban homes. You will find large nature areas such as River View Natural Area and Tryon Creek State Natural Area. For the last few years, the area’s riverfront has been converting from heavy industry to residential development."
  },
  "central": {
    "imgPath" : "../img/central.png",
    "hasDesires" : [true, true, false, true, false, true, true, false, true, true, false, false, false],
    "bio" : "Portland’s compact, walkable downtown offers easy access to great food, green spaces, and shopping. Browse the city’s most diverse mix of retail brands, see a show and grab a bite at a food cart or fine restaurant. The long green lawns, riverside paths and fountains of Waterfront Park are a magnet for joggers, cyclists and Frisbee flingers, but also undesirables. Don't bother owning a car if you plan to live here."
  },
  "sur_cities": {
    "imgPath" : "../img/sur_cities.png",
    "hasDesires" : [false, false, true, false, true, true, false, false, false, false, true, true, true],
    "bio" : "Perhaps you want nothing to do with the bustle and expense of the city, but would like to live within a managable distance. Towns such as Beaverton, Vancouver, Tigard, Gresham, and Milwaukie are excellent choices, especially if you do not mind long commute times. These will have affordable homes and rent, each with their own flavor of suburbia."
  }
};

// GLOBAL VARIABLES
let userNameSaved = localStorage.getItem('userName');
let userSelectedDesires = [];
let userSubmitedDesires = [];
let hoodScores = {};
let savedUsers = [];

// DESIRE SELECTION
(function selectDesires () {
  for (let i = 0; i < desiredNamesArray.length; i++) {
    document.getElementById(desiredNamesArray[i] + 'Img').addEventListener('click', imagePick);
  }
})();

function imagePick () { //toggles images
  let select = document.getElementById(this.alt); //selects the checkbox that is hidden
    if (this.className === 'inactive') {
      this.className = 'active';
      select.checked = true; //checks the checkbox
      userSelectedDesires.push(select.value); //saves user selection into array
      let imgLabel = this.nextElementSibling;
      imgLabel.className = 'selected';
    } else {
      this.className = 'inactive';
      select.checked = false; //unchecks the checkbox
      let imgLabel = this.nextElementSibling;
      imgLabel.className = 'not_selected';
      for (let i = 0; i< userSelectedDesires.length; i++) {
        if(select.value === userSelectedDesires[i]) {
          userSelectedDesires.splice(i,1);
        }
      } //for: removes user deselection out of array
    } // else

    localStorage.setItem('userSelectedDesires',JSON.stringify(userSelectedDesires)); // place selections in storage

  } // imgPick

//SAVE SELECTED ITEMS ON WINDOW REFRESH

window.onload = function () {
  let inStorageArray = localStorage.getItem('userSelectedDesires')
  if (inStorageArray != '' && inStorageArray != null) {
    userSelectedDesires = JSON.parse(inStorageArray);
    for (let i = 0; i < userSelectedDesires.length; i++) {
      document.getElementById(userSelectedDesires[i] + 'Img').className = 'active'; //for img
      document.getElementById(userSelectedDesires[i] + 'Img').nextElementSibling.className = 'selected'; //for span
      document.getElementById(userSelectedDesires[i]).checked = true; //for checkbox
    } // for
  } // if
} //window onload

//ADD DESIRES TO ARRAY

function createSelectedDesiresArray () {
  userSubmitedDesires = [];
  for (let i = 0; i < formDesiredChecks.length; i++) {
    if (formDesiredChecks[i].checked === true) {
      userSubmitedDesires.push(true);
    } else {
      userSubmitedDesires.push(false);
    }
  }
}

//COMPARE DESIRES TO HOODS AND SCORE BEST MATCHES

function compareSelectionsToHoods () {
  for (let hoodname in hoodsInfo){
    let hoodProps = hoodsInfo[hoodname];
    hoodScores[hoodname] = scoreHood (hoodProps.hasDesires, userSubmitedDesires);
  } //loop through each hood desire array
} // function end

function scoreHood (a1, a2) {
  let score = 0;
  for (let i = 0; i < a1.length; i++) {
      if (a1[i] === a2[i]) {
        score++;
      }
  }
    return score;
} // scores the number of matching booleans in each array

// RANK SCORED HOODS, SHUFFLE IF NEEDED, SELECT BEST

function findBestMatch () {
  let keys = Object.keys(hoodScores),
  largest = Math.max.apply(null, keys.map(x => hoodScores[x])), //selects largest value
  result = keys.reduce((result, key) => { // places names of hoods into an array if they match highest score
    if (hoodScores[key] === largest) {
       result.push(key);
     }
     return result;
   }, []);
   if (result.length > 1) { //if multiple best matches, shuffle them (Fisher-Yates)
     for (let i = result.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
    }
  return result[0];
}

//USER CONSTRUCTOR, ADD BEST HOOD

function UserConstructor(userName, matchedHood) {
  this.userName = userName;
  this.matchedHood = matchedHood;
  savedUsers.push(this);
}

function buildUser (userName, matchedHood) {
  let user = new UserConstructor(userName, matchedHood);
}

//FORM SUBMISSION

function hoodFormSubmit(event) {
  event.preventDefault();
  createSelectedDesiresArray ();
  compareSelectionsToHoods();

  buildUser (userNameSaved, findBestMatch());

  localStorage.setItem('savedUsers', JSON.stringify(savedUsers)); // add to local storage

  userSelectedDesires = []; //clean slate
  localStorage.setItem('userSelectedDesires', userSelectedDesires); //clean slate

  toResults();
}

function toResults() {
  window.location.href = 'results.html';
}

hoodForm.addEventListener('submit', hoodFormSubmit);
