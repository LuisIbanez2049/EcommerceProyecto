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
                    <p class="text-lg text-gray-700">${objetoEncontrado.Stock}</p>
                </div>
                <div class="flex gap-4">
                    <button id="buyButton" class="bg-cyan-600 text-white p-4 font-bold rounded-2xl shadow-md hover:bg-cyan-700 transition duration-300">Buy</button>
                    <button class="bg-gray-600 text-white p-4 font-bold rounded-2xl shadow-md hover:bg-gray-700 transition duration-300">Add to shopping cart</button>
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