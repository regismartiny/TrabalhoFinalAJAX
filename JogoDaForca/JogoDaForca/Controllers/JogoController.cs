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
        private PalavraServico repositorioPalavras = ServicoDeDependencias.MontarPalavraRepositorio();

        // GET: Palavra
        public ActionResult Index()
        {
            return View();
        }

        [ResponseType(typeof(Palavra))]
        public Palavra GetPalavra(List<String> PalavrasJaUsadas, Dificuldade Dificuldade)
        {
            return repositorioPalavras.BuscarPalavraPorDificuldade(Dificuldade, PalavrasJaUsadas);
        }
    }
}