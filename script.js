document.addEventListener('DOMContentLoaded', () => {
  const jogo = document.getElementById('jogo');
  const joaninha = document.getElementById('joaninha');
  
  // Código existente omitido para brevidade...
  
  const obstacleGifs = [
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo1.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo2.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo3.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo4.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo5.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo6.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo7.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo8.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo9.gif',
    'https://raw.githubusercontent.com/patpires/jopi3m/main/obstaculo10.gif'
  ];
  let joaninhaPos = { x: 350, y: 120 };
  let playing = true;
  let winTimeout;
  let vidas = 1;
  let tempoTotal = 120; // Tempo total em segundos (2 minutos = 120 segundos)
  let tempoRestante = tempoTotal; // Inicializa o tempo restante com o tempo total

  const painelVidas = document.createElement('div');
  //painelVidas.textContent = `VIDAS: ${vidas}`;
  //painelVidas.textContent = `VIDAS: ${vidas}`;
  painelVidas.innerHTML =  `VIDAS: ${vidas}`+ "<br> Tente Sobreviver na Montanha por 2min<br>Livre-se dos Obstáculos e ganhe Vidas";
  painelVidas.style.position = 'absolute';
  painelVidas.style.right = '20px';
  painelVidas.style.top = '20px';
  painelVidas.style.fontSize = '16px';
  painelVidas.style.font = "italic bold 20px arial,serif";
  painelVidas.style.fontFamily = "h";
  painelVidas.style.background = 'rgba(245, 245,245, 0.7)'
  painelVidas.style.color = 'black';
  jogo.appendChild(painelVidas);

  const pontosDeVida = [
    { x: 437, y: 196 }, { x: 393, y: 251 }, { x: 442, y: 307 },
    { x: 367, y: 368 }, { x: 410, y: 459 }, { x: 560, y: 448 },
    { x: 288, y: 517 }, { x: 380, y: 568 }, { x: 500, y: 557 },
    { x: 549, y: 347 }
  ];

  
  // cópido gerado pelo ADAPTAGPT
  // Função para calcular e aplicar posições proporcionais
function aplicarPosicoesProporcionais() {
  const proporcaoX = jogo.offsetWidth / 800;
  const proporcaoY = jogo.offsetHeight / 600;

  // Atualiza joaninhaPos com as posições proporcionais
  joaninhaPos.x = 350 * proporcaoX;
  joaninhaPos.y = 120 * proporcaoY;

  // Aplica a posição proporcional à joaninha
  joaninha.style.left = `${joaninhaPos.x}px`;
  joaninha.style.top = `${joaninhaPos.y}px`;

    // Aplicar posições proporcionais aos pontos de vida
    pontosDeVida.forEach((ponto, index) => {
      const elementoPonto = jogo.querySelector(`.ponto[data-index="${index}"]`) || document.createElement('div');
      elementoPonto.classList.add('ponto');
      elementoPonto.setAttribute('data-index', index); // Atributo para identificar unicamente cada ponto
      elementoPonto.style.left = `${ponto.x * proporcaoX}px`;
      elementoPonto.style.top = `${ponto.y * proporcaoY}px`;

      if (!elementoPonto.parentNode) {
        jogo.appendChild(elementoPonto);
      }
    });
  }

  // Inicializar posições ao carregar
  aplicarPosicoesProporcionais();
// final do código gerado pelo adatpa gpt




  // Previne o comportamento padrão de toque em toda a tela, exceto em botões
document.addEventListener('touchstart', function(e) {
  if (!e.target.matches('button')) {
    e.preventDefault();
  }
}, { passive: false });

  // Supondo que 'jogo' seja um elemento já existente no seu HTML onde você deseja adicionar os pontos
  // Criação dos pontos de vida atualizada para posicionar dinamicamente
  pontosDeVida.forEach(ponto => {
    const elementoPonto = document.createElement('div');
    elementoPonto.classList.add('ponto');
    // Define as posições x e y usando estilos CSS, calculados proporcionalmente
    elementoPonto.style.left = `${ponto.x / 800 * jogo.offsetWidth}px`;
    elementoPonto.style.top = `${ponto.y / 600 * jogo.offsetHeight}px`;

    jogo.appendChild(elementoPonto);
  });

  
  // Função atualizada para posicionar dinamicamente a joaninha
  function updateJoaninhaPosition() {
  // Garante que a joaninha não saia dos limites do contêiner do jogo
  joaninhaPos.x = Math.max(0, Math.min(jogo.offsetWidth - joaninha.offsetWidth, joaninhaPos.x));
  joaninhaPos.y = Math.max(0, Math.min(jogo.offsetHeight - joaninha.offsetHeight, joaninhaPos.y));

  // Atualiza a posição da joaninha
  joaninha.style.left = `${joaninhaPos.x}px`;
  joaninha.style.top = `${joaninhaPos.y}px`;
}

 
// Ajuste nas funções de movimento
const step = 10; // Passo fixo para o movimento

// Exemplo de chamada dentro de moveLeft
function moveLeft() {
  if (!playing) return;
  joaninhaPos.x -= step;
  updateJoaninhaPosition(); // Atualiza a posição com limites aplicados
}

function moveRight() {
  if (!playing) return;
  joaninhaPos.x += step;
  updateJoaninhaPosition(); // Atualiza a posição com limites aplicados
}

function moveUp() {
  if (!playing) return;
  joaninhaPos.y -= step;
  updateJoaninhaPosition(); // Atualiza a posição com limites aplicados
}

function moveDown() {
  if (!playing) return;
  joaninhaPos.y += step;
  updateJoaninhaPosition(); // Atualiza a posição com limites aplicados
}


  document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': moveUp(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
        default: return;
    }
});


  

  function createObstacle() {
    const obstacleIndex = Math.floor(Math.random() * obstacleGifs.length);
    const obstacle = document.createElement('img');
    obstacle.src = obstacleGifs[obstacleIndex];
    obstacle.className = 'obstacle';
    obstacle.style.position = 'absolute';
    obstacle.style.left = `${Math.random() * jogo.offsetWidth}px`;
    obstacle.style.top = `${Math.random() * jogo.offsetHeight}px`;
    jogo.appendChild(obstacle);

    const angle = Math.random() * 2 * Math.PI;
    const speed = 5;

    function moveObstacle() {
      if (!playing) return;
      const currentLeft = parseInt(obstacle.style.left, 10);
      const currentTop = parseInt(obstacle.style.top, 10);
      obstacle.style.left = `${currentLeft + Math.cos(angle) * speed}px`;
      obstacle.style.top = `${currentTop + Math.sin(angle) * speed}px`;

      if (currentLeft < -30 || currentLeft > jogo.offsetWidth || currentTop < -30 || currentTop > jogo.offsetHeight) {
        obstacle.remove();
      }
    }

    const moveInterval = setInterval(moveObstacle, 50);
  }

  function createRestartButton(text) {
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    const button = document.createElement('button');
    button.textContent = text;
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.top = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.style.fontSize = '20px';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => {
      window.location.reload();
    });
    jogo.appendChild(button);
  }

  function gameOver() {
    playing = false;
    clearInterval(winTimeout);
    createRestartButton('Game Over! Clique para reiniciar');
  }

  function victory() {
    playing = false;
    createRestartButton('Você venceu! Conseguiu ficar por 2 minutos! Clique para jogar novamente');
  }

 
  // Reconstrução da função checkCollision
  function checkCollision() {
    const joaninhaRect = joaninha.getBoundingClientRect(); // Certifique-se de que joaninha é um elemento DOM válido

    document.querySelectorAll('.obstacle').forEach(obstacle => {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (!(joaninhaRect.right < obstacleRect.left || 
            joaninhaRect.left > obstacleRect.right || 
            joaninhaRect.bottom < obstacleRect.top || 
            joaninhaRect.top > obstacleRect.bottom)) {
        vidas -= 1;
   const boomGif = document.createElement('img');

      boomGif.src = 'https://raw.githubusercontent.com/patpires/3m-montanha/main/boom1.gif';

      boomGif.style.position = 'absolute';

      boomGif.style.left = `${joaninhaPos.x}px`;

      boomGif.style.top = `${joaninhaPos.y}px`;

      boomGif.style.width = '50px';
 // Adjust size as needed
      boomGif.style.height = '50px';
 // Adjust size as needed
      boomGif.style.zIndex = '100';
 // Ensure it's visible above other elements
    jogo.appendChild(boomGif);

    colide.play();

    setTimeout(() => boomGif.remove(), 1000);
        
        
          atualizarPainel();
        obstacle.remove();
        if (vidas <= 0) gameOver();
      }
    });

    // Corrigido para verificar apenas elementos com uma classe específica para pontos
    document.querySelectorAll('.ponto').forEach(ponto => { // Supondo que os pontos tenham a classe 'ponto'
      const pontoRect = ponto.getBoundingClientRect();
      if (!(joaninhaRect.right < pontoRect.left || 
            joaninhaRect.left > pontoRect.right || 
            joaninhaRect.bottom < pontoRect.top || 
            joaninhaRect.top > pontoRect.bottom)) {
        vidas += 0.5;

  const heartGif = document.createElement('img');

    heartGif.src = 'https://raw.githubusercontent.com/patpires/3m-montanha/main/core.gif';

    heartGif.style.position = 'absolute';

    heartGif.style.left = `${joaninhaPos.x}px`;

    heartGif.style.top = `${joaninhaPos.y}px`;

    heartGif.style.width = '50px';
 // Adjust size as needed
    heartGif.style.height = '50px';
 // Adjust size as needed
    heartGif.style.zIndex = '100';
 // Ensure it's visible above other elements
    jogo.appendChild(heartGif);

    vida.play();

    setTimeout(() => heartGif.remove(), 1000);
 // Remove after 1 second

        
          atualizarPainel();
        ponto.remove();
      }
    });
  }

