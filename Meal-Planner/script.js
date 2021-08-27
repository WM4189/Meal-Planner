const BASE_URL = 'http://localhost:3000/meal'
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s'

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', fetchFood)

    function fetchFood(e){
        e.preventDefault()
        const input = document.querySelector('#new_task_description').value
        fetch(`${API_URL}=${input}`)
        .then(res => res.json())
        .then(object => { 
            const mealArray = object.meals
            mealArray.forEach(mealObject => createOptions(mealObject))
        })
        .catch(err => {
        alert('Invalid Input : Please Try A Different Food')
        console.error('Input Error')
        })
        form.reset()
    }
})

function createOptions(food) { 
    const li = document.createElement('li')
    li.id = 'li1'
    li.addEventListener("dblclick", () => createPlan(food))  
    const mealList = document.getElementById('mealO') 
    const img = document.createElement('img')
    li.innerText = food.strMeal
    img.src = food.strMealThumb
    img.alt = 'Image Failed To Load'
    mealList.appendChild(li)
    li.appendChild(img)
    // if (food.strSource !== "") {
    //     const link = document.createElement('a')
    //     link.innerText = 'Link to Recipe'
    //     link.href = food.strSource
    //     li.append(link)     
    // } else if (food.strSource === "") {
    //     const link = document.createElement('a')
    //     link.innerText = 'Link to Instructional Video'
    //     link.href = food.strYoutube
    //     li.appendChild(link)   
    // }
   
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener("click", () => {
        li.remove()
    })
    li.append(deleteBtn)
    const hiddenBtn = document.querySelector('h2')
    hiddenBtn.addEventListener('click',() => {
        const allLi1 = document.querySelectorAll('#li1')
        allLi1.forEach(li => li.remove())
    })  
}

function createPlan(food) {
    const mealPlan = document.querySelector('#mealPlan')
    const li2 = document.createElement('li')
    li2.id = 'li2'
    li2.innerText = food.strMeal
    const strMeal = li2.innerText
    mealPlan.appendChild(li2)

    const p = document.createElement('p')
    p.innerText = food.strInstructions
    const strInstructions = p.innerText

    const removeBtn = document.createElement('button')
    removeBtn.innerText = "Delete"
    removeBtn.addEventListener('click', () => deleteFood(food, li2))

    const saveBtn = document.createElement('button')
    saveBtn.innerText = "Save"
    saveBtn.addEventListener('click', postFood) 

    function postFood() {
        const allLi2 = document.querySelectorAll('#li2')
        allLi2.forEach(li => li.remove())
        
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

        fetch(BASE_URL,configObj)
        .then(res => res.json())
        .then(savedObj => {
            if(savedObj.strMeal === food.strMeal){
            li2.remove() + getFood(savedObj)
            }
        })
        
    }

    const checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox")
    
    if (food.completed) {
    checkBox.checked = true
    }
    checkBox.addEventListener("click", () => updateCompleted(food));

    li2.appendChild(p)
    p.appendChild(saveBtn)
    p.appendChild(removeBtn)
    p.appendChild(checkBox)
}

function updateCompleted(food) {
  let completed = (food.completed = !food.completed)
  const config = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
  body: JSON.stringify({completed})
}
  fetch(`${BASE_URL}/${food.id}`,config)
}


function getFood(foodObj){
    fetch (BASE_URL)
    .then(res => res.json())
    .then(dbFoodArr => dbFoodArr.forEach(createPlan))   
}
getFood()

function deleteFood (food, li2){
    li2.remove()
    fetch(`${BASE_URL}/${food.id}`,{
        method: 'DELETE'
    })
}



























