document.addEventListener('DOMContentLoaded', function() {
    printCards(products); // Carga inicial de todas las tarjetas
    document.getElementById('emptyCartButton').addEventListener('click', emptyCart);
});

function selectBrand(element) {
    if (element.classList.contains('selectedBrand')) {
        element.classList.remove('selectedBrand');
    } else {
        document.querySelectorAll('.selectedBrand').forEach(el => el.classList.remove('selectedBrand'));
        element.classList.add('selectedBrand');
    }
    filterProducts();
}

function filterProducts() {
    let selectedBrandElement = document.querySelector('.selectedBrand');
    let marcsSelected = selectedBrandElement ? selectedBrandElement.getAttribute('data-marca') : null;
    let nameSearchNav = document.getElementById("searchNameNav").value.trim().toLowerCase();
    let nameSearch = document.getElementById("searchName").value.trim().toLowerCase();
    let priceMin = Number(document.getElementById("priceMin").value) || 0;
    let priceMax = Number(document.getElementById("priceMax").value) || Number.MAX_SAFE_INTEGER;

    let filteredProducts = products.filter(product => {
        let matchesMarca = !marcsSelected || product.Marca.toLowerCase() === marcsSelected.toLowerCase();
        let matchesName = (nameSearch === '' || product['Tipo de Producto'].toLowerCase().includes(nameSearch) || product['Marca'].toLowerCase().includes(nameSearch)) && (nameSearchNav === '' || product['Marca'].toLowerCase().includes(nameSearchNav) || product['Tipo de Producto'].toLowerCase().includes(nameSearchNav));
        let matchesPrice = (!priceMin || product['Precio (ARS)'] >= priceMin) && (!priceMax || product['Precio (ARS)'] <= priceMax);
        return matchesMarca && matchesName && matchesPrice;
    });

    printCards(filteredProducts);
}




let inputSearch = document.getElementById("searchName");
let inputSearchNav = document.getElementById("searchNameNav");


inputSearch.addEventListener("input", filterProducts);
inputSearchNav.addEventListener("input", filterProducts);
document.getElementById("priceMin").addEventListener("input", filterProducts);
document.getElementById("priceMax").addEventListener("input", filterProducts);
// Obtener todas las imágenes que representan marcas y añadir el escuchador de eventos
const marcaImages = document.querySelectorAll('img[data-marca]');
marcaImages.forEach(image => {
    image.addEventListener('click', function(event) {
        marcaImages.forEach(img => img.classList.remove('selected'));
        event.target.classList.add('selected');
        filterProducts();
    });
});

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AR', { style: 'currency', currency: 'ARS' }).format(amount);
}

function structureCard(id, img, product, brand, price, stock) {
    let stockMessage = '';
    let addToCartButton = `<button onclick="addToCart(${id})" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">Añadir al Carrito</button>`;

    if (stock <= 0) {
        stockMessage = '<span class="text-red-500">Out of Stock!</span>';
        addToCartButton = '';
    } else if (stock <= 5) {
        stockMessage = '<span class="text-red-500">Last units!</span>';
    } else {
        stockMessage = `<span>Available Stock: ${stock}</span>`;
    }

    return `
        <article class="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img class="w-48 h-48 object-cover mb-4 rounded-lg" src="${img}" alt="${product}, ${brand}" />
            <div class="text-center">
                <span class="text-xl font-bold">${price}</span>
                <span class="block text-lg">${product}</span>
                <span class="block text-gray-600">Brand: ${brand}</span>
                ${stockMessage}
                <a href="./search.html?id=${id}" class="text-blue-500 hover:underline mt-2 block">Details Product</a>
                ${addToCartButton}
            </div>
        </article>`;
}

// Función para imprimir tarjetas de productos
function printCards(products) {
    let containerProducts = document.getElementById("containerProducts");
    let cards = "";
    if (products.length === 0) {
        // Si no hay productos, muestra un mensaje de "Results not found!"
        containerProducts.innerHTML = `<p>Results not found!</p>`;
        return; // Termina la ejecución de la función aquí
    }
    products.forEach(product => {
        const priceProduct = formatCurrency(product["Precio (ARS)"]);
        cards += structureCard(product.ID, product['URL de Foto'], product['Tipo de Producto'], product.Marca, priceProduct, product.Stock);
    });
    containerProducts.innerHTML = cards;
}

document.getElementById('cartNavButton').addEventListener('click', function() {
    document.getElementById('cartProducts').classList.toggle('hidden');
});

