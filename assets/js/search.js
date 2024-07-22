let contenedorDetalles = document.getElementById("detailsContainer");
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

function formatCurrency2(amount) {
    return new Intl.NumberFormat('en-AR', { style: 'currency', currency: 'ARS' }).format(amount);
}

let objetoEncontrado = products.find(element => element.ID === parseInt(id));

if (objetoEncontrado) {
    contenedorDetalles.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-10 items-center p-6 bg-white rounded-2xl shadow-2xl">
            <!-- Product Image -->
            <div class="flex-shrink-0 w-full lg:w-1/2 bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                <img class="w-full h-full object-cover" src="${objetoEncontrado["URL de Foto"]}" alt="${objetoEncontrado.Modelo}">
            </div>

            <!-- Product Details -->
            <div class="flex-1 bg-white p-6 rounded-2xl shadow-lg">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">${objetoEncontrado["Tipo de Producto"]} ${objetoEncontrado.Marca} ${objetoEncontrado.Modelo}</h1>
                <h2 class="text-3xl font-semibold text-gray-800 mb-6">${formatCurrency2(objetoEncontrado["Precio (ARS)"])}</h2>
                <a href="#" id="paymentMethodsLink" class="text-blue-600 hover:text-blue-800 mb-6 block">Click here to see the payment methods</a>
                <div class="mb-6">
                    <span class="font-bold text-xl text-gray-900">Technical characteristics</span>
                    <p class="text-lg text-gray-700">${objetoEncontrado.Detalles}</p>
                </div>
                <div class="mb-6">
                    <span class="font-bold text-xl text-gray-900">Available stock</span>
                    <p id="productStock" class="text-lg text-gray-700">${objetoEncontrado.Stock}</p>
                </div>
                <div class="flex gap-4">
                    <button id="buyButton" class="bg-cyan-600 text-white p-4 font-bold rounded-2xl shadow-md hover:bg-cyan-700 transition duration-300">Buy</button>
                    <button id="buttonAddCartDetails" class="bg-gray-600 text-white p-4 font-bold rounded-2xl shadow-md hover:bg-gray-700 transition duration-300">Add to shopping cart</button>
                </div>
            </div>
        </div>
    `;
} else {
    contenedorDetalles.innerHTML = "<p class='text-center text-white'>Product not found.</p>";
}

// Show modal
let buyButton = document.getElementById('buyButton');
buyButton.addEventListener('click', function() {
    showModal();
});

function showModal() {
    let modal = document.getElementById('buyModal');
    modal.classList.remove('hidden');
}

// Close modal
let closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', function() {
    let modal = document.getElementById('buyModal');
    modal.classList.add('hidden');
});

// Show payment methods image
let paymentMethodsLink = document.getElementById('paymentMethodsLink');
paymentMethodsLink.addEventListener('click', function(event) {
    event.preventDefault();
    let paymentMethodsModal = document.getElementById('paymentMethodsModal');
    paymentMethodsModal.classList.remove('hidden');
});

// Close payment methods modal
let closePaymentMethods = document.getElementById('closePaymentMethods');
closePaymentMethods.addEventListener('click', function() {
    let paymentMethodsModal = document.getElementById('paymentMethodsModal');
    paymentMethodsModal.classList.add('hidden');
});

let buttonAddCartDetails = document.getElementById('buttonAddCartDetails');
buttonAddCartDetails.addEventListener('click', function() { 
    addToCart(id); // Asegurarse de que se pasa el id correcto del producto
});

let cartNavButtonDetails = document.getElementById('cartNavButtonDetails');
cartNavButtonDetails.addEventListener('click', function() {
    document.getElementById('cartProductsDetails').classList.toggle('hidden');
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
        product.Stock--; // Decrementa el stock directamente aquí

        let productInCart = cart.find(item => item.ID === id);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            const productToAdd = { ...product, quantity: 1 };
            cart.push(productToAdd);
        }
        updateCart();
        updateProductDetailView(id); // Asegúrate de pasar el id correcto para actualizar la vista del producto
    }
}

function updateProductDetailView(productId) {
    let product = products.find(p => p.ID === productId);
    if (product) {
        // Suponiendo que tienes un elemento que muestra el stock, por ejemplo, <span id="productStock">10</span>
        document.getElementById('productStock').innerText = product.Stock;
    }
}

let cart = [];

function updateCart() {
    let cartHTML = '';
    let total = 0;
    cart.forEach(product => {
        total += product['Precio (ARS)'] * product.quantity;
        cartHTML += `
            <div class="flex items-center justify-between text-white p-2 m-2 bg-gray-600 rounded-lg>
                <img src="${product['URL de Foto']}" alt="${product['Tipo de Producto']}" class="w-12 h-12 rounded mr-2">
                <div class="flex-grow">
                    <p class="font-bold">${product['Tipo de Producto']}</p> 
                    <p>Price:  ${formatCurrency2(product['Precio (ARS)'])}</p>
                   <p>Brand: ${product.Marca}</p>
                <p>
                        Quantity:
                        <select onchange="updateQuantity(${product.ID}, this.value)" class="border rounded text-black">
                        ${Array.from({ length: product.Stock + product.quantity }, (_, i) => `<option value="${i + 1}" ${product.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                    </p>
                </div>
                <button onclick="removeFromCart(${product.ID})" class="bg-red-500 text-white px-2 py-1 rounded">X</button>
            </div>`;
    });
    if (cart.length > 0) {
        cartHTML += `<button id="checkoutButton" onclick="showModal()" class="bg-green-500 text-white px-4 py-2 rounded mt-2">Buy</button>`;
    }
    cartHTML += `
     <div class="p-4 text-black">Total: <span id="totalPrice" class="font-bold">${formatCurrency2(total)}</span></div>
    <button id="emptyCartButton" onclick="emptyCart()" class="bg-red-500 text-white px-4 py-2 rounded mt-2">Empty Cart</button>
    `;
    document.getElementById('cartProductsDetails').innerHTML = cartHTML; // Actualizar el contenedor correcto
}

// Asegúrate de definir la función checkout() para manejar la lógica de compra
let buyButtonCart = document.getElementById('buyButton');
buyButton.addEventListener('click', function() {
    showModal();
});

function removeFromCart(productId) {
    const productIndex = cart.findIndex(product => product.ID === productId);
    if (productIndex !== -1) {
        const product = products.find(product => product.ID === productId);
        if (product) {
            product.Stock += cart[productIndex].quantity; // Incrementa el stock
            cart.splice(productIndex, 1); // Elimina el producto del carrito
            updateCart();
            updateProductDetailView(productId);
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
    updateProductDetailView(productId);
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
        updateProductDetailView(productId);
        printCards(products); // Actualiza las tarjetas de productos para reflejar el cambio de stock
    }
}