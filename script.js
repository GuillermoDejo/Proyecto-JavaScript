// Pedirle al usuario el precio del producto cuyo IVA se calculara y se sumara al precio del producto.

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

var arrayProductos = [];
do{
    // Se realiza la comprobacion de los datos ingresados.
    var comprobacion = prompt("Ingresar el nombre del producto. Ingrese fin para terminar de agregar.");
    if (comprobacion === "fin" || comprobacion === "FIN" || comprobacion === "Fin"){
        break;
    } else{
    var nombreP = comprobacion;
    while(true) {
        var precioP = parseFloat(prompt("Ingresar el precio del producto"));
        if (precioP <= 0) {
            alert("El precio ingresado debe ser un numero mayor a 0");
        } else if(!isNaN(precioP)){
            break;
        } else {
            alert("El registro ingresado no es un numero");
            continue;
        }
    }
    while(true) {
        var cantidadP = parseFloat(prompt("Ingresar la cantidad de stock del producto"));
        if (cantidadP < 0) {
            alert("La cantidad ingresada debe ser un numero mayor o igual a 0");
        } else if(!isNaN(cantidadP)){
            break;
        } else {
            alert("El registro ingresado no es un numero");
            continue;
        }
    }
    arrayProductos.push(new Producto(nombreP, precioP, cantidadP));
    }
}

// Se marca el fin del ingreso de datos.

while (comprobacion != "fin" || comprobacion != "FIN" || comprobacion != "Fin")

console.log(arrayProductos);


// Se imprimen los datos ingresados y procesados.

for (let producto of arrayProductos) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<h4> El producto ingresado es: ${producto.nombre}</h4>
                            <p> La cantidad en stock del producto ingresado es: ${producto.cantidad}</p>
                            <p> El precio del producto es: ${producto.precio}</p>`;
    document.body.appendChild(contenedor);
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