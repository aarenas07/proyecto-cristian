const formulario = document.querySelector("#formulario");


//crear evento

formulario.addEventListener("submit", validarFormulario)



//funciones
function llamadoApi (url, body) {
    fetch(url, {
        method: "POST",
        body: body,
        headers:{
            "Content-Type": "application/json"
        }

    })
        .then(res => res.json())
        .then(data => console.log("data", data))
        .catch(err => console.error(err))
}


function validarFormulario (e) {
    e.preventDefault()
    const url = "http://localhost:3000/informacionCliente"
    const nombre = document.querySelector("#nombre").value
    const identificacion = document.querySelector("#identificacion").value
    const email = document.querySelector("#email").value
    const celular = document.querySelector("#celular").value
    const numeroTarjeta = document.querySelector("#numeroTarjeta").value

    const body ={
        "nombre": nombre,
        "cedula": identificacion,
        "email": email,
        "celular": celular,
        "numeroTarjeta": numeroTarjeta
    }


    const payload = JSON.stringify(body)


    llamadoApi(url, payload)


}



