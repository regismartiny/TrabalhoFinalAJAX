$(function () {
  String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
  }

  jogoDaForca.iniciar();
  $.ajaxPrefilter((options, _, jqXHR) => {
      jogoDaForca.toggleLoader();
    jqXHR.done(() => {
        jogoDaForca.toggleLoader();
    });
  });
});