let contenedorDetalles = document.getElementById("detailsContainer")
let urlParams = new URLSearchParams(window.location.search)
let id = urlParams.get("id")

function formatCurrency2(amount) {
    return new Intl.NumberFormat('en-AR', { style: 'currency', currency: 'ARS' }).format(amount);
}

let objetoEncontrado = products.find(element => element.ID === parseInt(id))

contenedorDetalles.innerHTML = `<div class="border-4 border-black border-solid w-3/5 h-2/5">
                <img class="w-full h-full" src="${objetoEncontrado["URL de Foto"]}" alt="">
            </div>
            <div class="flex flex-col gap-8 justify-center items-center py-10 px-4 border border-gray-300 border-opacity-25 w-4/5 h-[580px] rounded-xl">
                <h1 class="text-5xl text-center">${objetoEncontrado["Tipo de Producto"]} ${objetoEncontrado.Marca} ${objetoEncontrado.Modelo} </h1>
                <h2 class="text-3xl">${formatCurrency2(objetoEncontrado["Precio (ARS)"])}</h2>
                <a href="#"><span class="text-gray-800">Click here to see the payment methods</span></a>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <span class="font-bold text-2xl">Technical characteristics</span>
                    <span class="text-xl">${objetoEncontrado.Detalles}</span>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <span class="font-bold text-2xl">Available stock</span>
                    <span class="text-xl">${objetoEncontrado.Stock}</span>
                </div>
                <div class="flex gap-14">
                    <button class="border-4 border-grey border-solid p-4 font-bold rounded-xl">Buy</button>
                    <button class="border-4 border-grey border-solid p-4 font-bold rounded-xl">Add to shopping cart</button>
                </div>
            </div>`

