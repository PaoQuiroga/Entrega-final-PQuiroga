const cardContent = document.getElementById("cardContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert"); 
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProduct = async () => {
  const response = await fetch("datos.json");
  const datos = await response.json();
  datos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price"> $ ${product.precio}</p>
    `;
  
    cardContent.append(content);
  
    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

  
    content.append(comprar);
  
    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
  
      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,

        });
 
          Toastify({
              text: `¡${product.nombre} añadido!`,
              avatar: `${product.img}`,
              duration: 2000,
              gravity: "top",
              position: "center", 
              stopOnFocus: true,
              style: {
                  background: "linear-gradient(to right,#b97c0a,#ebc175",
              }
          }).showToast();

        carritoCounter();
        saveLocal();
      }
    });
  });
};  

getProduct()

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h1>
      `;
      
    modalContainer.append(modalHeader);
  
    const modalbutton = document.createElement("h2");
    modalbutton.innerText = "Cerrar";
    modalbutton.className = "modal-header-button";
  
    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
  
    modalHeader.append(modalbutton);
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>$ ${product.precio}</p>
          <span class="restar"> - </span>
          <p>${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: $ ${product.cantidad * product.precio}</p>
          <span class="delet-product"> ❌ </span>

        `;
  
      modalContainer.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        saveLocal();
        pintarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delet-product");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
  
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalCompra = document.createElement("h2");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $ ${total} `;
    modalContainer.append(totalCompra);

    const finalizarCompra = document.createElement("h3");
    finalizarCompra.innerHTML = `Finalizar Compra`;
    finalizarCompra.className = "button-finalizarCompra";
    modalContainer.append(finalizarCompra);
    
    finalizarCompra.addEventListener("click", () => { 
    localStorage.removeItem(carrito.localStorage,"[]")

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra Finalizada con Exito!!',
        timer: 2500,
        background: 'linear-gradient(to right,#b97c0a,#ebc175',    
      })
  });  
}
  verCarrito.addEventListener("click", pintarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
  };

  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };

  carritoCounter();