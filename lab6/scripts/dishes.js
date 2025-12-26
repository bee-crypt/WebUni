const dishes = [
    // Супы (6 блюд)
    {
        keyword: "tom_yum",
        name: "Том Ям с креветками",
        price: 365,
        category: "soup",
        kind: "fish",
        count: "350 мл",
        image: "images/tomyam.jpeg"
    },
    {
        keyword: "norwegian_soup",
        name: "Норвежский суп с лососем",
        price: 270,
        category: "soup",
        kind: "fish",
        count: "300 мл",
        image: "images/soup2.jpeg"
    },
    {
        keyword: "cream_mushroom",
        name: "Крем-суп из шампиньонов с гренками",
        price: 220,
        category: "soup",
        kind: "veg",
        count: "320 мл",
        image: "images/soup3.jpeg"
    },
    {
        keyword: "chicken_noodle",
        name: "Куриный суп с лапшой",
        price: 190,
        category: "soup",
        kind: "meat",
        count: "400 мл",
        image: "images/soup4.jpeg"
    },
    {
        keyword: "borscht",
        name: "Борщ с говядиной",
        price: 240,
        category: "soup",
        kind: "meat",
        count: "350 мл",
        image: "images/soup5.jpeg"
    },
    {
        keyword: "pumpkin_soup",
        name: "Тыквенный крем-суп",
        price: 210,
        category: "soup",
        kind: "veg",
        count: "300 мл",
        image: "images/soup6.jpeg"
    },

    // Главные блюда (6 блюд)
    {
        keyword: "lasagna",
        name: "Лазанья с соусом бешамель",
        price: 385,
        category: "main",
        kind: "meat",
        count: "400 г",
        image: "images/main1.jpeg"
    },
    {
        keyword: "chicken_cutlets",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main",
        kind: "meat",
        count: "350 г",
        image: "images/main2.jpeg"
    },
    {
        keyword: "fried_potatoes",
        name: "Жареная картошка с грибами и луком",
        price: 150,
        category: "main",
        kind: "veg",
        count: "300 г",
        image: "images/main3.jpeg"
    },
    {
        keyword: "salmon_steak",
        name: "Стейк из лосося с овощами гриль",
        price: 420,
        category: "main",
        kind: "fish",
        count: "350 г",
        image: "images/main4.jpeg"
    },
    {
        keyword: "beef_stroganoff",
        name: "Бефстроганов с рисом",
        price: 380,
        category: "main",
        kind: "meat",
        count: "400 г",
        image: "images/main5.jpg"
    },
    {
        keyword: "vegetable_stew",
        name: "Овощное рагу с тофу",
        price: 280,
        category: "main",
        kind: "veg",
        count: "350 г",
        image: "images/main6.jpg"
    },

    // Салаты и стартеры (6 блюд)
    {
        keyword: "caesar_salad",
        name: "Салат Цезарь с курицей",
        price: 320,
        category: "salad",
        kind: "meat",
        count: "250 г",
        image: "images/salad1.jpg"
    },
    {
        keyword: "shrimp_salad",
        name: "Салат с тигровыми креветками",
        price: 380,
        category: "salad",
        kind: "fish",
        count: "220 г",
        image: "images/salad2.jpeg"
    },
    {
        keyword: "greek_salad",
        name: "Греческий салат",
        price: 240,
        category: "salad",
        kind: "veg",
        count: "280 г",
        image: "images/salad3.jpg"
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 290,
        category: "salad",
        kind: "veg",
        count: "200 г",
        image: "images/salad4.jpg"
    },
    {
        keyword: "bruschetta",
        name: "Брускетта с томатами",
        price: 180,
        category: "salad",
        kind: "veg",
        count: "150 г",
        image: "images/salad5.jpg"
    },
    {
        keyword: "spring_salad",
        name: "Весенний салат с авокадо",
        price: 260,
        category: "salad",
        kind: "veg",
        count: "230 г",
        image: "images/salad6.jpeg"
    },

    // Напитки (6 блюд)
    {
        keyword: "orange_juice",
        name: "Свежевыжатый апельсиновый сок",
        price: 180,
        category: "drink",
        kind: "cold",
        count: "250 мл",
        image: "images/drink1.jpeg"
    },
    {
        keyword: "cappuccino",
        name: "Капучино с корицей",
        price: 150,
        category: "drink",
        kind: "hot",
        count: "200 мл",
        image: "images/drink2.jpeg"
    },
    {
        keyword: "cranberry_juice",
        name: "Морс клюквенный",
        price: 120,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/drink3.jpeg"
    },
    {
        keyword: "green_tea",
        name: "Зеленый чай с жасмином",
        price: 100,
        category: "drink",
        kind: "hot",
        count: "300 мл",
        image: "images/drink4.jpg"
    },
    {
        keyword: "lemonade",
        name: "Домашний лимонад",
        price: 140,
        category: "drink",
        kind: "cold",
        count: "350 мл",
        image: "images/drink5.jpg"
    },
    {
        keyword: "espresso",
        name: "Эспрессо",
        price: 130,
        category: "drink",
        kind: "hot",
        count: "100 мл",
        image: "images/drink6.jpeg"
    },

    // Десерты (6 блюд)
    {
        keyword: "tiramisu",
        name: "Тирамису",
        price: 280,
        category: "dessert",
        kind: "small",
        count: "150 г",
        image: "images/dessert1.jpeg"
    },
    {
        keyword: "chocolate_cake",
        name: "Шоколадный торт",
        price: 220,
        category: "dessert",
        kind: "small",
        count: "120 г",
        image: "images/dessert2.jpeg"
    },
    {
        keyword: "cheesecake",
        name: "Чизкейк Нью-Йорк",
        price: 310,
        category: "dessert",
        kind: "small",
        count: "140 г",
        image: "images/dessert3.jpeg"
    },
    {
        keyword: "apple_pie",
        name: "Яблочный пирог",
        price: 190,
        category: "dessert",
        kind: "medium",
        count: "180 г",
        image: "images/dessert4.jpeg"
    },
    {
        keyword: "napoleon",
        name: "Наполеон",
        price: 240,
        category: "dessert",
        kind: "medium",
        count: "200 г",
        image: "images/dessert5.jpeg"
    },
    {
        keyword: "fruit_platter",
        name: "Фруктовая тарелка",
        price: 350,
        category: "dessert",
        kind: "large",
        count: "400 г",
        image: "images/dessert6.jpeg"
    }
];