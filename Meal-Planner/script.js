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
            // console.log(mealArray)
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
    removeBtn.addEventListener('click', () =>{
        deleteFood(food, li2)
    })

    const saveBtn = document.createElement('button')
    saveBtn.innerText = "Save"
    saveBtn.addEventListener('click',() => {
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

          
        
          fetch('http://localhost:3000/meal',configObj)
          .then(res => res.json())
          .then(savedObj => {
            if(savedObj.strMeal === food.strMeal){
            li2.remove() + getFood(savedObj)
            // console.log(savedObj)
            }


            })
        
    })

    li2.appendChild(p)
    p.appendChild(saveBtn)
    p.appendChild(removeBtn)
}


function getFood(foodObj){
    fetch ('http://localhost:3000/meal')
    .then(res => res.json())
    .then(dbFoodArr => {
        console.log(dbFoodArr)
        // if(foodObj.strMeal !== dbFoodArr[i].strMeal){
            // const li2 = document.querySelector('#li2')
            // li2.remove() + dbFoodArr.forEach(createPlan)
            dbFoodArr.forEach(createPlan)
        // }
    })

}

function deleteFood (food, li2){
    console.log(li2)
    li2.remove()

    fetch(`http://localhost:3000/meal/${food.id}`,{
        method: 'DELETE'
    })
}



}























