document.addEventListener("DOMContentLoaded", () => {
    // Структури даних
    const productCatalog = new Map(); // для зберігання продуктів
    const orders = new Set(); // для зберігання замовлень
    const productHistory = new WeakMap(); // для зберігання історії змін у продуктах
    const users = new WeakSet(); // для зберігання посилань на користувачів

    // Продукти
    class Product {
        constructor(id, name, price, quantity) {
            this.id = id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }

        updatePrice(newPrice) {
            this.price = newPrice;
        }

        updateQuantity(newQuantity) {
            this.quantity = newQuantity;
        }
    }

    // Додавання продукту
    document.getElementById("addProductBtn").addEventListener("click", () => {
        const id = prompt("Введіть ідентифікатор продукту:");
        const name = prompt("Введіть назву продукту:");
        const price = parseFloat(prompt("Введіть ціну продукту:"));
        const quantity = parseInt(prompt("Введіть кількість на складі:"));

        if (!id || !name || isNaN(price) || isNaN(quantity)) {
            alert("Будь ласка, введіть правильні дані.");
            return;
        }

        const product = new Product(id, name, price, quantity);
        productCatalog.set(id, product);
        productHistory.set(product, { added: new Date() });

        alert("Продукт додано до каталогу!");
        displayProducts();
    });

    // Видалення продукту
    document.getElementById("removeProductBtn").addEventListener("click", () => {
        const id = prompt("Введіть ідентифікатор продукту для видалення:");

        if (productCatalog.has(id)) {
            productCatalog.delete(id);
            alert("Продукт видалено.");
        } else {
            alert("Продукт не знайдено.");
        }

        displayProducts();
    });

    // Оновлення інформації про продукт
    document.getElementById("updateProductBtn").addEventListener("click", () => {
        const id = prompt("Введіть ідентифікатор продукту для оновлення:");

        if (productCatalog.has(id)) {
            const product = productCatalog.get(id);
            const newPrice = parseFloat(prompt("Введіть нову ціну:"));
            const newQuantity = parseInt(prompt("Введіть нову кількість:"));

            if (!isNaN(newPrice) && !isNaN(newQuantity)) {
                product.updatePrice(newPrice);
                product.updateQuantity(newQuantity);
                alert("Інформація про продукт оновлена.");
            } else {
                alert("Будь ласка, введіть правильні дані.");
            }
        } else {
            alert("Продукт не знайдено.");
        }

        displayProducts();
    });

    // Пошук продукту
    document.getElementById("searchProductBtn").addEventListener("click", () => {
        const name = prompt("Введіть назву продукту для пошуку:");

        const foundProducts = [];
        productCatalog.forEach((product) => {
            if (product.name.toLowerCase().includes(name.toLowerCase())) {
                foundProducts.push(product);
            }
        });

        if (foundProducts.length > 0) {
            let output = "Знайдені продукти:\n";
            foundProducts.forEach(product => {
                output += `${product.name} - $${product.price} - Кількість: ${product.quantity}\n`;
            });
            alert(output);
        } else {
            alert("Продукти не знайдено.");
        }
    });

    // Відстеження замовлення
    document.getElementById("trackOrderBtn").addEventListener("click", () => {
        const productId = prompt("Введіть ідентифікатор продукту для замовлення:");

        if (productCatalog.has(productId)) {
            const product = productCatalog.get(productId);
            if (product.quantity > 0) {
                product.quantity--;
                orders.add(product);
                alert(`Замовлено: ${product.name}. Кількість залишилась: ${product.quantity}`);
            } else {
                alert("Продукт відсутній на складі.");
            }
        } else {
            alert("Продукт не знайдено.");
        }

        displayProducts();
    });

    // Перегляд замовлень
    document.getElementById("viewOrdersBtn").addEventListener("click", () => {
        let orderList = "Замовлені продукти:\n";
        orders.forEach(order => {
            orderList += `${order.name} - $${order.price}\n`;
        });
        alert(orderList);
    });

    // Виведення всіх продуктів
    function displayProducts() {
        let output = "Продукти в каталозі:\n";
        productCatalog.forEach((product) => {
            output += `${product.name} - $${product.price} - Кількість: ${product.quantity}\n;`;
        });
        document.getElementById("productInfo").textContent = output;
    }

    displayProducts();
});
