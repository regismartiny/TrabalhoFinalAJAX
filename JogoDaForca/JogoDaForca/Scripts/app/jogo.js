class Jogo {
  constructor(nomeJogador, dificuldade, palavrasJaUsadas, $elemTimerDisplay, $elemTentativasRestantes, $btnReset, $btnChute, $elemDivChute, $elemPalavraChute, $elemLetras, $elemPalavra, callbackFim) {
        this.nomeJogador = nomeJogador;
        this.dificuldade = dificuldade;
        this.$elemTimerDisplay = $elemTimerDisplay;
        this.$elemTentativasRestantes = $elemTentativasRestantes;
        this.$btnReset = $btnReset;
        this.$btnChute = $btnChute;
        this.$elemDivChute = $elemDivChute;
        this.$elemPalavraChute = $elemPalavraChute;
        this.$elemLetras = $elemLetras;
        this.$elemPalavra = $elemPalavra;
        this.palavrasJaUsadas = palavrasJaUsadas;
        this.callbackFim = callbackFim;
        this.timer;
        this.limiteErros;
        this.erros = 0;
        this.acertos = 0;
        this.palavraAtual;
        this.palavraSombra = '';
        this.qtdLetrasAcertadas = 0;
        this.$elemTentativasRestantes.text(0);
        this.registrarBindsEventos();
        this.carregarPalavraEIniciarPartida();
  }

    registrarBindsEventos() {
        this.$elemPalavraChute.keyup(this.chute.bind(this));
        this.$elemLetras.on('click', this.entrada.bind(this));
        this.$btnReset.on('click', this.reset.bind(this));
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
            console.log('palavra:', palavra);
            this.qtdLetrasAcertadas = 0;
            self.palavraAtual = palavra;
            self.palavrasJaUsadas.push(palavra);
            self.criarSombraPalavra.bind(self)();
            self.atualizarTelaSombraPalavra.bind(self)();
            self.iniciarPartida.bind(self)();
        });
    }

    criarSombraPalavra() {
        this.palavraSombra = '';
        for (let i = 0; i < this.palavraAtual.length; i++) {
            if (this.palavraAtual[i] === '-')
                this.palavraSombra += '-';
            else
              // mexi aki
                this.palavraSombra += '_'+' ';
        }
    }

    atualizarTelaSombraPalavra() {
        this.$elemPalavra.text(this.palavraSombra);
        console.log('sombra-palavra:', this.palavraSombra);
    }

    iniciarPartida() {
        switch (this.dificuldade.toUpperCase()) {
          case 'NORMAL':
            this.limiteErros = 5;
            this.$elemTimerDisplay.hide();
            break;
          case 'BH':
            this.limiteErros = 2;
            this.timer = new Timer(20, this.$elemTimerDisplay, this.acabouOTempo.bind(this)).start();
          break;
        }
        this.$elemTentativasRestantes.text(this.limiteErros);
    }


    entrada($event) {
        console.log('event:', $event);
        let letra = $event.target.outerText.toUpperCase();
        console.log('entrada:', letra);
        if (this.timer !== undefined)
          this.timer.reset();
        let palavra = this.palavraAtual.toUpperCase();
        if (palavra.includes(letra)) {
          let posFound = [];
          for (let i = 0, len = palavra.length; i < len; i++) {
            if (palavra[i] === letra) {
              posFound.push(i);
            }
          }
          for (let i = 0, len = posFound.length; i < len; i++) {
            this.palavraSombra = this.palavraSombra.replaceAt(posFound[i], letra);
          }
          console.log('qtdAcertos:', this.qtdLetrasAcertadas, ', posFoundLength:', posFound.length);
          this.qtdLetrasAcertadas += posFound.length;
          console.log('sombra:', this.palavraSombra);
          this.atualizarTelaSombraPalavra();
          this.computarAcerto();
        }
        else {
            this.computarErro();
        }
    }

    computarAcerto(acertoPorPalpite) {
        console.log('acertou');
        if (acertoPorPalpite)
            this.acertos += 2;
        else
          this.acertos++;
        if (acertoPorPalpite || this.qtdLetrasAcertadas == this.palavraAtual.length) {
          this.carregarPalavraEIniciarPartida();
        }
    }

    computarErro() {
        this.erros++;
        this.$elemTentativasRestantes.text(this.limiteErros - this.erros);
        if (this.erros === this.limiteErros)
            this.perdeu();
    }

    chute($event) {
      let keyCode = $event.originalEvent.keyCode;
      let palavraChute = $event.target.value;
      if (keyCode === 13 || keyCode === 27) {
          $event.target.value = "";
          this.$elemDivChute.hide();
          this.$btnChute.show();
          //$event.target.style.display = "none";
          if (keyCode === 13) {//ENTER
              if (palavraChute.toUpperCase() === this.palavraAtual.toUpperCase()) {
                  this.computarAcerto(true);
              }
              else {
                  this.perdeu();
              }
          } else if (keyCode === 27) {//ESC
              
          }
      }
    }

    acabouOTempo() {
        this.perdeu();
    }

    perdeu() {
      this.fimDoJogo();
        //exibir tela game over
        console.log('Game over!');
    }

    reset() {
        console.log('reset');
    }

    fimDoJogo() {
        if (this.dificuldade.toUpperCase() === 'BH' && this.timer != null)
            this.timer.stop();

        this.enviarPontuacaoJogadorParaServidor();
        this.callbackFim();
    }

    enviarPontuacaoJogadorParaServidor() {
        let pontuacao = { score: this.acertos, dificuldade: this.dificuldade, jogadorNome: this.nomeJogador };
        $.post('/jogo/postPontuacao', pontuacao);
    }

}