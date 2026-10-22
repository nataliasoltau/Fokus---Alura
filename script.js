const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPause = new Audio("/sons/pause.mp3");
const tempoAcabou = new Audio("/sons/beep.mp3");

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

// Adiciona musica
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Adiciona evento de troca de fundo nos botoes
focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
             Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
    Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
    `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
            Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa. </strong>
            `;
      break;
    default:
      break;
  }
}

// Adiciona evento de contagem regressiva
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    tempoAcabou.play();
    alert("Tempo finalizado");
    return;
  }
  tempoDecorridoEmSegundos--;
  console.log("temporizador: " + tempoDecorridoEmSegundos);
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    audioPause.play();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}
