const LARGURA = 360;
const ALTURA = 1120;
let cameraLigada = false;
let ocupado = false;
let fotos = [];
let segundos = 3;
let adesivoAtual = null;
let filtroAtual = 'none';
let moldura;


const id = Symbol('tira');
const tira = { legenda: '', [id]: 1 };   

const filtros = new Map([
  ['normal', 'none'],
  ['p&b', 'grayscale(1)'],
  ['sepia', 'sepia(0.9)'],
  ['pinky', 'sepia(0.4) hue-rotate(300deg) saturate(1.6)'],
  ['daydream', 'brightness(1.1) contrast(0.9) saturate(1.3)'],
  ['bright', 'saturate(2) contrast(1.1)']
]);


const molduras = [
  { nome: 'cloud', cor: '#ffffff', texto: '#8c5b4a', estampa: 'liso', borda: '#e8a0a0', vazio: '#f7e9e4' },
  { nome: 'bubblegum', cor: '#fadadd', texto: '#5a1d3a', estampa: 'liso' },
  { nome: 'lavander', cor: '#e6e6fa', texto: '#2f1f5a', estampa: 'liso' },
  { nome: 'sage', cor: '#8a9a5b', texto: '#14463a', estampa: 'liso' },
  { nome: 'cherry', cor: '#7d1201', texto: '#ffe3ee', estampa: 'liso' },
  { nome: 'onix', cor: '#2a2330', texto: '#ffe3ee', estampa: 'liso' }
];
moldura = molduras[0];

const adesivos = {
  folha: 'assets/stickers/leaf.png',
  brilho: 'assets/stickers/sparkles.png',
  coracao: 'assets/stickers/heart.png',
  nenhum: ''
};

const imagensAdesivos = new Map();

const dizer = (mensagem) => {
  const elemento = document.getElementById('status');
  if (elemento) {
    elemento.innerText = mensagem;
  } else {
    console.log('Status:', mensagem);
  }
};

function pluralFotos(n) {
  return n === 1 ? 'foto' : 'fotos';   
}

function ehImagem(valor) {
  return valor.endsWith('.png');
}

function marcar(classe, botao) {
  document.querySelectorAll('.' + classe).forEach((b) => { b.style.outline = 'none'; });
  botao.style.outline = '3px solid #ffb6c1';
}

const listaFiltros = document.getElementById('listaFiltros');
filtros.forEach((css, nome) => {
  listaFiltros.innerHTML += `<button class="filtro" onclick="escolherFiltro('${nome}', this)">${nome}</button>`;
});

// o texto de cada botão usa a cor "texto" da moldura, para ler bem também nas cores escuras
const listaMolduras = document.getElementById('listaMolduras');
for (const m of molduras) {
  const posicao = molduras.indexOf(m);
  listaMolduras.innerHTML += `<button class="moldura" style="background:${m.cor}; color:${m.texto}" onclick="escolherMoldura(${posicao}, this)">${m.nome}</button>`;
}

const listaAdesivos = document.getElementById('listaAdesivos');
for (const chave in adesivos) {
  const valor = adesivos[chave];
  let rotulo;
  if (chave === 'nenhum') {
    rotulo = 'Sem adesivo';
  } else if (ehImagem(valor)) {
    rotulo = `<img src="${valor}" alt="${chave}" onerror="this.replaceWith('${chave}')">`;
    const img = new Image();
    img.onload = () => desenharTira();
    img.src = valor;
    imagensAdesivos.set(valor, img);
  } else {
    rotulo = valor;
  }
  listaAdesivos.innerHTML += `<button class="adesivo" onclick="escolherAdesivo('${chave}', this)">${rotulo}</button>`;
}

function escolherFiltro(nome, botao) {
  filtroAtual = filtros.get(nome);
  document.getElementById('video').style.filter = filtroAtual;   // prévia ao vivo
  marcar('filtro', botao);
  desenharTira();
}

function escolherMoldura(posicao, botao) {
  moldura = molduras[posicao];
  marcar('moldura', botao);
  desenharTira();
}

function escolherAdesivo(chave, botao) {
  switch (chave) {
    case 'nenhum':
      adesivoAtual = null;
      break;
    default:
      adesivoAtual = adesivos[chave];
      break;
  }
  marcar('adesivo', botao);
  desenharTira();
}

function pedirLegenda() {
  let texto;
  do {
    texto = window.prompt('Legenda da tira (até 14 letras, vazio = sem legenda):', tira.legenda);
    if (texto !== null && texto.length > 14) {
      window.alert('Muito longa! Você usou ' + texto.length + ' letras.');
    }
  } while (texto !== null && texto.length > 14);
  if (texto !== null) {
    tira.legenda = texto;
    desenharTira();
  }
}

