// Base de datos de productos.

// Se crea la clase Producto.

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad;
        this.disponible = true;
    }

    sumarIva() {
        return this.precio * 1.21;
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
let parrafos = displayTodos.getElementsByTagName("p");
let bandera = false;

// Defino los eventos 

formulario.addEventListener("submit", agregarProducto);
btnMostrar.addEventListener("click", mostrarProductos);

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
    } else {
        bandera = true;
    }
    
}

/* if (precioI <= 0) {
    alert("El precio ingresado debe ser un numero mayor a 0");
} else if(isNaN(precioI)){
    alert("El registro ingresado no es un numero");
}

if (stockI < 0) {
    alert("La cantidad ingresada debe ser un numero mayor o igual a 0");
} else if(isNaN(stockI)){
    alert("El registro ingresado no es un numero");
}
*/

// Funcion para agregar productos

function agregarProducto(e) {
    e.preventDefault();
    validarDatos();
    if (bandera == true) {
        let opcion = confirm("Esta seguro de agregar el producto?");
        if (opcion == true) {
            let formulario = e.target
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
    ingreso.innerHTML = `<h3> Ultimo producto agregado: </h3>
                            <p> Nombre: ${nombreI}</p>
                            <p> Cantidad: ${stockI}</p>
                            <p> Precio: ${precioI}</p>`;
}

// Funcion para mostrar todos los productos

function mostrarProductos(e) {
    e.preventDefault();
    let i = 0;
    displayTodos.innerHTML = `<h3> Listado de todos los productos: </h3>`;
    for (const producto of arrayProductos) {
        displayTodos.innerHTML += `<p> Nombre: ${nombreI}</p>
                                    <p> Cantidad: ${stockI}</p>
                                    <p> Precio: ${precioI}</p>`;
    }
}

// Unidades con poco stock - menos de 5 unidades

function pocoStock () {
    var bajoStock = arrayProductos.filter(producto => producto.cantidad <=5 );
    console.log(bajoStock);
    document.write("<h3> Lista de productos con poco stock (menos de 5 unidades): </h3>");

    for (let producto of bajoStock) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<h4> Nombre: ${producto.nombre}</h4>
                                <p> Cantidad: ${producto.cantidad}</p>`;
        document.body.appendChild(contenedor);
    }
}

// Unidades sin stock

function noStock() {
    var sinStock = arrayProductos.filter(producto => producto.cantidad == 0 || producto.disponible == false);
    console.log(sinStock);
    document.write("<h3> Lista de productos sin Stock: </h3>");

    for (let producto of sinStock) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<h4> Nombre: ${producto.nombre}</h4>
                                <p> Cantidad: ${producto.cantidad}</p>`;
        document.body.appendChild(contenedor);
    }
}

// Buscador de un producto por nombre

function buscador() {
    var nombreIngresado = prompt("Ingresar el producto que desea buscar");
    var prodIngresado = arrayProductos.filter(producto => producto.nombre.includes(nombreIngresado));
    console.log(prodIngresado);
    document.write("<h3> Lista de productos ingresados para busqueda: </h3>");

    for (let producto of prodIngresado) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<h4> Nombre: ${producto.nombre}</h4>
                                <p> Cantidad: ${producto.cantidad}</p>
                                <p> Precio: ${producto.precio}</p>`;
        document.body.appendChild(contenedor);
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
    document.write("<h3> Lista de productos ordenados por cantidad ascendente: </h3>");

    for (let producto of ordenCantidad) {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `<h4> Nombre: ${producto.nombre}</h4>
                                <p> Cantidad: ${producto.cantidad}</p>`
        document.body.appendChild(contenedor);
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
document.write("<h3> Lista de productos ordenados por precio ascendente: </h3>");

for (let producto of ordenPrecio) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h4> Nombre: ${producto.nombre}</h4>
                            <p> Precio: ${producto.precio}</p>`;
    document.body.appendChild(contenedor);
}
}