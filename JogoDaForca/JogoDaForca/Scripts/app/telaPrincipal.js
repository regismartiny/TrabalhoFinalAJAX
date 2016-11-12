class TelaPrincipal {
  
    constructor(seletor) {
        this.$elem = $(seletor);
        this.palavrasJaUsadas = [];
        localStorage.setItem('palavrasJaUsadas', palavrasJaUsadas);
        this.palavraAtual;
        this.jogoAtual;
      //this.renderizarEstadoInicial();
    }


    novoJogo(nomeJogador, dificuldade) {
        
        getPalavra().then((palavra) => {
            this.palavraAtual = palavra;
            this.jogoAtual = new Jogo(nomeJogador, dificuldade);
        });
      
    }

    getPalavra() {
        return new Promise((resolve, reject) => {
            $.get(`/jogo/getPalavra/?palavrasJaUsadas=&${this.palavrasJaUsadas}dificuldade=${this.dificuldade}`)
                .then(
                  (palavra) => {
                      resolve(palavra);
                  }
               );
        });
    }


}
