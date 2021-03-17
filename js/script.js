'use strict';

//constante e variáveis do jogo
const celulas = document.querySelectorAll('.celula');
const grid = document.getElementById('grid');

const jogadorX = "✘";
const jogadorO = "◎";
let fimDeJogo = false;
let jogador;
let centro;
let proxJogador = true;

//Montagem do canvas para criar a linha que mostra o vencedor
const canvas = document.querySelector('canvas');
let w = canvas.clientWidth;
let h = canvas.clientHeight;
let startX = 0;
let startY = 0;
let dif = 60;
let ctx = canvas.getContext('2d');

function geraLinha(x, y, w, h) {
    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.moveTo(x, y);
    ctx.lineTo(w, h);
    ctx.lineWidth = 20;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "red";
    ctx.lineCap = 'square';
    ctx.stroke();
    ctx.save();
    ctx.closePath();
}

//Array com as combinações do tabuleiro
const combinacoes = [
    //Array Linhas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //Array Colunas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //Array Diagonais
    [0, 4, 8],
    [2, 4, 6]
]

//Detectar o clique na célula
document.addEventListener('click', (event) => {
    if (event.target.matches('.celula')) {
        jogar(event.target.id, jogadorX);
        setTimeout(() => jogadorCPU(), 500);
    }
})

//Função para jogar com o computador 
function jogadorCPU() {
    const jogadasDisponiveis = [];
    let index;

    for (index in celulas) {
        if (!isNaN(index)) {
            if (
                !celulas[index].classList.contains('✘') &&
                !celulas[index].classList.contains('◎')) {
                jogadasDisponiveis.push(index);
            }
        }
    }

    if (centro == false || centro == undefined) {
        jogar(jogadasDisponiveis[4], jogadorO);
        centro = true;
        // ver();
    } else {
        const jogadaAleatoria = Math.floor(
            Math.random() * jogadasDisponiveis.length
        );
        if (!fimDeJogo) {
            jogar(jogadasDisponiveis[jogadaAleatoria], jogadorO);
            // ver();
        }
    }
}

//Função para efetuar o jogo
function jogar(id, jogador) {
    const celula = document.getElementById(id);

    if (celula.id == 4) {
        centro = true;
    }

    celula.textContent = jogador;
    celula.classList.add(jogador);
    celula.classList.add('blockClick');
    analisarVencedor(jogador);
}

//Função que analisa se ouve um vencedor
function analisarVencedor(jogador) {

    ver();
    let combinacao = [];
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            combinacao = comb;
            return celulas[index].classList.contains(jogador);
        })
    })

    if (vencedor) {
        // ver(combinacao);
        finalizarJogo(jogador);
    } else if (verificarEmpate()) {
        finalizarJogo();
    }
}

//Função que analisa se teve empate
function verificarEmpate() {
    let x = 0;
    let o = 0;
    let index;

    for (index in celulas) {
        if (!isNaN(index)) {
            if (celulas[index].classList.contains(jogadorX)) {
                x++;
            }

            if (celulas[index].classList.contains(jogadorO)) {
                o++;
            }
        }
    }
    return x + o === 9 ? true : false;
}


//Função ara finalizar o jogo e mostrar a mensagem final
function finalizarJogo(vencedor = null) {

    fimDeJogo = true;
    canvas.classList.add('mostrar');

    function carregar() {

        const telaEscura = document.getElementById('tela-escura');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        let msg = null;

        telaEscura.style.display = 'block';
        telaEscura.appendChild(h2);
        telaEscura.appendChild(h3);

        if (vencedor) {
            h2.innerHTML = `<img id="fogos" src="./img/fogos.gif"><br><span class="resultado">${vencedor}</span> é o jogador vencedor`;
        } else {
            h2.innerHTML = `<img id="empate" src="./img/empate.gif"><br>O jogo Empatou.`;
        }

        let relogio = 1;

        setInterval(() => {
            h3.innerHTML = `<span class="relogio">Reiniciando em ${relogio--} seg.</span>`;
        }, 1000);
        setTimeout(() => location.reload(), 1000);
    }

    setTimeout(carregar, 1000)
}

//Gerar a linha de canvas na combinação efetuada
const ver = () => {

    //verificação para jogador ✘
    if (celulas[0].textContent === jogadorX && celulas[1].textContent === jogadorX && celulas[2].textContent === jogadorX) {
        geraLinha(startX, (startX + dif), w, (startX + dif));
    } else if (celulas[3].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[5].textContent === jogadorX) {
        geraLinha(startX, (w / 2), w, h - (h / 2));
    } else if (celulas[6].textContent === jogadorX && celulas[7].textContent === jogadorX && celulas[8].textContent === jogadorX) {
        geraLinha(startX, (h - dif), w, (h - dif));
    } else if (celulas[0].textContent === jogadorX && celulas[3].textContent === jogadorX && celulas[6].textContent === jogadorX) {
        geraLinha((startX + dif), startY, (startX + dif), h);
    } else if (celulas[1].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[7].textContent === jogadorX) {
        geraLinha((w / 2), startY, (w / 2), h);
    } else if (celulas[2].textContent === jogadorX && celulas[5].textContent === jogadorX && celulas[8].textContent === jogadorX) {
        geraLinha(w - dif, startY, h - dif, h);
    } else if (celulas[0].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[8].textContent === jogadorX) {
        geraLinha(startX, startY, w, h);
    } else if (celulas[2].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[6].textContent === jogadorX) {
        geraLinha(w, startX, startY, h);

        //verificação para jogador ◎
    } else if (celulas[0].textContent === jogadorO && celulas[1].textContent === jogadorO && celulas[2].textContent === jogadorO) {
        geraLinha(startX, (startX + dif), w, (startX + dif));
    } else if (celulas[3].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[5].textContent === jogadorO) {
        geraLinha(startX, (w / 2), w, h - (h / 2));
    } else if (celulas[6].textContent === jogadorO && celulas[7].textContent === jogadorO && celulas[8].textContent === jogadorO) {
        geraLinha(startX, (h - dif), w, (h - dif));
    } else if (celulas[0].textContent === jogadorO && celulas[3].textContent === jogadorO && celulas[6].textContent === jogadorO) {
        geraLinha((startX + dif), startY, (startX + dif), h);
    } else if (celulas[1].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[7].textContent === jogadorO) {
        geraLinha((w / 2), startY, (w / 2), h);
    } else if (celulas[2].textContent === jogadorO && celulas[5].textContent === jogadorO && celulas[8].textContent === jogadorO) {
        geraLinha(w - dif, startY, h - dif, h);
    } else if (celulas[0].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[8].textContent === jogadorO) {
        geraLinha(startX, startY, w, h);
    } else if (celulas[2].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[6].textContent === jogadorO) {
        geraLinha(w, startX, startY, h);
    }
}