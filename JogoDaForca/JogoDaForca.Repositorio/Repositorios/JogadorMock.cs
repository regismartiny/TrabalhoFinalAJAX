using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JogoDaForca.Dominio.ClassesDb;

namespace RepositorioMock.Mock
{
    class JogadorMock : IJogadorRepositorio
    {
        private IList<Jogador> jogador;

        public JogadorMock()
        {
            jogador = new List<Jogador>();
            Jogador jogador1 = new Jogador() { Id = 1, Nome = "Rafael", Senha = "123" };
            Jogador jogador2 = new Jogador() { Id = 2, Nome = "Rodrigo", Senha = "1234" };
            Jogador jogador3 = new Jogador() { Id = 3, Nome = "Regis", Senha = "12345" };
            Jogador jogador4 = new Jogador() { Id = 4, Nome = "Otavio", Senha = "123456" };

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
    }
}