function displayCartItems() {
    const cartContainer = document.getElementById('cartProducts');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemHTML = `
            <div class="flex items-center bg-gray-100 p-4 rounded-lg mb-4">
                <img src="${item['URL de Foto']}" alt="${item['Tipo de Producto']}" class="w-20 h-20 rounded mr-4">
                <div class="flex-grow">
                    <p>${item['Tipo de Producto']}</p>
                    <p>Brand: ${item.Marca}</p>
                    <p>Price: ${formatCurrency(item["Precio (ARS)"])}</p>
                    <p>
                        Amount: 
                        <button onclick="decreaseQuantity(${item.ID})" class="px-2">-</button> 
                        ${item.quantity} 
                        <button onclick="increaseQuantity(${item.ID})" class="px-2">+</button>
                    </p>
                    <p>Available Stock: ${item.Stock}</p>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });
}

function increaseQuantity(productId) {
    const product = cartItems.find(item => item.ID === productId);
    if (product.quantity < product.Stock) {
        product.quantity++;
        displayCartItems();
    }
}

function decreaseQuantity(productId) {
    const product = cartItems.find(item => item.ID === productId);
    if (product.quantity > 1) {
        product.quantity--;
        displayCartItems();
    }
}

document.addEventListener('DOMContentLoaded', displayCartItems);

function addToCart(productId) {
    const id = parseInt(productId, 10);
    const product = products.find(product => product.ID === id);

    if (product && product.Stock > 0) {
        product.Stock--;
        let productInCart = cart.find(item => item.ID === id);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            const productToAdd = { ...product, quantity: 1 };
            cart.push(productToAdd);
        }
        updateCart();
        printCards(products);
    }
}

let cart = [];

function updateCart() {
    let cartHTML = '';
    let total = 0;
    cart.forEach(product => {
        total += product['Precio (ARS)'] * product.quantity;
        cartHTML += `
            <div class="flex items-center justify-between p-2 m-2 bg-gray-200 rounded-lg">
                <img src="${product['URL de Foto']}" alt="${product['Tipo de Producto']}" class="w-12 h-12 rounded mr-2">
                <div class="flex-grow">
                    <p class="font-bold">${product['Tipo de Producto']}</p>
                    <p>Brand: ${product.Marca}</p>
                    <p>Price: ${formatCurrency(product['Precio (ARS)'])}</p>
                    <p>
                        Quantity:
                        <select onchange="updateQuantity(${product.ID}, this.value)" class="border rounded">
                            ${Array.from({ length: product.Stock + product.quantity }, (_, i) => `<option value="${i + 1}" ${product.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                    </p>
                </div>
                <button onclick="removeFromCart(${product.ID})" class="bg-red-500 text-white px-2 py-1 rounded">X</button>
            </div>
        `;
    });
    cartHTML += `<div class="p-4">Total: <span id="totalPrice" class="font-bold">${formatCurrency(total)}</span></div>
    <button id="emptyCartButton" onclick="emptyCart()" class="bg-red-500 text-white px-4 py-2 rounded mt-2">Empty Cart</button>
    `;
    document.getElementById('cartProducts').innerHTML = cartHTML;
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(product => product.ID === productId);
    if (productIndex !== -1) {
        const product = products.find(product => product.ID === productId);
        if (product) {
            product.Stock += cart[productIndex].quantity;
            cart.splice(productIndex, 1);
            updateCart();
            printCards(products);
        }
    }
}

function emptyCart() {
    cart.forEach(productInCart => {
        const product = products.find(product => product.ID === productInCart.ID);
        if (product) {
            product.Stock += productInCart.quantity;
        }
    });
    cart = [];
    updateCart();
    printCards(products);
}

function updateQuantity(productId, quantity) {
    const product = cart.find(product => product.ID === productId);
    if (product) {
        const difference = parseInt(quantity, 10) - product.quantity;
        product.quantity = parseInt(quantity, 10);
        const productInStock = products.find(product => product.ID === productId);
        if (productInStock) {
            productInStock.Stock -= difference; // Actualiza el stock
        }
        updateCart();
        printCards(products); // Actualiza las tarjetas de productos para reflejar el cambio de stock
    }
}

// // Event listeners para la búsqueda dinámica
// inputSearch.addEventListener("input", filterProducts);
// document.getElementById("priceMin").addEventListener("input", filterProducts);
// document.getElementById("priceMax").addEventListener("input", filterProducts);

// // Obtener todas las imágenes que representan marcas y añadirles un event listener
// const brandImages = document.querySelectorAll('img[data-brand]');
// brandImages.forEach(image => {
//     image.addEventListener('click', function (event) {
//         brandImages.forEach(img => img.classList.remove('selected')); // Elimina la clase 'selected' de todas las imágenes
//         event.target.classList.add('selected'); // Añade la clase 'selected' a la imagen clickeada
//         filterProducts(); // Filtra los productos con la marca seleccionada
//     });
// });