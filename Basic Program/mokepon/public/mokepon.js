const seccionataque = document.getElementById("seleccionar-ataque");
const botonMascotaJugador = document.getElementById("boton-mascota");
const seccionreiniciar =document.getElementById("seleccionar-reiniciar");
const botonreiniciar =document.getElementById("seleccionar-reiniciar");

const seccioneleccion = document.getElementById("seleccionar-mascota");

const spanmascotaJugador = document.getElementById("mascotaJugador");

const spanmascotarival = document.getElementById("mascotaRival");

const seccionmensajes = document.getElementById("resultadomensaje");
const ataquesdemimascota = document.getElementById("ataquesdemimascota");
const ataquesdelamascotarival = document.getElementById("ataquesdelamascotarival");

const spanvidasJugador = document.getElementById("vidasJugador");
const spanvidasrival = document.getElementById("vidasRival");
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionvermapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueRival = []
let opcionDeMokepones
let inputratigueya 
let inputhipodoge  
let inputcapipepo 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo 
let botonAgua
let botonFuego 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidas = 3 
let vidasx = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./images/map.png"
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, imagen, vida, imagenMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = imagenMapa
        this.velocidadx = 0
        this.velocidady = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
           this.mapaFoto,
           this.x,
           this.y,
           this.ancho,
           this.alto
         )
    }
}

let hipodoge = new Mokepon ("hipodoge", "./images/2.png", 5, "./images/2.png" )
let capipepo = new Mokepon ("capipepo", "./images/3.png", 5, "./images/3.png")
let ratigueya = new Mokepon ("ratigueya", "./images/1.png", 5,  "./images/1.png")

const HIPODOGE_ATAQUES = [
    { nombre: "🚿", id: "seleccionar-agua" },
    { nombre: "🚿", id: "seleccionar-agua" },
    { nombre: "🚿", id: "seleccionar-agua" },
    { nombre: "🔥", id: "seleccionar-fuego" },
    { nombre: "🌱", id: "seleccionar-tierra" }
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "seleccionar-tierra" },
    { nombre: "🌱", id: "seleccionar-tierra" },
    { nombre: "🌱", id: "seleccionar-tierra" },
    { nombre: "🚿", id: "seleccionar-agua" },
    { nombre: "🔥", id: "seleccionar-fuego" }
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "seleccionar-fuego" },
    { nombre: "🔥", id: "seleccionar-fuego" },
    { nombre: "🔥", id: "seleccionar-fuego" },
    { nombre: "🌱", id: "seleccionar-tierra" },
    { nombre: "🚿", id: "seleccionar-agua" }
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)

function windowLoad() {

seccionataque.style.display = "none"
sectionvermapa.style.display = "none"
mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
     <input type="radio" name="mascota" id=${Mokepon.nombre} value="ratigueya">
    
            <label class="tarjeta-de-mokepon" for=${Mokepon.nombre} >
                <p>${Mokepon.nombre}</p>
                <img src=${Mokepon.imagen} alt=${Mokepon.nombre}>
            </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputratigueya = document.getElementById("ratigueya");
    inputhipodoge = document.getElementById("hipodoge");
    inputcapipepo = document.getElementById("capipepo");
 
})
botonMascotaJugador.addEventListener("click", seleccionarMascota)
seccionreiniciar.style.display = "none" //
botonreiniciar.addEventListener("click", reiniciarJuego)
unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res) {
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
    })
}

