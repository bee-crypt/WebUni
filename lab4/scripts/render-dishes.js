document.addEventListener('DOMContentLoaded', function() {
    // Сортировка по алфавиту
    dishes.sort((a, b) => a.name.localeCompare(b.name));
    
    // Находим все сетки с блюдами
    const soupGrid = document.querySelector('section:nth-of-type(1) .dishes-grid');
    const mainGrid = document.querySelector('section:nth-of-type(2) .dishes-grid');
    const drinkGrid = document.querySelector('section:nth-of-type(3) .dishes-grid');
    
    // Очищаем существующие карточки
    soupGrid.innerHTML = '';
    mainGrid.innerHTML = '';
    drinkGrid.innerHTML = '';
    
    // Создаем карточки для каждого блюда
    dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.setAttribute('data-dish', dish.keyword);
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="dish-price">${dish.price} ₽</p>
            <p class="dish-name">${dish.name}</p>
            <p class="dish-weight">${dish.count}</p>
            <button class="add-btn" data-dish="${dish.keyword}">Добавить</button>
        `;
        
        // Добавляем в соответствующую категорию
        if (dish.category === 'soup') {
            soupGrid.appendChild(dishCard);
        } else if (dish.category === 'main') {
            mainGrid.appendChild(dishCard);
        } else if (dish.category === 'drink') {
            drinkGrid.appendChild(dishCard);
        }
    });
});