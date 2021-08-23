document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#new_task_description')
    const form = document.querySelector('form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${input.value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
            })
            .then(res => res.json())
            .then(object => { 
                const mealArray = object.results
                console.log(mealArray)
                mealArray.forEach(mealObject => createMeals(mealObject))
                debugger
            })
            // .catch(err => {
            //     alert('Invalid Meal Request')
            //     console.error(err)
            // })
            form.reset()
        })
})

function createMeals (food) { 
    const li = document.createElement('li')
    const mealList = document.getElementById('meals') 
    const img = document.createElement('img')
    li.innerText = food.title
    // img.src = food.image
    // img.alt = food.title
    mealList.appendChild(li)
    // li.appendChild(img)
    // console.log(img)
}
