console.log("alertaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    console.log("UserInputNumber");
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



///////////////(Borra el contenido del carrito) se sigue con la papelera ////////

function deleteProduct() {
    const deleteProductBtn = document.querySelector(".delete");

    deleteProductBtn.addEventListener("click", () => {
        productContainer.innerHTML = `<p class="cart-empty"> Your cart is empty</p>`;
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });
}











// CAMBIAR LAS IMAGENES PRINCIPALES DESDE LOS THUMBNAILS
let thumbnails = document.querySelectorAll(".tunnel__thumnail")
/* console.log(thumbnails) */
thumbnails = [...thumbnails]

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", event => {
        console.log(event.target.id)


    });
});

// CAMBIAR LAS IMAGENES PRINCIPALES DESDE LOS THUMBNAILS en el modal 
let modalthumbnails = document.querySelectorAll(".modal-tunnel__thumnail");
const modalImageContainer = document.querySelector(".modal-tunnel__image-container")
modalthumbnails = [...modalthumbnails]

modalthumbnails.forEach(modalthumbnail => {
    modalthumbnail.addEventListener("click", event => {
        console.log(event.target.id.slice(-1))
        modalImageContainer

    });

});

//******cambiar imagina principal de modal desde flechas en el modal */

const previousModalBtn = document.querySelector(".modal-tunnel__previous");
const nextModalBtn = document.querySelector(".modal-tunnel__next");

previousModalBtn.addEventListener("click", () => {
    changePreviusImage(modalImageContainer);
});

nextModalBtn.addEventListener("click", () => {
    changeNextImage(modalImageContainer);
});



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





// checkaut con localstorage***************
/* const NameInput = document.getElementById('Name');
const IdentificationInput = document.getElementById('identification');
const form = document.querySelector('form');
const parrafo = document.getElementById('warnings');

// Escuchar el evento submit del formulario
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe
    //SE CREA UN ARRAY VACIO, PARA QUE GUARDE EN EL LOCAL, 
    const lista = JSON.parse(localStorage.getItem('userInfo')) || [];
    let entrar = false;
    let warnings = "";
    if (NameInput.value.length < 3) {
      warnings += `El nombre no es valido <br>`;
      entrar = true;
    }

    if (IdentificationInput.value.length < 3) {
      warnings += `La cedula ingresada no es valida <br>`;
      entrar = true;
    }
    if (entrar) {
      parrafo.innerHTML = warnings;
    } else {
      parrafo.innerHTML = "Enviado";
      entrar=false;
    }
  
  if (!entrar) {
    // Obtener los valores de los campos de entrada
    const Name = NameInput.value;
    const Identification = IdentificationInput.value;

    // Crear un objeto con la información
    const userInfo = {
      Name: Name,
      Identification: Identification,
    
    };
    lista.push(userInfo);
    // Convertir el objeto en una cadena JSON
    const userInfoJSON = JSON.stringify(lista);
    
    // Almacenar la información en localStorage
    localStorage.setItem('userInfo', userInfoJSON);
  
    // Limpiar los campos de entrada
    /* firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    passwordInput.value = ''; */

// Mostrar un mensaje de éxito
//alert('Information stored successfully!');
/*  }  
 }) */
/*   document.getElementsByClassName("ModalCheckout")[0].addEventListener("click", pagarClicked)
  function pagarClicked(event){
    alert("Gracias por su compra"); */

// eliminar todos los elemntos del carrito


















