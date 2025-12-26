class OrderManager {
    constructor() {
        this.selectedDishes = {
            soup: null,
            main: null,
            salad: null,
            drink: null,
            dessert: null
        };
        
        this.createOrderSection();
        this.setupEventListeners();
        this.renderOrder();
    }
    
    createOrderSection() {
        if (!document.querySelector('.order-container')) {
            const orderHTML = `
                <div class="order-container" style="display: none;">
                    <div class="form-container">
                        <h2>Ваш заказ</h2>
                        <form id="orderForm" action="https://httpbin.org/post" method="POST">
                            <div class="order-category order-soup">
                                <h3>Супы</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Блюдо не выбрано</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="soup" value="">
                            </div>
                            <div class="order-category order-main">
                                <h3>Главные блюда</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Блюдо не выбрано</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="main" value="">
                            </div>
                            <div class="order-category order-drink">
                                <h3>Напитки</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Напиток не выбран</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="drink" value="">
                            </div>
                            <div class="order-category order-salad">
                                <h3>Салаты и стартеры</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Блюдо не выбрано</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="salad" value="">
                            </div>
                            <div class="order-category order-dessert">
                                <h3>Десерты</h3>
                                <div class="selected-dish">
                                    <span class="selected-dish-name">Десерт не выбран</span>
                                    <span class="selected-dish-price">0 ₽</span>
                                </div>
                                <input type="hidden" name="dessert" value="">
                            </div>
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
            
            const lastSection = document.querySelector('section:last-of-type');
            if (lastSection) {
                lastSection.insertAdjacentHTML('afterend', orderHTML);
            }
        }
        
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
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-btn')) {
                const dishKeyword = e.target.getAttribute('data-dish');
                this.addDish(dishKeyword);
            }
        });
        
        document.getElementById('resetOrder')?.addEventListener('click', () => {
            this.resetOrder();
        });
    }
    
    addDish(dishKeyword) {
        const dish = dishes.find(d => d.keyword === dishKeyword);
        if (!dish) return;
        
        document.querySelectorAll('.dish-card').forEach(card => {
            if (dishes.find(d => d.keyword === card.getAttribute('data-dish'))?.category === dish.category) {
                card.style.border = '';
            }
        });
        
        const selectedCard = document.querySelector(`[data-dish="${dishKeyword}"]`);
        if (selectedCard) {
            selectedCard.style.border = '2px solid tomato';
        }
        
        this.selectedDishes[dish.category] = dish;
        this.renderOrder();
    }
    
    renderOrder() {
        let hasSelection = false;
        
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
        
        if (this.orderContainer) {
            this.orderContainer.style.display = hasSelection ? 'block' : 'none';
        }
        
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
        
        document.querySelectorAll('.dish-card').forEach(card => {
            card.style.border = '';
        });
        
        this.renderOrder();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.orderManager = new OrderManager();
});