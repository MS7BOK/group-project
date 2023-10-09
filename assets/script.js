const SPOONACULAR_ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
//const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch';
const searchBtn= document.getElementById("search-button")
const searchInput= document.getElementById("search-input")
const recipeContainer= document.querySelector(".recipes-api")
const recipes = "";
//const SPOONACULAR_API_KEY = "Yf6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b";
const SPOONACULAR_API_KEY = "f6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b";
const cardContainer = document.getElementById('card-container');

// Object to store selected filters for each filter section- this for checkboxes
const selectedFilters = {
    'filter-section-mobile-0': { color: [] },
    'filter-section-mobile-1': { category: [] },
    'filter-section-mobile-2': { size: [] }
};

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        "X-RapidAPI-Key": SPOONACULAR_API_KEY
    }
};

// SEARCH FUNCTIONS

async function searchRecipes(input) {
    //input = "burger";
    const dietOptions = "";
    const intoleranceOptions = "";
    const typeOptions = "";
    const cuisineOptions = "";
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + input + "&diet=" + dietOptions + "&intolerances=" + intoleranceOptions + "&number=10&type=" + typeOptions + "&cuisine=" + cuisineOptions;

    try {
	    const response = await fetch(url, options);
	    const data = await response.json();
	    console.log(data);
        return data;
        
    } catch (error) {
	    console.error(error);
    }
}

// Take Recipe ID, return object
async function returnRecipes(data, index) {
    //const RecipeId = "1087629";
    index = 3;
    const dataId = data.results[index].id;
    
    //const url= `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&ignorePantry=true&ranking=1`;
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${dataId}/information?includeNutrition=true';
    
    

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Failed to fetch the recipe.");
    }

    data = await response.json();
    console.log(recipeData);
    return recipeData
    //displayRecipe(data)
}
 /*function displayRecipe(data){

    for (let i = 0; i < data.length; i++) {
        
        const card= document.createElement("div")
        card.setAttribute("class", "card")
        const cardHeader= document.createElement("div")
        cardHeader.setAttribute("class", "card-header")
        const cardBody= document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        const img= document.createElement("img")
        img.setAttribute("src", data[i].image)
        const h2= document.createElement("h2")
        const anchor= document.createElement("a")
        anchor.setAttribute("href", "#")
        anchor.setAttribute("value", data[i].title)
        anchor.textContent=data[i].title
        h2.append(anchor)
        cardHeader.append(h2)
        cardBody.append(img)
        card.append(cardHeader, cardBody)
        recipeContainer.append(card)
    }*/
 

// Search Button Click Detection
searchBtn.addEventListener("click", ()=>{
    const userQuery= searchInput.value
    searchRecipes(userQuery)
})

// Function for click on recipe card



// ?????
recipeContainer.addEventListener("click", ()=>{
    const title= this.event.target.textContent
    console.log(title);
})
function displayResults(recipes) {
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${recipe.summary}</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
            <br>
            <button onclick="showDetails(${recipe.id})">Show More Details</button>
        `;
        resultsDiv.appendChild(recipeDiv);
    });
}

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
    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('img');
    cardImage.className = 'card-image';
    cardImage.src = recipe.image;
    cardImage.alt = 'Recipe Image';
    card.appendChild(cardImage);

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardTitle.textContent = recipe.title;

    const cardLink = document.createElement('a');
    cardLink.className = 'card-link';
    cardLink.href = recipe.sourceUrl;
    cardLink.textContent = 'View Recipe';
    cardLink.target = '_blank';

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardLink);
    card.appendChild(cardContent);

    return card;
}

// Fetch data from the API and display the cards
fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch', {
    headers: {
        "X-RapidAPI-Key": SPOONACULAR_API_KEY
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);

    if (data.results && Array.isArray(data.results)) {
        // Goes through the API results and create cards for each item
        data.results.forEach(recipe => {
            const card = createCard(recipe); 
            // Add the card to the card container
            cardContainer.appendChild(card);
        });
    } else {
        console.error('API response structure is not as expected:', data);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});


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


// Video search
$(document).ready(function(){
    var API_KEY = "AIzaSyDsy-oCrYD9qGw9tkzrSQ_Q1OX7QVU8oog";
    var video = '';
/*
    $("#form").submit(function (event) {
        event.preventDefault();
        //var search = $("#search").val();
        var search = 
        videoSearch(API_KEY, search, 1);
    });
*/

// NEED FUNCTION TO HIDE SEARCH RESULTS AND DISPLAY SELECTED RECIPE ALONG WITH SELECTED YOUTUBE VIDEO    
    
    function videoSearch(key, search, maxResults) {
        // Clear previous content
        $("#videos").empty();

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data) {
            console.log(data);
            data.items.forEach(item => {
                video = `
                <iframe width="250" height="250" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `;
                $("#videos").append(video);
            });
        });
    }
});
