using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JogoDaForca.Dominio.ClassesDb;

namespace JogoDaForca.Repositorio.Repositorios
{
    public class JogadorRepositorio : IJogadorRepositorio
    {
        public Jogador BuscarPorNome(string nome)
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Jogador.Where(jogador => jogador.Nome.Equals(nome)).FirstOrDefault();
            }
        }
        public Jogador SalvarJogador(Jogador jogador)
        {
            using (var contexto = new ContextoDeDados())
            {
                contexto.Jogador.Add(jogador);
                contexto.SaveChanges();
                return jogador;
            }
        }
    }
}
