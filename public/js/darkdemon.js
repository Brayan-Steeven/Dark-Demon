// function iniciar juego
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionbotonReiniciar = document.getElementById("reiniciar")
const botonAsesinoJugador = document.getElementById("boton-asesino")
const botonreiniciar= document.getElementById("boton-reiniciar")

//function seleccionar asesino jugador
const sectionSeleccionarAsesino = document.getElementById("seleccionar-asesino")
const spanasesinojugador = document.getElementById("asesino-jugador")

//funtion seleccionar asesino enemigo
const spanasesinoenemigo = document.getElementById("asesino-enemigo")

//function combate
const spanvidasjugador = document.getElementById("vidas-jugador")
const spanvidasenemigo = document.getElementById("vidas-enemigo")

//function crear mensaje
const sectionMensaje = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let asesinos = []
let asesinosEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let vidasjugador = 3
let vidasenemigo = 3
let opcionDeAsesinos
let inputrengoku 
let inputzenitsu 
let inputtanjiro
let asesinoJugador
let asesinoJugadorObjeto
let ataquesAsesino
let botonfuego
let botonagua 
let botonrayo 
let botones = []
let ataquesAsesinoEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./images/mapaDark2.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 800

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800 

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

 
class darkdemon{
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id =id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarAsesino() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let tanjiro = new darkdemon("Tanjiro", "./images/Tanjirou_anime_design.jpg", 5 , "./images/caratanjiro2.png")
let rengoku = new darkdemon("Rengoku", "./images/Kyojuro_anime.jpg", 5, "./images/cararengoku.png")
let zenitsu = new darkdemon("Zenitsu", "./images/Zenitsu_anime.jpg", 5, "./images/carazenitsu.png")

const TANJIRO_ATAQUES = [
    {nombre: "🔥", id:"boton-fuego"}, 
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "💧", id:"boton-agua"},
    {nombre: "⚡", id:"boton-rayo"},
]

tanjiro.ataques.push(...TANJIRO_ATAQUES)

const RENGOKU_ATAQUES = [
    {nombre: "💧", id:"boton-agua"}, 
    {nombre: "💧", id:"boton-agua"},
    {nombre: "💧", id:"boton-agua"},
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "⚡", id:"boton-rayo"},
]

rengoku.ataques.push(...RENGOKU_ATAQUES)

const ZENITSU_ATAQUES = [
    {nombre: "⚡", id:"boton-rayo"}, 
    {nombre: "⚡", id:"boton-rayo"},
    {nombre: "⚡", id:"boton-rayo"},
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "💧", id:"boton-agua"},
]

zenitsu.ataques.push(...ZENITSU_ATAQUES)

asesinos.push(tanjiro,rengoku,zenitsu)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    

    sectionbotonReiniciar.style.display = "none"

    asesinos.forEach((asesino) => {
        opcionDeAsesinos = `
        <input type="radio" name="asesino" id=${asesino.nombre} />
        <label class = "tarjeta-de-asesino" for=${asesino.nombre}>
            <p>${asesino.nombre}</p>
            <img src=${asesino.foto} alt=${asesino.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeAsesinos

        inputrengoku = document.getElementById("Rengoku")
        inputzenitsu = document.getElementById("Zenitsu")
        inputtanjiro = document.getElementById("Tanjiro")
    })

    botonAsesinoJugador.addEventListener("click", seleccionarAsesinoJugador)



    botonreiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.10.10:8080/unirse")
    .then(function(res) {
        if (res.ok) {
            res.text()
                .then(function(respuesta) {
                    console.log(respuesta);
                    jugadorId = respuesta
            }) 
        }
    })
}

function seleccionarAsesinoJugador() {


    if (inputtanjiro.checked) {
        spanasesinojugador.innerHTML = inputtanjiro.id
        asesinoJugador = inputtanjiro.id
    } else if (inputrengoku.checked) {
        spanasesinojugador.innerHTML = inputrengoku.id
        asesinoJugador = inputrengoku.id
    } else if (inputzenitsu.checked) {
        spanasesinojugador.innerHTML = inputzenitsu.id
        asesinoJugador = inputzenitsu.id
    } else {
        alert("NO HAS SELECCIONADO TU ASESINO")
        return
    }

    sectionSeleccionarAsesino.style.display = "none"

    seleccionarAsesino(asesinoJugador)

    extraerAtaques(asesinoJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarAsesino(asesinoJugador) {
    fetch(`http://192.168.10.10:8080/darkdemon/${jugadorId}`, 
    {method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        asesino: asesinoJugador
    })
  })
}

