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
        public Palavra BuscarPalavra(IList<String> palavrasJaUsadas, String dificuldade)
        {
            using(var context = new ContextoDeDados())
            {
                //var palavraAchada = context.Palavra.Where(palavra => palavra.Dificuldade == dificuldade && (palavrasJaUsadas.Count() == 0 || !(palavrasJaUsadas.Any(filtro => filtro.Equals(palavra.Nome))))).OrderBy(c => Guid.NewGuid()).FirstOrDefault();
                return null;
            }            
        }
    }
}
