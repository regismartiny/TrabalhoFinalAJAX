let jogoDaForca = {};

jogoDaForca.renderizarTela = function (nome) {

  // escondendo todas as telas antes de renderizar a tela correta
  let $subTelas = $('.sub-tela');
  $.each($subTelas, (indice, elem) => $(elem).hide());
  let seletor = '';

  switch (nome) {
    case 'principal':
      new TelaPrincipal('#telaPrincipal');
      break;
    case 'login':
      new TelaLogin('#telaLogin');
      break;
  }

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