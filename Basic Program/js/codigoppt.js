// cual es la minima cantidad de lineas de codigo que se pueden escribir para hacer un juego de piedra papel o tijera
let jugador = 0;

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function logica(nombre, mensaje){
    let resultado = "";
    if(nombre == 1){
        resultado = (mensaje) + " piedra🪨";
    } else if(nombre == 2){
        resultado = (mensaje) + " papel🧻";
    } else if(nombre == 3){
        resultado = (mensaje) + " tijera✂️";
    } else{
        resultado = "Opción no válida😓";
    } 
    return resultado;
}

let victorias = 0;
let perdidas = 0;
let empates = 0;

while(victorias < 3 && perdidas < 3){

    jugador = prompt("Elige una opción: 1 para piedra, 2 para papel, 3 para tijera");
    alert(logica(jugador, "Has elegido"));

    let maquina = aleatorio(1, 3);
    alert(logica(maquina, "La máquina ha elegido"));


    //Combate debe haber una sola linea con triunfos + 1  o empates + 1 o derrotas + 1
    if(jugador == maquina){
        alert("Empate🤝");
        empates = empates + 1;
    } else if(jugador == 1 && maquina == 3){
        alert("Has ganado🎉");
        victorias = victorias + 1;
    } else if(jugador == 2 && maquina == 1){
        alert("Has ganado🎉");
        victorias = victorias + 1;
    } else if(jugador == 3 && maquina == 2){
        alert("Has ganado🎉");
        victorias = victorias + 1;
    } else{
        alert("Has perdido😢");
        perdidas = perdidas + 1;
    }
}

if(victorias == 3){
    alert("Has ganado " + victorias + " y perdido " + perdidas + " partidas🎉");
    alert("Has ganado la partida🎉");
} else{
    alert("Has ganado " + victorias + " y perdido " + perdidas + " partidas🎉");
    alert("Has perdido la partida😢");
}