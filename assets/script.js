const SPOONACULAR_ENDPOINT = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
//const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch';
const searchBtn= document.getElementById("search-button")
const searchInput= document.getElementById("search-input")
const recipeContainer= document.querySelector(".recipes-api")
const recipes = 

async function returnRecipes(ingredients) {
    const RecipeId = "1087629";
    
    const url= `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&ignorePantry=true&ranking=1`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f6fde6b800mshe44c4d3edfcf41ap1ee82cjsn03452dcc2b8b',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error("Failed to fetch the recipe.");
    }

    const data = await response.json();
    console.log(data);
    displayRecipe(data)
}
 function displayRecipe(data){

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
    }
 }

searchBtn.addEventListener("click", ()=>{
    const userIngredients= searchInput.value
    returnRecipes(userIngredients)
})

recipeContainer.addEventListener("click", ()=>{
    const title= this.event.target.textContent
    console.log(title);
})