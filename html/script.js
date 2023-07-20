/* POST json-server */
 
const formulario = document.querySelector("#formulario");


//crear evento

formulario.addEventListener("submit", validarFormulario)



//funciones
function handleFetch(url, body) {
    fetch(url, {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then(res => res.json())
        .then(data => console.log("data", data))
        .catch(err => console.error(err))
}


function validarFormulario(e) {
    e.preventDefault()
    console.log("validando")
    const url = "http://localhost:3000/informacionCliente"
    const nombre = document.querySelector("#nombre").value
    const identificacion = document.querySelector("#identificacion").value
    const email = document.querySelector("#email").value
    const celular = document.querySelector("#celular").value
    const numeroTarjeta = document.querySelector("#numeroTarjeta").value

    const body = {
        "nombre": nombre,
        "cedula": identificacion,
        "email": email,
        "celular": celular,
        "numeroTarjeta": numeroTarjeta
    }


    const payload = JSON.stringify(body)


    handleFetch(url, payload)
    
    document.querySelector("#ModalCheckout").style.display = 'none';
    document.querySelector("#truck-modal").style.display = 'none';


    Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
    )

}

 

const openModal = document.querySelector("#btn_show_modal")

openModal.addEventListener("click", () => {
    Swal.fire({
        title: 'Login Form',
        html: `<input type="text" id="login"  placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button type="submit" onclick=validarFormulario()>
        `,
        confirmButtonText: 'sign in',

        focusConfirm: false,
        preConfirm: () => {
            validarFormulario()
            const login = Swal.getPopup().querySelector('#login').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!login || !password) {
                Swal.showValidationMessage(`Please enter login and password`)
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        Swal.fire(`
          Hola
        `.trim())
    })

})


//se empieza con los + y -
//se hixo el cambio de cantidad de articulos ingresado por el usuaro (parte add to card)

let minusBtn = document.querySelector(".input__minus");
let plusBtn = document.querySelector(".input__plus");
let userInput = document.querySelector(".input__number");

let userInputNumber = 0;

plusBtn.addEventListener("click", () => {
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log("UserInputNumber");
});

minusBtn.addEventListener("click", () => {
    userInputNumber--;
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
});

//paso 2:  cuando se presiona el boton add to cart se agrega el producto al carrito ( parte superior)

const addToCartButton = document.querySelector(".reference__button");
//el cartNotificacion va a ser una noticacion de cuando s egrega un producto
let cartNotification = document.querySelector(".header_cart--notification");

let lastValue = parseInt(cartNotification.innerText);

//addTocartbutton genera una funcion
 addToCartButton.addEventListener("click", () => {
    //el ineerText permite adicionar el texto que esta en la variable de userInputNumber (la cantidad que se haya agregado en add to cart)

    lastValue = lastValue + userInputNumber;

    localStorage.setItem("carrito", userInputNumber);
    cartNotification.innerText = lastValue;
    cartNotification.style.display = "block";
    drawProductInModal();

}); 

//**************mostrar el modal con el detalle del carrito 
const cartIconButton = document.querySelector(".header_cart");
const cartModal = document.querySelector(".truck-modal");
/* let priceModal = document.querySelector(".truck-modal__price"); */
const productContainer = document.querySelector(".truck_modal__checkout-container");


cartIconButton.addEventListener("click", () => {
    //toggle cambia, si ya existe la clse la quita, si no la tiene la agrega 
    cartModal.classList.toggle("show");
    //se agrega el else y el texto en el if para que cuando apenas se ingrese y el carro esta vacion mostrar mensaje, cuando se agrega un producto aparece la cantida....
    if (lastValue == 0) {
        productContainer.innerHTML = `<p class="cart-empty"> Your cart is empty</p>`;
    } else {
        drawProductInModal();
    }

    //**************** */ parte checkout********

    const ButtonCheckaut = document.querySelector(".truck-modal__delete");
    let ModalCheckaut = document.querySelector(".ModalCheckout");

    ButtonCheckaut.addEventListener("click", () => {
        ModalCheckaut.style.display = "block"

    })
});
//se va a crear funcion asyncrona

/* let formulario1 = document.getElementById("formulario-2") */
let btnGuardar = document.getElementById("truck-modal__guardar")
let btnEliminar = document.getElementById("truck-modal__eliminar")


// el DomCONTENT SE EJECUTA CUANDO EL HTML YA SE HA CARGADO 
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("id").style.display = "none"
    document.getElementById("label-edit").style.display = "none"
    document.getElementById("id").readOnly = true
})

