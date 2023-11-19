import { Game } from './modules/game.js';

const input = document.getElementById("respuesta");
const send = document.getElementById("send");
const display = document.getElementById("suma");
let retry = document.getElementById("retry");
let robertDis = document.getElementById("robert");
let gorilaDis = document.getElementById("gorila");

var idTimeOut;

let game = new Game();
display.innerHTML = game.suma.sum1 + ' + ' + game.suma.sum2;
robertDis.innerHTML = game.roberto;
gorilaDis.innerHTML = game.gorila;

// Evento al hacer click en el boton de enviar
send.onclick = function () {
    // Comprobamos si el intento es correcto o no
    if (game.checkSend(input.value)) {
        // Sumamos los puntos
        ++game.points;
        // Si lo es, creamos nueva suma
        game.nuevaSuma();
        // Ponemos la nueva suma en la pantalla
        display.innerHTML = game.suma.sum1 + ' + ' + game.suma.sum2;
        // Reseteamos el contenido del input
        input.value = '';
        // Cancelamos el antiguo temporizador
        clearTimeout(idTimeOut);
        // Y comenzamos un temporizador nuevo
        timeDead();
    } else {
        // Si no es correcto, le quitamos 1 segundo de tiempo disponible
        game.time -= 1000;
        // Cancelamos el temporizador que habia corriendo
        clearTimeout(idTimeOut);
        // Ejecutamos un nuevo temporizador que tendrá el nuevo tiempo
        timeDead();
        // Ponemos una nueva suma
        game.nuevaSuma();
        // Mostramos la suma
        display.innerHTML = game.suma.sum1 + ' + ' + game.suma.sum2;
        // Reseteamos el contenido del input
        input.value = '';
    }
    console.log(game.time)
}
// Evento para enviar el intento al pulsar enter
input.onkeydown = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        send.click();
    }
}
// Hacemos una variable que contiene una función que lanza un timeout
var timeDead = () => {
    // Guardamos el id del timeout en una variable para poder cancelarlo
    idTimeOut = setTimeout(() => {
        // Cuando se ejecuta el codigo del timeout, generamos nueva suma
        game.nuevaSuma();
        // La mostramos
        display.innerHTML = game.suma.sum1 + ' + ' + game.suma.sum2;
        // Reseteamos el input
        input.value = '';
        // Le restamos distancia al gorila
        game.gorila -= 1;
        // Mostramos la distancia del gorila
        gorilaDis.innerHTML = game.gorila;
        // Comprobamos que el gorila no este a 0 para ejecutar otro timer si el usuario no ha introducido ningún número
        if (game.gorila > 0) {
            timeDead();
        } else {
            // Si el gorila es 0, ya nos ha matado y mostramos el feedback al usuario
            display.innerHTML = "TE HA MATAO EL GORILA <br> Has conseguido un total de " + game.points + " puntos!!";
            send.disabled = "disabled";
            input.disabled = "disabled";
            retry.style.display = "inline-block";
        }
    }, game.time);
}

// Funcionalidad del boton de retry
retry.onclick = () => {
    // Creamos nueva suma
    game.nuevaSuma();
    // Ponemos el gorila lejos
    game.gorila = 10;
    // Ponemos el gorila
    gorilaDis.innerHTML = game.gorila;
    // Resteamos el time
    game.time = 5000;
    // Ponemos de nuevo en funcionamiento el boton
    send.disabled = false;
    // Ponemos la nueva suma en la pantalla
    display.innerHTML = game.suma.sum1 + ' + ' + game.suma.sum2;
    // Reseteamos el contenido del input y lo habilitamos
    input.value = '';
    input.disabled = false;
    // Cancelamos el antiguo temporizador
    clearTimeout(idTimeOut);
    // Y comenzamos un temporizador nuevo
    timeDead();
    // Escondemos de nuevo el boton
    retry.style.display = 'none';
}

// Ejecutamos el primer timer para dar comienzo al juego
timeDead();