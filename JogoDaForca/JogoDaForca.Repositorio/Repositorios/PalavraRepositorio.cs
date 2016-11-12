using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JogoDaForca.Dominio.ClassesDb;

namespace JogoDaForca.Repositorio
{
    public class PalavraRepositorio : IPalavraRepositorio
    {
        public Palavra BuscarPalavra(IList<Palavra> palavrasJaUsadas, Dificuldade dificuldade)
        {
            using(var context = new ContextoDeDados())
            {
                var listaFiltrada = context.Palavra.Where(palavra => palavrasJaUsadas.Any(filtro => filtro.Id != palavra.Id));
                var palavraAchada = listaFiltrada.Where(p => p.Dificuldade == dificuldade).OrderBy(c => Guid.NewGuid()).FirstOrDefault();
                return palavraAchada;
            }            
        }
    }
}
