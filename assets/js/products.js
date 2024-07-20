let inputSearch = document.getElementById("searchName");
let inputPrice = document.getElementById("price");

const price = document.querySelector("#price");
const output = document.querySelector(".price-output");

output.textContent = price.value;
price.addEventListener("input", function () {
  output.textContent = price.value;et
});

function structureCard (img, product, marca, price, stock){
    return `<article
            class="flex flex-col gap-2 justify-evenly border-4 border-black border-solid bg-gradient-to-r from-blue-400 to-indigo-700 w-[230px] h-[400px] px-2 py-2 rounded text-ellipsis">
            <img class="w-[220px] h-1/2 rounded mb-2 border-4 border-black border-solid" src="${img}"
                alt="${product}, ${marca}" />
            <hr class="border" />
            <span class="font-bold pl-2 text-2xl mt-4 text-white">$${price}</span>
            <span class="px-2 mb-4 text-white">${product}</span>
            <span class="px-2 mb-4 text-white">${marca}</span>
            <span class="px-2 mb-4 text-white">${stock}</span>
        </article>`
}

function printCards(products) {
    let containerProducts = document.getElementById("containerProducts");
    let cards = "";
    products.forEach(product => {
        cards += structureCard(product['URL de Foto'], product['Tipo de Producto'], product.Marca, product["Precio (ARS)"], product.Stock);
    });
    containerProducts.innerHTML = cards;
}
printCards(products);

function searcImagesByMarc(marcas) {
   for (const marc of marcas) {
    let imageMarc = document.querySelector(`img[alt="${marc}"]`);
    console.log(imageMarc);
   }

}
searcImagesByMarc(marcs);