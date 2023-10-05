const SPOONACULAR_ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
const SPOONACULAR_API_KEY = "Yf6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b";
const cardContainer = document.getElementById('card-container');

// Object to store selected filters for each filter section- this for checkboxes
const selectedFilters = {
    'filter-section-mobile-0': { color: [] },
    'filter-section-mobile-1': { category: [] },
    'filter-section-mobile-2': { size: [] }
};

function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const url = `${SPOONACULAR_ENDPOINT}?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=true&number=10`;

    fetch(url, {
        headers: {
            "X-RapidAPI-Key": SPOONACULAR_API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => displayResults(data.results))
    .catch(error => console.error('Error fetching data:', error));
}

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
