class TelaPrincipal {
  
    constructor(seletor, usuario) {
        this.$elem = $(seletor);
        this.jogadorAtual = usuario;
        this.dificuldadeAtual;
        this.palavrasJaUsadas = [];

        this.inicializarArmazenamentoDePalavrasUsadas();
        this.renderizarEstadoInicial(); 
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
        jogoDaForca.render('.tela', 'tela-leaderboard', 
          { dados: { jogador: this.jogadorAtual } }).then(() => {
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
            self.$elemTimerDisplay = $('#timer');
            self.$elemTentativasRestantes = $('#tentativas-restantes');
            self.$btnReset = $('#btn-reset');
            self.$btnReset.on('click', self.reset.bind(self));
            self.$elemDivChute = $('#div-chute');
            self.$elemPalavraChute = $('#palavra-chute');
            self.$btnPalpite = $('#btn-palpite');
            self.$btnPalpite.on('click', self.$elemDivChute.show)
            self.$elemLetras = $('.letra');
            self.$elemPalavra = $('#palavra');
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
        this.jogoAtual = new Jogo(this.jogadorAtual, this.dificuldadeAtual, this.palavrasJaUsadas, this.$elemTimerDisplay, this.$elemTentativasRestantes, this.$btnReset, this.$elemPalavraChute, this.$elemLetras, this.$elemPalavra);
    }

    renderizarEstadoInicial() {
        console.log('estado-inicial');
        $('section.tela-centralizada').removeClass('tela-centralizada');
        this.$elem.show();
        let self = this;
        let dados = {
          dificuldades: [{ value: 'NORMAL' }, { value: 'BH' }],
          jogador: this.jogadorAtual
        };
        jogoDaForca.render('.tela', 'tela-inicial', dados).then(() => {
            self.$cabecalho = ('#cabecalho');
            self.$cabecalho.show();
            self.$btnIniciarJogo = $('#btn-iniciar-jogo');
            self.$btnIniciarJogo.on('click', self.entrarJogoClick.bind(self));
            self.registrarBindsEventos(self)
        });
    }

}
