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
    // your display logic here
}
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
