class Jogo {
    constructor(nomeJogador, dificuldade, palavrasJaUsadas, elemTimerDisplay, elemTentativasRestantes) {
        this.nomeJogador = nomeJogador;
        this.dificuldade = dificuldade;
        this.elemTimerDisplay = elemTimerDisplay;
        this.elemTentativasRestantes = elemTentativasRestantes;
        this.palavrasJaUsadas = palavrasJaUsadas;
        this.timer;
        this.limiteErros;
        this.erros = 0;
        this.acertos = 0;
        this.palavraAtual;
        this.elemTentativasRestantes.text(0);
        this.carregarPalavraEIniciarPartida();
    }

    getPalavra() {
        return new Promise((resolve, reject) => {
            $.get(`/jogo/getPalavra?palavrasJaUsadas=${this.palavrasJaUsadas}&dificuldade=${this.dificuldade}`)
                .done(
                    (palavra) => {
                        resolve(palavra);
                    }
                ).catch((err) => {
                    console.error('Erro na comunicação com o Servidor!');
                    console.error(`${err.responseJSON.code} - ${err.responseJSON.message}`);
                    reject(err);
               });
        });
    }

    carregarPalavraEIniciarPartida() {
        let self = this;
        this.getPalavra().then(palavra => {
            self.palavraAtual = palavra;
            self.palavrasJaUsadas.push(palavra);
            console.log('palavra:', palavra);
            self.iniciarPartida.bind(self)();
        });
    }

    iniciarPartida() {
        switch (this.dificuldade.toUpperCase()) {
          case 'NORMAL':
            this.limiteErros = 5;
            break;
          case 'BH':
            this.limiteErros = 2;
            this.timer = new Timer(20, this.elemTimerDisplay, this.acabouOTempo.bind(this)).start();
          break;
        }
        this.elemTentativasRestantes.text(this.limiteErros);
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
        this.elemTentativasRestantes.text(this.limiteErros - this.erros);
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
        if (this.dificuldade.toUpperCase() === 'BH' && this.timer != null)
            this.timer.stop();

        this.enviarPontuacaoJogadorParaServidor();
    }

    enviarPontuacaoJogadorParaServidor() {
        let pontuacao = { score: this.acertos, dificuldade: this.dificuldade, nomeJogador: this.nomeJogador };
        $.post('/jogo/pontuacao', pontuacao);
    }

}