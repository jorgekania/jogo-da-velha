'use strict';

//constante e variáveis do jogo
const celulas = document.querySelectorAll('.celula');
const grid = document.getElementById('grid');
const w = grid.clientWidth;
const h = grid.clientHeight;
const wc = w - 10;
const hc = h - 10;
const jogadorX = "✘";
const jogadorO = "◎";
let fimDeJogo = false;
let jogador;
let centro;


//Montagem do canvas para criar a linha que mostra o vencedor
const canvasEl = document.getElementById('linhaCanvas');
let ctx = canvasEl.getContext('2d');

let li = 10;
let lf = 10;

function primeiraLinhaHorizontal() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(10, 60);
    ctx.lineTo(332, 60);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function linhaCentroHorizontal() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(10, 170);
    ctx.lineTo(332, 170);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function ultimaLinhaHorizontal() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(10, 285);
    ctx.lineTo(332, 285);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function primeiraLinhaVertical() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(60, 10);
    ctx.lineTo(60, 332);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function linhaCentroVertical() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(175, 10);
    ctx.lineTo(175, 332);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function ultimaLinhaVertical() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(285, 10);
    ctx.lineTo(285, 332);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}

function linhaDiagonalBaixo() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(li, lf);
    ctx.lineTo(wc, hc);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
}
function linhaDiagonalCima() {
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(10, 332);
    ctx.lineTo(332, 10);
    ctx.lineWidth = 4;
    ctx.closePath();
    ctx.stroke();
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
        ver();
    } else {
        const jogadaAleatoria = Math.floor(
            Math.random() * jogadasDisponiveis.length
        );
        if (!fimDeJogo) {
            jogar(jogadasDisponiveis[jogadaAleatoria], jogadorO);
            ver();
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
    canvasEl.classList.add('mostrar');

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

        let relogio = 5;

        setInterval(() => {
            h3.innerHTML = `<span class="relogio">Reiniciando em ${relogio--} seg.</span>`;
        }, 1000);
        setTimeout(() => location.reload(), 5000);
    }

    setTimeout(carregar, 1000)
}

//Gerar a linha de canvas na combinação efetuada
const ver = () => {
    document.addEventListener('click', (event) => {

        if (event.target.matches('.celula')) {
            //verificação para jogador ✘
            if (celulas[0].textContent === jogadorX && celulas[1].textContent === jogadorX && celulas[2].textContent === jogadorX) {
                primeiraLinhaHorizontal();
            } else if (celulas[3].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[5].textContent === jogadorX) {
                linhaCentroHorizontal();
            } else if (celulas[6].textContent === jogadorX && celulas[7].textContent === jogadorX && celulas[8].textContent === jogadorX) {
                ultimaLinhaHorizontal();
            } else if (celulas[0].textContent === jogadorX && celulas[3].textContent === jogadorX && celulas[6].textContent === jogadorX) {
                primeiraLinhaVertical();
            } else if (celulas[1].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[7].textContent === jogadorX) {
                linhaCentroVertical();
            } else if (celulas[2].textContent === jogadorX && celulas[5].textContent === jogadorX && celulas[8].textContent === jogadorX) {
                ultimaLinhaVertical();
            } else if (celulas[0].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[8].textContent === jogadorX) {
                linhaDiagonalBaixo();
            } else if (celulas[2].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[6].textContent === jogadorX) {
                linhaDiagonalCima();

                //verificação para jogador ◎
            } else if (celulas[0].textContent === jogadorO && celulas[1].textContent === jogadorO && celulas[2].textContent === jogadorO) {
                primeiraLinhaHorizontal();
            } else if (celulas[3].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[5].textContent === jogadorO) {
                linhaCentroHorizontal();
            } else if (celulas[6].textContent === jogadorO && celulas[7].textContent === jogadorO && celulas[8].textContent === jogadorO) {
                ultimaLinhaHorizontal();
            } else if (celulas[0].textContent === jogadorO && celulas[3].textContent === jogadorO && celulas[6].textContent === jogadorO) {
                primeiraLinhaVertical();
            } else if (celulas[1].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[7].textContent === jogadorO) {
                linhaCentroVertical();
            } else if (celulas[2].textContent === jogadorO && celulas[5].textContent === jogadorO && celulas[8].textContent === jogadorO) {
                ultimaLinhaVertical();
            } else if (celulas[0].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[8].textContent === jogadorO) {
                linhaDiagonalCima();
            } else if (celulas[2].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[6].textContent === jogadorO) {
                linhaDiagonalBaixo();
            }
        }
    });
}