function extraerAtaques(asesinoJugador) {
    let ataques
    for (let i = 0; i < asesinos.length; i++) {
        if (asesinoJugador === asesinos [i].nombre) {
            ataques = asesinos[i].ataques
            
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesAsesino = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button> 
        `
        contenedorAtaques.innerHTML += ataquesAsesino
    })

     botonfuego = document.getElementById("boton-fuego")
     botonagua = document.getElementById("boton-agua")
     botonrayo = document.getElementById("boton-rayo")
     botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
                boton.style.cursor = 'not-allowed'
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58" 
                boton.disabled = true
                boton.style.cursor = 'not-allowed'
            } else {
                ataqueJugador.push("RAYO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
                boton.style.cursor = 'not-allowed'
            }
            if(ataqueJugador.length === 5) {
                enviarAtaques()  
            }
        })
    })
    
}

function enviarAtaques() {
    fetch(`http://192.168.10.10:8080/darkdemon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.10.10:8080/darkdemon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                })
            }
        })
}
function seleccionarAsesinoEnemigo(enemigo) {
    
    spanasesinoenemigo.innerHTML = enemigo.nombre
    ataquesAsesinoEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueRandomEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesAsesinoEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("FUEGO")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("RAYO")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")

    }else if (ataqueEnemigo[index] == ataqueJugador[index]) {
        indexAmbosOponentes(index, index)
        crearMensaje("EMPATE")
        victoriasJugador++
        spanvidasjugador.innerHTML = victoriasJugador
        
    } else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "RAYO") {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE 🏆")
        victoriasJugador++
        spanvidasjugador.innerHTML = victoriasJugador
        
    } else if (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE 🏆")
        victoriasJugador++
        spanvidasjugador.innerHTML = victoriasJugador
    
    } else if (ataqueJugador[index] == "RAYO" && ataqueEnemigo[index] == "FUEGO") {
        indexAmbosOponentes(index, index)
        crearMensaje("GANASTE 🏆")
        victoriasJugador++
        spanvidasjugador.innerHTML = victoriasJugador
        
    } else {
        indexAmbosOponentes(index, index)
        crearMensaje("PERDISTE😭❌")
        victoriasEnemigo++
        spanvidasenemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarvidas()
}  

function revisarvidas(){
    if (victoriasJugador === victoriasEnemigo) {
        MensajeFinal ("Esto fue un empate")
    } else if (victoriasJugador > victoriasEnemigo){
        MensajeFinal("GANASTE🤑")
        
    } else {
        MensajeFinal("PERDISTE💀")
    }
   
}

function crearMensaje(resultado) {
   
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function MensajeFinal(resultadoFinal) {
    
    
    sectionMensaje.innerHTML = resultadoFinal
 
    sectionbotonReiniciar.style.display = "block"

}

function  reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarMapa() {

    asesinoJugadorObjeto = obtenerObjetoAsesino(asesinoJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function pintarCanvas() {
    asesinoJugadorObjeto.x = asesinoJugadorObjeto.x + asesinoJugadorObjeto.velocidadX
    asesinoJugadorObjeto.y = asesinoJugadorObjeto.y + asesinoJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
    )
    asesinoJugadorObjeto.pintarAsesino()

    enviarPosicion(asesinoJugadorObjeto.x, asesinoJugadorObjeto.y)

    asesinosEnemigos.forEach(function (asesino) {
        asesino.pintarAsesino()
        revisarColision(asesino)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.10.10:8080/darkdemon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, 
            y
        })    
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                console.log(enemigos)
                asesinosEnemigos = enemigos.map(function (enemigo) {
                    let asesinoEnemigo = null
                    const asesinoNombre = enemigo.asesino.nombre || ""
                    if (asesinoNombre === "Tanjiro") {
                        asesinoEnemigo = new darkdemon("Tanjiro", "./images/Tanjirou_anime_design.jpg", 5 , "./images/caratanjiro2.png", enemigo.id)
                    } else if (asesinoNombre === "Rengoku") {
                        asesinoEnemigo = new darkdemon("Rengoku", "./images/Kyojuro_anime.jpg", 5, "./images/cararengoku.png", enemigo.id)
                    } else if (asesinoNombre === "Zenitsu") {
                        asesinoEnemigo = new darkdemon("Zenitsu", "./images/Zenitsu_anime.jpg", 5, "./images/carazenitsu.png", enemigo.id)
                    }

                    asesinoEnemigo.x = enemigo.x
                    asesinoEnemigo.y = enemigo.y

                    return asesinoEnemigo
                })
            })
        }
    })
}

function moverDerechaTanjiro() {
    
    asesinoJugadorObjeto.velocidadX = 5   
}

function moverArribaTanjiro() {
    
    asesinoJugadorObjeto.velocidadY = -5   
}

function moverIzquierdaTanjiro() {
    
    asesinoJugadorObjeto.velocidadX = -5
}

function moverAbajoTanjiro() {
    
    asesinoJugadorObjeto.velocidadY = 5  
}

function detenerMovimiento() {
    
    asesinoJugadorObjeto.velocidadX = 0
    asesinoJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp", "w":
            moverArribaTanjiro()
            break
        case "ArrowDown", "s":
            moverAbajoTanjiro()
            break
        case "ArrowLeft", "a":
            moverIzquierdaTanjiro()
            break
        case "ArrowRight", "d":
            moverDerechaTanjiro()
            break   
        default:
            break;
    }
}

function obtenerObjetoAsesino() {
    for (let i = 0; i < asesinos.length; i++) {
    if (asesinoJugador === asesinos[i].nombre) 
        return asesinos[i]
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaJugador = asesinoJugadorObjeto.y
    const abajoJugador = asesinoJugadorObjeto.y + asesinoJugadorObjeto.alto
    const derechaJugador = asesinoJugadorObjeto.x + asesinoJugadorObjeto.ancho
    const izquierdaJugador = asesinoJugadorObjeto.x

    if(
        abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision")

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarAsesinoEnemigo(enemigo)
    //alert ("HAY COLISION CON " + enemigo.nombre)
}

window.addEventListener("load", iniciarJuego)
