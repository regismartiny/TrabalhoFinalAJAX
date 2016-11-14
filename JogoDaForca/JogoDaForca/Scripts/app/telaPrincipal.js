class TelaPrincipal {
  
    constructor(seletor, usuario) {
        this.$elem = $(seletor);

        this.palavrasJaUsadas = [];
        this.inicializarArmazenamentoDePalavrasUsadas();
        this.renderizarEstadoInicial();

        this.jogadorAtual = usuario;
        this.dificuldadeAtual;
    }

    registrarBindsEventos(self) {
        console.log('binds');
        self.$btnHome = $('#btn-home');
        self.$btnHome.on('click', self.renderizarEstadoInicial.bind(self));
        self.$btnLeaderBoard = $('#btn-leaderboard');
        self.$btnLeaderBoard.on('click', self.irParaTelaLeaderboard.bind(self));
        self.$btnLogout = $('#btn-logout');
        self.$btnLogout.on('click', self.logout.bind(self));
        
    }

    irParaTelaLeaderboard() {
        let self = this;
        jogoDaForca.render('.tela', 'tela-leaderboard').then(() => {
            console.log('tela-leaderboard');
            self.registrarBindsEventos(self);
        });
    }

    logout() {
        jogoDaForca.iniciar.bind(this)();
    }

    inicializarArmazenamentoDePalavrasUsadas() {
        localStorage.setItem('palavrasJaUsadas', this.palavrasJaUsadas);
    }

    entrarJogoClick() {
        let self = this;
        this.dificuldadeAtual = $('#dificuldade').val();
        let dados = { jogador: this.jogadorAtual, dificuldade: this.dificuldadeAtual };
        jogoDaForca.render('.tela', 'tela-jogo', { dados }).then(() => {
            console.log('tela-jogo');
            self.registrarBindsEventos(self);
            self.$timerDisplay = $('#timer');
            self.$tentativasRestantes = $('#tentativas-restantes');
            self.$btnReset = $('#btn-reset');
            self.$btnReset.on('click', self.reset.bind(self));
            self.novoJogo();
        });   
    }

    reset() {
        console.log('reset');
        this.palavrasJaUsadas = [];
        this.novoJogo();
    }

    novoJogo() {
        console.log('jogador:', this.jogadorAtual);
        this.jogoAtual = new Jogo(this.jogadorAtual, this.dificuldadeAtual, this.palavrasJaUsadas, this.$timerDisplay, this.$tentativasRestantes);
    }

    renderizarEstadoInicial() {
        console.log('estado-inicial');
        $('section.tela-centralizada').removeClass('tela-centralizada');
        this.$elem.show();
        let self = this;
        jogoDaForca.render('.tela', 'tela-inicial', {
            dificulties: [{ value: 'NORMAL' }, { value: 'BH' }]
        }).then(() => {
            self.$btnIniciarJogo = $('#btn-iniciar-jogo');
            self.$btnIniciarJogo.on('click', self.entrarJogoClick.bind(self));
            self.registrarBindsEventos(self)
        });
    }

}
