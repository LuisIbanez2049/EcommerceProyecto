let inputSearch = document.getElementById("searchName");

// Función para estructurar una tarjeta de producto
function structureCard(id, img, product, marca, price, stock) {
    return `<a href="./search.html?id=${id}"><article class="flex flex-col gap-2 justify-center bg-white px-2 py-2 rounded text-ellipsis border-2 border-gray-200 hover:shadow hover:shadow-gray-400 hover:shadow-xl">
            <img class="w-[220px] h-[150px] rounded mb-2 border-black border-solid object-cover" src="${img}" alt="${product}, ${marca}" />
            <hr class="border" />
            <span class="font-bold pl-2 text-2xl mt-4">${price}</span>
            <span class="px-2 mb-4 text-xl">${product}</span>
            <span class="px-2 mb-4 text-xl">Brand: ${marca}</span>
            <span class="px-2 mb-4 text-xl">Available stock: ${stock}</span>
        </article></a>`;
}

// Función para formatear la moneda en USD
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AR', { style: 'currency', currency: 'ARS' }).format(amount);
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

document.addEventListener('DOMContentLoaded', function() {
    // Asegúrate de que esta línea se ejecute después de que el array de productos esté definido
    printCards(products); // Carga inicial de todas las tarjetas
});

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