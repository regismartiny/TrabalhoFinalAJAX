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
        this.carregarPalavraEIniciarPartida();
    }

    getPalavra() {
        return new Promise((resolve, reject) => {
            $.get(`/jogo?palavrasJaUsadas=${this.palavrasJaUsadas}&dificuldade=${this.dificuldade}`)
                .then(
                  (palavra) => {
                      resolve(palavra);
                  }
               ).catch((err) => {
                   console.error('Erro na comunicação com o Servidor!');
                   console.error(`${err.responseJSON.code} - ${err.responseJSON.message}`);
               });
        });
    }

    carregarPalavraEIniciarPartida() {
        let self = this;
        this.getPalavra(palavra => {
            self.palavraAtual = palavra;
            self.palavrasJaUsadas.push(palavra);
            })
            .then(self.iniciarPartida);
    }

    iniciarPartida() {
        switch (this.dificuldade) {
          case 'normal':
              this.limiteErros = 5;
            break;
            case 'bh':
              this.limiteErros = 2;
              this.timer = new Timer(1, this.elemTimerDisplay, this.acabouOTempo).start();
            break;
        }
    }


    entrada(letra) {
        this.timer.reset();
        if (palavra.includes(letra.toUpperCase())) {
            this.computarAcerto();
            //substituir espacos na palavra pela letra
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
        //se palavra completa, iniciar outra rodada
        carregarPalavraEIniciarPartida();
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

        this.enviarPontuacaoJogadorParaServidor();
    }

    enviarPontuacaoJogadorParaServidor() {
        let pontuacao = { score: this.acertos, dificuldade: this.dificuldade, nomeJogador: this.nomeJogador };
        $.post('/pontuacao', pontuacao);
    }

}