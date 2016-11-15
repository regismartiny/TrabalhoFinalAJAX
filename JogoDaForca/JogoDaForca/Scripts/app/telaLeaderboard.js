class TelaLeaderBoard {
    constructor(seletor) {
        this.$elem = $(seletor);

        this.renderizarEstadoInicial();
    }

    renderizarEstadoInicial() {
        let self = this;
        jogoDaForca.render('.tela', 'tela-leaderboard',
          { dados: { jogador: this.jogadorAtual } }).then(() => {
              console.log('tela-leaderboard');
              self.registrarBindsEventos(self);
              self.carregarPontuacoesEMontarNaTela.bind(self)();
          });
    }

    registrarBindsEventos(self) {
        this.$btnPaginaAnterior = $('#btn-pagina-anterior');
        this.$btnPaginaAnterior.on('click', this.paginaAnterior.bind(this));
        this.$btnPaginaSeguinte = $('#btn-pagina-seguinte');
        this.$btnPaginaSeguinte.on('click', this.paginaSeguinte.bind(this));
    }

    getPontuacoes() {
        return new Promise((resolve, reject) => {
            $.get('/jogo/getPontuacao')
                .done(
                    (pontuacao) => {
                        resolve(pontuacao);
                    }
                ).catch((err) => {
                    console.error('Erro na comunicação com o Servidor!');
                    console.error(`${err.responseJSON.code} - ${err.responseJSON.message}`);
                    reject(err);
                });
        });
    }

    carregarPontuacoesEMontarNaTela() {
        let pontuacoes = this.getPontuacoes().then((pontuacoes) => {
            console.log(pontuacoes);
        });
        
    }

    paginaAnterior() {
        console.log('pagina anterior');
    }

    paginaSeguinte() {
        console.log('pagina seguinte');
    }
}