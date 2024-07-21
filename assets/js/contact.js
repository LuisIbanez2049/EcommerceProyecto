// seccion contact alert

const botonEnviar = document.querySelector("#botonEnviar")
const nombre = document.querySelector("#firstName")
const apellido = document.querySelector("#lastName")
const email = document.querySelector("#email")
const telefono = document.querySelector("#phone")

botonEnviar.addEventListener("click", () => {
    console.log("boton presionado");
    if (nombre.value !== "" && apellido.value !== "" && email.value !== "" && telefono.value !== "") {
        alert(`The form was sent successfully!!. 
Thank you for your registration, we will be in touch
    `)
    }
    
})