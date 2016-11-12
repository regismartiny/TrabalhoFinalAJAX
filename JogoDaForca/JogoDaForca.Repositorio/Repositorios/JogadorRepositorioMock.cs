using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JogoDaForca.Dominio.ClassesDb;

namespace RepositorioMock.Mock
{
    public class JogadorRepositorioMock : IJogadorRepositorio
    {
        private IList<Jogador> jogador;

        public JogadorRepositorioMock()
        {
            jogador = new List<Jogador>();
            Jogador jogador1 = new Jogador() { Id = 1, Nome = "Rafael"};
            Jogador jogador2 = new Jogador() { Id = 2, Nome = "Rodrigo"};
            Jogador jogador3 = new Jogador() { Id = 3, Nome = "Regis"};
            Jogador jogador4 = new Jogador() { Id = 4, Nome = "Otavio"};

            jogador.Add(jogador1);
            jogador.Add(jogador2);
            jogador.Add(jogador3);
            jogador.Add(jogador4);
        }

        public Jogador BuscarPorNome(string nome)
        {
            return this.jogador.FirstOrDefault(jogador => jogador.Nome.Equals(nome));
        }

        public Jogador BuscarPorID(int id)
        {
            return this.jogador.FirstOrDefault(jogador => jogador.Id == id);
        }

        public Jogador SalvarJogador(Jogador jogador)
        {
            throw new NotImplementedException();
        }
    }
}
