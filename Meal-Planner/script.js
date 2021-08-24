document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#new_task_description')
    const form = document.querySelector('form')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(res => res.json())
            .then(object => { 
                // const mealArray = object.meals[0]
                // createMeals(mealArray)
                const mealArray = object.meals
                console.log(mealArray)
                mealArray.forEach(mealObject => createMeals(mealObject))
            })
            .catch(err => {
            alert('Invalid Meal Request : Please Try Again')
            console.error('Input Error')
            })
            form.reset()
        })
})



function createMeals(food) { 
    const li = document.createElement('li')
    li.addEventListener("click", (e) => {
        const mealPlan = document.querySelector('#mealPlan')
        // const mealItem = document.getElementById('mealP')
        const li2 = document.createElement('li')
        li2.innerText = food.strMeal
        if (food.strSource !== "") {
            const link = document.createElement('a')
            link.innerText = 'Link to Recipe'
            link.href = food.strSource
            li2.append(link)     
        } else if (food.strSource === "") {
             const link = document.createElement('a')
            link.innerText = 'Link to Instructional Video'
            link.href = food.strYoutube
            li2.appendChild(link)   
            }
        mealPlan.appendChild(li2)
    })
    const mealList = document.getElementById('mealO') 
    const img = document.createElement('img')
    li.innerText = food.strMeal
    img.src = food.strMealThumb
    img.alt = 'Failed To Load'
    mealList.appendChild(li)
    li.appendChild(img)
}























// document.addEventListener("DOMContentLoaded", () => {
//     const input = document.querySelector('#new_task_description')
//     const form = document.querySelector('form')
//         form.addEventListener('submit', (e) => {
//             e.preventDefault()
//             fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${input.value}`, {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-key": "745e1b9d46mshf4588f87ded654ep1d07a4jsn9d5fd6af39db",
//                 "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
//             }
//             })
//             .then(res => res.json())
//             .then(object => { 
//                 const mealArray = object.results
//                 console.log(mealArray)
//                 mealArray.forEach(mealObject => createMeals(mealObject))
//                 debugger
//             })
//             // .catch(err => {
//             //     alert('Invalid Meal Request')
//             //     console.error(err)
//             // })
//             form.reset()
//         })

//         function createMeals (food) { 
//             const li = document.createElement('li')
//             const mealList = document.getElementById('meals') 
//             const img = document.createElement('img')
//             li.innerText = food.title
//             img.src = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${input.value}${food.image}`
//             img.alt = 'picture'
//             mealList.appendChild(li)
//             li.appendChild(img)
//             console.log(img)
//         }
        
// })
