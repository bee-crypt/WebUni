document.addEventListener('DOMContentLoaded', function() {
    dishes.sort((a, b) => a.name.localeCompare(b.name));
    renderAllDishes();
});

function renderAllDishes() {
    // Создаем контейнеры если их нет
    const grids = {
        soup: document.getElementById('soups-grid'),
        main: document.getElementById('mains-grid'),
        drink: document.getElementById('drinks-grid'),
        salad: document.getElementById('salads-grid'),
        dessert: document.getElementById('desserts-grid')
    };
    
    // Очищаем все сетки
    Object.values(grids).forEach(grid => {
        if (grid) grid.innerHTML = '';
    });
    
    // Создаем карточки
    dishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        const grid = grids[dish.category];
        
        if (grid && dishCard) {
            grid.appendChild(dishCard);
        }
    });
}

function createDishCard(dish) {
    const dishCard = document.createElement('div');
    dishCard.className = 'dish-card';
    dishCard.setAttribute('data-dish', dish.keyword);
    dishCard.setAttribute('data-kind', dish.kind);
    dishCard.setAttribute('data-category', dish.category);
    
    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="dish-price">${dish.price} ₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button class="add-btn" data-dish="${dish.keyword}">Добавить</button>
    `;
    
    return dishCard;
}