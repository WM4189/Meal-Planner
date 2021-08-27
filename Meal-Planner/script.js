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
            mealArray.forEach(createOptions)
        })
        .catch(err => {
        alert('Invalid Input : Please Try A Different Food')
        console.error('Input Error')
        })
        form.reset()
        
    }


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

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = "Delete"
        deleteBtn.addEventListener("click", () => {
            li.remove()
        })
        li.append(deleteBtn)
    }
})


function createPlan(food) {
    const li2 = document.createElement('li')
    li2.id = 'li2'
    li2.innerText = food.strMeal
    const strMeal = li2.innerText
    const mealPlan = document.querySelector('#mealPlan')
    mealPlan.appendChild(li2)

    const linkA = document.createElement('a')
    linkA.id = 'linkA'
    linkA.innerText = 'Link to Recipe'
    linkA.href = food.strSource
    const strSource = linkA.href

    const linkB = document.createElement('a')
    linkB.innerText = 'Link to Instructional Video'
    linkB.href = food.strYoutube
    const strYoutube = linkB.href

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
            strInstructions,
            strYoutube, 
            strSource
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
            li2.remove() + getFood()
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
    p.append(saveBtn)
    p.append(removeBtn)
    p.append(checkBox)
    p.append(linkB)
    p.append(linkA)
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

function deleteFood (food, li2){
    li2.remove()
    fetch(`${BASE_URL}/${food.id}`,{
        method: 'DELETE'
    })
}

function getFood(){
    fetch (BASE_URL)
    .then(res => res.json())
    .then(dbFoodArr => dbFoodArr.forEach(createPlan))   
}
getFood()

























