'use strict';

//constante e variáveis do jogo
const celulas = document.querySelectorAll('.celula');
const grid = document.getElementById('grid');

const jogadorX = "✘";
const jogadorO = "◎";
let fimDeJogo = false;
let jogador;
let centro = false;
let proxJogador = true;

//Montagem do canvas para criar a linha que mostra o vencedor
const canvas = document.querySelector('canvas');
let w = canvas.clientWidth;
let h = canvas.clientHeight;
let startX = 0;
let startY = 0;
let dif = 60;
let ctx = canvas.getContext('2d');

for (var i = 0; i < celulas.length; i++) {

    let idCelula = celulas[i].id;

    if (idCelula === '0' || idCelula === '3' || idCelula === '6') {
        celulas[i].style.borderRight = '1px solid #000000';
    } else if (idCelula === '1' || idCelula === '4' || idCelula === '7') {
        celulas[i].style.borderRight = '1px solid #000000';
    } else if (idCelula === '2' || idCelula === '5') {
        celulas[i].style.borderBottom = '1px solid #000000';
    }

    if (idCelula === '0' || idCelula === '3') {
        celulas[i].style.borderBottom = '1px solid #000000';
    } else if (idCelula === '1' || idCelula === '4') {
        celulas[i].style.borderBottom = '1px solid #000000';
    }
}

function geraLinha(x, y, w, h) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(w, h);
    ctx.lineWidth = 5;
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
        setTimeout(() => jogadorCPU(), 1500);
    }
})

//Função para jogar com o computador 
function jogadorCPU() {
    const jogadasDisponiveis = [];
    let jogadaAleatoria;
    let index;

    for (index in celulas) {
        if (!isNaN(index)) {
            if (
                !celulas[index].classList.contains(jogadorX) &&
                !celulas[index].classList.contains(jogadorO)) {
                jogadasDisponiveis.push(index);
            }
        }
    }

    if (!fimDeJogo) {

        //verificação para jogador ✘ em linha
        if (celulas[0].textContent === jogadorX && celulas[1].textContent === jogadorX && celulas[2].textContent === '') {
            jogar(2, jogadorO);
        } else if (celulas[1].textContent === jogadorX && celulas[2].textContent === jogadorX && celulas[0].textContent === '') {
            jogar(0, jogadorO);
        } else if (celulas[0].textContent === jogadorX && celulas[2].textContent === jogadorX && celulas[1].textContent === '') {
            jogar(1, jogadorO);
        }
        //Verificando linha 2
        else if (celulas[3].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[5].textContent === '') {
            jogar(5, jogadorO);
        } else if (celulas[4].textContent === jogadorX && celulas[5].textContent === jogadorX && celulas[3].textContent === '') {
            jogar(3, jogadorO);
        } else if (celulas[3].textContent === jogadorX && celulas[5].textContent === jogadorX && celulas[4].textContent === '') {
            jogar(4, jogadorO);
        }
        //Verificando linha 3
        else if (celulas[6].textContent === jogadorX && celulas[7].textContent === jogadorX && celulas[8].textContent === '') {
            jogar(8, jogadorO);
        } else if (celulas[7].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[6].textContent === '') {
            jogar(6, jogadorO);
        } else if (celulas[6].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[7].textContent === '') {
            jogar(7, jogadorO);
        }
        //verificação para jogador ✘ em colunas
        else if (celulas[0].textContent === jogadorX && celulas[3].textContent === jogadorX && celulas[6].textContent === '') {
            jogar(6, jogadorO);
        } else if (celulas[3].textContent === jogadorX && celulas[6].textContent === jogadorX && celulas[0].textContent === '') {
            jogar(0, jogadorO);
        } else if (celulas[0].textContent === jogadorX && celulas[6].textContent === jogadorX && celulas[3].textContent === '') {
            jogar(3, jogadorO);
        }
        //Verificando coluna 2
        else if (celulas[1].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[7].textContent === '') {
            jogar(7, jogadorO);
        } else if (celulas[4].textContent === jogadorX && celulas[7].textContent === jogadorX && celulas[1].textContent === '') {
            jogar(1, jogadorO);
        } else if (celulas[1].textContent === jogadorX && celulas[7].textContent === jogadorX && celulas[4].textContent === '') {
            jogar(4, jogadorO);
        }
        //Verificando coluna 3
        else if (celulas[2].textContent === jogadorX && celulas[5].textContent === jogadorX && celulas[8].textContent === '') {
            jogar(8, jogadorO);
        } else if (celulas[5].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[2].textContent === '') {
            jogar(2, jogadorO);
        } else if (celulas[2].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[5].textContent === '') {
            jogar(5, jogadorO);
        }
        //Verificação da condições diagonais
        else if (celulas[0].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[4].textContent === '') {
            jogar(4, jogadorO);
        } else if (celulas[4].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[0].textContent === '') {
            jogar(0, jogadorO);
        } else if (celulas[2].textContent === jogadorX && celulas[4].textContent === jogadorX && celulas[6].textContent === '') {
            jogar(6, jogadorO);
        } else if (celulas[4].textContent === jogadorX && celulas[6].textContent === jogadorX && celulas[2].textContent === '') {
            jogar(2, jogadorO);
        } else if (celulas[0].textContent === jogadorX && celulas[8].textContent === jogadorX && celulas[4].textContent === '') {
            jogar(4, jogadorO);
        } else if (celulas[2].textContent === jogadorX && celulas[6].textContent === jogadorX && celulas[4].textContent === '') {
            jogar(4, jogadorO);

        }
        //Caso nenhuma das condições sejam satisfeitas
        else {
            jogadaAleatoria = Math.floor(
                Math.random() * jogadasDisponiveis.length
            );
            jogar(jogadasDisponiveis[jogadaAleatoria], jogadorO);
        }
    }
}

//Função para efetuar o jogo
function jogar(id, jogador) {
    const celula = document.getElementById(id);

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
            h2.innerHTML = `<img width="100px" style="margin-top: 100px" id="empate" src="./img/empate.gif"><br>O jogo Empatou.`;
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