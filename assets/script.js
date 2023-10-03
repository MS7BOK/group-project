const SPOONACULAR_ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
const SPOONACULAR_API_KEY = "Yf6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b";

function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const url = `${SPOONACULAR_ENDPOINT}?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=true&number=10`;

    fetch(url, {
        headers: {
            "X-RapidAPI-Key": SPOONACULAR_API_KEY // Ensure you send the API key in headers if required by the API
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
    // Display your logic here
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


const cardContainer = document.getElementById('card-container');

// Fetch data from the API
fetch('API_ENDPOINT_HERE')
    .then(response => response.json())
    .then(data => {
        // Goes through the API results and create cards for each item
        data.forEach(recipe => {
            // Create a new card element
            const card = document.createElement('div');
            card.className = 'card';

            // Set the card image
            const cardImage = document.createElement('img');
            cardImage.className = 'card-image';
            cardImage.src = recipe.image; // Assuming the API response has an 'image' 
            cardImage.alt = 'Recipe Image';
            card.appendChild(cardImage);

            // Set the card content
            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';
            const cardTitle = document.createElement('h2');
            cardTitle.className = 'card-title';
            cardTitle.textContent = recipe.title; // Assuming the API response has a 'title' 
            const cardLink = document.createElement('a');
            cardLink.className = 'card-link';
            cardLink.href = recipe.url; // Assuming the API response has a 'url' 
            cardLink.textContent = 'View Recipe';
            cardLink.target = '_blank';

            // Add elements to the card content
            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardLink);

            // Add card content to the card
            card.appendChild(cardContent);

            // Add the card to the card container
            cardContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
