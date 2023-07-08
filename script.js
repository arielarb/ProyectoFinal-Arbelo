/* PORTAL ONLINE PARA VENTA DE ENTRADAS "MisEntradas.com"

Mi simulador consiste en un portal para la compra de entradas a espectáculos de diversas categorías: recitales, teatro, expo & congresos, deportivos, entre otros.
A efectos de la Entrega Final del proyecto, el usuario podrá:
- inscribirse a un Newsletter para recibir novedades sobre espectaculos
- Comprar entradas para los espectáculos en pantalla y por cantidades 
- Visualizar las entradas seleccionadas en el carrito de compras
- Dar por finalizada la compra */



const introPortal = document.getElementById("titulo")
const contenedorCards = document.getElementById("contenedorCards")
const carritoCompra = document.getElementById("carritoCompra")


//Incorporar titulares al DOM
const tituloDOM = document.createElement("div")
tituloDOM.innerHTML = `<img src="./Media/LOGO111.PNG" style='width:70% ; margin-bottom:50px'>
  <h5> Portal online para venta de entradas <h5/>
  <br>
  <h3>¡Bienvenid@! Aquí encontrarás los mejores espectáculos en Argentina. <br> Conoce la amplia variedad de nuestro catálogo:</h3>`
introPortal.append(tituloDOM)


//Designamos función para traer datos de espectáculos con Fetch desde archivo .JSON
function traerEventos(){
    fetch("./espectaculos.json")
    .then(res => res.json())
    .then(data => mostrarEventos(data))
}

//Cargamos la información sobre los espectáculos cuando se inicia el DOM
document.addEventListener("DOMContentLoaded", ()=>{
    traerEventos()
})


//Generar cards para cada espectáculo
function mostrarEventos(EventosEnJSON) {
  for (let evento of EventosEnJSON) {
    let contenedor = document.createElement("div")
    contenedor.innerHTML = `
     <div class="card cardPropia" style="width: 18rem; font-family: 'Comfortaa'">
     <img src=${evento.imagen} class="card-img-top" alt="ImagenDeEvento">
       <div class="card-body micard">
         <h4 class="card-title"><strong>${evento.nombre}</strong></h4>
         <h5 class="card-text">En ${evento.lugar}</h5>
         <p class="card-text">Categoría: ${evento.categoria}</p>
         <p class="card-text">${evento.fecha}</p>
         <p class="card-text"><strong>Precio por entrada: ${evento.precio}</strong></p>
         <input type="button" class="btn btn-primary" value="Comprar" onclick="agregarCarrito(${evento.id})"> 
       </div>
     </div>`
    contenedor.classList.add("miCard");
    contenedorCards.append(contenedor)
  }
}


//Evento para abrir el formulario de inscripción al Newsletter
const btnVerNewsletter = document.querySelector("#botonNewsletter")
btnVerNewsletter.onclick = () => {
    document.getElementById("formulario").style.display = "flex";
}


//Tomar datos del formulario del Newsletter y guardarlos en el Storage. Configuración de mensajes de confirmación o advertencia de error
const datosFormulario = document.getElementById("formulario");
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.onclick = () => {
  let nombreUser = datosFormulario.querySelector("#nombreUser").value;
  localStorage.setItem("nombreUser", nombreUser);
  let mailUser = datosFormulario.querySelector("#mailUser").value;
  localStorage.setItem("mailUser", mailUser);
  if (nombreUser !== "" && mailUser !== "") {
    Swal.fire(
      '¡Muchas gracias!',
      'Te suscribiste a nuestro Newsletter semanal.',
      'success'
    );
  } else {
    Swal.fire(
      'Error en los datos ingresados',
      'Por favor, vuelve a ingresarlos',
      'error'
    );
  }
};

datosFormulario.onsubmit = (e) => {
  e.preventDefault();
};


//Codigo para el carrito de compras
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //aqui se almacenan la selección de espectáculos en el carrito


