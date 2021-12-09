
// ************store buttons in variables************
var randomButton = document.getElementById('random-btn');
var vodkaButton = document.getElementById('vodka-btn');
var tequilaButton = document.getElementById('tequila-btn');
var rumButton = document.getElementById('rum-btn');
var whiskeyButton = document.getElementById('whiskey-btn');
var scotchButton = document.getElementById('scotch-btn');
var ginButton = document.getElementById('gin-btn');
//add event listener with an anonymous function to accept an argument for the getAlcoholByType fx, this prevents from being called right
randomButton.addEventListener('click', randomCocktail );
vodkaButton.addEventListener('click', function(){ getByAlcoholType('vodka')});
tequilaButton.addEventListener('click', function(){getByAlcoholType('tequila')});
rumButton.addEventListener('click', function(){getByAlcoholType('rum')});
whiskeyButton.addEventListener('click', function(){getByAlcoholType('whiskey')});
scotchButton.addEventListener('click', function(){getByAlcoholType('scotch')});
ginButton.addEventListener('click', function(){getByAlcoholType('gin')});


//***************function to display the data for random cocktail******* */

function displayRandom(data) {
  let obj = data.drinks[0];
  console.log('DISPLAY:', obj.strDrink);
  //store article element into variable to add innerHTML at the end
  let randomArticle = document.getElementById('random-drink');
  //use string interpolation to store html & data in new variable
  let randomEl = `
<h2>${obj.strDrink}</h2>
<img src=${obj.strDrinkThumb}>
<ul>`;
//use for-loop to iterate over the 15 ingredients to display
  for (let index = 1; index < 16; index++) {

    if (obj[`strMeasure${index}`] == null || obj[`strIngredient${index}`] == null) {
      break;
    }
    ingredient = '<li>' + obj[`strMeasure${index}`] + ': ' + obj[`strIngredient${index}`] + '</li>';
    randomEl += ingredient;
  }
  //add ul to close the list
  randomEl += '</ul>';
  //add instructions
  randomEl += `<p>${obj.strInstructions}</p>`
  //insert html into the dom in the article section for random drinks
  randomArticle.innerHTML = randomEl;
}

//*******************fetch random cocktail */

function randomCocktail() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then(function (data) {
      console.log("random: ", data)
      //call a function that displays data that it receives as an argument
      displayRandom(data);
    })
    .catch((err) => console.log(err));
}

//randomCocktail();


// *********************fetch by ingredient (alchohol)******************************
//this only fetches drink name, thumbnail, and Id
//plan to use this fetch for when user wants to narrow their search by alchohol

function getByAlcoholType(input) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(`get alchohol by type: ${input}`, data.drinks)
      //call a function that displays data that it receives as an argument
      let drinkArray = data.drinks;
      console.log('drinkArray:', drinkArray);
      let typeSection = document.getElementById('alcohol-type');
      typeSection.innerHTML= drinkArray.map(function(drink){
        return `<h2>${drink.strDrink}</h2><img src=${drink.strDrinkThumb}><br/><button id=${drink.strDrink}>Ingredients</button>`
      }).join('');
      //for each time the array is mapped, i need to create a variable that stores the new button ID created, then add an event listener
     // drinkArray.forEach(function(drink, index){})
    })
    .catch((err) => console.log(err));
}

// getByAlcoholType('vodka');
// getByAlcoholType('tequila');
// getByAlcoholType('rum');
// getByAlcoholType('whiskey');
// getByAlcoholType('scotch');
// getByAlcoholType('gin');

//***************************fetch cocktail by with full details************ */

function getById(id) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log("get by id: ", data)
      //call a function that displays data that it receives as an argument
    })
    .catch((err) => console.log(err));
}

getById(11007);

//********************fetch by cocktail name (example: margarita) */

function getByCocktailName(name) {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log("get cocktail by name: ", data)
      //call a function that displays data that it receives as an argument
    })
    .catch((err) => console.log(err));
}

getByCocktailName('margarita');



//create a function that displays the data received on to the page



