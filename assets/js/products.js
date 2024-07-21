document.addEventListener('DOMContentLoaded', function () {
    // Asegúrate de que esta línea se ejecute después de que el array de productos esté definido
    printCards(products); // Carga inicial de todas las tarjetas
    document.getElementById('emptyCartButton').addEventListener('click', emptyCart);
});

let inputSearch = document.getElementById("searchName");

function selectBrand(element) {
    // Comprueba si la marca ya estaba seleccionada
    if (element.classList.contains('selectedBrand')) {
        element.classList.remove('selectedBrand'); // Deselecciona la marca
    } else {
        // Deselecciona cualquier marca previamente seleccionada
        document.querySelectorAll('.selectedBrand').forEach(el => el.classList.remove('selectedBrand'));
        element.classList.add('selectedBrand'); // Selecciona la nueva marca
    }
    filterProducts(); // Actualiza los productos filtrados
}

function filterProducts() {
    let selectedBrandElement = document.querySelector('.selectedBrand');
    let marcsSelected = selectedBrandElement ? selectedBrandElement.getAttribute('data-marca') : null;
    let nameSearch = document.getElementById("searchName").value.trim().toLowerCase();
    let priceMin = Number(document.getElementById("priceMin").value) || 0;
    let priceMax = Number(document.getElementById("priceMax").value) || Number.MAX_SAFE_INTEGER;

    let filteredProducts = products.filter(product => {
        let matchesMarca = !marcsSelected || product.Marca === marcsSelected;
        let matchesName = nameSearch === '' || product['Tipo de Producto'].toLowerCase().includes(nameSearch);
        let matchesPrice = (!priceMin || product['Precio (ARS)'] >= priceMin) && (!priceMax || product['Precio (ARS)'] <= priceMax);
        return matchesMarca && matchesName && matchesPrice;
    });

    printCards(filteredProducts);
}

// Event listeners para búsqueda dinámica
inputSearch.addEventListener("input", filterProducts);
document.getElementById("priceMin").addEventListener("input", filterProducts);
document.getElementById("priceMax").addEventListener("input", filterProducts);

// Obtener todas las imágenes que representan marcas y añadir el escuchador de eventos
const marcaImages = document.querySelectorAll('img[data-marca]');
marcaImages.forEach(image => {
    image.addEventListener('click', function(event) {
        marcaImages.forEach(img => img.classList.remove('selected')); // Remover la clase 'selected' de todas las imágenes
        event.target.classList.add('selected'); // Añadir la clase 'selected' a la imagen clickeada
        filterProducts(); // Filtrar productos con la marca seleccionada
    });
});

// Corrección en la función de formato de moneda
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AR', { style: 'currency', currency: 'ARS' }).format(amount);
}

// Función para estructurar una tarjeta de producto
function structureCard(id, img, product, brand, price, stock) {
    let stockMessage = '';
    let addToCartButton = `<button onclick="addToCart(${id})" class="add-to-cart-btn">Añadir al Carrito</button>`;

    if (stock <= 0) {
        stockMessage = '<span class="px-2 mb-4 text-xl text-red-500">Out of Stock!</span>';
        addToCartButton = ''; // No mostrar el botón de añadir al carrito si no hay stock
    } else if (stock <= 5) {
        stockMessage = '<span class="px-2 mb-4 text-xl text-red-500">Last units!</span>';
    } else {
        stockMessage = `<span class="px-2 mb-4 text-xl">Available Stock: ${stock}</span>`;
    }

    return `<article class="flex flex-col gap-2 justify-center bg-white px-2 py-2 rounded text-ellipsis border-2 border-gray-200 hover:shadow hover:shadow-gray-400 hover:shadow-xl">
            <img class="w-[220px] h-[150px] rounded mb-2 border-black border-solid object-cover" src="${img}" alt="${product}, ${brand}" />
            <hr class="border" />
            <span class="font-bold pl-2 text-2xl mt-4">${price}</span>
            <span class="px-2 mb-4 text-xl">${product}</span>
            <span class="px-2 mb-4 text-xl">Brand: ${brand}</span>
            ${stockMessage}
            <a href="./search.html?id=${id}">Details Product</a>
            ${addToCartButton}
            </article>`;
}

function printCards(products) {
    let containerProducts = document.getElementById("containerProducts");
    let cards = "";
    if (products.length === 0) {
        containerProducts.innerHTML = `<p>¡Resultados no encontrados!</p>`;
        return;
    }
    products.forEach(product => {
        const priceProduct = formatCurrency(product["Precio (ARS)"]);
        cards += structureCard(product.ID, product['URL de Foto'], product['Tipo de Producto'], product.Marca, priceProduct, product.Stock);
    });
    containerProducts.innerHTML = cards;
}

