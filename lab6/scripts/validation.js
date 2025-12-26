class OrderValidator {
    constructor() {
        this.notification = null;
        this.setupFormValidation();
    }
    
    setupFormValidation() {
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.addEventListener('submit', (e) => {
                this.validateOrder(e);
            });
        }
    }
    
    validateOrder(event) {
        event.preventDefault(); // Останавливаем отправку
        
        const selectedDishes = window.orderManager?.selectedDishes || {};
        
        // Проверяем, есть ли выбранные блюда
        const selectedCount = Object.values(selectedDishes).filter(dish => dish).length;
        if (selectedCount === 0) {
            this.showNotification('Вы не выбрали ни одного блюда!');
            return false;
        }
        
        // Проверяем соответствие варианту ланча
        const validationResult = this.checkMealVariant(selectedDishes);
        
        if (validationResult.isValid) {
            // Если все ок - показываем сообщение и отправляем
            alert(`Заказ "${validationResult.variant}" оформлен! Отправляем на сервер...`);
            
            // Отправляем форму
            setTimeout(() => {
                event.target.submit();
            }, 1000);
        } else {
            // Показываем уведомление об ошибке
            this.showNotification(validationResult.message);
        }
        
        return validationResult.isValid;
    }
    
    checkMealVariant(selectedDishes) {
        // Подсчитываем количество выбранных блюд по категориям
        const selectedCategories = {};
        Object.entries(selectedDishes).forEach(([category, dish]) => {
            if (dish) {
                selectedCategories[category] = (selectedCategories[category] || 0) + 1;
            }
        });
        
        // Проверяем каждый вариант ланча
        for (const variant of mealVariants) {
            const requiredCopy = { ...selectedCategories };
            let matches = true;
            
            // Проверяем обязательные категории
            for (const requiredCategory of variant.required) {
                if (requiredCopy[requiredCategory] && requiredCopy[requiredCategory] > 0) {
                    requiredCopy[requiredCategory]--;
                } else {
                    matches = false;
                    break;
                }
            }
            
            // Если обязательные категории совпали, проверяем что нет лишних
            if (matches) {
                const extraCategories = Object.entries(requiredCopy)
                    .filter(([_, count]) => count > 0)
                    .map(([category]) => category)
                    .filter(category => !variant.optional.includes(category));
                
                if (extraCategories.length === 0) {
                    return {
                        isValid: true,
                        variant: variant.name
                    };
                }
            }
        }
        
        // Если не подошел ни один вариант, определяем что не хватает
        return this.getMissingItemsMessage(selectedDishes);
    }
    
    getMissingItemsMessage(selectedDishes) {
        const selectedCategories = new Set();
        Object.entries(selectedDishes).forEach(([category, dish]) => {
            if (dish) selectedCategories.add(category);
        });
        
        // Проверяем минимальные комбинации
        if (selectedCategories.has('soup') && selectedCategories.has('main') && selectedCategories.has('drink')) {
            return {
                isValid: false,
                message: 'Ваш заказ почти готов! Добавьте десерт для полного комплекта.'
            };
        }
        
        if (selectedCategories.has('salad') && selectedCategories.has('drink')) {
            return {
                isValid: false,
                message: 'Отличный лёгкий ланч! Но для полноценного обеда добавьте суп или основное блюдо.'
            };
        }
        
        if (selectedCategories.has('soup') && selectedCategories.has('drink')) {
            return {
                isValid: false,
                message: 'Не хватает основного блюда! Выберите мясное, рыбное или вегетарианское блюдо.'
            };
        }
        
        if (selectedCategories.has('main') && selectedCategories.has('drink')) {
            return {
                isValid: false,
                message: 'Вкусный обед! Добавьте суп для полноценного комплекта.'
            };
        }
        
        return {
            isValid: false,
            message: 'Выберите комбинацию блюд из предложенных вариантов ланча.'
        };
    }
    
    showNotification(message) {
        // Удаляем предыдущее уведомление если есть
        if (this.notification) {
            this.notification.remove();
        }
        
        // Создаем новое уведомление
        this.notification = document.createElement('div');
        this.notification.className = 'notification';
        this.notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">⚠️</div>
                <h3>Проверьте заказ</h3>
                <p>${message}</p>
                <button class="notification-btn">Окей</button>
            </div>
            <div class="notification-overlay"></div>
        `;
        
        // Добавляем на страницу
        document.body.appendChild(this.notification);
        
        // Блокируем скролл
        document.body.style.overflow = 'hidden';
        
        // Назначаем обработчик для кнопки
        this.notification.querySelector('.notification-btn').addEventListener('click', () => {
            this.hideNotification();
        });
        
        // Закрытие по клику на overlay
        this.notification.querySelector('.notification-overlay').addEventListener('click', () => {
            this.hideNotification();
        });
    }
    
    hideNotification() {
        if (this.notification) {
            this.notification.remove();
            this.notification = null;
            document.body.style.overflow = '';
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.orderValidator = new OrderValidator();
});