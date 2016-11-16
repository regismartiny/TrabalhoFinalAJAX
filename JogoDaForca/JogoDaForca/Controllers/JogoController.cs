using JogoDaForca.Dominio.ClassesDb;
using JogoDaForca.Dominio.Exceptions;
using JogoDaForca.Dominio.Interfaces;
using JogoDaForca.Dominio.Servicos;
using JogoDaForca.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;

namespace JogoDaForca.Controllers
{
    public class JogoController : Controller
    {
        private PalavraServico servicoPalavras = ServicoDeDependencias.MontarPalavraRepositorioMock();
        private JogadorServico servicoJogador = ServicoDeDependencias.MontarJogadorRepositorio();
        private PontuacaoServico servicoPontuacao = ServicoDeDependencias.MontarPontuacaoRepositorio();


        // GET: Palavra
        [ResponseType(typeof(string))]
        public string GetPalavra(List<string> palavrasJaUsadas, string dificuldade)
        {
            try
            {
                if (palavrasJaUsadas.ElementAt(0).Equals("undefined"))
                    palavrasJaUsadas = null;
                return servicoPalavras.BuscarPalavraPorDificuldade(dificuldade, palavrasJaUsadas).Nome;
            }
            catch(BancoException ex)
            {
                RedirectError(ex);
            }
            catch (Exception ex)
            {
                RedirectError(ex);
            }
            return null;

        }

        public Jogador GetJogador(string nome)
        {
            try
            {
                return servicoJogador.AutenticarJogador(nome);
            }
            catch (BancoException ex)
            {
                RedirectError(ex);
            }
            catch (Exception ex)
            {
                RedirectError(ex);
            }
            return null;
        }

        [ResponseType(typeof(List<object>))]
        public List<object> GetPontuacao(int pagina)
        {
            var listaRetorno = new List<object>();
            try
            {
                var listaDePontuacao = servicoPontuacao.BuscarPontuacaoTopDez(pagina);
                var quantidadeRegistros = servicoPontuacao.QuantidadePontuacao();
                listaRetorno.Add(listaDePontuacao);
                listaRetorno.Add(quantidadeRegistros);
                return listaRetorno;
            }
            catch (BancoException ex)
            {
                RedirectError(ex);
            }
            catch (Exception ex)
            {
                RedirectError(ex);
            }
            return null;
        }

        public void PostPontuacao(int Score, string Dificuldade, string JogadorNome)
      {
            var jogadorEncontrado = servicoJogador.AutenticarJogador(JogadorNome);
            var pontuacao = new Pontuacao(Score, Dificuldade, jogadorEncontrado);
            try
            {
                servicoPontuacao.GuardarPontuacao(pontuacao);
            }
            catch (BancoException ex)
            {
                RedirectError(ex);
            }
            catch (Exception ex)
            {
                RedirectError(ex);
            }
        }

        private JsonResult RedirectError(Exception exception)
        {

            Dictionary<string, object> error = new Dictionary<string, object>();
            if (exception.InnerException is BancoException)
            {
                error.Add("ErrorMessage", exception.Message);
                return Json(error);
            }
            else
            {
                error.Add("ErrorMessage", "Ocorreu algum error inesperado, tente denovo mais tarde");
                return Json(error);
            }

        }
    }
}