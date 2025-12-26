document.addEventListener('DOMContentLoaded', function() {
    // Сортировка всех блюд по алфавиту
    dishes.sort((a, b) => a.name.localeCompare(b.name));
    
    // Создаем секции если их нет
    createSectionsIfNeeded();
    
    // Отрисовываем все блюда
    renderAllDishes();
});

function createSectionsIfNeeded() {
    const mainElement = document.querySelector('main');
    
    // Проверяем наличие секций салатов и десертов
    if (!document.querySelector('.salad-section')) {
        const saladSection = `
            <section class="menu-section salad-section">
                <h2>Салаты и стартеры</h2>
                <div class="filters" data-category="salad">
                    <button class="filter-btn" data-kind="all" data-category="salad">Все</button>
                    <button class="filter-btn" data-kind="fish" data-category="salad">Рыбный</button>
                    <button class="filter-btn" data-kind="meat" data-category="salad">Мясной</button>
                    <button class="filter-btn" data-kind="veg" data-category="salad">Вегетарианский</button>
                </div>
                <div class="dishes-grid" data-category="salad">
                    <!-- Блюда будут добавлены через JS -->
                </div>
            </section>
        `;
        
        const dessertSection = `
            <section class="menu-section dessert-section">
                <h2>Десерты</h2>
                <div class="filters" data-category="dessert">
                    <button class="filter-btn" data-kind="all" data-category="dessert">Все</button>
                    <button class="filter-btn" data-kind="small" data-category="dessert">Маленькая порция</button>
                    <button class="filter-btn" data-kind="medium" data-category="dessert">Средняя порция</button>
                    <button class="filter-btn" data-kind="large" data-category="dessert">Большая порция</button>
                </div>
                <div class="dishes-grid" data-category="dessert">
                    <!-- Блюда будут добавлены через JS -->
                </div>
            </section>
        `;
        
        // Вставляем новые секции перед блоком заказа
        const orderContainer = document.querySelector('.order-container');
        if (orderContainer) {
            orderContainer.insertAdjacentHTML('beforebegin', saladSection + dessertSection);
        } else {
            mainElement.insertAdjacentHTML('beforeend', saladSection + dessertSection);
        }
    }
    
    // Добавляем фильтры к существующим секциям
    addFiltersToExistingSections();
}

function addFiltersToExistingSections() {
    // Супы
    const soupSection = document.querySelector('section:nth-of-type(1)');
    if (soupSection && !soupSection.querySelector('.filters')) {
        const filtersHTML = `
            <div class="filters" data-category="soup">
                <button class="filter-btn" data-kind="all" data-category="soup">Все</button>
                <button class="filter-btn" data-kind="fish" data-category="soup">Рыбный</button>
                <button class="filter-btn" data-kind="meat" data-category="soup">Мясной</button>
                <button class="filter-btn" data-kind="veg" data-category="soup">Вегетарианский</button>
            </div>
        `;
        soupSection.querySelector('h2').insertAdjacentHTML('afterend', filtersHTML);
    }
    
    // Главные блюда
    const mainSection = document.querySelector('section:nth-of-type(2)');
    if (mainSection && !mainSection.querySelector('.filters')) {
        const filtersHTML = `
            <div class="filters" data-category="main">
                <button class="filter-btn" data-kind="all" data-category="main">Все</button>
                <button class="filter-btn" data-kind="fish" data-category="main">Рыбное</button>
                <button class="filter-btn" data-kind="meat" data-category="main">Мясное</button>
                <button class="filter-btn" data-kind="veg" data-category="main">Вегетарианское</button>
            </div>
        `;
        mainSection.querySelector('h2').insertAdjacentHTML('afterend', filtersHTML);
    }
    
    // Напитки
    const drinkSection = document.querySelector('section:nth-of-type(3)');
    if (drinkSection && !drinkSection.querySelector('.filters')) {
        const filtersHTML = `
            <div class="filters" data-category="drink">
                <button class="filter-btn" data-kind="all" data-category="drink">Все</button>
                <button class="filter-btn" data-kind="cold" data-category="drink">Холодный</button>
                <button class="filter-btn" data-kind="hot" data-category="drink">Горячий</button>
            </div>
        `;
        drinkSection.querySelector('h2').insertAdjacentHTML('afterend', filtersHTML);
    }
}

function renderAllDishes() {
    // Группировка блюд по категориям
    const categories = {
        soup: document.querySelector('section[data-category="soup"] .dishes-grid, section:nth-of-type(1) .dishes-grid'),
        main: document.querySelector('section[data-category="main"] .dishes-grid, section:nth-of-type(2) .dishes-grid'),
        salad: document.querySelector('section[data-category="salad"] .dishes-grid, .salad-section .dishes-grid'),
        drink: document.querySelector('section[data-category="drink"] .dishes-grid, section:nth-of-type(3) .dishes-grid'),
        dessert: document.querySelector('section[data-category="dessert"] .dishes-grid, .dessert-section .dishes-grid')
    };
    
    // Очищаем все сетки
    Object.values(categories).forEach(grid => {
        if (grid) grid.innerHTML = '';
    });
    
    // Создаем карточки для каждого блюда
    dishes.forEach(dish => {
        const dishCard = createDishCard(dish);
        
        // Добавляем в соответствующую категорию
        if (categories[dish.category] && dishCard) {
            categories[dish.category].appendChild(dishCard);
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
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/default.jpg'">
        <p class="dish-price">${dish.price} ₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button class="add-btn" data-dish="${dish.keyword}">Добавить</button>
    `;
    
    return dishCard;
}