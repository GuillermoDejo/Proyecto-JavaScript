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

let productosEnLS = JSON.parse(localStorage.getItem('listaProductos'));
 
// Si habia algo almacenado, lo recupero.
if (productosEnLS) {
    arrayProductos = productosEnLS;
}

let formulario = document.querySelector("#formulario");
let inputNombre = document.querySelector("#iNombre");

let {nombreI, precioI, stockI} = formulario;

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

let dolar = document.querySelector('#dolarAPI');
let data;
let storage;

// Fetch

fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then((resp) => resp.json())
    .then((data) => {
        dolar.innerHTML = `<p><strong> El precio del dolar hoy es de: <strong></p>`
        data = data[1].casa.venta
        dataPro = JSON.stringify(data);
        dataProMax = JSON.parse(dataPro);
        dataFinal = parseInt(dataProMax);
        dolar.innerHTML += dataFinal + ` ARS`;
        storage = localStorage.setItem("data", JSON.stringify(data));
    })
    .catch((error) => console.log(error))


// Defino los eventos 

formulario.addEventListener("submit", agregarProducto);
btnMostrar.addEventListener("click", mostrarProductos);
btnVenta.addEventListener("click", restarStock);
btnReabast.addEventListener("click", sumarStock);
btnPrecioNuevo.addEventListener("click", nuevoPrecio);
btnEliminarProd.addEventListener("click", eliminarProd);
btnDolar.addEventListener("click", dolarizar);

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
        Swal.fire({
            title: 'Error!',
            text: 'Debe completar todos los campos para continuar',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
        bandera = false;
    } else if (precioI <= 0){
        Swal.fire({
            title: 'Error!',
            text: 'El precio debe ser mayor a 0',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    } else if (isNaN(precioI)){
        Swal.fire({
            title: 'Error!',
            text: 'El registro no es un numero',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    }

    if (stockI < 0) {
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad debe ser mayor a 0',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    } else if(isNaN(stockI)){
        Swal.fire({
            title: 'Error!',
            text: 'El registro no es un numero',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
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
            Swal.fire({
                title: 'Está seguro de agregar el producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, seguro',
                cancelButtonText: 'No, no quiero'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Agregado!',
                        icon: 'success',
                        text: 'El archivo ha sido agregado'
                    })
                    let producto = new Producto(nombreI, precioI, stockI)
                    arrayProductos.push(producto);
                    localStorage.setItem('listaProductos', JSON.stringify(arrayProductos));
                } else {

                }
            })
           formulario[0].value = "";
           formulario[1].value = "";
           formulario[2].value = "";
        agregarAlDom();
    } else {
        
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
                            <ul><li><p> Cantidad: ${stockI}</p></li>
                            <li><p> Precio: ${precioI}</p></li></ul></li></ul>`;
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
                                    <ul><li><p> Cantidad: ${producto.cantidad}</p></li>
                                    <li><p> Precio: ${producto.precio}</p></li></ul></li></ul>`;
    }
}

// Funcion de venta

function restarStock(){
    var nombreRS = prompt("Ingresar el producto vendido: ");
    var cantRS = parseFloat(prompt("Ingresar la cantidad vendida: "));
    if (nombreRS == "" || cantRS == "" || cantRS == 0 || isNaN(cantRS)){
        Swal.fire({
            title: 'Error!',
            text: 'El nombre o la cantidad son erroneas',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    } else {
        for (const producto of arrayProductos){
            if (nombreRS !== producto.nombre){
            } else {
                cantViejaRS = producto.cantidad;
                if (cantRS > producto.cantidad) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'La cantidad de venta supera el stock actual',
                        icon: 'error',
                        confirmButtonText: ' Intentar de nuevo '
                    })
                } else {
                    cantNuevaRS = cantViejaRS - cantRS;
                    producto.cantidad = cantNuevaRS;
                    localStorage.setItem('listaProductos', JSON.stringify(arrayProductos));
                }
            }
        }
    }
}

// Funcion de reabastecimiento

function sumarStock(){
    var nombreSS = prompt("Ingresar el producto reabastecido: ");
    var cantSS = parseFloat(prompt("Ingresar la cantidad ingresada: "));
    if (nombreSS == "" || cantSS == "" || cantSS == 0 || isNaN(cantSS)){
        Swal.fire({
            title: 'Error!',
            text: 'El nombre o la cantidad son erroneas',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    } else {
        for (const producto of arrayProductos){
            if (nombreSS !== producto.nombre){
            } else {
                cantViejaSS = producto.cantidad;
                cantNuevaSS = cantViejaSS + cantSS;
                producto.cantidad = cantNuevaSS;
                localStorage.setItem('listaProductos', JSON.stringify(arrayProductos));
            }
        }
    }
}

// Funcion de precio nuevo

function nuevoPrecio(){
    var nombreNP = prompt("Ingresar el producto a actualizar: ");
    var precioNP = parseFloat(prompt("Ingresar el nuevo precio: "));
    if (nombreNP == "" || precioNP == "" || precioNP == 0 || isNaN(precioNP)){
        Swal.fire({
            title: 'Error!',
            text: 'El nombre o el precio son erroneos',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    } else {
        for (const producto of arrayProductos){
            if (nombreNP !== producto.nombre){
            } else {
                producto.precio = precioNP;
                localStorage.setItem('listaProductos', JSON.stringify(arrayProductos));
            }
        }
    }
}

// Funcion de eliminar un producto 

function eliminarProd(){
    var nombreEP = prompt("Ingresar el producto a eliminar: ");
    var indexEP = 0;
    if (nombreEP == ""){
        Swal.fire({
            title: 'Error!',
            text: 'El nombre es erroneo',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    } else {
        for (const producto of arrayProductos){
            if (nombreEP !== producto.nombre){
                indexEP ++;
            } else {
                arrayProductos.splice(indexEP,1);
                localStorage.setItem('listaProductos', JSON.stringify(arrayProductos));
            }
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
                                    <ul><li><p> Cantidad: ${producto.cantidad}</p></li></ul></li></ul>`;
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
                                    <ul><li><p> Cantidad: ${producto.cantidad}</p></li></ul></li></ul>`;
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
                                    <ul><li><p> Cantidad: ${producto.cantidad}</p></li>
                                    <li><p> Precio: ${producto.precio}</p></li></ul></li></ul>`;
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
                                    <ul><li><p> Cantidad: ${producto.cantidad}</p></li></ul></li></ul>`;
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
                                      <ul><li><p> Precio: ${producto.precio}</p></li></ul></li></ul>`;
    }
}

// Sistema del dolar

function dolarizar() {
    let cantDolar = parseFloat(prompt("Ingrese el monto a convertir: "));
    let storageData = JSON.parse(localStorage.getItem("data"));
    let divisa = document.querySelector("#moneda");

    if (cantDolar == "") {
        Swal.fire({
            title: 'Error!',
            text: 'Debe completar todos los campos para continuar',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    }

    if (isNaN(cantDolar)){
        Swal.fire({
            title: 'Error!',
            text: 'El registro no es un numero',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    }

    if (cantDolar < 0) {
        Swal.fire({
            title: 'Error!',
            text: 'La cantidad debe ser mayor a 0',
            icon: 'error',
            confirmButtonText: ' Intentar de nuevo '
        })
    }

    if (divisa.value == 1) {
        let convertido1 = cantDolar * (parseInt(storageData));
        precioConvert.innerHTML = `<p> El valor es de ${convertido1} ARS</p>`
    }

    if (divisa.value == 2) {
        let convertido2 = cantDolar / (parseInt(storageData)) ;
        precioConvert.innerHTML = `<p> El valor es de ${convertido2} USD`
    }
}