let email = document.getElementById("email")

email.addEventListener("input", () => {
    document.getElementById("id").style.display = "none"
    document.getElementById("label-edit").style.display = "none"

})
// CARGAR API
//1 se levanta (servidor)la terminal con bash (json-server --watch bdUsuario.json (el bdUsuario.json  es la ubicacion del document))


//SE VA A CAPTURAR INFORMACION DEL FORMULARIO 




//cambiar imagenes cuando se precione las flechas
const imageContainer = document.querySelector(".tunnel__image-container");
const nextGalleryBtn = document.querySelector(".tunnel__next")
const previousGalleryBtn = document.querySelector(".tunnel__previous")
let imgIndex = 1;


nextGalleryBtn.addEventListener("click", () => {
    changeNext(imageContainer);
});
previousGalleryBtn.addEventListener("click", () => {
    changePrevious(imageContainer);
});


//mostrar el modal de imagenes cuando se hace click en la imagen principal//

const imagesModal = document.querySelector(".modal-tunnel__background");
const closeModalBtn = document.querySelector(".modal-tunnel__close")

imageContainer.addEventListener("click", () => {
    imagesModal.style.display = "grid";
});

closeModalBtn.addEventListener("click", () => {
    imagesModal.style.display = "none";
})

//funciones//

function changeNext(imgContainer) {
    if (imgIndex === 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
    }
    imageContainer.style.backgroundImage = `url("./images/image-product-${imgIndex}.jpg")`;
}
function changePrevious(imgContainer) {
    if (imgIndex === 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
    }
    imageContainer.style.backgroundImage = `url("./images/image-product-${imgIndex}.jpg")`;
}
// camciar las imagenes desde los thumnails//

let Thumbnails = document.querySelectorAll(".tunnel__thumnail")
Thumbnails = [...Thumbnails]

Thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", event => {
        console.log(event.target.id);
        imageContainer.style.backgroundImage = `url("./images/image-product-${event.target.id}.jpg")`;
    });
});

// cambiar las imagenes primcipales desde los thumbnails en el modal//

let modalThumbnails = document.querySelectorAll(".modal-tunnel__thumnail");
const ModalImageContainer = document.querySelector(".modal-tunnel__image-container")
modalthumbnails = [...modalThumbnails]

modalThumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener("click", event => {
        console.log(event.target.id.slice(-1))

        modalImageContainer.style.backgroundImage = `url("./images/image-product-${event.target.id.slice(-1)}.jpg")`;
    });
});

// cambiar imagen principal de modal desde flechas en el modal//
const PreviousModalBtn = document.querySelector(".modal-tunnel__previous");
const NextModalBtn = document.querySelector(".modal-tunnel__next");


previousModalBtn.addEventListener("click", () => {
    changePreviousimg(modalImageContainer)
});

nextModalBtn.addEventListener("click", () => {
    changeNextimg(modalImageContainer)
});




///////////////(Borra el contenido del carrito) se sigue con la papelera ////////

function deleteProduct() {
    const deleteProductBtn = document.querySelector(".delete");

    deleteProductBtn.addEventListener("click", () => {
        productContainer.innerHTML = `<p class="cart-empty"> Your cart is empty</p>`;
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}



// funciones

//se llama cada que se presiona el add to cart
function drawProductInModal() {
    productContainer.innerHTML = `
    <div class="truck_modal__deatils-container">
    <img class="truck-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="uno">
    <div>
        <p class="truck-modal__product">Autumn Limited Edition..</p>
        <p class="truck-modal__price">$125 x3 <span>$375.00</span></p>
    </div>
    <img class="delete" src="./images/icon-delete.svg" alt="delete">
    </div>
    <button class="truck-modal__delete">Checkout</button>`
    deleteProduct()
    let priceModal = document.querySelector(".truck-modal__price");
    priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue * 125}.00</span>`;

}
















