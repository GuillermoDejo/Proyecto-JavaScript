// Base de datos de productos.

// Se crea la clase Producto.

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseFloat(cantidad);
        this.disponible = true;
    }
}

// Defino las variables

let arrayProductos = [];
let formulario = document.querySelector("#formulario");
let inputNombre = document.querySelector("#iNombre");

let nombreI = formulario[0].value;
let precioI = formulario[1].value;
let stockI = formulario[2].value;

let ingreso = document.querySelector("#productoIngresado");
let displayTodos = document.querySelector("#displayTodos");
let displayPocoStock = document.querySelector("#displayPocoStock");
let displaySinStock = document.querySelector("#displaySinStock");
let displayBuscador = document.querySelector("#displayBuscador");
let displayOrdenCant = document.querySelector("#displayOrdenCant");
let displayOrdenPre = document.querySelector("#displayOrdenPre");
let displayVenta = document.querySelector("#displayVenta");
let displayReabast = document.querySelector("#displayReabast");
let displayPrecio = document.querySelector("#precioNuevo");
let parrafos = displayTodos.getElementsByTagName("p");
let bandera = false;


// Defino los eventos 

formulario.addEventListener("submit", agregarProducto);
btnMostrar.addEventListener("click", mostrarProductos);
btnVenta.addEventListener("click", restarStock);
btnReabast.addEventListener("click", sumarStock);
btnPrecioNuevo.addEventListener("click", nuevoPrecio);
btnEliminarProd.addEventListener("click", eliminarProd);


// Pongo en focus el input

inputNombre.focus();

// Funciones

// Funcion para comprobar el ingreso de datos

function validarDatos() {
    nombreI = formulario[0].value;
    precioI = formulario[1].value;
    stockI = formulario[2].value;
    console.log(nombreI);
    console.log(precioI);
    console.log(stockI);

    if (nombreI == "" || precioI == "" || stockI == "") {
        alert("Error, debe completar todos los campos para continuar");
        inputNombre.focus();
        bandera = false;
    } else if (precioI <= 0){
        alert("El precio ingresado debe ser un numero mayor a 0");
    } else if (isNaN(precioI)){
        alert("El registro ingresado no es un numero");
    }

    if (stockI < 0) {
        alert("La cantidad ingresada debe ser un numero mayor o igual a 0");
    } else if(isNaN(stockI)){
        alert("El registro ingresado no es un numero");
    }
    else if (nombreI !== "" && precioI !== "" && stockI !== "" && precioI > 0 && stockI > 0){
        bandera = true;
    }
    
}

// Funcion para agregar productos

function agregarProducto(e) {
    e.preventDefault();
    validarDatos();
    if (bandera == true) {
        let opcion = confirm("Esta seguro de agregar el producto?");
        if (opcion == true) {
            let formulario = e.target;
            arrayProductos.push(new Producto(nombreI, precioI, stockI));
        } else {
            alert("No se agregara el producto");
        }
        formulario[1].value = "";
        formulario[2].value = "";
        formulario[3].value = "";
        ingreso.innerHTML = "";
        agregarAlDom();
        inputNombre.focus();
    } else {
        inputNombre.focus();
    }
}

// Funcion para mostrar en el DOM el ultimo producto agregado

function agregarAlDom() {
    displayTodos.innerHTML=``;
    displayPocoStock.innerHTML = ``;
    displaySinStock.innerHTML = ``;
    displayBuscador.innerHTML = ``;
    displayOrdenCant.innerHTML = ``;
    displayOrdenPre.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    ingreso.innerHTML = `<h3> Ultimo producto agregado: </h3>
                            <ul><li><p> Nombre: ${nombreI}</p>
                            <p> Cantidad: ${stockI}</p>
                            <p> Precio: ${precioI}</p></li></ul>`;
}

// Funcion para mostrar todos los productos

function mostrarProductos(e) {
    e.preventDefault();
    let i = 0;
    ingreso.innerHTML=``;
    displayPocoStock.innerHTML = ``;
    displaySinStock.innerHTML = ``;
    displayBuscador.innerHTML = ``;
    displayOrdenCant.innerHTML = ``;
    displayOrdenPre.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    displayTodos.innerHTML = `<h3> Listado de todos los productos: </h3>`;
    for (const producto of arrayProductos) {
        displayTodos.innerHTML += `<ul><li><p> Nombre: ${producto.nombre}</p>
                                    <p> Cantidad: ${producto.cantidad}</p>
                                    <p> Precio: ${producto.precio}</p></li></ul>`;
    }
}

// Funcion de venta

function restarStock(){
    var nombreRS = prompt("Ingresar el producto vendido: ");
    var cantRS = parseFloat(prompt("Ingresar la cantidad vendida: "));
    for (const producto of arrayProductos){
        if (nombreRS !== producto.nombre){
        } else {
            cantViejaRS = producto.cantidad;
            cantNuevaRS = cantViejaRS - cantRS;
            producto.cantidad = cantNuevaRS;
        }
    }
}

// Funcion de reabastecimiento

function sumarStock(){
    var nombreSS = prompt("Ingresar el producto reabastecido: ");
    var cantSS = parseFloat(prompt("Ingresar la cantidad ingresada: "));
    for (const producto of arrayProductos){
        if (nombreSS !== producto.nombre){
        } else {
            cantViejaSS = producto.cantidad;
            cantNuevaSS = cantViejaSS + cantSS;
            producto.cantidad = cantNuevaSS;
        }
    }
}

