// Extracted this as the details do not change. The key would probably come from config at some point.
const createGetRequest = {
    method: "GET",
    headers: {
        "X-Api-Key": "E6CyLZAZwxU0FySnN6w0IQ==Afe3GoBzy0YapmO8"
    }}

// This should be a dynamic part of the front end that listens to changes and updates itself as needed. 
// I don't know how to do that off the top of my head, but something to look into.
const resultsDiv = document.getElementById('resultsList');

// This is a way to wrap a call to an external endpoint. You can add error handling, retry functions, many good things.
const fetchRecipesFrom = async(endpoint)=>{
    return await fetch(endpoint, createGetRequest);
}

// This is the entrypoint. I've tried to keep it as isolated as possible so it only relies on code passed in.
// Imagine this request as a black box. there's one place to call in, and you check the inputs when they come in. If anything is wrong, fail immediately with a readable error message.
// I would recommend using an event or signal for when this is finished, then updating the front end when the results are available. That will make this code much more testable.
const submitRequest = async (searchString, searchMethod) => {    
    resultsDiv.innerHTML = "";

    // In javascript, this will check if the object is:
    // empty string, false, 0, null or undefined. 
    // If the value passed in is empty, we can return an error here.
    if (!searchString) {        
        resultsList.innerHTML = "Cannot return results without input.";
        return;
    }
    
    if (!searchMethod) {        
        resultsList.innerHTML = "Cannot return results without knowing the search type.";
        return;
    }    
    
    // Look into creating a separate json file in your solution where you put constant values like this endpoint, then refer to that file when you build endpoints. that makes this entire thing more resilient.
    const endpoint = "https://api.api-ninjas.com/v1/cocktail?" + searchMethod + "=" + searchString;

    try {        
        const response = await fetchRecipesFrom(endpoint);

        if (response.ok) {
            const finalResponse = await response.json();
            if (finalResponse.length === 0) {
                resultsList.innerHTML = "Sorry, your search returned no results!";
            }
            else {                                
                for (let recipe of finalResponse) {                    
                    var recipeCard = buildCocktailCardFromRecipe(recipe);
                    resultsDiv.appendChild(recipeCard);
                }

                function sizeDivs() {
                    let largestElementHeight = 0;
                    for (element of resultsDiv.getElementsByClassName('content')) {
                        let currentHeight = Math.ceil(element.clientHeight);
                        if (currentHeight > largestElementHeight) {
                            largestElementHeight = currentHeight;
                        }
                    }

                    let flipInstruction = resultsDiv.getElementsByClassName('flipInstruction');
                    let firstFlipInstruction = flipInstruction[0];

                    let allInnerDivs = resultsDiv.getElementsByClassName('innerDiv');
                    for (let element of allInnerDivs) {
                        element.style.height = largestElementHeight + firstFlipInstruction.clientHeight + 'px';
                    }
                }
                sizeDivs();
                window.onresize = sizeDivs;
            }
        }
    }
    catch (error) {
        console.log(error);
        throw new Error('Request failed!');
    };
}

// Takes a json object representing a recipe
// returns a HTML Div element representing a recipe card.
const buildCocktailCardFromRecipe = (recipe) => {

    const cardBack = createCocktailCardBack(recipe);
    const cardFront = createCocktailCardFront(recipe);
    
    const cardBody = createCocktailCardBody(cardFront, cardBack);

    const cocktailCard = createCocktailCard(cardBody);    
    
    return cocktailCard;    
}


const getIngredientList = (ingredients) => {
    let ingredientsList = "";
    const numberOfIngredients = ingredients.length;

    for (let ingredientNumber = 0; ingredientNumber < numberOfIngredients; ingredientNumber++) {
        breakLine = ingredientNumber === numberOfIngredients ? "" : "<br>";
        const currentIngredient = ingredients[ingredientNumber];
        ingredientsList += `•${currentIngredient}${breakLine}`;
    }

    return ingredientsList;
}

const createCocktailCard = (child)=>{
    const card = document.createElement('div');
    card.classList.add("cocktailCard");
    
    card.appendChild(child);

    function rotateCard() {
        child.classList.toggle("rotate");
    }
    
    card.addEventListener("click", rotateCard);

    return card;
}

const createCocktailCardBody = (cardFront, cardBack)=>{    
    const cardBody = document.createElement('div');

    cardBody.classList.add("innerDiv", "transformAnimation", "toResize");

    cardBody.appendChild(cardFront);
    cardBody.appendChild(cardBack);

    return cardBody;
}

const createCocktailCardFront = (recipe)=>{    
    const card = document.createElement('div');
    
    card.classList.add("front", "side");
    
    const flipInstructionFront = document.createElement('div');

    flipInstructionFront.classList.add("flipInstruction");
    flipInstructionFront.innerHTML = 'Flip for instructions';

    const content = document.createElement('div');

    content.classList.add("content");    

    const cocktailNameFront = document.createElement('h1');

    cocktailNameFront.innerHTML = `${recipe.name}`;    
    content.appendChild(cocktailNameFront);

    const subheadingFront = document.createElement('h2');
    subheadingFront.innerHTML = 'Ingredients';
    content.appendChild(subheadingFront);

    const cocktailIngredients = document.createElement('p');

    cocktailIngredients.classList.add("ingredients");
    cocktailIngredients.innerHTML = getIngredientList(recipe.ingredients);

    content.appendChild(cocktailIngredients);

    card.appendChild(content);
    card.appendChild(flipInstructionFront);

    return card;
}

const createCocktailCardBack = (recipe)=>{    
    const card = document.createElement('div');
    card.classList.add("back", "side");

    const backContent = document.createElement('div');
    backContent.classList.add("content");

    const cocktailNameBack = document.createElement('h1');
    cocktailNameBack.innerHTML = `${recipe.name}`;

    const subheadingBack = document.createElement('h2');
    subheadingBack.innerHTML = 'Instructions';

    const cocktailInstructions = document.createElement('p');
    cocktailInstructions.classList.add("instructions");
    cocktailInstructions.innerHTML = recipe.instructions;

    const flipInstructionBack = document.createElement('div');
    flipInstructionBack.classList.add("flipInstruction");
    flipInstructionBack.innerHTML = 'Flip for ingredients';

    card.appendChild(backContent);

    backContent.appendChild(cocktailNameBack);
    backContent.appendChild(subheadingBack);
    backContent.appendChild(cocktailInstructions);

    card.appendChild(flipInstructionBack);

    return card;
}