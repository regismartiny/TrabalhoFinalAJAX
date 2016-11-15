class TelaJogo {
    constructor(seletor, usuario, dificuldadeAtual) {
        this.$elem = $(seletor);
        this.jogadorAtual = usuario;
        this.dificuldadeAtual = dificuldadeAtual;
        this.palavrasJaUsadas = [];

        this.inicializarArmazenamentoDePalavrasUsadas();
        this.renderizarEstadoInicial();

        console.log(usuario);
    }

    inicializarArmazenamentoDePalavrasUsadas() {
        localStorage.setItem('palavrasJaUsadas', this.palavrasJaUsadas);
    }

    renderizarEstadoInicial() {
        let self = this;
        let dados = { dificuldade: this.dificuldadeAtual };
        jogoDaForca.render('.tela', 'tela-jogo', { dados }).then(() => {
            console.log('tela-jogo');
            this.registrarBindsEventos.bind(this)();
            this.novoJogo();
        });
    }

    registrarBindsEventos() {
        this.$elemTimerDisplay = $('#timer');
        this.$elemTentativasRestantes = $('#tentativas-restantes');
        this.$btnReset = $('#btn-reset');
        this.$btnReset.on('click', this.reset.bind(this));
        this.$elemDivChute = $('#div-chute');
        this.$elemPalavraChute = $('#palavra-chute');
        this.$btnChute = $('#btn-chute');
        this.$btnChute.on('click', () => { this.$btnChute.hide(); this.$elemDivChute.show(); this.$elemPalavraChute.focus() });
        this.$elemLetras = $('.letra');
        this.$elemPalavra = $('#palavra');
    }

    novoJogo() {
        console.log('jogador:', this.jogadorAtual);
        this.jogoAtual = new Jogo(this.jogadorAtual, this.dificuldadeAtual, this.palavrasJaUsadas, this.$elemTimerDisplay, this.$elemTentativasRestantes, this.$btnReset, this.$btnChute, this.$elemDivChute, this.$elemPalavraChute, this.$elemLetras, this.$elemPalavra, this.fimDoJogo);
    }

    reset() {
        console.log('reset');
        this.palavrasJaUsadas = [];
        this.novoJogo();
    }

    fimDoJogo() {
        jogoDaForca.renderizarTela('gameover');
    }
}