function atualizarPainel() {
  let minutos = Math.floor(tempoRestante / 60);
  let segundos = tempoRestante % 60;
  segundos = segundos < 10 ? '0' + segundos : segundos; // Adiciona um zero à esquerda se necessário

  painelVidas.innerHTML = `VIDAS: ${vidas}<br>Tente Sobreviver na Montanha por ${minutos}min:${segundos}seg<br>Livre-se dos Obstáculos e ganhe Vidas`;
}


  
  
  // Reconstrução da função gameLoop
  function gameLoop() {
    if (!playing) return;
    checkCollision();
    requestAnimationFrame(gameLoop); // Adiciona continuidade ao loop do jogo
  }

  //codigo novo
document.getElementById('left-btn').addEventListener('click', moveLeft);
document.getElementById('right-btn').addEventListener('click', moveRight);
document.getElementById('top-btn').addEventListener('click', moveUp);
document.getElementById('down-btn').addEventListener('click', moveDown);
  //final

  
const timer = setInterval(() => {
  if (tempoRestante > 0) {
    tempoRestante--; // Decrementa o tempo restante
    atualizarPainel(); // Atualiza o painel com o tempo restante
  } else {
    clearInterval(timer); // Para o timer quando o tempo acabar
    // Aqui você pode adicionar qualquer lógica adicional que deve acontecer quando o tempo acabar
    //alert("O tempo acabou! Tente novamente.");
  }
}, 1000); // Atualiza a cada 1000 milissegundos (1 segundo)


  
  setInterval(gameLoop, 100);
  setInterval(createObstacle, 2000);
 
  // Chamada inicial para posicionar a joaninha
  updateJoaninhaPosition();

   winTimeout = setTimeout(victory, 120000);
  
  // Adiciona um ouvinte de evento para redimensionar
  window.addEventListener('resize', () => {
    updateJoaninhaPosition();
    // Atualiza a posição dos pontos de vida
    document.querySelectorAll('.ponto').forEach((elementoPonto, index) => {
      const ponto = pontosDeVida[index];
      elementoPonto.style.left = `${ponto.x / 800 * jogo.offsetWidth}px`;
      elementoPonto.style.top = `${ponto.y / 600 * jogo.offsetHeight}px`;
    });
  });
  
  
});
