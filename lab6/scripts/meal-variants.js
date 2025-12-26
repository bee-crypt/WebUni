const mealVariants = [
    {
        id: "classic",
        name: "Классический",
        description: "Суп + Главное блюдо + Напиток",
        required: ["soup", "main", "drink"],
        optional: ["dessert"],
        image: "images/soup2.jpeg"
    },
    {
        id: "light",
        name: "Лёгкий",
        description: "Салат + Напиток",
        required: ["salad", "drink"],
        optional: ["dessert"],
        image: "images/salad1.jpg"
    },
    {
        id: "full",
        name: "Полный",
        description: "Суп + Салат + Главное блюдо + Напиток",
        required: ["soup", "salad", "main", "drink"],
        optional: ["dessert"],
        image: "images/soup3.jpeg"
    },
    {
        id: "business",
        name: "Бизнес",
        description: "Суп + Главное блюдо + Напиток + Десерт",
        required: ["soup", "main", "drink", "dessert"],
        optional: [],
        image: "images/main5.jpg"
    },
    {
        id: "vegan",
        name: "Вегетарианский",
        description: "Суп + Салат + Напиток",
        required: ["soup", "salad", "drink"],
        optional: ["dessert"],
        image: "images/salad3.jpg"
    },
    {
        id: "double",
        name: "Двойной",
        description: "Суп + Главное блюдо ×2 + Напиток",
        required: ["soup", "main", "main", "drink"],
        optional: ["dessert"],
        image: "images/main4.jpeg"
    }
];