class FilterManager {
    constructor() {
        this.activeFilters = {
            soup: 'all',
            main: 'all',
            salad: 'all',
            drink: 'all',
            dessert: 'all'
        };
        
        this.setupFilterListeners();
    }
    
    setupFilterListeners() {
        // Делегирование событий для фильтров
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const category = e.target.getAttribute('data-category');
                const kind = e.target.getAttribute('data-kind');
                this.applyFilter(category, kind, e.target);
            }
        });
    }
    
    applyFilter(category, kind, button) {
        // Получаем все кнопки фильтров этой категории
        const categoryFilters = document.querySelectorAll(`.filters[data-category="${category}"] .filter-btn`);
        
        // Если кликнули на уже активный фильтр - снимаем фильтр
        if (this.activeFilters[category] === kind && kind !== 'all') {
            this.activeFilters[category] = 'all';
            button.classList.remove('active');
        } else {
            // Убираем активный класс со всех кнопок этой категории
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');
            this.activeFilters[category] = kind;
        }
        
        // Применяем фильтр к блюдам
        this.filterDishesByCategory(category);
    }
    
    filterDishesByCategory(category) {
        const selectedKind = this.activeFilters[category];
        const allDishesInCategory = document.querySelectorAll(`.dish-card[data-category="${category}"]`);
        
        if (selectedKind === 'all') {
            // Показываем все блюда категории
            allDishesInCategory.forEach(dish => {
                dish.style.display = 'flex';
            });
        } else {
            // Показываем только блюда выбранного вида
            allDishesInCategory.forEach(dish => {
                if (dish.getAttribute('data-kind') === selectedKind) {
                    dish.style.display = 'flex';
                } else {
                    dish.style.display = 'none';
                }
            });
        }
    }
    
    // Метод для проверки, видно ли блюдо после фильтрации
    isDishVisible(dishKeyword) {
        const dishCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (!dishCard) return false;
        
        const category = dishCard.getAttribute('data-category');
        const selectedKind = this.activeFilters[category];
        
        if (selectedKind === 'all') return true;
        
        return dishCard.getAttribute('data-kind') === selectedKind;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.filterManager = new FilterManager();
});