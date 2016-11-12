class Jogo {
    constructor(palavra, nomeJogador, dificuldade, elemTimerDisplay) {
        this.palavra = palavra;
        this.nomeJogador = nomeJogador;
        this.dificuldade = dificuldade;
        this.elemTimerDisplay = elemTimerDisplay;
        this.timer;
        this.limiteErros;
        this.pontuacao = 0;
    }

    iniciarPartida() {
        switch (this.dificuldade) {
          case 'normal':
              this.limiteErros = 5;
            break;
            case 'bh':
              this.limiteErros = 2;
              var timer = new Timer(1, this.elemTimerDisplay, function () { }).start();
            break;
        }
    }


    entrada(letra) {

    }

    palpite(palavraPalpite) {
        if (palavraPalpite.toUpperCase() === this.palavra.toUpperCase()) {
        }
    }

    fimDoJogo() {
        if (this.dificuldade === 'bh' && this.timer != null)
            this.timer.stop();
    }

}