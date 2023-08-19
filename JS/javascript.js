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
                for (const number of finalResponse) {
                    let ingredientsList = '';
                    for (let i = 0; i < number.ingredients.length; i++) {
                        if (i === number.ingredients.length - 1) {
                            ingredientsList += `•${number.ingredients[i]}`;
                        } else {
                            ingredientsList += `•${number.ingredients[i]}<br>`;
                        }
                    }

                    let cocktailCard = document.createElement('div');
                    cocktailCard.classList.add("cocktailCard");

                    let cardInner = document.createElement('div');
                    cardInner.classList.add("innerDiv", "transformAnimation", "toResize");

                    let cardFront = document.createElement('div');
                    cardFront.classList.add("front", "side");

                    let frontContent = document.createElement('div');
                    frontContent.classList.add("content");

                    let cocktailNameFront = document.createElement('h1');
                    cocktailNameFront.innerHTML = `${number.name}`;
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
                    cocktailNameBack.innerHTML = `${number.name}`;
                    let subheadingBack = document.createElement('h2');
                    subheadingBack.innerHTML = 'Instructions';
                    let cocktailInstructions = document.createElement('p');
                    cocktailInstructions.classList.add("instructions");
                    cocktailInstructions.innerHTML = number.instructions;
                    let flipInstructionBack = document.createElement('div');
                    flipInstructionBack.classList.add("flipInstruction");
                    flipInstructionBack.innerHTML = 'Flip for ingredients';

                    resultsDiv.appendChild(cocktailCard);
                    cocktailCard.appendChild(cardInner);

                    cardInner.appendChild(cardFront);
                    cardInner.appendChild(cardBack);

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

                    function rotateCard() {
                        cardInner.classList.toggle("rotate");
                    }
                    cocktailCard.addEventListener("click", rotateCard);
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