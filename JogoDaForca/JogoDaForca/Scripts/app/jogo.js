class Jogo {
    constructor(nomeJogador, dificuldade, elemTimerDisplay, palavrasJaUsadas) {
        this.nomeJogador = nomeJogador;
        this.dificuldade = dificuldade;
        this.elemTimerDisplay = elemTimerDisplay;
        this.palavrasJaUsadas = palavrasJaUsadas;
        this.timer;
        this.limiteErros;
        this.erros = 0;
        this.acertos = 0;
        this.palavraAtual;
        this.carregarPalavraEIniciarPartida().bind(this);
    }

    getPalavra() {
        return new Promise((resolve, reject) => {
            $.get(`/jogo/getPalavra/?palavrasJaUsadas=${this.palavrasJaUsadas}&dificuldade=${this.dificuldade}`)
                .then(
                  (palavra) => {
                      resolve(palavra);
                  }
               );
        });
    }

    carregarPalavraEIniciarPartida() {
        let self = this;
        this.getPalavra(palavra => self.palavraAtual = palavra)
            .then(iniciarPartida);
    }

    iniciarPartida() {
        switch (this.dificuldade) {
          case 'normal':
              this.limiteErros = 5;
            break;
            case 'bh':
              this.limiteErros = 2;
              var timer = new Timer(1, this.elemTimerDisplay, this.acabouOTempo).start();
            break;
        }
    }


    entrada(letra) {
        this.timer.reset();
        if (palavra.includes(letra.toUpperCase())) {
            this.computarAcerto();
        }
        else {
            this.computarErro();
        }
    }

    computarAcerto(acertoPorPalpite) {
        if (acertoPorPalpite)
            this.acertos += 2;
        else
            this.acertos++;
        //verificar se palavra está completa
    }

    computarErro() {
        this.erros++;
        if (this.erros === this.limiteErros)
            this.perdeu();
    }

    palpite(palavraPalpite) {
        if (palavraPalpite.toUpperCase() === this.palavraAtual.toUpperCase()) {
            computarAcerto(true);
        }
        else {
            this.perdeu();
        }
    }

    acabouOTempo() {
        this.perdeu();
    }

    perdeu() {
        this.fimDoJogo();
    }

    fimDoJogo() {
        if (this.dificuldade === 'bh' && this.timer != null)
            this.timer.stop();
    }

}