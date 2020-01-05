var rows = 10;
var cols = 10;
var tamanioCuadros = 50;

var tablero = document.getElementById("gameboard");

for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
        var cuadro = document.createElement("div");
        tablero.appendChild(cuadro);

        cuadro.id = "s" + j + i;

        var posicionTop = j * tamanioCuadros;
        var posicionLeft = i * tamanioCuadros;

        cuadro.style.top = posicionTop + "px";
        cuadro.style.left = posicionLeft + "px";

    }
}

var contador = 0; //contador de puntos, pagar ganar necesita 17 puntos;

//creamos un array donde se guardan las coordenadas de todas las naves y el estado del tablero
var tableroJuego = [];
var bombas = 0; //contador de la cantidad de bombas

for (var k = 0; k < 10; k++) {
    tableroJuego[k] = [];
    for (var l = 0; l < 10; l++) {
        tableroJuego[k][l] = Math.floor(Math.random() * 2);
        if (tableroJuego[k][l] == 1) {
            bombas++;
        }
    }
}

var intentos = bombas; //contador de intentos

//se agrega un EventListener para accionar la funcion probarTerreno al hacer click
tablero.addEventListener("click", probarTerrenoClick, false);

//funcion para disparar los misiles
function probarTerrenoClick(e) {
    if (intentos > 0) {//si no hay mas intentos, perdemos
        if (e.target !== e.currentTarget) {
            var row = e.target.id.substring(1, 2);
            var col = e.target.id.substring(2, 3);

            if (tableroJuego[row][col] == 0) {
                e.target.style.background = '#bbb';
                tableroJuego[row][col] = 3; //se pone en 3 para indicar que fue un disparo nulo

            } else if (tableroJuego[row][col] == 1) {
                e.target.style.background = "-webkit-radial-gradient(circle, rgba(2,0,36,0.896796218487395) 0%, rgba(180,15,15,0.9108018207282913) 40%, rgba(27,141,245,0.8295693277310925) 100%)";
                tableroJuego[row][col] = 2; //se pone en 2 para indicar que fue un golpe a un barco
                contador++; //se suma 1 punto
                //se muestra el puntaje y la cantidad de intentos
                document.getElementById("puntaje").innerHTML = "Bombas encontradas: " + contador + "/" + bombas;
                intentos++;//si acertamos, no se resta 1 intento
                if (contador == bombas) {
                    alert("Todos las bombas fueron desactivadas!!");
                }
            } else if (tableroJuego[row][col] > 1) {
                alert("Ya disparaste a esa ubicación!!");
            }
        }
        e.stopPropagation();
        intentos--;//al finalizar se resta un intento
        document.getElementById("intentos").innerHTML = "Equipamiento: " + intentos;

    } else {
        alert("No tienes más intentos, GAME OVER");
    }

}

//se agregan eventListener a los campos de ingreso
function inicio() {
    var fila = document.getElementById("fila");
    var columna = document.getElementById("columna");
    fila.addEventListener("input", validarFila, false);
    columna.addEventListener("input", validarColumna, false);
    validarFila();
    validarColumna();
}

//se agrega el EventListener al cargar la pagina
window.addEventListener("load", inicio, false);

//verifica si las validaciones son correctas para poder jugar
function verificar() {
    if (validarColumna() && validarFila()) {
        return true;
    }
    return false;
}

//se validan las filas y las columnas
function validarFila() {
    var expresion = new RegExp("[A-Ja-j]");

    if (fila.value == '') {
        fila.setCustomValidity("Ingrese un valor");
        fila.style.background = "#FFDDDD";
        fila.reportValidity();
        return false;
    } else if (fila.value.length > 1) {
        fila.setCustomValidity("Ingrese solo 1 valor");
        fila.style.background = "#FFDDDD";
        fila.reportValidity();
        return false;

    } else if (!expresion.test(fila.value)) {
        fila.setCustomValidity("Ingrese solo letras de la A a la J");
        fila.style.background = "#FFDDDD";
        fila.reportValidity();
        return false;
    } else {
        fila.setCustomValidity("");
        fila.style.background = "#FFFFFF";
        return true;
    }
}

function validarColumna() {
    if (columna.value == '') {
        columna.setCustomValidity("Ingrese un valor");
        columna.style.background = "#FFDDDD";
        columna.reportValidity();
        return false;
    } else if (isNaN(columna.value)) {
        columna.setCustomValidity("Ingrese solo números del 1 al 10");
        columna.style.background = "#FFDDDD";
        columna.reportValidity();
        return false;
    } else if (columna.value > 10 || columna.value < 1) {
        columna.setCustomValidity("Ingrese un número del 1 al 10");
        columna.style.background = "#FFDDDD";
        columna.reportValidity();
        return false;
    } else {
        columna.setCustomValidity("");
        columna.style.background = "#FFFFFF";
        return true;
    }

}

//funcion probarTerreno ligada al boton
function probarTerreno() {
    if (intentos > 0) {//verifica si la cantidad de intentos es mayor a 0
        if (verificar()) {//si esl valor es true, se realiza la funcion
            var letra = fila.value;
            var col = columna.value;
            col = col - 1;
            letra = letra.toLowerCase();
            var row = letra.charCodeAt(0) - 97;

            if (tableroJuego[row][col] == 0) {
                document.getElementById("s" + row + col).style.background = '#bbb';
                tableroJuego[row][col] = 3; //se pone en 3 para indicar que fue un disparo nulo

            } else if (tableroJuego[row][col] == 1) {
                document.getElementById("s" + row + col).style.background = "-webkit-radial-gradient(circle, rgba(2,0,36,0.896796218487395) 0%, rgba(180,15,15,0.9108018207282913) 40%, rgba(27,141,245,0.8295693277310925) 100%)";
                tableroJuego[row][col] = 2; //se pone en 2 para indicar que fue un golpe a un barco
                contador++; //se suma 1 punto
                document.getElementById("puntaje").innerHTML = "Bombas encontradas: " + contador + "/" + bombas;
                intentos++;
                if (contador == bombas) {
                    alert("Todos las bombas fueron desactivadas!!");
                }
            } else if (tableroJuego[row][col] > 1) {
                alert("Ya disparaste a esa ubicación!!");
            }
        } else {
            alert("Las coordenadas no son correctas");
        }
        intentos--;
        document.getElementById("intentos").innerHTML = "Equipamiento: " + intentos;

    } else {
        alert("No tienes más intentos");
    }

}