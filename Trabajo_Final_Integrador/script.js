console.log("hola mundo!");

//Agregado de EventListener a botones de calculadora
console.log("Agregando EventListener a operaciones");

var botonesOperaciones = ["boton-+", "boton--", "boton-x", "boton-/", "boton-igual", "boton-del"];
botonesOperaciones.forEach(function(operacion){
    console.log(operacion);
    if(operacion == "boton-del"){
        document.getElementById(operacion).addEventListener("click", deletePantallaPrincipal);
    }
    else{
        document.getElementById(operacion).addEventListener("click", entradaDato);
    }
    
});

var indiceBoton = 0;
console.log("Agregando EventListener a numeros");
while(indiceBoton < 11){
    console.log("boton-"+indiceBoton);
    if(indiceBoton == 10){
        document.getElementById("boton-"+".").addEventListener("click", entradaDato);
        console.log("boton-.");
    }
    else{
        document.getElementById("boton-"+indiceBoton).addEventListener("click", entradaDato);
    }
    
    indiceBoton++;
}
///////////////////////////////////////////////////////

//Tomando referencia de las pantallas
var pantallaPrincipal = document.getElementById("pantalla-principal");
var pantallaSecundaria = document.getElementById("pantalla-secundaria");

console.log(pantallaPrincipal.innerHTML);
console.log(pantallaSecundaria.innerHTML);
//////////////////////////////////////////////////////////

function entradaDato(e) {
    e.preventDefault();
    console.log(e.target.value);
    if(!excedeLongitud(12, pantallaPrincipal.innerHTML.length)){
        pantallaPrincipal.innerHTML += e.target.value;
    }
    else{
        console.log("Exceso de caracteres en pantalla");
    }
}

function deletePantallaPrincipal(){
    pantallaPrincipal.innerHTML = "0";
}

function excedeLongitud(cantidadCaracteresMaxima, cantidadActual){
    return cantidadActual >= cantidadCaracteresMaxima; 
}

