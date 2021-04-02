if (celulas[0].textContent === jogadorO && celulas[1].textContent === jogadorO && celulas[2].textContent === '') {
    jogar(2, jogadorO);
} else if (celulas[1].textContent === jogadorO && celulas[2].textContent === jogadorO && celulas[0].textContent === '') {
    jogar(0, jogadorO);
} else if (celulas[0].textContent === jogadorO && celulas[2].textContent === jogadorO && celulas[1].textContent === '') {
    jogar(1, jogadorO);
}
//Verificando linha 2
else if (celulas[3].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[5].textContent === '') {
    jogar(5, jogadorO);
} else if (celulas[4].textContent === jogadorO && celulas[5].textContent === jogadorO && celulas[3].textContent === '') {
    jogar(3, jogadorO);
} else if (celulas[3].textContent === jogadorO && celulas[5].textContent === jogadorO && celulas[4].textContent === '') {
    jogar(4, jogadorO);
}
//Verificando linha 3
else if (celulas[6].textContent === jogadorO && celulas[7].textContent === jogadorO && celulas[8].textContent === '') {
    jogar(8, jogadorO);
} else if (celulas[7].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[6].textContent === '') {
    jogar(6, jogadorO);
} else if (celulas[6].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[7].textContent === '') {
    jogar(7, jogadorO);
}
//verificação para jogador ✘ em colunas
else if (celulas[0].textContent === jogadorO && celulas[3].textContent === jogadorO && celulas[6].textContent === '') {
    jogar(6, jogadorO);
} else if (celulas[3].textContent === jogadorO && celulas[6].textContent === jogadorO && celulas[0].textContent === '') {
    jogar(0, jogadorO);
} else if (celulas[0].textContent === jogadorO && celulas[6].textContent === jogadorO && celulas[3].textContent === '') {
    jogar(3, jogadorO);
}
//Verificando coluna 2
else if (celulas[1].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[7].textContent === '') {
    jogar(7, jogadorO);
} else if (celulas[4].textContent === jogadorO && celulas[7].textContent === jogadorO && celulas[1].textContent === '') {
    jogar(1, jogadorO);
} else if (celulas[1].textContent === jogadorO && celulas[7].textContent === jogadorO && celulas[4].textContent === '') {
    jogar(4, jogadorO);
}
//Verificando coluna 3
else if (celulas[2].textContent === jogadorO && celulas[5].textContent === jogadorO && celulas[8].textContent === '') {
    jogar(8, jogadorO);
} else if (celulas[5].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[2].textContent === '') {
    jogar(2, jogadorO);
} else if (celulas[2].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[5].textContent === '') {
    jogar(5, jogadorO);
}
//Verificação da condições diagonais
else if (celulas[0].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[4].textContent === '') {
    jogar(4, jogadorO);
} else if (celulas[4].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[0].textContent === '') {
    jogar(0, jogadorO);
} else if (celulas[2].textContent === jogadorO && celulas[4].textContent === jogadorO && celulas[6].textContent === '') {
    jogar(6, jogadorO);
} else if (celulas[4].textContent === jogadorO && celulas[6].textContent === jogadorO && celulas[2].textContent === '') {
    jogar(2, jogadorO);
} else if (celulas[0].textContent === jogadorO && celulas[8].textContent === jogadorO && celulas[4].textContent === '') {
    jogar(4, jogadorO);
} else if (celulas[2].textContent === jogadorO && celulas[6].textContent === jogadorO && celulas[4].textContent === '') {
    jogar(4, jogadorO);

}