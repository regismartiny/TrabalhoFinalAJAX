using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JogoDaForca.Dominio.ClassesDb;

namespace JogoDaForca.Repositorio.Repositorios
{
    class PontuacaoRepositorio : IPontuacaoRepositorio
    {
        public List<Pontuacao> BuscarPontuacao(Jogador jogador)
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Pontuacao.Where(p => p.Jogador.Id == jogador.Id || jogador == null).Take(10).OrderBy(a => a.Score).ToList();
            }
        }

        public void SalvarPontuacao(Pontuacao pontuacao)
        {
            using (var contexto = new ContextoDeDados())
            {
                contexto.Pontuacao.Add(pontuacao);
                contexto.SaveChanges();
            }
        }
    }
}
