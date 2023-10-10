const SPOONACULAR_ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
//const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch';
const searchBtn= document.getElementById("search-button")
const searchInput= document.getElementById("search-input")
const recipeContainer= document.querySelector(".recipes-api")
const recipes = "";
let recipeInfo = JSON.parse(localStorage.getItem("recipeInfo"));

//const SPOONACULAR_API_KEY = "Yf6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b";
const SPOONACULAR_API_KEY = "f6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b";
const cardContainer = document.getElementById('card-container');
/*
// Object to store selected filters for each filter section- this for checkboxes
const selectedFilters = {
    'filter-section-mobile-0': { color: [] },
    'filter-section-mobile-1': { category: [] },
    'filter-section-mobile-2': { size: [] }
};
*/
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        "X-RapidAPI-Key": SPOONACULAR_API_KEY
    }
};

// SEARCH FUNCTIONS

async function searchRecipes(input) {
    localStorage.clear();
    recipeInfo = localStorage.getItem("recipeInfo")
    // Filtering Variables
    const dietOptions = "";
    const intoleranceOptions = "";
    const typeOptions = "";
    const cuisineOptions = "";
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + input + "&diet=" + dietOptions + "&intolerances=" + intoleranceOptions + "&number=10&type=" + typeOptions + "&cuisine=" + cuisineOptions;

    try {
	    const response = await fetch(url, options);
	    const data = await response.json();
        localStorage.setItem('recipeInfo', JSON.stringify(data));
        recipeInfo = JSON.parse(localStorage.getItem('recipeInfo'))
        displayResults();

    } catch (error) {
	    console.error(error);
    }
}

// Take Recipe ID, return object
async function returnRecipes(data, index) {
    const dataId = data.results[index].id;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + dataId + "/information?includeNutrition=true";
    
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Failed to fetch the recipe.");
    }

    recipeData = await response.json();
    console.log(recipeData);
    localStorage.setItem('recipeData', JSON.stringify(recipeData))
    return recipeData
    //displayRecipe(data)
}
 
// Search Button Click Detection
searchBtn.addEventListener("click", ()=>{
    const userQuery= searchInput.value;
    searchRecipes(userQuery);
})


// Function to load selected filters from local storage
function loadSelectedFilters() {
    const storedFilters = JSON.parse(localStorage.getItem('selectedFilters'));
    if (storedFilters) {
        Object.assign(selectedFilters, storedFilters);
    }
}

// Function to save selected filters to local storage
function saveSelectedFilters() {
    localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
}

// Load selected filters when the page loads
loadSelectedFilters();

// Function to handle checkbox change events
function handleCheckboxChange(sectionId, filterType, checkbox) {
    const filterValue = checkbox.value;
    const isChecked = checkbox.checked;

    if (isChecked) {
        selectedFilters[sectionId][filterType].push(filterValue);
    } else {
        const index = selectedFilters[sectionId][filterType].indexOf(filterValue);
        if (index !== -1) {
            selectedFilters[sectionId][filterType].splice(index, 1);
        }
    }

    saveSelectedFilters();

    // You can call constructFilters here if needed
    constructFilters(sectionId, filterType);
}

// Function to construct filters based on selected checkboxes
function constructFilters(sectionId, filterType) {
    const selectedFilterValues = selectedFilters[sectionId][filterType];
    const queryOptions = selectedFilterValues.join(',');

    // Now you can use the queryOptions in your search URL or wherever you need it
    console.log(`Selected ${filterType}: ${queryOptions}`);
}

// Function to create a card element based on recipe data
function createCard(recipe) {

    // Card Element
    const card = document.createElement('a');
    card.className = 'flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 card';
    card.href = './index2.html'

    // Image Element
    const cardImage = document.createElement('img');
    cardImage.className = 'card-image object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg';
    cardImage.src = "https://spoonacular.com/recipeImages/" + recipe.image;
    cardImage.alt = 'Recipe Image';
    card.appendChild(cardImage);

    // Card Content Div
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flex flex-col justify-between p-4 leading-normal'

    // Card Header Element
    const cardTitle = document.createElement('h2');
    cardTitle.className = 'mb-2 text-2xl font-bold tracking-tight text-gray-900';
    cardTitle.textContent = recipe.title;

    // Card Recipe Link Element
    const cardLink = document.createElement('a');
    cardLink.className = 'card-link';
    cardLink.href = recipe.sourceUrl;
    cardLink.textContent = 'View Recipe';
    cardLink.target = '_blank';

    // Card Assembly
    cardDiv.appendChild(cardTitle);
    cardDiv.appendChild(cardLink);
    card.appendChild(cardDiv);

    return card;
}


function displayResults() {
    cardContainer.innerHTML = "";
    console.log(recipeInfo.results);
    if (recipeInfo.results && Array.isArray(recipeInfo.results)) {
        // Goes through the API results and create cards for each item
        recipeInfo.results.forEach(recipe => {
            const card = createCard(recipe); 
            // Add the card to the card container
            cardContainer.appendChild(card);
        });

        // Function for click on recipe card
        const cards = document.querySelectorAll('.card');

        cards.forEach((card, index) => {
            console.log("setting event listener " + index);
            card.addEventListener('click', function() {
                console.log("Clicked");
                localStorage.setItem('recipeIndex', index);
                returnRecipes(recipeInfo, index);
            })
        })
}}








/*
// Attach event listeners to all sets of checkboxes
const filterSections = ['filter-section-mobile-0', 'filter-section-mobile-1', 'filter-section-mobile-2'];
const filterTypes = ['color', 'category', 'size'];

filterSections.forEach((sectionId, index) => {
    const filterType = filterTypes[index];
    const checkboxes = document.querySelectorAll(`#${sectionId} input[name="${filterType}[]"]`);
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            handleCheckboxChange(sectionId, filterType, checkbox);
        });
    });
});

*/
