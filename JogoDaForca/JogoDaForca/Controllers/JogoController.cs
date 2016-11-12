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
    }
}