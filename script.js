const tablero = document.getElementById("tablero");
const botonReiniciar = document.getElementById("reiniciar");

// 🔹 Pares: cada objeto tiene { nombre, imagen }
const pares = [
  { nombre: "Bobina_en_general", imagen: "img/Bobina_en_general.jpg" },
  { nombre: "Interruptor_rotativo", imagen: "img/Interruptor_rotativo.jpg" },
  { nombre: "Lámpara_de_señalización", imagen: "img/Lámpara_de_señalización.jpg" },
  { nombre: "Pulsador_de_doble_cámara", imagen: "img/Pulsador_de_doble_cámara.jpg" },
  { nombre: "Pulsador_de_marcha", imagen: "img/Pulsador_de_marcha.jpg" },
  { nombre: "Pulsador_de_parada", imagen: "img/Pulsador_de_parada.jpg" },
  { nombre: "Seta_de_Emergencia", imagen: "img/Seta_de_Emergencia.jpg" },
  { nombre: "Sirena", imagen: "img/Sirena.jpg" },
  { nombre: "Telerruptor", imagen: "img/Telerruptor.jpg" },
  { nombre: "Temporizador_a_la_conexión", imagen: "img/Temporizador_a_la_conexión.jpg" }
];

let primeraCarta = null;
let bloquear = false;

function crearTablero() {
  tablero.innerHTML = "";
  let cartas = [];

  // Crear pares: una con imagen, otra con texto
  pares.forEach(p => {
    cartas.push({ tipo: "img", valor: p.imagen, nombre: p.nombre });
    cartas.push({ tipo: "txt", valor: p.nombre, nombre: p.nombre });
  });

  // Mezclar
  cartas.sort(() => Math.random() - 0.5);

  cartas.forEach(c => {
    const carta = document.createElement("div");
    carta.classList.add("carta");

    if (c.tipo === "img") {
      carta.innerHTML = `
        <div class="cara frente"><img src="${c.valor}" width="100" height="100"></div>
        <div class="cara dorso">?</div>
      `;
    } else {
      carta.innerHTML = `
        <div class="cara frente"><strong>${c.valor}</strong></div>
        <div class="cara dorso">?</div>
      `;
    }

    carta.dataset.nombre = c.nombre;

    carta.addEventListener("click", () => {
      if (bloquear || carta.classList.contains("volteada")) return;
      carta.classList.add("volteada");

      if (!primeraCarta) {
        primeraCarta = carta;
      } else {
        if (primeraCarta.dataset.nombre === carta.dataset.nombre) {
          primeraCarta = null; // pareja correcta
        } else {
          bloquear = true;
          setTimeout(() => {
            primeraCarta.classList.remove("volteada");
            carta.classList.remove("volteada");
            primeraCarta = null;
            bloquear = false;
          }, 1000);
        }
      }
    });

    tablero.appendChild(carta);
  });
}

botonReiniciar.addEventListener("click", crearTablero);

// Inicializar
crearTablero();
