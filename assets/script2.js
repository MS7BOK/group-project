function __init__() {
    const recipeInfo = JSON.parse(localStorage.getItem('recipeInfo'));
const recipeIndex = localStorage.getItem('recipeIndex');
const ingredientListEl = $("#ingredient-list");
const nutrientListEl = $("#nutrient-list");
const recipeTitle = $("#recipe-title")
const recipeDescription = $("#recipe-description")


console.log(recipeInfo);


async function returnRecipes(data, index) {
    const dataId = data.results[index].id;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + dataId + "/information?includeNutrition=true";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            "X-RapidAPI-Key": "f6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b"
        }
    };
    
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Failed to fetch the recipe.");
    }

    recipeData = await response.json();
    console.log(recipeData);
    localStorage.setItem('recipeData', JSON.stringify(recipeData))
    pageRender(recipeData)
    //displayRecipe(data)
}
 
returnRecipes(recipeInfo, recipeIndex)

function pageRender(recipeData) {
    // Title and Description
recipeTitle.text(recipeData.title);
recipeDescription.html(recipeData.summary);

// Ingredient List
const ingredients = recipeData.extendedIngredients;
ingredients.forEach(ingredient => {
    const string = ingredient.name + "   " + ingredient.amount + ingredient.unit;

    const li = $("<li>" + string + "</li>");
    li.textContent = string;
    ingredientListEl.append(li);
});


// Nutrients List
const nutrients = recipeData.nutrition.nutrients
nutrients.forEach(nutrient => {
    const string = nutrient.name + "   " + nutrient.amount + nutrient.unit + " Percentage of Daily Intake: " + nutrient.percentOfDailyNeeds + "%";

    const li = $("<li>" + string + "</li>");
    li.textContent = string;
    nutrientListEl.append(li);
});


// Video Function
var API_KEY = "AIzaSyDsy-oCrYD9qGw9tkzrSQ_Q1OX7QVU8oog";
var video = '';
const width = (window.innerWidth)/2;
const height = width * 0.5625;

var search = "recipe" + recipeData.title;
videoSearch(API_KEY, search, 1);
    
function videoSearch(key, search, maxResults) {
    // Clear previous content
    $(".youtube-video").empty();

    const url = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search
    $.get(url, function(data) {
        console.log(data);
        data.items.forEach(item => {
            video = `
            <iframe width="`+width+`" height="`+height+`" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
            $(".youtube-video").append(video);
        });
    });
}
}
}

__init__();
