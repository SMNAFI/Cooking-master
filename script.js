const searchFood = () => {
    const inputValue = document.getElementById('input-field').value;
    const itemDetails = document.getElementById('itemDetails');
    const container = document.getElementById('container');

    if (inputValue != '') {
        itemDetails.innerHTML = '';
        container.innerHTML = '';
        itemDetails.style.display = 'none';
        if (inputValue.length == 1) {
            findFoodByFirstLetter(inputValue)
        }
        else {
            findFoodByName(inputValue);
        }
    }
}


const findFoodByFirstLetter = inputValue => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMatchedFoods(data.meals);
        })
        .catch(() => {
            alert("Sorry! We can't find any food for you.");
        })
}


const findFoodByName = inputValue => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMatchedFoods(data.meals);
        })
        .catch(() => {
            alert("Sorry! We can't find any food for you.");
        })
}


const displayMatchedFoods = meals => {
    meals.forEach(meal => {
        displayItem(meal.strMeal);
    });
}


const displayItem = mealName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    const container = document.getElementById('container');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const food = data.meals[0];
            const div = document.createElement('div');
            div.className = 'mealItem';
            div.onclick = () => displayIngredients(food.strMeal);
            div.innerHTML = `<img src="${food.strMealThumb}">
                             <h4>${food.strMeal}</h4>`;
            container.appendChild(div);
        })
}


const displayIngredients = mealName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const mealProperty = Object.values(data.meals[0]);
            const allIngredients = [];
            for (let i = 9, j = 29; i < 29; i++, j++) {
                if (mealProperty[j] == '' || mealProperty[i] == '' || mealProperty[i] == null || mealProperty[j] == null) {
                    continue;
                }
                allIngredients.push(mealProperty[j] + " " + mealProperty[i]);
            }
            const itemDetails = document.getElementById('itemDetails');
            itemDetails.innerHTML = `<img src = "${data.meals[0].strMealThumb}">
                                     <div>
                                        <h1>${mealName}</h1>
                                        <h3>Ingredients</h3>
                                     </div>`
            const ul = document.createElement('ul');
            ul.className = "fa-ul";
            allIngredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="fa-li"><i class="fas fa-check-square"></i></span>${ingredient}`;
                ul.appendChild(li);
            });
            itemDetails.appendChild(ul);
            itemDetails.style.display = 'block';
        })
}