// Paso 1: Desplegar el Carrito
document.getElementById('cartNavButton').addEventListener('click', function() {
    document.getElementById('cartProducts').classList.toggle('hidden');
});

// Función para mostrar los productos en el carrito
function displayCartItems() {
    const cartContainer = document.getElementById('cartProducts');
    cartContainer.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos elementos

    cartItems.forEach(item => {
        const itemHTML = `
            <div class="flex flex-row justify-between items-center bg-gray-100 p-2 m-2 rounded">
                <img src="${item['URL de Foto']}" alt="${item['Tipo de Producto']}" class="w-20 h-20 rounded">
                <div>
                    <p>${item['Tipo de Producto']}</p>
                    <p>Brand: ${item.Marca}</p>
                    <p>Price: ${item["Precio (ARS)"]}</p>
                    <p>Amount: <button onclick="decreaseQuantity(${item.ID})">-</button> ${item.quantity} <button onclick="increaseQuantity(${item.ID})">+</button></p>
                    <p>Available Stock: ${item.Stock}</p>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });
}

// Funciones para actualizar la cantidad de productos en el carrito
function increaseQuantity(productId) {
    const product = cartItems.find(item => item.id === productId);
    if (product.quantity < product.Stock) {
        product.quantity++;
        displayCartItems(); // Actualizar la visualización del carrito
    }
}

function decreaseQuantity(productId) {
    const product = cartItems.find(item => item.id === productId);
    if (product.quantity > 1) {
        product.quantity--;
        displayCartItems(); // Actualizar la visualización del carrito
    }
}

// Inicializar la visualización del carrito al cargar la página
document.addEventListener('DOMContentLoaded', displayCartItems);


// Añadir producto al carrito
function addToCart(productId) {
    const id = parseInt(productId, 10); // Convierte a número si es necesario
    const product = products.find(product => product.ID === id);

    if (product && product.Stock > 0) {
        product.Stock--; // Decrementa el stock
        let productInCart = cart.find(item => item.ID === id);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            const productToAdd = { ...product, quantity: 1 };
            cart.push(productToAdd);
        }
        updateCart();
        printCards(products); // Actualiza las tarjetas de productos para reflejar el cambio de stock
    }
}

let cart = [];

function updateCart() {
    let cartHTML = '';
    let total = 0;
    cart.forEach(product => {
        total += product['Precio (ARS)'] * product.quantity;
        cartHTML += `
            <div class="cart-item">
                <img src="${product['URL de Foto']}" alt="${product['Tipo de Producto']}" style="width: 50px; height: auto;">
                ${product['Tipo de Producto']} - ${formatCurrency(product['Precio (ARS)'])} - Brand: ${product.Marca}
                <select onchange="updateQuantity(${product.ID}, this.value)">` +
            Array.from({ length: product.Stock + product.quantity }, (_, i) => `<option value="${i + 1}" ${product.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('') +
            `</select>
                <button onclick="removeFromCart(${product.ID})">X</button>
            </div>`;
    });
    cartHTML += `<div>Total: $<span id="totalPrice">${formatCurrency(total)}</span></div>
    <button id="emptyCartButton" onclick="emptyCart()">Empty Cart</button>
`;
    document.getElementById('cartProducts').innerHTML = cartHTML;
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(product => product.ID === productId);
    if (productIndex !== -1) {
        const product = products.find(product => product.ID === productId);
        if (product) {
            product.Stock += cart[productIndex].quantity; // Incrementa el stock
            cart.splice(productIndex, 1); // Elimina el producto del carrito
            updateCart();
            printCards(products); // Actualiza las tarjetas de productos para reflejar el cambio de stock
        }
    }
}

function emptyCart() {
    cart.forEach(productInCart => {
        const product = products.find(product => product.ID === productInCart.ID);
        if (product) {
            product.Stock += productInCart.quantity; // Restaura el stock
        }
    });
    cart = [];
    updateCart();
    printCards(products); // Actualiza las tarjetas de productos para reflejar el cambio de stock
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

// Event listeners para la búsqueda dinámica
inputSearch.addEventListener("input", filterProducts);
document.getElementById("priceMin").addEventListener("input", filterProducts);
document.getElementById("priceMax").addEventListener("input", filterProducts);

// Obtener todas las imágenes que representan marcas y añadirles un event listener
const brandImages = document.querySelectorAll('img[data-brand]');
brandImages.forEach(image => {
    image.addEventListener('click', function (event) {
        brandImages.forEach(img => img.classList.remove('selected')); // Elimina la clase 'selected' de todas las imágenes
        event.target.classList.add('selected'); // Añade la clase 'selected' a la imagen clickeada
        filterProducts(); // Filtra los productos con la marca seleccionada
    });
});
