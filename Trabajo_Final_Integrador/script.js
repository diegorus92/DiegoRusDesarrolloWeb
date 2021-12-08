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
    deshabilitarOpreadores(false);
}

function excedeLongitud(cantidadCaracteresMaxima, cantidadActual){//devuelve true si la cantidad de caracteres en pantalla es mayor a la permitida
    return cantidadActual >= cantidadCaracteresMaxima; 
}

function deshabilitarHoverOperadores(booleano){//Con true remueve la clase animada de los botones de operadores para que no funcione el hover del CSS. Con false reestablece la clase animada y el hover vuelve a funcionar
    var operadores = document.getElementsByClassName("boton-operacion");
    console.log("Elementos con class='boton-operacion: '"+operadores.length);
    if(booleano){
        for(var i = 0; i <= 3; i++){//solo tomo hasta el indice 3 para que solo tome los operadores +, -, x, /
            console.log(operadores[i].innerText);
            
            operadores[i].classList.remove("boton-operacion-animado");
        }
    }
    else{
        for(var i = 0; i <= 3; i++){
            operadores[i].classList.add("boton-operacion-animado");
        }
    }
}

function deshabilitarOpreadores(booleano){//Desactiva los botones de operadores segun el booleano
    if(booleano){
        document.getElementById("boton-+").disabled = true;
        document.getElementById("boton--").disabled = true;
        document.getElementById("boton-x").disabled = true;
        document.getElementById("boton-/").disabled = true;

        deshabilitarHoverOperadores(booleano);
    }
    else{
        document.getElementById("boton-+").disabled = false;
        document.getElementById("boton--").disabled = false;
        document.getElementById("boton-x").disabled = false;
        document.getElementById("boton-/").disabled = false;

        deshabilitarHoverOperadores(booleano);
    }
}



function operacionSeleccionada(operacion){
    console.log(operacion);
    if(operacion == "+" || operacion == "-" || operacion == "x" || operacion == "/"){
        console.log("entro a operacion " + operacion);
        deshabilitarOpreadores(true);
    }
    else if(operacion == "="){
        console.log("entro a  igual" + operacion);
        resolverOperacion(pantallaPrincipal.innerHTML);
        deletePantallaPrincipal();
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


//Boton para ir al principio de la página cuando se llega al final
console.log("scroll");
var botonSubir = document.getElementById("boton-subir");
botonSubir.style.setProperty("display", "none");
botonSubir.style.setProperty("position", "absolute");
botonSubir.style.setProperty("top", "2600px");

window.addEventListener("scroll", function(e){
    console.log("scrolling");

    var alturaTotalBody = document.getElementsByTagName("body")[0].offsetHeight;
    var posicionActualScrollY = window.scrollY;
    var alturaViewport = window.visualViewport.height;

    console.log("Posicion Y de scroll: "+posicionActualScrollY);
    console.log("Altura total del <body>"+alturaTotalBody);
    console.log("Altura del viewport: "+alturaViewport);

    //cuando la alturaTotalBody = (posicionActualScrollY + alturaViewport) --> Se llegó al finál del la página
    if(alturaTotalBody == (posicionActualScrollY + alturaViewport)){
        console.log("FINAL DE LA PÁGINA!!!");
        botonSubir.style.display = "block";
        botonSubir.style.top = (alturaTotalBody - 120)+"px";
    }
    else{
        botonSubir.style.display = "none";
    }
});

//////////////////////////////////////////////////////////////////

//Prueba de cambio de clases de elementos
/*var operaciones = document.getElementById("boton-+");
operaciones.classList.remove("boton-operacion");
operaciones.classList.add("boton-operacion-desactivado");*/

//Prueba con funciones de Strings
/*var operacion = "54/20";
console.log(operacion);
console.log(operacion.includes("/"));
console.log(operacion.split("/"));*/