function desenharAdesivo(ctx, y) {
  if (ehImagem(adesivoAtual)) {
    const img = imagensAdesivos.get(adesivoAtual);
    if (img && img.complete && img.naturalWidth > 0) {   // só desenha se o arquivo carregou
      ctx.drawImage(img, 24, y + 176, 56, 56);
      ctx.drawImage(img, 276, y + 8, 56, 56);
    }
  } else {
    ctx.fillStyle = '#fff';
    ctx.font = '44px serif';
    ctx.textAlign = 'left';
    ctx.fillText(adesivoAtual, 26, y + 232);
    ctx.fillText(adesivoAtual, 270, y + 50);
  }
}

function desenharTira() {
  const c = document.getElementById('tira');
  const ctx = c.getContext('2d');

  // fundo da moldura
  ctx.fillStyle = moldura.cor;
  ctx.fillRect(0, 0, LARGURA, ALTURA);


  for (let i = 0; i < fotos.length; i++) {
    const y = 20 + i * 260;
    ctx.filter = filtroAtual;
    ctx.drawImage(fotos[i], 20, y);
    ctx.filter = 'none';
    if (moldura.borda) {
      ctx.strokeStyle = moldura.borda;
      ctx.lineWidth = 3;
      ctx.strokeRect(20, y, 320, 240);
    }
    if (adesivoAtual) {
      desenharAdesivo(ctx, y);
    }
  }

  let vazio = fotos.length;
  while (vazio < 4) {
    const y = 20 + vazio * 260;
    ctx.fillStyle = moldura.vazio || 'rgba(255,255,255,0.55)';
    ctx.fillRect(20, y, 320, 240);
    if (moldura.borda) {
      ctx.strokeStyle = moldura.borda;
      ctx.lineWidth = 3;
      ctx.strokeRect(20, y, 320, 240);
    }
    ctx.fillStyle = moldura.texto;
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('˙𐃷˙', LARGURA / 2, y + 138);
    vazio++;
  }

  // rodapé
  ctx.fillStyle = moldura.texto;
  ctx.textAlign = 'center';
  ctx.font = '30px Itim, sans-serif';
  ctx.fillText(tira.legenda.toUpperCase(), LARGURA / 2, ALTURA - 38);

  // link de download 
  const link = document.getElementById('baixar');
  if (fotos.length === 4) {
    try {
      link.href = c.toDataURL('image/png');
      link.style.display = 'inline-block';
    } catch (erro) {
      link.style.display = 'none';
      dizer('Para baixar com adesivo PNG, abra o site por um servidor local (Live Server). Adesivos de emoji sempre funcionam.');
    }
  } else {
    link.style.display = 'none';
  }
}


function ligarCamera() {
  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      cameraLigada = true;
      dizer('Câmera ligada. Escolha um filtro e clique em "Tirar 4 fotos".');
      console.log('Câmera ligada:', cameraLigada, typeof cameraLigada);
    })
    .catch((erro) => {
      console.error('Erro da câmera:', erro);
      window.alert('Não consegui acessar a câmera. Permita o acesso no navegador e abra o arquivo pelo Chrome.\n\nDetalhe técnico: ' + erro.name + ' - ' + erro.message);
    });
}

function capturar() {
  const video = document.getElementById('video');
  const cv = document.getElementsByClassName('foto')[fotos.length];
  const g = cv.getContext('2d');
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  let sw = vw;
  let sh = vh;
  if (vw / vh > 4 / 3) {
    sw = vh * 4 / 3;
  } else {
    sh = vw * 3 / 4;
  }
  g.save();
  g.translate(320, 0);
  g.scale(-1, 1);
  g.drawImage(video, (vw - sw) / 2, (vh - sh) / 2, sw, sh, 0, 0, 320, 240);
  g.restore();
  return cv;
}

function contagem(n, depois) {
  const aviso = document.getElementById('contagem');
  if (n <= 0) {
    aviso.style.display = 'none';
    depois();
    return;
  }
  aviso.style.display = 'flex';
  aviso.innerText = n;
  setTimeout(() => contagem(n - 1, depois), 1000);
}

function piscar() {
  const flash = document.getElementById('flash');
  flash.style.opacity = 1;
  setTimeout(() => { flash.style.opacity = 0; }, 120);
}

function tirarProxima() {
  if (fotos.length >= 4) {
    ocupado = false;
    tira[id]++;
    desenharTira();
    return;
  }
  contagem(segundos, () => {
    fotos.push(capturar());
    piscar();
    desenharTira();
    setTimeout(tirarProxima, 700);
  });
}

function tirarFoto() {
  if (!cameraLigada) {
    window.alert('Ligue a câmera primeiro!');
    return;
  }
  if (ocupado) {
    return;
  }
  const valor = Number(document.getElementById('segundos').value);
  if (valor >= 1 && valor <= 5 && valor % 1 === 0) {
    segundos = valor;
  } else {
    window.alert('Use um número inteiro de 1 a 5 segundos.');
    return;
  }
  if (fotos.length > 0 && !window.confirm('Refazer todas as fotos?')) {
    return;
  }
  fotos = [];
  ocupado = true;
  tirarProxima();
}


desenharTira();
document.fonts.load('30px Itim').then(desenharTira);
console.log('Cabine pronta. Tira:', tira.legenda, tira[id]);