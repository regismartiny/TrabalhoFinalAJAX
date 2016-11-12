using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using JogoDaForca.Dominio.ClassesDb;

namespace RepositorioMock
{
    public class PalavraRepositorioMock : IPalavraRepositorio
    {
        private IList<Palavra> listaDePalavras;

        public PalavraRepositorioMock()
        {
            listaDePalavras = new List<Palavra>();
            Palavra p1 = new Palavra() { Id = 1, Nome = "Pneu", Dificuldade = "Normal"};
            Palavra p2 = new Palavra() { Id = 2, Nome = "Bicicleta", Dificuldade = "Normal" };
            Palavra p3 = new Palavra() { Id = 3, Nome = "Rimel", Dificuldade = "BH" };
            Palavra p4 = new Palavra() { Id = 4, Nome = "Hieroglifo", Dificuldade = "BH" };

            listaDePalavras.Add(p1);
            listaDePalavras.Add(p2);
            listaDePalavras.Add(p3);
            listaDePalavras.Add(p4);
        }

        public Palavra BuscarPalavra(IList<string> palavrasJaUsadas, string dificuldade)
        {
            var listaFiltrada = listaDePalavras.Where(p => palavrasJaUsadas.Any(filtro => !filtro.Equals(p.Nome)));
            Palavra palavra = listaFiltrada.Where(p => p.Dificuldade == dificuldade).OrderBy(c => Guid.NewGuid()).FirstOrDefault();
            palavrasJaUsadas.Add(palavra.Nome);
            return palavra;
        }

        public Palavra BuscarPalavra(IList<Palavra> palavrasJaUsadas, string dificuldade)
        {
            var listaFiltrada = listaDePalavras.Where(p => palavrasJaUsadas.Any(filtro => filtro.Id != p.Id));
            Palavra palavra =  listaFiltrada.Where(p => p.Dificuldade == dificuldade).OrderBy(c => Guid.NewGuid()).FirstOrDefault();
            palavrasJaUsadas.Add(palavra);
            return palavra;
        }
    }
}
