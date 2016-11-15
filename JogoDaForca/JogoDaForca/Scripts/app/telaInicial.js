class TelaInicial {
  
    constructor(seletor, usuario) {
        this.$elem = $(seletor);
        this.jogadorAtual = usuario;

        this.renderizarEstadoInicial();

        console.log(usuario);
    }

    registrarBindsEventos() {
        this.$btnIniciarJogo = $('#btn-iniciar-jogo');
        this.$btnIniciarJogo.on('click', this.entrarJogoClick.bind(this));
    }

    entrarJogoClick() {
        let dificuldadeAtual = $('input[name=dificuldade]:checked').val(); // select lit $('#dificuldade').val();
        jogoDaForca.renderizarTela('jogo', this.jogadorAtual, dificuldadeAtual);
    }

    renderizarEstadoInicial() {
        $('section.tela-centralizada').removeClass('tela-centralizada');
        this.$elem.show();
        let self = this;
        let dados = {
          dificuldades: [{ value: 'NORMAL' }, { value: 'BH' }]
        };
        jogoDaForca.render('.tela', 'tela-inicial', dados).then(() => {
            self.registrarBindsEventos.bind(self)();
        });
    }

}
