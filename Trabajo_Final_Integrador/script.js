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
    if(!excedeLongitud(12, pantallaPrincipal.innerHTML.length)){//Si da false (NO excede caracteres), agrega el caracter a la pantalla
        if(e.target.value != "="){
            pantallaPrincipal.innerHTML += e.target.value;
        }
        operacionSeleccionada(e.target.value);
        
    }
    else{
        console.log("Exceso de caracteres en pantalla");
    }
}

function deletePantallaPrincipal(){
    pantallaPrincipal.innerHTML = "0";
    desabilitarOpreadores(false);
}

function excedeLongitud(cantidadCaracteresMaxima, cantidadActual){//devuelve true si la cantidad de caracteres en pantalla es mayor a la permitida
    return cantidadActual >= cantidadCaracteresMaxima; 
}

function desabilitarOpreadores(booleano){
    if(booleano){
        document.getElementById("boton-+").disabled = true;
        document.getElementById("boton--").disabled = true;
        document.getElementById("boton-x").disabled = true;
        document.getElementById("boton-/").disabled = true;
    }
    else{
        document.getElementById("boton-+").disabled = false;
        document.getElementById("boton--").disabled = false;
        document.getElementById("boton-x").disabled = false;
        document.getElementById("boton-/").disabled = false;
    }
}

function operacionSeleccionada(operacion){
    console.log(operacion);
    if(operacion == "+" || operacion == "-" || operacion == "x" || operacion == "/"){
        console.log("entro a operacion " + operacion);
        desabilitarOpreadores(true);
    }
    else if(operacion == "="){
        console.log("entro a borrado e igual" + operacion);
        desabilitarOpreadores(false);
        resolverOperacion(pantallaPrincipal.innerHTML);
    }
}

//Excepciónes propias
function DivisionByZeroException(mensaje){
    this.message = mensaje;
    this.nombre = DivisionByZeroException;
}
////////////////////////////////////////////////

function formatearOperacion(stringOperacion){//Toma el string de la pantallaPrincipal y los devuelve un array con los elementos de la operacion
    console.log(stringOperacion);
    var componentes;
    if(stringOperacion.includes("+")){
        componentes = stringOperacion.split("+");
        componentes.push("+");
        console.log(componentes);
        return componentes;
    }
    if(stringOperacion.includes("-")){
        componentes = stringOperacion.split("-");
        componentes.push("-");
        console.log(componentes);
        return componentes;
    }
    if(stringOperacion.includes("x")){
        componentes = stringOperacion.split("x");
        componentes.push("x");
        console.log(componentes);
        return componentes;
    }
    if(stringOperacion.includes("/")){
        componentes = stringOperacion.split("/");
        componentes.push("/");
        console.log(componentes);
        return componentes;
    }
    
}



function calcular(dato1, dato2, signoOperacion){
    switch(signoOperacion){
        case "+":
            return(parseFloat(dato1)+parseFloat(dato2));
        case "-":
            return(parseFloat(dato1)-parseFloat(dato2));
        case "x":
            return(parseFloat(dato1)*parseFloat(dato2));
        case "/":
            if(dato2 > 0) {
                return(parseFloat(dato1)/parseFloat(dato2))
            }
            else{
                miErrorDivision =  new DivisionByZeroException("El divisor no puede ser 0");
                throw miErrorDivision;
            }
        default:
            return null;
    }
}

function resolverOperacion(operacion){
    try {
        var operacion;
        operacion = formatearOperacion(operacion);
        operacion.push(calcular(operacion[0], operacion[1], operacion[2]));
        mostrarResultado(operacion);
    } catch (error) {
        alert(error.message);
    }
}

function mostrarResultado(arrayOperacion){//Muestra la operacion y su resultado en la pantallaSecundaria
    pantallaSecundaria.innerText = arrayOperacion[0]+" "+arrayOperacion[2]+" "+arrayOperacion[1]+" "+"="+" "+arrayOperacion[3];
}

/*var operacion = "54/20";
console.log(operacion);
console.log(operacion.includes("/"));
console.log(operacion.split("/"));*/

