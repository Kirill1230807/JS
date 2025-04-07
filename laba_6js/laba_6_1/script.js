let products = [];
let currentEditId = null;
let activeCategoryFilter = null;
let currentSortOption = null;

// DOM елементи (отримуємо їх одразу після завантаження DOM)
let jsProductList;
let jsTotalPrice;
let jsAddNewProductBtn;
let jsAddEditModal;
let jsCloseModalBtn;
let jsCancelModalBtn;
let jsProductForm;
let jsProductIdInput;
let jsProductNameInput;
let jsProductPriceInput;
let jsProductCategorySelect;
let jsProductImageInput;
let jsSaveProductBtn;
let jsSnackbar;
let jsFilterButtonsContainer;
let jsResetFilterBtn;
let jsSortButtonsContainer;
let jsResetSortBtn;

const generateId = () => Math.random().toString(36).substring(2, 15);
const getCurrentDate = () => new Date().toISOString();
const formatPrice = (price) => `${parseFloat(price).toFixed(2)} грн`;

const calculateTotalPrice = (items) => items.reduce((sum, item) => sum + parseFloat(item.price), 0);

const addProduct = (currentProducts, productData) => ({
    id: generateId(),
    name: productData.productName,
    price: parseFloat(productData.productPrice),
    category: productData.productCategory,
    image: productData.productImage || '',
    createdAt: getCurrentDate(),
    updatedAt: getCurrentDate()
});

const updateProduct = (currentProducts, productId, productData) => {
    return currentProducts.map(product => product.id === productId
            ? { ...product, ...productData, price: parseFloat(productData.productPrice), updatedAt: getCurrentDate() }
            : product
    );
};

const deleteProduct = (currentProducts, productId) =>
    currentProducts.filter(product => product.id !== productId);

const filterProductsByCategory = (currentProducts, category) =>
    category ? currentProducts.filter(product => product.category === category) : currentProducts;

const sortProducts = (currentProducts, sortBy) => {
    const sortedProducts = [...currentProducts];
    switch (sortBy) {
        case 'price':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'createdAt':
            sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'updatedAt':
            sortedProducts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            break;
        default:
            break;
    }
    return sortedProducts;
};

