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
                var palavraAchada = context.Palavra.Where(palavra => palavra.Dificuldade.ToUpperInvariant().Equals(dificuldade.ToUpperInvariant()));
                if (palavrasJaUsadas != null && palavrasJaUsadas.Count > 0)
                    palavraAchada = palavraAchada.Where(palavra => !(palavrasJaUsadas.Any(filtro => filtro.ToUpperInvariant().Equals(palavra.Nome.ToUpperInvariant()))));
                return palavraAchada.OrderBy(c => Guid.NewGuid()).FirstOrDefault();
            }            
        }
    }
}
