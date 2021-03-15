'use strict';

const celulas = document.querySelectorAll('.celula');
const jogadorX = "✘";
const jogadorO = "◎";

let checarJogador = true;
let jogador;

const combinacoes = [
    //Horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //Verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //Diagonais
    [0, 4, 8],
    [2, 4, 6]
]

document.addEventListener('click', (event) => {

    if (event.target.matches('.celula')) {
        jogar(event.target.id);
    }
})

function jogar(id) {
    const celula = document.getElementById(id);
    jogador = checarJogador ? jogadorX : jogadorO;
    celula.textContent = jogador;
    celula.classList.add(jogador);
    analisarVencedor(jogador);
}

function analisarVencedor(jogador) {
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(jogador);
        })
    })
    if (vencedor) {
        finalizarJogo(jogador);
    } else if (verificarEmpate()) {
        finalizarJogo();
    } else {
        checarJogador = !checarJogador;
    }
}

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

function finalizarJogo(vencedor = null) {

    const telaEscura = document.getElementById('tela-escura');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    let msg = null;

    telaEscura.style.display = 'block';
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);

    if (vencedor) {
        h2.innerHTML = `<img id="fogos" src="./img/fogos.gif"><br>O Jogador <span class="resultado">${vencedor}</span> venceu`;
    } else {
        h2.innerHTML = `<img id="empate" src="./img/empate.gif"><br>O jogo Empatou.`;
    }

    let relogio = 5;

    setInterval(() => {
        h3.innerHTML = `<span class="relogio">Reiniciando em ${relogio--} seg.</span>`;
    }, 1000);
    setTimeout(() => location.reload(), 5000);
}