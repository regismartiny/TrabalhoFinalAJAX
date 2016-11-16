class Jogo {
    constructor(nomeJogador, dificuldade, palavrasJaUsadas, $elemTimerDisplay, $elemTentativasRestantes, $btnReset, $btnChute, $elemDivChute, $elemPalavraChute, $elemLetras, $elemPalavra, $elemHangman, callbackFim) {
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
        this.$elemHangman = $elemHangman;
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
        //hangman
        this.$boneco = this.$elemHangman.children();
        this.$partes = this.$boneco.children();
        this.$cabeca = this.$partes.eq(0);
        this.$tronco = this.$partes.eq(1);
        this.$bracoDireito = this.$partes.eq(2);
        this.$bracoEsquerdo = this.$partes.eq(3);
        this.$pernaDireita = this.$partes.eq(4);
        this.$pernaEsquerda = this.$partes.eq(5);
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
                this.palavraSombra += '_';
        }
    }

    atualizarTelaSombraPalavra() {
        this.$elemPalavra.text(this.palavraSombra);
        console.log('sombra-palavra:', this.palavraSombra);
    }


    atualizarHangman(tentativasRestantes) {
        if (this.dificuldade === 'NORMAL') {
            if (tentativasRestantes === 4) {
                this.$cabeca.show();
                this.$tronco.show();
            }
            else if (tentativasRestantes === 3) {
                this.$bracoDireito.show();
            }
            else if (tentativasRestantes === 2) {
                this.$bracoEsquerdo.show();
            }
            else if (tentativasRestantes === 1) {
                this.$pernaDireita.show();
            }
            else if (tentativasRestantes === 0) {
                this.$pernaEsquerda.show();
            }
        } else {
            if (tentativasRestantes === 1) {
                this.$tronco.show();
                this.$cabeca.show();
                this.$bracoDireito.show();
            } else if (tentativasRestantes === 0){
                this.$bracoEsquerdo.show();
                this.$pernaDireita.show();
                this.$pernaEsquerda.show();
            }
        }
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
        let letras = $('.letra');
        letras.each(function () {
            this.style.visibility = 'visible';
        });
    }


    entrada($event) {
        let letra = $event.target.outerText.toUpperCase();
        console.log('entrada:', letra);
        let palavra = this.palavraAtual.toUpperCase();
        if (palavra.includes(letra)) {
            $event.target.style.visibility = 'hidden';
          let posFound = [];
          for (let i = 0, len = palavra.length; i < len; i++) {
            if (palavra[i] === letra) {
              posFound.push(i);
            }
          }
          for (let i = 0, len = posFound.length; i < len; i++) {
              console.log('sombra:', this.palavraSombra);
            this.palavraSombra = this.palavraSombra.replaceAt(posFound[i], letra);
          }
          console.log('posFound:', posFound);
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
            if (this.timer !== undefined)
                this.timer.reset();
            setTimeout(this.carregarPalavraEIniciarPartida.bind(this), 2000);
        }
    }

    computarErro() {
        console.log('errou');
        this.erros++;
        let tentativasRestantes = this.limiteErros - this.erros;
        this.$elemTentativasRestantes.text(tentativasRestantes);
        this.atualizarHangman(tentativasRestantes);
        if (this.erros === this.limiteErros)
            setTimeout(this.perdeu.bind(this), 1000);
    }

    chute($event) {
      let keyCode = $event.originalEvent.keyCode;
      let palavraChute = $event.target.value;
      console.log('chute:', palavraChute);
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
        $.post('/jogo/postPontuacao', pontuacao)
            .catch((err) => {
                console.error('Erro na comunicação com o Servidor!');
                console.error(`${err.responseJSON.code} - ${err.responseJSON.message}`);
                reject(err);
            }
        );
    }

}