//Agrego items al carrito de compras en LS - primero chequeo si hay items existentes para agregar más cantidad, sino agrego nuevo elemento al array del carrito y luego con "actualizarCarrito()" genero la card de la selección
const agregarCarrito = (evento) => {
  Toastify({
      text: "¡Agregaste 1 entrada a tu carrito!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "center",
      stopOnFocus: true,
      style: {
        background: "rgb(3, 189, 118)",
      },
      onClick: function(){}
    }).showToast();
  fetch("./espectaculos.json")
    .then(res => res.json())
    .then(data => {
      const eventoEnCarrito = carrito.find((item) => item.id === evento);
      if (eventoEnCarrito) {
        eventoEnCarrito.cantidad++;
        } else {
          const eventoNuevo = data.find((item) => item.id === evento);
          carrito.push(eventoNuevo);
        }
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito))
  });
};


//Generar las cards de la selección para el carrito
const actualizarCarrito = () => {
  carritoCompra.innerHTML = '';
    carrito.forEach((evento) => {
        const contenedor = document.createElement('div');
        contenedor.classList.add('eventoEnCarrito');
        const mensaje = document.createElement('div');
        mensaje.innerText = `Agregaste ${evento.cantidad} entrada/s para ${evento.nombre} - Costo total: (${evento.precio*evento.cantidad})`;
        const cantidad = document.createElement('p');
        cantidad.textContent = evento.cantidad;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
          eliminarCarrito(evento);
            Toastify({
              text: "Eliminaste 1 entrada de tu carrito",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top", 
              position: "center",
              stopOnFocus: true,
              style: {
                background: "red",
              },
              onClick: function(){}
            }).showToast();
        })
        contenedor.appendChild(mensaje);  
        contenedor.appendChild(cantidad);
        contenedor.appendChild(botonEliminar);
        
      carritoCompra.appendChild(contenedor);
    });
  }


  //Si quiero eliminar de a una la selección de espectáculos en el carrito
const eliminarCarrito = (evento) => {
    if (evento.cantidad > 1) {
        evento.cantidad--;
    }else{
        const index = carrito.indexOf(evento);
        carrito.splice(index, 1);
    }
    actualizarCarrito()
}


/*Calcular el monto total de un carrito de compras en el local storage utilizando el metodo reduce:
IMPORTANTE: NO LOGRÉ HACER FUNCIONAR ESTE CÓDIGO, INTENTÉ VARIAS OPCIONES PERO NO FUE POSIBLE APLICAR EL PRODUCTO DE ESTE ALGORITMO AL FINALIZAR LA COMPRA*/
const totalAPagar = carrito.reduce((acum, evento) => {
  return acum + (evento.precio * evento.cantidad);
}, 0);


//Evento para visualizar el carrito
const verCarrito = document.querySelector("#verCarrito")
verCarrito.onclick = () => {
  carritoCompra.style.display = "flex";
  paraFinalizarCompra.style.display = "flex";
}


//Botones que acompañan a los elementos en el carrito
const paraFinalizarCompra = document.getElementById("paraFinalizarCompra")
const finalizarCompra = document.createElement("div")
finalizarCompra.innerHTML += `
      <input type="button" value="Finalizar Compra" class="btn btn-primary" onClick="terminarCompra()">
      <input type="button" value="Vaciar Carrito" class="btn btn-primary" onClick="vaciarCarrito()">`
paraFinalizarCompra.append(finalizarCompra)

function terminarCompra(){
  swal.fire({
    title: "¡Muchas gracias!",
    text: `El pago fue realizado con éxito`,
    icon: "success",
    timer: 6000
  }) 
  localStorage.removeItem("carrito")
  carrito.pop()
  carritoCompra.innerHTML = ``
} 

function vaciarCarrito(){
    while(carrito.length > 0){
        carrito.pop()
    }
    Swal.fire({
      title: '¡Eliminado!',
      text: 'Tu carrito de compras está vacío.',
      icon: 'success',
    })
    localStorage.removeItem("carrito")
    carritoCompra.innerHTML = ``
} 