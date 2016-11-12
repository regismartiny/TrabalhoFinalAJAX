class TelaPrincipal {
  
    constructor(seletor) {
        this.$elem = $(seletor);
        this.$timerDisplay = $('timer');
        registrarBindsEventos(this);

        this.palavrasJaUsadas = [];
        this.inicializarArmazenamentoDePalavrasUsadas();
      //this.renderizarEstadoInicial();
    }

    registrarBindsEventos(self) {
        self.$btnIniciarJogo = $('#btn-iniciar-jogo');
        self.$btnIniciarJogo.on('click', self.novoJogo.bind(self));
        self.$btnReset = $('#btn-reset');
        self.$btnReset.on('click', self.reset.bind(self));
    }

    inicializarArmazenamentoDePalavrasUsadas() {
        localStorage.setItem('palavrasJaUsadas', this.palavrasJaUsadas);
    }

    reset() {
        this.palavrasJaUsadas = [];
        this.novoJogo();
    }

    novoJogo(nomeJogador, dificuldade) {
        
        getPalavra()
            .then((palavra) => {
                this.palavraAtual = palavra;
                this.jogoAtual = new Jogo(palavraAtual, nomeJogador, dificuldade, this.$timerDisplay);
            }
        );
      
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


    renderizarEstadoInicial() {
        $('section.tela-centralizada').removeClass('tela-centralizada');
        this.$elem.show();
        this.registrarBindsEventos();
    }

}
