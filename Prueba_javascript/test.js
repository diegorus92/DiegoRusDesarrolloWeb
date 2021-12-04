//----------------------------------PRUEBAS-------------------------
console.log("probando...");
    //prueba de asignacion y modificacion de propiedades de estilo
var elemento = document.getElementById("prueba");
elemento.style.color = "white"; //forma 1
elemento.style.setProperty("font-size", "50px"); //forma 2 (mas copada)

    //lectura de datos de elementos
elemento.innerHTML = "hola gente :)";
console.log(elemento.textContent);

var salida = document.getElementById("salida");//elemento donde se copiará la entrada
document.getElementById("texto").addEventListener("input", function(e, texto) {
    e.preventDefault;

    mostrarTexto(e.target)//muestra texto del elemento en consola
    
     //pasaje de datos tomados de un elemento a otro
     copiar(salida, e.target.value);
})

function mostrarTexto(elemento) { //muestra texto en consola
    console.log(elemento.value);
}

function copiar(elementoDestino, dato){//toma un elemento donde copiar, y la entrada a copiar
    elementoDestino.value = dato;
}



//----------------------------------PRUEBAS-------------------------!!!!!!