// Funcion de precio nuevo

function nuevoPrecio(){
    var nombreNP = prompt("Ingresar el producto a actualizar: ");
    var precioNP = parseFloat(prompt("Ingresar el nuevo precio: "));
    for (const producto of arrayProductos){
        if (nombreNP !== producto.nombre){
        } else {
            producto.precio = precioNP;
        }
    }
}

// Funcion de eliminar un producto 

function eliminarProd(){
    var nombreEP = prompt("Ingresar el producto a eliminar: ");
    var indexEP = 0;
    for (const producto of arrayProductos){
        if (nombreEP !== producto.nombre){
            indexEP += 1;
        } else {
            arrayProductos.splice(indexEP,1);
        }
    }
}

// Unidades con poco stock - menos de 5 unidades

function bajoStock () {
    var bajoStock = arrayProductos.filter(producto => producto.cantidad <=5 );
    console.log(bajoStock);
    ingreso.innerHTML=``;
    displayTodos.innerHTML = ``;
    displaySinStock.innerHTML = ``;
    displayBuscador.innerHTML = ``;
    displayOrdenCant.innerHTML = ``;
    displayOrdenPre.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    displayPocoStock.innerHTML = `<h3> Lista de productos con poco stock (menos de 5 unidades): </h3>`;

    for (const producto of bajoStock) {
        displayPocoStock.innerHTML += `<ul><li><p> Nombre: ${producto.nombre}</p>
                                    <p> Cantidad: ${producto.cantidad}</p></li></ul>`;
    }
}

// Unidades sin stock

function noStock() {
    var sinStock = arrayProductos.filter(producto => producto.cantidad == 0 || producto.disponible == false);
    console.log(sinStock);
    ingreso.innerHTML=``;
    displayPocoStock.innerHTML = ``;
    displayTodos.innerHTML = ``;
    displayBuscador.innerHTML = ``;
    displayOrdenCant.innerHTML = ``;
    displayOrdenPre.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    displaySinStock.innerHTML = `<h3> Lista de productos sin Stock: </h3>`;

    for (const producto of sinStock) {
        displaySinStock.innerHTML += `<ul><li><p> Nombre: ${producto.nombre}</p>
                                    <p> Cantidad: ${producto.cantidad}</p></li></ul>`;
    }
}

// Buscador de un producto por nombre

function buscador() {
    var nombreIngresado = prompt("Ingresar el producto que desea buscar");
    var prodIngresado = arrayProductos.filter(producto => producto.nombre.includes(nombreIngresado));
    console.log(prodIngresado);
    ingreso.innerHTML=``;
    displayPocoStock.innerHTML = ``;
    displaySinStock.innerHTML = ``;
    displayTodos.innerHTML = ``;
    displayOrdenCant.innerHTML = ``;
    displayOrdenPre.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    displayBuscador.innerHTML = `<h3> Lista de productos ingresados para busqueda: </h3>`;

    for (const producto of prodIngresado) {
        displayBuscador.innerHTML += `<ul><li><p> Nombre: ${producto.nombre}</p>
                                    <p> Cantidad: ${producto.cantidad}</p>
                                    <p> Precio: ${producto.precio}</p></li></ul>`;
    }
}

// Sistema de ordenado por cantidad

function ordenCant(){
    var ordenCantidad = []; 
    ordenCantidad = arrayProductos.map(elemento => elemento);
    ordenCantidad.sort(function(a,b) {
        return a.cantidad - b.cantidad;
    });
    console.log("Productos ordenados por cantidad ascendente: ");
    console.log(ordenCantidad);
    ingreso.innerHTML=``;
    displayPocoStock.innerHTML = ``;
    displaySinStock.innerHTML = ``;
    displayBuscador.innerHTML = ``;
    displayTodos.innerHTML = ``;
    displayOrdenPre.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    displayOrdenCant.innerHTML = `<h3> Lista de productos ordenados por cantidad ascendente: </h3>`;

    for (const producto of ordenCantidad) {
        displayOrdenCant.innerHTML += `<ul><li><p> Nombre: ${producto.nombre}</p>
                                    <p> Cantidad: ${producto.cantidad}</p></li></ul>`;
    }
}

// Sistema de ordenado por precio

function ordenPre() {
    var ordenPrecio = []; 
    ordenPrecio = arrayProductos.map(elemento => elemento);
    var ordenPrecio = arrayProductos;
    ordenPrecio.sort(function(a,b) {
        return a.precio - b.precio;
    });

    console.log("Productos ordenados por precio ascendente: ");
    console.log(ordenPrecio);
    ingreso.innerHTML=``;
    displayPocoStock.innerHTML = ``;
    displaySinStock.innerHTML = ``;
    displayBuscador.innerHTML = ``;
    displayOrdenCant.innerHTML = ``;
    displayTodos.innerHTML = ``;
    displayVenta.innerHTML = ``;
    displayReabast.innerHTML = ``;
    displayPrecio.innerHTML = ``;
    displayOrdenPre.innerHTML = `<h3> Lista de productos ordenados por precio ascendente: </h3>`;

    for (const producto of ordenPrecio) {
        displayOrdenPre.innerHTML += `<ul><li><p> Nombre: ${producto.nombre}</p>
                                      <p> Precio: ${producto.precio}</p></li></ul>`;
    }
}