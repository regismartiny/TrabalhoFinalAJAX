using JogoDaForca.Dominio.ClassesDb;
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
            return servicoPalavras.BuscarPalavraPorDificuldade(dificuldade, palavrasJaUsadas).Nome;
        }

        public Jogador GetJogador(string nome)
        {
            return servicoJogador.AutenticarJogador(nome);
        }

        public List<Pontuacao> GetPontuacao(Jogador jogador = null)
        {
            if (jogador == null)
            {
                return servicoPontuacao.BuscarPontuacaoTopDez();
            }
            else return servicoPontuacao.BuscarPontuacaoJogador(jogador);
        }

        public void PostPontuacao(Pontuacao pontuacao)
        {
            servicoPontuacao.GuardarPontuacao(pontuacao);
        }
    }
}