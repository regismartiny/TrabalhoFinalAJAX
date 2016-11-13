class TelaPrincipal {
  
    constructor(seletor) {
        this.$elem = $(seletor);
        this.$timerDisplay = $('timer');

        this.palavrasJaUsadas = [];
        this.inicializarArmazenamentoDePalavrasUsadas();
        this.renderizarEstadoInicial();

        this.usuarioAtual;
        this.dificuldadeAtual;
    }

    registrarBindsEventos(self) {
        console.log('binds');
        self.$btnIniciarJogo = $('#btn-iniciar-jogo');
        self.$btnIniciarJogo.on('click', self.entrarJogoClick.bind(self));
    }

    inicializarArmazenamentoDePalavrasUsadas() {
        localStorage.setItem('palavrasJaUsadas', this.palavrasJaUsadas);
    }

    entrarJogoClick() {
        this.jogadorAtual = { nome: $('#nome-jogador').val() };
        this.dificuldadeAtual = $('#dificuldade').val();
        let jogador = this.jogadorAtual;
        jogoDaForca.render('.tela', 'tela-jogo', { jogador }).then(() => {
            console.log('tela-jogo');
            self.$btnReset = $('#btn-reset');
            self.$btnReset.on('click', this.reset.bind(this));
            //this.novoJogo();
        });   
    }

    reset() {
        console.log('reset');
        this.palavrasJaUsadas = [];
        this.novoJogo();
    }

    novoJogo() {
        this.jogoAtual = new Jogo(this.jogadorAtual.nome, this.dificuldadeAtual, this.$timerDisplay, this.palavrasJaUsadas);
    }

    renderizarEstadoInicial() {
        console.log('estado-inicial');
        $('section.tela-centralizada').removeClass('tela-centralizada');
        this.$elem.show();
        let self = this;
        jogoDaForca.render('.tela', 'tela-inicial', {
            dificulties: [{ value: 'normal' }, {value: 'bh'}]
        }).then(() => self.registrarBindsEventos(self));
    }

}
