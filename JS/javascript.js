const textInput = document.getElementById("inputBox");
const resultsDiv = document.getElementById('resultsList');
document.getElementById("inputBox").defaultValue = "banana";
let flipInstructionHeight;

const getResult = async () => {
    resultsDiv.innerHTML = "";
    const textInputValue = inputBox.value;
    const searchMethod = document.querySelector("input[name='cocktail']:checked").value;
    const endpoint = "https://api.api-ninjas.com/v1/cocktail?" + searchMethod + "=" + textInputValue;
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "X-Api-Key": "E6CyLZAZwxU0FySnN6w0IQ==Afe3GoBzy0YapmO8"
            }
        });
        if (response.ok) {
            const finalResponse = await response.json();
            if (finalResponse.length === 0) {
                resultsList.innerHTML = "Sorry, your search returned no results!";
            }
            else {
                inputBox.value = '';
                for (const number of finalResponse) {
                    let ingredientsList = '';
                    for (let i = 0; i < number.ingredients.length; i++) {
                        if (i === number.ingredients.length - 1) {
                            ingredientsList += `•${number.ingredients[i]}`;
                        } else {
                            ingredientsList += `•${number.ingredients[i]} <br>`;
                        }
                    }
                    
                                     
                    let newDiv = document.createElement('div');
                    newDiv.classList.add("cocktailCard");

                    let newDivInner = document.createElement('div');
                    newDivInner.classList.add("innerDiv", "transformAnimation", "toResize");

                    let newDivFront = document.createElement('div');
                    newDivFront.classList.add("front", "side");
                    
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

                    let newDivBack = document.createElement('div');
                    newDivBack.classList.add("back", "side");

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
                  
                    resultsDiv.appendChild(newDiv);
                    newDiv.appendChild(newDivInner);

                    newDivInner.appendChild(newDivFront);
                    newDivInner.appendChild(newDivBack);

                    newDivFront.appendChild(frontContent);
                    newDivBack.appendChild(backContent);

                    frontContent.appendChild(cocktailNameFront);
                    frontContent.appendChild(subheadingFront);
                    frontContent.appendChild(cocktailIngredients);
                    newDivFront.appendChild(flipInstructionFront);
                    
                    backContent.appendChild(cocktailNameBack);
                    backContent.appendChild(subheadingBack);
                    backContent.appendChild(cocktailInstructions);
                    newDivBack.appendChild(flipInstructionBack);
                    
                    
                    function rotateCard() {
                        newDivInner.classList.toggle("rotate");
                    }
                    newDiv.addEventListener("click", rotateCard);
                   
              
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
textInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        getResult();
    }
})
radioButtons.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        getResult();
    }
})
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", getResult);

