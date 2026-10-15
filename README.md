# ★ Little Memories — cabine de fotos 

Uma cabine de fotos que roda direto no navegador. Você liga a câmera, escolhe filtro, moldura e adesivo, tira **4 fotos em sequência** e baixa uma **tira de fotos** pronta em PNG. ✨

Feito só com **HTML, CSS e JavaScript puro**, sem frameworks e sem instalar nada.

>  **Inspiração:** este projeto foi inspirado no **cute-photobooth** (JiggleDuo Photobooth), criado por **[lovesulei](https://github.com/lovesulei)**. Veja a seção [Inspiração e créditos](#-inspiração-e-créditos).


## ᝰ.ᐟ Sumário

- [Funcionalidades](#-funcionalidades)
- [Como usar](#-como-usar)
- [Como rodar o projeto](#-como-rodar-o-projeto)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Personalizando](#-personalizando)
- [Tecnologias](#-tecnologias)
- [Conceitos de JavaScript praticados](#-conceitos-de-javascript-praticados)
- [Problemas comuns](#-problemas-comuns)
- [Inspiração e créditos](#-inspiração-e-créditos)
- [Autoria e licença](#-autoria-e-licença)

---

## ⋆˚࿔ Funcionalidades

- **Câmera em tempo real**, com a imagem espelhada na prévia, como num espelho.
- **Contagem regressiva** configurável (de 1 a 5 segundos) com efeito de **flash** a cada foto.
- **4 fotos em sequência**, montadas automaticamente em uma tira vertical.
- **6 filtros:** `normal`, `p&b`, `sepia`, `pinky`, `daydream` e `bright`, com prévia ao vivo na câmera.
- **6 molduras:** `cloud` (branca, a padrão), `bubblegum`, `lavander`, `sage`, `cherry` e `onix`.
- **3 adesivos em PNG** (folha, brilhos e corações), desenhados nos cantos de cada foto.
- **Legenda opcional** de até 14 letras. A tira começa sem legenda e ela só aparece se você quiser.
- **Download em PNG** da tira pronta, liberado quando as 4 fotos estão tiradas.
- **Tudo muda na hora:** trocar filtro, moldura, adesivo ou legenda atualiza a tira na mesma hora, sem precisar tirar as fotos de novo.
- **Layout em 3 colunas** (câmera, tira e opções) que cabe na tela sem rolagem em computadores, e vira uma coluna única no celular.
- **Privacidade:** as fotos ficam só no seu navegador. Nada é enviado para nenhum servidor.

---

## ⋆˚꩜｡ Como usar

1. Clique em **Ligar câmera** e permita o acesso quando o navegador pedir.
2. Escolha, no painel à direita, o **filtro**, a **moldura** e o **adesivo** que quiser. Você pode mudar tudo isso depois de tirar as fotos também.
3. (Opcional) Clique em **Escrever legenda** para colocar um texto no rodapé da tira. Deixe o campo vazio para ficar sem legenda.
4. (Opcional) Ajuste os **segundos de contagem** (de 1 a 5).
5. Clique em **Tirar 4 fotos**, sorria e aguarde as quatro contagens. 
6. Quando as 4 fotos estiverem prontas, clique em **Baixar tira** para salvar o arquivo `minha-tira.png`.

Para refazer, clique em **Tirar 4 fotos** de novo e confirme a pergunta "Refazer todas as fotos?".

---

## .⋆❀° Como rodar o projeto

Não precisa instalar nada. Baixe a pasta do projeto e escolha uma das opções:

### Opção 1: Live Server no VS Code (recomendada)

1. Instale a extensão **Live Server** no VS Code.
2. Abra a pasta do projeto, clique com o botão direito no `index.html` e escolha **Open with Live Server**.


### Opção 2: abrir o arquivo direto (duplo clique)

Funciona, mas com uma limitação: o Chrome **bloqueia o botão "Baixar tira"** quando a tira usa um adesivo em PNG, por causa de uma regra de segurança dos arquivos abertos direto do computador (`file://`). Os adesivos de emoji não sofrem esse problema. Por isso, prefira as opção 1.

> .ᐟ A câmera só funciona em endereços seguros: `localhost` ou arquivo local. Endereços como `http://192.168.x.x` desativam a câmera. Use preferencialmente o **Google Chrome**.

---

## 🗂 Estrutura de pastas

```
cute-photobooth/
├── index.html          # estrutura da página (3 colunas)
├── style.css           # visual: cores, botões, layout responsivo
├── script.js           # toda a lógica: câmera, tira, filtros, download
└── assets/
        ├── leaf.png        # adesivo folha
        ├── sparkles.png    # adesivo brilhos
        └── heart.png       # adesivo corações
```

---

## ⋆.𐙚 ̊. Personalizando

Tudo fica no começo do `script.js`, e os botões do painel são criados automaticamente a partir desses dados.

### Nova moldura

Adicione um objeto à lista `molduras`:

```js
{ nome: 'sky', cor: '#cfe8ff', texto: '#2f4a6a', estampa: 'liso', borda: '#9cc3ea', vazio: '#e8f3ff' }
```

| Campo | Para que serve |
|---|---|
| `nome` | texto do botão no painel |
| `cor` | cor de fundo da tira |
| `texto` | cor da legenda e do ícone dos espaços vazios |
| `borda` | *(opcional)* contorno ao redor de cada foto |
| `vazio` | *(opcional)* cor dos espaços que ainda não têm foto |

### Novo filtro

Adicione uma linha ao `Map` de `filtros`. O valor é um filtro CSS comum:

```js
['vintage', 'sepia(0.5) contrast(1.1) brightness(0.95)']
```

### Novo adesivo

1. Coloque o PNG (de preferência quadrado e com fundo transparente) em `assets/stickers/`.
2. Adicione uma linha ao objeto `adesivos`, **antes** de `nenhum`:

```js
estrela: 'assets/stickers/star.png',
```

Valores que não terminam em `.png` são tratados como **emoji**, então `lua: '🌙'` também funciona. Se o arquivo PNG não existir, o botão mostra só o nome e nada é desenhado.

### Cores do site

As cores principais estão nas variáveis no topo do `style.css`:

```css
:root {
  --marrom: #8c5b4a;
  --rosa: #ff7aa2;
  --rosa-claro: #ffe3ec;
  --creme: #fdf3ee;
  --bege: #f3dcd2;
}
```

---

## 🛠 Tecnologias

- **HTML5**, com `<video>` e `<canvas>`.
- **CSS3**, com variáveis, flexbox e media queries.
- **JavaScript** puro.
- **API `getUserMedia`**, para acessar a câmera.
- **Canvas 2D**, para montar a tira (`drawImage`, filtros e `toDataURL`).
- Fonte **Itim**, do [Google Fonts](https://fonts.google.com/specimen/Itim) (precisa de internet para carregar).

---

## ୭˚. ᵎᵎ Conceitos de JavaScript praticados

Este projeto foi feito como exercício de JavaScript para sistemas web. Nele aparecem:

- Variáveis `const` e `let` e tipos primitivos (`Number`, `Boolean`, `String`, `null`, `undefined`).
- `Symbol`, usado como identificador da tira.
- `Map` (percorrido com `forEach`), array de objetos (`for...of`) e objeto literal (`for...in`).
- Estruturas de repetição: `for`, `while` e `do...while`.
- Condicionais: `if/else`, `switch/case` e operador ternário.
- Funções comuns e *arrow functions*, com parâmetros e `return`.
- *Callbacks* e `setTimeout`, na contagem regressiva.
- Manipulação do DOM e eventos (`onclick`).
- `Promise` (`.then`/`.catch`) e `try/catch`.
- Caixas do navegador: `prompt`, `alert` e `confirm`.

---

## ˚. ᵎᵎ Problemas comuns

**A câmera não liga.**
Ao falhar, o alerta mostra uma linha de "Detalhe técnico" com o motivo:

| Detalhe técnico | O que significa | Como resolver |
|---|---|---|
| `NotAllowedError` | permissão negada | libere a câmera no cadeado ao lado do endereço e nas configurações de privacidade do sistema |
| `NotReadableError` | outro programa está usando a câmera | feche Zoom, Meet, Teams e outras abas que usem a câmera |
| `NotFoundError` | nenhuma câmera encontrada | confira se a câmera está conectada e ativa |
| `TypeError ... null` | falta algum elemento no HTML | confira se existem o `<video id="video">` e o `<p id="status">` |

**O botão "Baixar tira" não aparece.**
Ele só aparece depois das 4 fotos. Se elas já foram tiradas e ele continua escondido, você abriu o arquivo com duplo clique e escolheu um adesivo em PNG. Abra pelo Live Server ou use um adesivo de emoji.

**A legenda não cabe.**
Ela aceita até 14 letras. O programa avisa quando passa disso.

---

## ≽^• ˕ • ྀི≼ Inspiração e créditos

O visual e a ideia do Little Memories foram inspirados no **cute-photobooth** (JiggleDuo Photobooth), criado por **lovesulei**:

🔗 **https://github.com/lovesulei/cute-photobooth**

O projeto dela é uma cabine de fotos em React, com molduras ilustradas, adesivos desenhados à mão e uma estética aconchegante em tons de rosa e marrom. De lá vieram a inspiração para:

- a **paleta de cores** (marrom suave `#8c5b4a`, rosa e tons de creme);
- o estilo dos **botões** (fundo branco, borda marrom e cantos arredondados);
- o uso de **adesivos em PNG** com traço artesanal, como os de folha (`leaf.png`) e brilhos (`sparkles.png`).

O Little Memories **não copia o código** do projeto original: foi escrito do zero, em HTML, CSS e JavaScript puro, e funciona de outra forma, com contagem automática, tira de 4 fotos, filtros e download em PNG.

**Sobre os direitos das imagens:** os adesivos `leaf.png` e `sparkles.png` são do projeto da lovesulei, e os direitos pertencem à criadora. O repositório original não declara uma licença. Se for publicar este projeto na internet, peça autorização a ela ou troque esses adesivos por imagens suas.


---

## <𝟑 .ᐟ Autoria

Desenvolvido por **kkareneduarda**.


---

