using JogoDaForca.Dominio.ClassesDb;
using JogoDaForca.Dominio.Exceptions;
using JogoDaForca.Dominio.Interfaces;
using JogoDaForca.Dominio.Servicos;
using JogoDaForca.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public ActionResult Index()
        {
            return View();
        }

        [ResponseType(typeof(string))]
        public String GetPalavra(List<String> palavrasJaUsadas, string dificuldade)
        {
            try
            {
                return servicoPalavras.BuscarPalavraPorDificuldade(dificuldade, palavrasJaUsadas).Nome;
            }
            catch(BancoException ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Ocorreu um erro inesperado, porfavor tente mais tarde");
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
                ModelState.AddModelError("", ex.Message);
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Ocorreu um erro inesperado, porfavor tente mais tarde");
            }
            return null;
        }

        public List<Pontuacao> GetPontuacao(Jogador jogador = null)
        {
            try
            {
                if (jogador == null)
                {
                    return servicoPontuacao.BuscarPontuacaoTopDez();
                }
                else return servicoPontuacao.BuscarPontuacaoJogador(jogador);
            }
            catch (BancoException ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Ocorreu um erro inesperado, porfavor tente mais tarde");
            }
            return null;
        }

        public void PostPontuacao(Pontuacao pontuacao)
        {
            try
            {
                servicoPontuacao.GuardarPontuacao(pontuacao);
            }
            catch (BancoException ex)
            {
                ModelState.AddModelError("", ex.Message);
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Ocorreu um erro inesperado, porfavor tente mais tarde");
            }
        }
    }
}