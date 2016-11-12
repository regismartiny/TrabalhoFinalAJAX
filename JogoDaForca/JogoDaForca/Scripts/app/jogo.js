class Jogo {
  constructor(nomeJogador, dificuldade) {
    this.nomeJogador = nomeJogador;
    this.dificuldade = dificuldade;
    this.timer = 0;
  }

  iniciarPartida() {
    switch (this.dificuldade) {
      case 'normal':
        iniciarPartidaNormal();
        break;
      case 'bh':
        iniciarPartidaBH();
        break;
    }
  }

  iniciarPartidaNormal() {

  }

  iniciarPartidaBH() {

  }
}