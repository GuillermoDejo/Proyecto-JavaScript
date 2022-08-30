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

for (var producto of arrayProductos) {
    document.write("<ul><li><p>El producto ingresado es: " + producto.nombre + "</p></li>");
    document.write("<li><p> La cantidad en stock del producto ingresado es: " + producto.cantidad + "</p></li>");
    document.write("<li><p> El precio del producto es: " + producto.precio.toFixed(2) + "</p></li>");
    document.write("<li><p> El precio del producto con IVA es: " + producto.sumarIva().toFixed(2) + "</p></li></ul><br>");
    console.log(producto.nombre);
    console.log(producto.cantidad);
    console.log(producto.sumarIva().toFixed(2));
}

// Unidades con poco stock - menos de 5 unidades

var bajoStock = arrayProductos.filter(producto => producto.cantidad <=5 );
console.log("Estos productos tienen poco stock, debe reabastecerlos: ");
console.log(bajoStock);
document.write("<h3> Lista de productos con poco stock (menos de 5 unidades): </h3>");

for (var producto of bajoStock) {
    document.write("<ul><li><p>Nombre: " + producto.nombre + "</p></li>");
    document.write("<li><p>Cantidad: " + producto.cantidad + "</p></li></ul><br>");
}

// Unidades sin stock

var sinStock = arrayProductos.filter(producto => producto.cantidad == 0 || producto.disponible == false);
console.log(sinStock);
document.write("<h3> Lista de productos sin Stock: </h3>");

for (var producto of sinStock) {
    document.write("<ul><li><p>Nombre: " + producto.nombre + "</p></li>");
    document.write("<li><p>Cantidad: " + producto.cantidad + "</p></li></ul><br>");
}

// Buscador de un producto por nombre

var nombreIngresado = prompt("Ingresar el producto que desea buscar");
var prodIngresado = arrayProductos.filter(producto => producto.nombre.includes(nombreIngresado));
console.log(prodIngresado);
document.write("<h3> Lista de productos ingresados para busqueda: </h3>");

for (var producto of prodIngresado) {
    document.write("<ul><li><p>Nombre: " + producto.nombre + "</p></li>");
    document.write("<li><p>Precio: " + producto.precio + "</p></li></ul><br>");
}

// Sistema de ordenado por cantidad

var ordenCantidad = []; 
ordenCantidad = arrayProductos.map(elemento => elemento);
ordenCantidad.sort(function(a,b) {
    return a.cantidad - b.cantidad;
});
console.log("Productos ordenados por cantidad ascendente: ");
console.log(ordenCantidad);
document.write("<h3> Lista de productos ordenados por cantidad ascendente: </h3>");

for (var producto of ordenCantidad) {
    document.write("<ul><li><p>Nombre: " + producto.nombre + "</p></li>");
    document.write("<li><p>Cantidad: " + producto.cantidad + "</p></li></ul><br>");
}

// Sistema de ordenado por precio

var ordenPrecio = []; 
ordenPrecio = arrayProductos.map(elemento => elemento);
var ordenPrecio = arrayProductos;
ordenPrecio.sort(function(a,b) {
    return a.precio - b.precio;
});

console.log("Productos ordenados por precio ascendente: ");
console.log(ordenPrecio);
document.write("<h3> Lista de productos ordenados por precio ascendente: </h3>");

for (var producto of ordenPrecio) {
    document.write("<ul><li><p>Nombre: " + producto.nombre + "</p></li>");
    document.write("<li><p>Precio: " + producto.precio + "</p></li></ul><br>");
}