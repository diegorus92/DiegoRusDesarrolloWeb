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
var limiteCaracteresPantallaPrincipal = 13;

console.log(pantallaPrincipal.innerHTML);
console.log(pantallaSecundaria.innerHTML);
//////////////////////////////////////////////////////////

function excedeLongitud(cantidadCaracteresMaxima, cantidadActual){//devuelve true si la cantidad de caracteres en pantalla es mayor a la permitida
    return cantidadActual >= cantidadCaracteresMaxima; 
}

/*Deshabilita los botones de operaciones hasta que se haya resuelto la operación
evitando elegir operadores mas de una vez
Si se presionó "=" resuelve la operación y resetea la pantallaPrincipal*/
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

function entradaDato(e) {
    e.preventDefault();
    console.log(e.target.value);
    if(!excedeLongitud(limiteCaracteresPantallaPrincipal, pantallaPrincipal.innerHTML.length)){//Si da false (NO excede caracteres), agrega el caracter a la pantalla
        if(e.target.value != "="){//Todos los caracteres excepto el "=" se muestran en pantallaPrincipal
            pantallaPrincipal.innerHTML += e.target.value;
        }
        operacionSeleccionada(e.target.value);
        
    }
    else{
        console.log("Exceso de caracteres en pantalla");
        if(e.target.value == "="){
            operacionSeleccionada(e.target.value);
        }
    }
}

//Resetea la pantalla principal y habilita los botones de operaciones
function deletePantallaPrincipal(){
    pantallaPrincipal.innerHTML = "0";
    deshabilitarOpreadores(false);
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

function esEntero(numero){//Devuelve true si el numero es entero, false si tiene decimales
    if((numero % 1) == 0){
        return true;
    }
    else{
        return false;
    }
}


function calcular(dato1, dato2, signoOperacion){
    switch(signoOperacion){
        case "+":
            var resultado = parseFloat(dato1) + parseFloat(dato2);
            //Operador condicional ternario, para evitar utilizar if-else el cual ocuparía mas líneas
            esEntero(resultado) ? parseInt(resultado) : (resultado = parseFloat(resultado).toFixed(2)); 
            return resultado;
        case "-":
            var resultado = parseFloat(dato1)-parseFloat(dato2);
            esEntero(resultado) ? parseInt(resultado) :  (resultado = parseFloat(resultado).toFixed(2));
            return resultado;
        case "x":
            var resultado = parseFloat(dato1)*parseFloat(dato2);
            esEntero(resultado) ? parseInt(resultado) :  (resultado = parseFloat(resultado).toFixed(2));
            return resultado;
        case "/":
            if(dato2 > 0) {
                var resultado = parseFloat(dato1)/parseFloat(dato2);
                esEntero(resultado) ? parseInt(resultado) :  (resultado = parseFloat(resultado).toFixed(2));
                return resultado;
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
botonSubir.style.setProperty("animation-name", "animacion-flecha-subir");
botonSubir.style.setProperty("animation-duration", "1s");
botonSubir.style.setProperty("animation-iteration-count", "1");

window.addEventListener("scroll", function(e){
    console.log("scrolling");

    var alturaTotalBody = document.getElementsByTagName("body")[0].offsetHeight;
    var posicionActualScrollY = window.scrollY;
    var alturaViewport = window.visualViewport.height;

    var adelantador = 150; //para que la flecha aparezca poco antes de llegar al fin de la página

    console.log("Posicion Y de scroll: "+posicionActualScrollY);
    console.log("Altura total del <body>"+alturaTotalBody);
    console.log("Altura del viewport: "+alturaViewport);

    //cuando la alturaTotalBody = (posicionActualScrollY + alturaViewport) --> Se llegó al finál del la página
    if(alturaTotalBody <= (posicionActualScrollY + alturaViewport + adelantador)){
        console.log("FINAL DE LA PÁGINA!!!");
        botonSubir.style.display = "block";
        botonSubir.style.top = (alturaTotalBody - adelantador)+"px";

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