function seleccionarMascota(){
    if (inputratigueya.checked){
        spanmascotaJugador.innerHTML = inputratigueya.id ;
        mascotaJugador = inputratigueya.id
    } else if (inputhipodoge.checked){
        spanmascotaJugador.innerHTML = inputhipodoge.id;
        mascotaJugador = inputhipodoge.id
    } else if (inputcapipepo.checked){
        spanmascotaJugador.innerHTML = inputcapipepo.id;
        mascotaJugador = inputcapipepo.id
    } else {
        alert("Debes seleccionar un mokepon");
        return
    }

    seccioneleccion.style.display = "none" 

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionvermapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques (mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    } 
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataques)=>{
        ataquesMokepon = `
        <button id= ${ataques.id} class="botondeataque BAtaques">${ataques.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonAgua = document.getElementById("seleccionar-agua");
    botonFuego = document.getElementById("seleccionar-fuego");
    botonTierra = document.getElementById("seleccionar-tierra");
    botones = document.querySelectorAll(".BAtaques")
    }
function secuenciaAtaques(){
    botones.forEach((boton)=> {
        boton.addEventListener("click", (e) => {
           if (e.target.textContent === "🔥"){
            ataqueJugador.push("FUEGO")
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true 
           } else if (e.target.textContent === "🌱"){
            ataqueJugador.push("TIERRA")
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true 
           } else {
            ataqueJugador.push("AGUA")
            console.log(ataqueJugador)
            boton.style.background = "#112f58"
            boton.disabled = true 
           }
           if (ataqueJugador.length === 5){
            enviarAtaques()
           }
        })
    })
    
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador 
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                res.json()
                    .then(function({ataques}){
                        if (ataques.length === 5){
                            ataqueRival = ataques
                            combate()
                        }
                    })
            }
        })
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function mascotaEnemigo(enemigo){
    spanmascotarival.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaques()
}

function ataque(){
    let opcion = aleatorio(0, ataquesMokeponEnemigo.length - 1);

    if (opcion == 0 || opcion == 1){
        ataqueRival.push("AGUA");
    } else if (opcion == 2 || opcion == 3){
        ataqueRival.push("FUEGO");
    } else {
        ataqueRival.push("TIERRA");
    }
    console.log(ataqueRival)
    iniciarPelea() 
}    
function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate() 
    }
}
function crearparrafo(resultado) {
    let nuevoataquedeljugador = document.createElement("p");
    let nuevoataquedelrival = document.createElement("p");

    seccionmensajes.innerHTML = resultado
    nuevoataquedeljugador.innerHTML =  indexAtaqueJugador
    nuevoataquedelrival.innerHTML = indexAtaqueEnemigo

    
    ataquesdemimascota.appendChild(nuevoataquedeljugador);
    ataquesdelamascotarival.appendChild(nuevoataquedelrival);

}
function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadx
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
       mascotaJugadorObjeto.pintarMokepon()

       enviarPosicion( mascotaJugadorObjeto.x,  mascotaJugadorObjeto.y)

       mokeponesEnemigos.forEach(function(mokepon){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
       })  
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok){
            res.json()
                .then(function ({enemigos}) {
                   console.log(enemigos)
                   mokeponesEnemigos = enemigos.map(function(enemigo){
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "hipodoge"){
                            mokeponEnemigo = new Mokepon ("hipodoge", "./images/2.png", 5, "./images/2.png", enemigo.id) 
                        }
                        else if (mokeponNombre === "capipepo"){
                            mokeponEnemigo = new Mokepon ("capipepo", "./images/3.png", 5, "./images/3.png", enemigo.id)
                        }
                        else if (mokeponNombre === "ratigueya"){
                            mokeponEnemigo = new Mokepon ("ratigueya", "./images/1.png", 5,  "./images/1.png", enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                       return mokeponEnemigo
                   })
                })
        }
    })
}

function moverCapipepo(){
   mascotaJugadorObjeto.velocidadx = 5
    
}
function moverCapipepo2(){
   mascotaJugadorObjeto.velocidady = 5
    
}
function moverCapipepo3(){
   mascotaJugadorObjeto.velocidadx = - 5
    
}
function moverCapipepo4(){
   mascotaJugadorObjeto.velocidady = - 5
    
}
function detenerMovimiento(){
   mascotaJugadorObjeto.velocidadx = 0
   mascotaJugadorObjeto.velocidady = 0
}
function Tecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverCapipepo4();
            break
        case "ArrowDown":
            moverCapipepo2();
            break
        case "ArrowRight":
            moverCapipepo();
            break
        case "ArrowLeft":
            moverCapipepo3();
            break
        default:
            break
    }
}
function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", Tecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i] }
        
    } 
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izqEnemigo = enemigo.x

    const arribaMascota = 
    mascotaJugadorObjeto.y
    const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izqMascota = 
    mascotaJugadorObjeto.x

    if( abajoMascota < arribaEnemigo ||
         arribaMascota > abajoEnemigo || 
         derechaMascota < izqEnemigo || 
         izqMascota > derechaEnemigo){
            return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    seccionataque.style.display = "flex"
    sectionvermapa.style.display = "none"
    mascotaEnemigo(enemigo)
}

window.addEventListener("load", windowLoad);

//agregar una validación para que solo se pueda atacar si seleccionaste la mascota antes.
function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador [jugador]
    indexAtaqueEnemigo = ataqueRival [enemigo]
}
function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueRival[index]){
        indexAmbosOponentes(index, index)
        crearparrafo("EMPATE")

       }
       else if (ataqueJugador[index] === "FUEGO" && ataqueRival[index] === "TIERRA" || ataqueJugador[index] === "TIERRA" && ataqueRival[index] === "AGUA" || ataqueJugador[index] === "AGUA" && ataqueRival[index] === "FUEGO"){
        indexAmbosOponentes(index, index)
        crearparrafo("GANASTE")
        victoriasJugador ++
        spanvidasJugador.innerHTML = victoriasJugador
       } else {
        indexAmbosOponentes(index, index)
        crearparrafo("PERDISTE")
        victoriasEnemigo ++
        spanvidasrival.innerHTML = victoriasEnemigo
       }
    }
       revisarvidas(); 
    }
    
function revisarvidas(){
    if (victoriasJugador === victoriasEnemigo){ 
      final("EMPATE");  
    } else if (victoriasJugador > victoriasEnemigo){
       final("GANASTE");
    } else {
        final("PERDISTE");
    }
}
function final(quien) {
    seccionmensajes.innerHTML = quien
    botonreiniciar.style.display = "block"
}
function reiniciarJuego(){
    location.reload()
}


