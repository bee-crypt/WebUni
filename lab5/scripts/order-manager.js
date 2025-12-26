class OrderManager {
    constructor() {
        this.selectedDishes = {
            soup: null,
            main: null,
            salad: null,
            drink: null,
            dessert: null
        };
        
        // Обновляем createOrderSection для новых категорий
        this.createOrderSection();
        this.setupEventListeners();
        this.renderOrder();
    }
    
    createOrderSection() {
        // Проверяем, есть ли уже блок заказа
        if (!document.querySelector('.order-container')) {
            const orderHTML = `
                <div class="order-container" style="display: none;">
                    <div class="form-container">
                        <h2>Ваш заказ</h2>
                        
                        <form id="orderForm" action="https://httpbin.org/post" method="POST">
                            <!-- Суп -->
                            <div class="order-category order-soup">
                                <h3>Супы</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Блюдо не выбрано</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="soup" value="">
                            </div>

                            <!-- Главное блюдо -->
                            <div class="order-category order-main">
                                <h3>Главные блюда</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Блюдо не выбрано</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="main" value="">
                            </div>

                            <!-- Напиток -->
                            <div class="order-category order-drink">
                                <h3>Напитки</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Напиток не выбран</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="drink" value="">
                            </div>

                            <!-- Итоговая стоимость -->
                            <div class="order-total-section">
                                <h3>Стоимость заказа</h3>
                                <div class="total-amount">
                                    <span class="total-label">Итого:</span>
                                    <span class="order-total">0 ₽</span>
                                </div>
                                <input type="hidden" name="total" value="0">
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="submit-btn">Оформить заказ</button>
                                <button type="button" class="reset-btn" id="resetOrder">Сбросить заказ</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            // Добавляем после последней секции
            const lastSection = document.querySelector('section:last-of-type');
            lastSection.insertAdjacentHTML('afterend', orderHTML);
        }
        
        // Сохраняем ссылки на элементы
        this.categoryElements = {
            soup: document.querySelector('.order-soup'),
            main: document.querySelector('.order-main'),
            salad: document.querySelector('.order-salad'),
            drink: document.querySelector('.order-drink'),
            dessert: document.querySelector('.order-dessert')
        };
        
        this.totalElement = document.querySelector('.order-total');
        this.orderForm = document.getElementById('orderForm');
        this.orderContainer = document.querySelector('.order-container');
    }
    
    setupEventListeners() {
        // Делегирование событий для кнопок "Добавить"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) {
                const dishKeyword = e.target.getAttribute('data-dish');
                this.addDish(dishKeyword);
            }
        });
        
        // Кнопка сброса
        document.getElementById('resetOrder')?.addEventListener('click', () => {
            this.resetOrder();
        });
        
        // Обработка отправки формы
        if (this.orderForm) {
            this.orderForm.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
        }
    }
    
    addDish(dishKeyword) {
        const dish = dishes.find(d => d.keyword === dishKeyword);
        if (!dish) return;
        
        // Снимаем выделение со всех карточек в этой категории
        const categoryCards = document.querySelectorAll(`[data-dish]`);
        categoryCards.forEach(card => {
            if (dishes.find(d => d.keyword === card.getAttribute('data-dish'))?.category === dish.category) {
                card.style.border = '';
            }
        });
        
        // Выделяем выбранную карточку
        const selectedCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (selectedCard) {
            selectedCard.style.border = '2px solid tomato';
        }
        
        // Сохраняем выбранное блюдо
        this.selectedDishes[dish.category] = dish;
        
        // Обновляем отображение заказа
        this.renderOrder();
    }
    
    renderOrder() {
        let hasSelection = false;
        
        // Обновляем каждую категорию
        Object.keys(this.selectedDishes).forEach(category => {
            const dish = this.selectedDishes[category];
            const element = this.categoryElements[category];
            
            if (element) {
                if (dish) {
                    element.querySelector('.selected-dish-name').textContent = dish.name;
                    element.querySelector('.selected-dish-price').textContent = `${dish.price} ₽`;
                    element.querySelector('input[type="hidden"]').value = dish.keyword;
                    element.style.display = 'block';
                    hasSelection = true;
                } else {
                    const categoryName = this.getCategoryNameInRussian(category);
                    element.querySelector('.selected-dish-name').textContent = `${categoryName} не выбрано`;
                    element.querySelector('.selected-dish-price').textContent = '0 ₽';
                    element.querySelector('input[type="hidden"]').value = '';
                    element.style.display = 'block';
                }
            }
        });
        
        // Показываем/скрываем общий контейнер заказа
        if (this.orderContainer) {
            this.orderContainer.style.display = hasSelection ? 'block' : 'none';
        }
        
        // Обновляем итоговую стоимость
        this.updateTotal();
    }
    
    getCategoryNameInRussian(category) {
        const names = {
            soup: "Блюдо",
            main: "Блюдо",
            salad: "Блюдо",
            drink: "Напиток",
            dessert: "Десерт"
        };
        return names[category] || "Блюдо";
    }
    
    updateTotal() {
        let total = 0;
        
        Object.values(this.selectedDishes).forEach(dish => {
            if (dish) {
                total += dish.price;
            }
        });
        
        if (this.totalElement) {
            this.totalElement.textContent = `${total} ₽`;
            this.totalElement.previousElementSibling.value = total;
        }
    }
    
    resetOrder() {
        this.selectedDishes = { 
            soup: null, 
            main: null, 
            salad: null, 
            drink: null, 
            dessert: null 
        };
        
        // Снимаем выделение со всех карточек
        document.querySelectorAll('.dish-card').forEach(card => {
            card.style.border = '';
        });
        
        this.renderOrder();
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        const selectedCount = Object.values(this.selectedDishes).filter(dish => dish).length;
        if (selectedCount === 0) {
            alert('Выберите хотя бы одно блюдо!');
            return;
        }
        
        alert('Заказ оформлен! Данные отправлены на сервер.');
        this.orderForm.submit();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.orderManager = new OrderManager();
});

