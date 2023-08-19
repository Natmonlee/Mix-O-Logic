const createGetRequest = {
    method: "GET",
    headers: {
        "X-Api-Key": "E6CyLZAZwxU0FySnN6w0IQ==Afe3GoBzy0YapmO8"
    }}

const resultsDiv = document.getElementById('resultsList');

let fetchRecipesFrom = async(endpoint)=>{
    return await fetch(endpoint, createGetRequest);
}

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
                    var recipeCard = processRecipe(recipe);
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

const getIngredientList = (ingredients) => {
    let ingredientsList = "";
    const numberOfIngredients = ingredients.length;

    for (let ingredientNumber = 0; ingredientNumber < numberOfIngredients; ingredientNumber++) {
        const currentIngredient = ingredients[ingredientNumber];
        ingredientsList += `•${currentIngredient}`;
    }

    ingredientsList += `<br>`;
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

const createCoctailCardBody = (cardFront, cardBack)=>{    
    const cardBody = document.createElement('div');

    cardBody.classList.add("innerDiv", "transformAnimation", "toResize");

    cardBody.appendChild(cardFront);
    cardBody.appendChild(cardBack);

    return cardBody;
}

const processRecipe = (recipe) => {
    let ingredientsList = getIngredientList(recipe.ingredients);

    let cardFront = document.createElement('div');
    cardFront.classList.add("front", "side");

    let frontContent = document.createElement('div');
    frontContent.classList.add("content");

    let cocktailNameFront = document.createElement('h1');
    cocktailNameFront.innerHTML = `${recipe.name}`;
    let subheadingFront = document.createElement('h2');
    subheadingFront.innerHTML = 'Ingredients';
    let cocktailIngredients = document.createElement('p');
    cocktailIngredients.classList.add("ingredients");
    cocktailIngredients.innerHTML = ingredientsList;
    let flipInstructionFront = document.createElement('div');
    flipInstructionFront.classList.add("flipInstruction");
    flipInstructionFront.innerHTML = 'Flip for instructions';

    let cardBack = document.createElement('div');
    cardBack.classList.add("back", "side");

    let backContent = document.createElement('div');
    backContent.classList.add("content");

    let cocktailNameBack = document.createElement('h1');
    cocktailNameBack.innerHTML = `${recipe.name}`;
    let subheadingBack = document.createElement('h2');
    subheadingBack.innerHTML = 'Instructions';
    let cocktailInstructions = document.createElement('p');
    cocktailInstructions.classList.add("instructions");
    cocktailInstructions.innerHTML = recipe.instructions;
    let flipInstructionBack = document.createElement('div');
    flipInstructionBack.classList.add("flipInstruction");
    flipInstructionBack.innerHTML = 'Flip for ingredients';



    cardFront.appendChild(frontContent);
    cardBack.appendChild(backContent);

    frontContent.appendChild(cocktailNameFront);
    frontContent.appendChild(subheadingFront);
    frontContent.appendChild(cocktailIngredients);
    cardFront.appendChild(flipInstructionFront);

    backContent.appendChild(cocktailNameBack);
    backContent.appendChild(subheadingBack);
    backContent.appendChild(cocktailInstructions);
    cardBack.appendChild(flipInstructionBack);
    
    const cardBody = createCoctailCardBody(cardFront, cardBack);

    let cocktailCard = createCocktailCard(cardBody);
    
    
    return cocktailCard;    
}

// textInput.addEventListener("keypress", event => {
//     if (event.key === "Enter") {
//         getResult();
//     }
// })

// radioButtons.addEventListener("keypress", event => {
//     if (event.key === "Enter") {
//         getResult();
//     }
// })