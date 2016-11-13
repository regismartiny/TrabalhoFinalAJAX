$(function () {
  jogoDaForca.iniciar();
  $.ajaxPrefilter((options, _, jqXHR) => {
      jogoDaForca.toggleLoader();
    jqXHR.done(() => {
        jogoDaForca.toggleLoader();
    });
  });
});