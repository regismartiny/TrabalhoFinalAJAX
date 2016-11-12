class Jogo {
  constructor(nomeJogador, dificuldade, elemTimerDisplay) {
    this.nomeJogador = nomeJogador;
    this.dificuldade = dificuldade;
    this.elemTimerDisplay = elemTimerDisplay;
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
      //
      var palavra = this.getPalavra();
      //iniciar cronometro
      var timer = new Timer(1, this.elemTimerDisplay, function () { }).start();

      //if gameover
      timer.stop();
  }

  


}