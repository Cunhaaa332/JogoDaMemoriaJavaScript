function hmtl(){
  const mesa = document.querySelector("#mesa");
  const imagens = ['Botafogo.png',
  'CAP.png',
  'Flamengo.png',
  'Fluminense.png',
  'Gremio.png',
  'Inter.png',
  'Palmeiras.png',
  'Vasco.png'];
  let cartaHTML = "";
  
  imagens.forEach(imagem => {
    cartaHTML += `<div class="cartaJogo giro" data-carta="${imagem}">
      <img class="frente" src="img/${imagem}">
      <img class="tras" src="img/tras.jpg">
    </div>
    <div class="cartaJogo giro" data-carta="${imagem}">
      <img class="frente" src="img/${imagem}">
      <img class="tras" src="img/tras.jpg">
    </div>
    `;
  });
  mesa.innerHTML = cartaHTML;
} 

hmtl();

const cartas = document.querySelectorAll(".cartaJogo");
let primeiraCarta, segundaCarta;
let cartaCerta = false;
let dif = 0;
let inicio = 0;
let contpares = 0;

function DEUS(){
contpares =0
  cartas.forEach(carta => carta.classList.add("giro"));
  setTimeout(() => {
    cartas.forEach(carta => carta.classList.remove("giro"));
  },3000)
  inicio = new Date();
  cartas.forEach(carta => carta.addEventListener("click", girar));
  
  function embaralhar() {
    cartas.forEach(carta => {
        let aleatorio = Math.floor(Math.random() * 16)
        carta.style.order = aleatorio
    })
  }
  embaralhar()
  return inicio
}

function girar(){
    if (cartaCerta) return false;
    this.classList.add("giro");

    if (!primeiraCarta) {
      primeiraCarta = this;
      primeiraCarta.removeEventListener("click", girar);
      return false;
    }

    segundaCarta = this;

    testarCombinacao();
}

function testarCombinacao() {
      let combinou = primeiraCarta.dataset.carta === segundaCarta.dataset.carta;
      if (combinou === true){
        contpares += 1;
        console.log(contpares)
        voltarCartas(combinou)
          if(contpares === 8){
            let fim = new Date()
            dif = Math.round((fim - inicio)/1000)
            if((localStorage.getItem("record")) > dif || (localStorage.getItem("record") === null) && (dif != 0)){
              localStorage.setItem("record",`${dif}`)
            }
            window.alert(`Vocë ganhou, seu tempo foi de: ${dif} segundos!!`)
          }
      }else{
        desvirar()
      }
}

function desvirar() {
  cartaCerta = true;
  setTimeout(() => {
      primeiraCarta.classList.remove("giro");
      segundaCarta.classList.remove("giro");
      primeiraCarta.addEventListener("click", girar);
      voltarCartas();
  }, 1000);
}

function voltarCartas(combinou = false) {
      if (combinou) {
        primeiraCarta.removeEventListener("click", girar);
        segundaCarta.removeEventListener("click", girar);
      }
    
      [primeiraCarta, segundaCarta, cartaCerta] = [null, null, false];
} 
  
function mostraMelhorTempo(){
  if (localStorage.getItem("record") === null){
    alert("Nenhum tempo registrado.")
  }else{
    alert("Seu melhor tempo é de: " + localStorage.getItem("record")+" segundos!!!")
  }
}