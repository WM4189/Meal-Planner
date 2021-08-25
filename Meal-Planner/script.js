document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('#new_task_description')
    const form = document.querySelector('form')
    form.addEventListener('submit', fetchFood)

    function fetchFood(e){
        e.preventDefault()
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
        .then(res => res.json())
        .then(object => { 
            const mealArray = object.meals
            console.log(mealArray)
            mealArray.forEach(mealObject => createOptions(mealObject))
        })
        .catch(err => {
        alert('Please Try A Different Food')
        console.error('Invalid Meal Request')
        })
        form.reset()
    }
})

function createOptions(food) { 
    const li = document.createElement('li')
    li.addEventListener("dblclick", createPlan)  
    const mealList = document.getElementById('mealO') 
    const img = document.createElement('img')
    li.innerText = food.strMeal
    img.src = food.strMealThumb
    img.alt = 'Image Failed To Load'
    mealList.appendChild(li)
    li.appendChild(img)
    if (food.strSource !== "") {
        const link = document.createElement('a')
        link.innerText = 'Link to Recipe'
        link.href = food.strSource
        li.append(link)     
    } else if (food.strSource === "") {
        const link = document.createElement('a')
        link.innerText = 'Link to Instructional Video'
        link.href = food.strYoutube
        li.appendChild(link)   
    }
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener("click", () => {
        li.remove()
    })
    li.append(deleteBtn)  

function createPlan() {
    const mealPlan = document.querySelector('#mealPlan')
    const li2 = document.createElement('li')
    li2.id = 'li2'
    li2.innerText = food.strMeal
    const strMeal = li2.innerText
    mealPlan.appendChild(li2)
    const p = document.createElement('p')
    p.innerText = food.strInstructions
    const strInstructions = p.innerText
    const btn2 = document.createElement('button')
    btn2.innerText = "Save to DB"
    btn2.addEventListener('click',() => {
        const newFood = {
            strMeal,
            strInstructions 
        }
        const configObj = {
            method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFood)
          }
        
          fetch('http://localhost:3000/meal',configObj)
          .then(res => res.json())
          .then(data => console.log(data))
    })
    li2.appendChild(p)
    p.appendChild(btn2)
}
// function resetButton(){
//     const btn2 = document.createElement('button')
//     const mealPlan = document.querySelector('#mealPlan')
//     const li2 = document.querySelectorAll('li')[1]
//     btn2.innerText = "Reset"
//     btn2.addEventListener('click', () => {
//         li2.remove()
//     })
//     mealPlan.append(btn2)
// }
}























