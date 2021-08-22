document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#new_task_description')
    const form = document.querySelector('form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${input.value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": ,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
            })
            .then(res => res.json())
            .then(mealArray => { 
                console.log(mealArray)
                // const createMeals = () => { 
                //     const li = document.createElement('li')
                //     const meals = document.getElementById('meals') 
                //     li.innerText = `${mealArray.whatever the name key is}    `
                //     meals.appendChild(li)
                // }
            })
            // .catch(err => {
            //     alert('Invalid Meal Request')
            //     console.error(err)
            // })
        form.reset()
        })
})

