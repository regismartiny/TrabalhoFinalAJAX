﻿class Jogo {
  constructor(nomeJogador, dificuldade, palavrasJaUsadas, $elemTimerDisplay, $elemTentativasRestantes, $btnReset, $btnChute, $elemDivChute, $elemPalavraChute, $elemLetras, $elemPalavra) {
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
        this.timer;
        this.limiteErros;
        this.erros = 0;
        this.acertos = 0;
        this.palavraAtual;
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
            self.palavraAtual = palavra;
            self.palavrasJaUsadas.push(palavra);
            self.atualizarSombraPalavra.bind(self)();
            self.iniciarPartida.bind(self)();
        });
    }

    atualizarSombraPalavra() {
      let sombraPalavra = '';
      for (let i = 0; i < this.palavraAtual.length; i++) {
        sombraPalavra += ' ';
        if (this.palavraAtual[i] === '-')
          sombraPalavra += '-';
        else
          sombraPalavra += '_';
      }
      this.$elemPalavra.text(sombraPalavra);
      console.log('sombra-palavra:', sombraPalavra);
    }

    iniciarPartida() {
        switch (this.dificuldade.toUpperCase()) {
          case 'NORMAL':
            this.limiteErros = 5;
            console.log(this.$elemTimerDisplay);
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
        let letra = $event.target.outerText;
        console.log('entrada:', letra);
        if (this.timer !== undefined)
            this.timer.reset();
        if (this.palavraAtual.includes(letra.toUpperCase())) {
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
        this.carregarPalavraEIniciarPartida();
    }

    computarErro() {
        this.erros++;
        this.$elemTentativasRestantes.text(this.limiteErros - this.erros);
        if (this.erros === this.limiteErros)
            this.perdeu();
    }

    chute($event) {
      console.log('event:', $event);
      let keyCode = $event.originalEvent.keyCode;
      let palavraChute = $event.target.value;
      console.log('key:', keyCode);
      if (keyCode === 13) {//ENTER
        if (palavraChute.toUpperCase() === this.palavraAtual.toUpperCase()) {
          this.computarAcerto(true);
        }
        else {
          this.perdeu();
        }
      } else if (keyCode === 27) {//ESC
        this.$elemDivChute.hide();
        this.$btnChute.show();
        //$event.target.style.display = "none";
      }
    }

    acabouOTempo() {
        this.perdeu();
    }

    perdeu() {
        this.fimDoJogo();
    }

    reset() {
        console.log('reset');
    }

    fimDoJogo() {
        if (this.dificuldade.toUpperCase() === 'BH' && this.timer != null)
            this.timer.stop();

        this.enviarPontuacaoJogadorParaServidor();
    }

    enviarPontuacaoJogadorParaServidor() {
        let pontuacao = { score: this.acertos, dificuldade: this.dificuldade, jogadorNome: this.nomeJogador };
        $.post('/jogo/postPontuacao', pontuacao);
    }

}