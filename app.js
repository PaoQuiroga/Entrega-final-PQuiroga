    const productos = [
    {
        id:1,
        nombre:"Silla Tulipa",
        precio:"15000",
        img:"./imag/silla escandinava.jpg",
        cantidad:1,
    },
    {
        id:2,
        nombre:"Silla de Jardin",
        precio:"8000",
        img:"./imag/silla blanca.jpg",
        cantidad:1,
    },
    {
        id:3,
        nombre:"Silla Roja",
        precio:"18000",
        img:"./imag/silla roja.jpg",
        cantidad:1,
    },
    {
        id:4,
        nombre:"Repisa Flotante",
        precio:"13000",
        img:"./imag/repisa flotante.jpg",
        cantidad:1,
    },
    {
        id:5,
        nombre:"Mueble Fabric",
        precio:"25000",
        img:"./imag/mueble amurado.jpg",
        cantidad:1,
    },
    {
        id:6,
        nombre:"Banqueta Negra",
        precio:"12000",
        img:"./imag/silla negra.jpg",
        cantidad:1,
    },
    {
        id:7,
        nombre:"Lampara Turca ",
        precio:"20000",
        img:"./imag/luces varias.jpg",
        cantidad:1,
    },
    {
        id:8,
        nombre:"Lampara Deco",
        precio:"10000",
        img:"./imag/Lampara semi.jpg",
        cantidad:1,
    },
    {
        id:9,
        nombre:"Luces Colores",
        precio:"8000",
        img:"./imag/luces deco.jpg",
        cantidad:1,
    },
    {
        id:10,
        nombre:"Mesa Dormitorio",
        precio:"15000",
        img:"./imag/mesa de luz.jpg",
        cantidad:1,
    },
    {
        id:11,
        nombre:"Sillón de Jardín",
        precio: "35000",
        img:"./imag/sillon de jardin.jpg",
        cantidad:1,
    },
    {
        id:12,
        nombre:"Silla Jardin",
        precio:"25000",
        img:"./imag/sillon caña.jpg",
        cantidad:1,
    },           
];
            

const cardContent = document.getElementById("cardContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert"); 
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
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
      
      carritoCounter();
      saveLocal();
    }
  });
});

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
  
    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
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
          <span class="delete-product"> ❌ </span>

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
  
      let eliminar = carritoContent.querySelector(".delete-product");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
  
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $ ${total} `;
    modalContainer.append(totalCompra);

    modalContent.append(realizarCompra);

    const realizarCompra = document.createElement("div");
    realizarCompra.innerHTML = "Realizar Compra";
    realizarCompra.className = "button-content";

    modalbutton.addEventListener("click", () => {
    modalContent.style.display = "none";
   }); 

  };

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