// UI функції
const createProductCard = (product) => {
    const li = document.createElement('li');
    li.className = 'product-card';
    li.dataset.id = product.id;

    li.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-id">ID: ${product.id}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-actions">
                <button class="edit-btn" data-id="${product.id}">Редагувати</button>
                <button class="delete-btn" data-id="${product.id}">Видалити</button>
            </div>
        </div>
    `;

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteProductHandler(product.id, li));

    const editButton = li.querySelector('.edit-btn');
    editButton.addEventListener('click', () => openEditModal(product.id));

    return li;
};

const refreshProductList = (items) => {
    jsProductList.innerHTML = '';
    if (items.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-list-message';
        emptyMessage.textContent = 'Наразі список товарів пустий. Додайте новий товар.';
        jsProductList.appendChild(emptyMessage);
        return;
    }
    items.forEach(product => jsProductList.appendChild(createProductCard(product)));
};

const updateTotalPriceDisplay = (total) => {
    jsTotalPrice.textContent = formatPrice(total);
};

const showSnackbar = (message) => {
    jsSnackbar.textContent = message;
    jsSnackbar.classList.add('show');
    setTimeout(() => {
        jsSnackbar.classList.remove('show');
    }, 3000);
};

const toggleModal = (show = false, editMode = false) => {
    jsAddEditModal.style.display = show ? 'block' : 'none';
    const modalTitle = jsAddEditModal.querySelector('h2');
    modalTitle.textContent = editMode ? 'Редагувати товар' : 'Додати новий товар';
    jsProductIdInput.parentElement.style.display = editMode ? 'block' : 'none';
    jsProductForm.reset();
    if (!show) {
        currentEditId = null;
    }
};

const openEditModal = (productId) => {
    console.log('openEditModal викликано для ID:', productId);
    const productToEdit = products.find(p => p.id === productId);
    if (productToEdit) {
        currentEditId = productId;
        jsProductIdInput.value = productToEdit.id;
        jsProductNameInput.value = productToEdit.name;
        jsProductPriceInput.value = productToEdit.price;
        jsProductCategorySelect.value = productToEdit.category;
        jsProductImageInput.value = productToEdit.image;
        toggleModal(true, true);
    }
};

const populateFilterButtons = (currentProducts) => {
    const categories = [...new Set(currentProducts.map(p => p.category))];
    jsFilterButtonsContainer.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.classList.toggle('active', activeCategoryFilter === category);
        button.addEventListener('click', () => filterByCategoryHandler(category));
        jsFilterButtonsContainer.appendChild(button);
    });
};

const updateFilterButtonsActiveState = (category) => {
    jsFilterButtonsContainer.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === category);
    });
};

const filterByCategoryHandler = (category) => {
    activeCategoryFilter = category === activeCategoryFilter ? null : category;
    updateFilterButtonsActiveState(activeCategoryFilter);
    applyFiltersAndSorting();
};

const resetFilterHandler = () => {
    activeCategoryFilter = null;
    updateFilterButtonsActiveState(null);
    applyFiltersAndSorting();
};

const handleSortButtonClick = (sortBy) => {
    currentSortOption = sortBy === currentSortOption ? null : sortBy;
    updateSortButtonsActiveState(currentSortOption);
    applyFiltersAndSorting();
};

const resetSortHandler = () => {
    currentSortOption = null;
    updateSortButtonsActiveState(null);
    applyFiltersAndSorting();
};

const updateSortButtonsActiveState = (sortBy) => {
    jsSortButtonsContainer.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sort === sortBy);
    });
};

const applyFiltersAndSorting = () => {
    const filteredByCategory = filterProductsByCategory(products, activeCategoryFilter);
    const sortedProducts = sortProducts(filteredByCategory, currentSortOption);
    refreshProductList(sortedProducts);
    updateTotalPriceDisplay(calculateTotalPrice(sortedProducts));
};

const deleteProductHandler = (productId, listItem) => {
    listItem.classList.add('removing');
    setTimeout(() => {
        products = deleteProduct(products, productId);
        refreshProductList(products);
        updateTotalPriceDisplay(calculateTotalPrice(products));
        populateFilterButtons(products);
        showSnackbar('Товар успішно видалено зі списку.');
    }, 300);
};

const saveProductHandler = (event) => {
    event.preventDefault();
    console.log('saveProductHandler викликано. currentEditId:', currentEditId);
    if (jsProductForm.checkValidity()) {
        console.log('Значення поля назви:', jsProductNameInput.value);
        const productData = {
            productName: jsProductNameInput.value.trim(),
            productPrice: jsProductPriceInput.value,
            productCategory: jsProductCategorySelect.value,
            productImage: jsProductImageInput.value.trim()
        };

        if (currentEditId) {
            products = updateProduct(products, currentEditId, productData);
            console.log('Масив products після оновлення:', products);
            showSnackbar(`Інформацію про товар (ID: ${currentEditId}, Назва: ${productData.productName}) успішно оновлено.`);
            setTimeout(() => {
                refreshProductList(products);
                console.log('Дані перед оновленням списку:', products);
                updateTotalPriceDisplay(calculateTotalPrice(products));
                populateFilterButtons(products);
                toggleModal(false);
            }, 50); // Затримка в 50 мілісекунд
        } else {
            const newProduct = addProduct(products, productData);
            products = [...products, newProduct];
            showSnackbar(`Товар "${newProduct.name}" успішно додано.`);
        }

        refreshProductList(products);
        console.log('Дані перед оновленням списку:', products);
        updateTotalPriceDisplay(calculateTotalPrice(products));
        populateFilterButtons(products);
        toggleModal(false);
    } else {
        jsProductForm.reportValidity();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    jsProductList = document.getElementById('product-list');
    jsTotalPrice = document.querySelector('.total-price');
    jsAddNewProductBtn = document.getElementById('add-new-product-btn');
    jsAddEditModal = document.getElementById('add-edit-modal');
    jsCloseModalBtn = document.getElementById('close-modal-btn');
    jsCancelModalBtn = document.getElementById('cancel-modal-btn');
    jsProductForm = document.getElementById('product-form');
    jsProductIdInput = document.getElementById('product-id');
    jsProductNameInput = document.getElementById('product-name');
    jsProductPriceInput = document.getElementById('product-price');
    jsProductCategorySelect = document.getElementById('product-category');
    jsProductImageInput = document.getElementById('product-image');
    jsSaveProductBtn = document.getElementById('save-product-btn');
    jsSnackbar = document.getElementById('snackbar');
    jsFilterButtonsContainer = document.getElementById('filter-buttons');
    jsResetFilterBtn = document.getElementById('reset-filter-btn');
    jsSortButtonsContainer = document.getElementById('sort-buttons');
    jsResetSortBtn = document.getElementById('reset-sort-btn');

    refreshProductList(products);
    updateTotalPriceDisplay(calculateTotalPrice(products));
    populateFilterButtons(products);
    updateFilterButtonsActiveState(activeCategoryFilter);
    updateSortButtonsActiveState(currentSortOption);


    jsAddNewProductBtn.addEventListener('click', () => toggleModal(true));
    jsCloseModalBtn.addEventListener('click', () => toggleModal(false));
    jsCancelModalBtn.addEventListener('click', () => toggleModal(false));
    jsSaveProductBtn.addEventListener('click', saveProductHandler);
    jsResetFilterBtn.addEventListener('click', resetFilterHandler);
    jsResetSortBtn.addEventListener('click', resetSortHandler);
    jsSortButtonsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            handleSortButtonClick(event.target.dataset.sort);
        }
    });
});