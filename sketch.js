function setup() {
  createCanvas(600, 400)
  
  trilha.loop();
}

function draw() {
  background(0)
  ConfigBolinha();
  Raquetes(xminhaRaquete, yminhaRaquete);
  Raquetes(xoponenteRaquete, yoponenteRaquete);
  movimentaminhaRaquete();
  colisaoRaqueteBiblioteca(xminhaRaquete,yminhaRaquete);
  colisaoRaqueteBiblioteca(xoponenteRaquete,yoponenteRaquete);
  movimentaRaqueteOponente();
  incluiPlacar();
  vencedor();
  }

//Variáveis Bolinha
let xBolinha = 300
let yBolinha = 200
let diametro = 30
let velocidadeXBolinha = 8
let velocidadeYBolinha = 8
let raio = diametro / 2

function ConfigBolinha() {
  //cria bolinha
  circle(xBolinha, yBolinha, diametro)

  //velocidade da bolinha
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha

  // verifica colisao com as bordas
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1
  }
}

// Váriáveis minhaRaquete

let xminhaRaquete = 10
let yminhaRaquete = 160
let widthRaquete = 5
let heightRaquete = 80
let velocidadeYminhaRaquete = 6

// Váriáveis oponenteRaquete

let xoponenteRaquete = 585
let yoponenteRaquete = 160
let velocidadeYoponenteRaquete;

function Raquetes(x,y) {
  rect(x, y, widthRaquete, heightRaquete)
}

//Váriaveis de colisão

let colidiu = false;

function colisaoRaqueteBiblioteca(a,b){
  colidiu = collideRectCircle(a, b, widthRaquete, heightRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    raquetada.play();
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente(){
    velocidadeYoponenteRaquete = yBolinha - yoponenteRaquete - widthRaquete/2 - 85;
  yoponenteRaquete += velocidadeYoponenteRaquete;
  
}

function movimentaminhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yminhaRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yminhaRaquete += 10;
  }
}

//Placar do jogo
let meusPontos = 0;
let pontosOp = 0;

function incluiPlacar(){
  textAlign(CENTER)
  textSize(15);
  fill(75,0,130)
  rect(225, 10, 50, 20)
  rect(325, 10, 50, 20)
  fill(255)
  text(meusPontos, 250, 26)
  text(pontosOp, 350, 26)
  
  if (xBolinha + raio > width) {
    meusPontos += 1;
    ponto.play();
  }
  if ( xBolinha - raio < 0){
    pontosOp += 1;    
    ponto.play();
  }
}

//SONS DO JOGO
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  }
