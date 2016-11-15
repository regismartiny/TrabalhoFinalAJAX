let jogoDaForca = {};

jogoDaForca.toggleLoader = () => {
    ['.loader', '.tela'].forEach(seletor => $(seletor).toggle());
};

var registrarBindsEventos = function() {
    console.log('binds');
    this.$btnHome = $('#btn-home');
    this.$btnHome.on('click', () => { jogoDaForca.renderizarTela('inicial') });
    this.$btnLeaderBoard = $('#btn-leaderboard');
    this.$btnLeaderBoard.on('click', () => { jogoDaForca.renderizarTela('leaderboard') });
    this.$btnLogout = $('#btn-logout');
    this.$btnLogout.on('click', location.reload);
        
}()

jogoDaForca.renderizarTela = function (nome, usuario, dificuldadeAtual) {

  // escondendo todas as telas antes de renderizar a tela correta
  let $subTelas = $('.sub-tela');
  $.each($subTelas, (indice, elem) => $(elem).hide());
  let seletor = '';

  switch (nome) {
    case 'login':
        new TelaLogin('#telaLogin');
        return;
        break;
    case 'inicial':
        new TelaInicial('#telaPrincipal', usuario);
        break;
    case 'jogo':
        new TelaJogo('#telaPrincipal', usuario, dificuldadeAtual);
        break;
    case 'gameover':
        new TelaGameOver('#telaPrincipal');
        break;
    case 'leaderboard':
        new TelaLeaderBoard('#telaPrincipal');
        break;
  }
  $('#cabecalho').show();
  $('#nome-jogador').text(usuario);
}

jogoDaForca.loadTemplate = function (name) {

  return new Promise((resolve, reject) => {
    $.get(`/static/templates/${name}.tpl.html`).then(
      (template) => {
        resolve(Handlebars.compile(template));
      }
    )
  });

}

jogoDaForca.render = function (viewElementSelector, templateName, data) {

  return new Promise((resolve, reject) => {
    this.loadTemplate(templateName).then(
     function (templateFn) {
       let rendered = templateFn(data);
       $(viewElementSelector).html(rendered);
       resolve();
     }
   );
  });
}

jogoDaForca.iniciar = function () {
  return jogoDaForca.renderizarTela('login');
};