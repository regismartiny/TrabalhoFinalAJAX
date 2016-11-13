class TelaPrincipal {
  
    constructor(seletor) {
        this.$elem = $(seletor);
        this.$timerDisplay = $('timer');

        this.palavrasJaUsadas = [];
        this.inicializarArmazenamentoDePalavrasUsadas();
        this.renderizarEstadoInicial();
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
        
        this.jogoAtual = new Jogo(nomeJogador, dificuldade, this.$timerDisplay, this.palavrasJaUsadas);
      
    }


    renderizarEstadoInicial() {
        $('section.tela-centralizada').removeClass('tela-centralizada');
        this.$elem.show();
        this.registrarBindsEventos();
    }

}
