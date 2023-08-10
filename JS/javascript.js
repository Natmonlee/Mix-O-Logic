const textInput = document.getElementById("inputBox");
const resultsDiv = document.getElementById('resultsList');
document.getElementById("inputBox").defaultValue = "banana";
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
                    let newDivInner = document.createElement('div');
                    let newDivBack = document.createElement('div');
                    let newDivFront = document.createElement('div');
                    let cocktailNameFront = document.createElement('h1');
                    let cocktailNameBack = document.createElement('h1');
                    let cocktailInstructions = document.createElement('p');
                    let cocktailIngredients = document.createElement('p');
                    resultsDiv.appendChild(newDiv);
                    newDiv.appendChild(newDivInner);
                    newDivInner.appendChild(newDivFront);
                    newDivInner.appendChild(newDivBack);
                    newDivFront.appendChild(cocktailNameFront);
                    newDivFront.appendChild(cocktailIngredients);
                    newDiv.classList.add("cocktailCard");
                    newDivInner.classList.add("innerDiv", "transformAnimation");
                    newDivFront.classList.add("front");
                    newDivBack.classList.add("back");
                    function rotateCard() {
                        newDivInner.classList.toggle("rotate");
                    }
                    newDiv.addEventListener("click", rotateCard);
                    cocktailNameFront.innerHTML = number.name;
                    cocktailNameFront.classList.add("cocktailName");
                    cocktailNameBack.innerHTML = number.name;
                    cocktailNameBack.classList.add("cocktailName");
                    newDivFront.appendChild(cocktailNameFront);
                    newDivBack.appendChild(cocktailNameBack);
                    cocktailInstructions.innerHTML = number.instructions;
                    cocktailInstructions.classList.add("instructions");
                    newDivFront.appendChild(cocktailNameFront);
                    newDivFront.appendChild(cocktailInstructions);
                    newDivBack.appendChild(cocktailNameBack);
                    newDivBack.appendChild(cocktailInstructions);
                    cocktailIngredients.innerHTML = ingredientsList;
                    cocktailIngredients.classList.add("ingredients");
                    newDivFront.appendChild(cocktailIngredients);
                    const makeDivFitText = (currentDiv, currentText) => {
                        let newDivHeight = Math.ceil(currentText.clientHeight);
                        currentDiv.style.height = newDivHeight + 'px';
                    };
                    makeDivFitText(newDivInner, newDivFront);
                }
                let largestElementHeight = 0;
                for (element of resultsDiv.getElementsByClassName('innerDiv')) {
                    let currentHeight = Math.ceil(element.clientHeight);
                    if (currentHeight > largestElementHeight) {
                        largestElementHeight = currentHeight;
                    }
                }
                const allInnerDivs = resultsDiv.getElementsByClassName('innerDiv');
                for (let element of allInnerDivs) {
                    element.style.height = largestElementHeight + 'px';
                }
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

