class TelaLeaderBoard {
    constructor(seletor) {
        this.$elem = $(seletor);
        this.paginaAtual = 1;
        this.totalPaginas;

        this.carregarPontuacoesEMontarNaTela();
    }

    renderizarEstadoInicial(listaPontuacoes) {
        let self = this;
        jogoDaForca.render('.tela', 'tela-leaderboard', listaPontuacoes).then(() => {
              console.log('tela-leaderboard');
              self.registrarBindsEventos(self);
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
            $.get(`/jogo/getPontuacao?pagina=${this.paginaAtual}`)
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
            let listaPontuacoes = pontuacoes[0];
            let totalRegistros = pontuacoes[1];
            this.totalPaginas = Math.ceil(this.totalRegistros/10.0);
            console.log(pontuacoes);
            this.renderizarEstadoInicial.call(this, listaPontuacoes);
        });
        
    }

    paginaAnterior() {
        console.log('pagina anterior');
        if (this.paginaAtual > 1) {
            this.paginaAtual--;
        } else {
            this.$btnPaginaAnterior.hide();
        }
    }

    paginaSeguinte() {
        console.log('pagina seguinte');
        if (this.paginaAtual < this.totalPaginas) {
            this.paginaAtual++;
            this.$btnPaginaAnterior.show();
        } else {
            this.$btnPaginaSeguinte.hide();
        }
    }
}