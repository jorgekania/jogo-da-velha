'use strict';


//constante e variáveis do jogo
const celulas = document.querySelectorAll('.celula');
const jogadorX = "✘";
const jogadorO = "◎";
let fimDeJogo = false;
let jogador;
let centro;
// let nivelJogo = 1;
// let checarJogador = true;
// let jogador_1 = document.getElementById('jogador_1').value;
// let jogador_2 = document.getElementById('jogador_2').value;


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
        setTimeout(() => jogadorCPU(), 1000);
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
    } else {
        const jogadaAleatoria = Math.floor(
            Math.random() * jogadasDisponiveis.length
        );
        if (!fimDeJogo) {
            jogar(jogadasDisponiveis[jogadaAleatoria], jogadorO);
        }
    }

}

//Função para efetuar o jogo
function jogar(id, jogador) {
    const celula = document.getElementById(id);
    // jogador = checarJogador ? jogadorX : jogadorO;

    if (celula.id == 4) {
        centro = true;
    }

    celula.textContent = jogador;
    celula.classList.add(jogador);
    analisarVencedor(jogador);

}


//Função que analisa se ouve um vencedor
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
    }
    // else {
    //     checarJogador = !checarJogador;
    // }
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