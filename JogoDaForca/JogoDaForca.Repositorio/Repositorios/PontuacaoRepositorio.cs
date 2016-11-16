using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JogoDaForca.Dominio.ClassesDb;
using System.Data.Entity;

namespace JogoDaForca.Repositorio.Repositorios
{
    public class PontuacaoRepositorio : IPontuacaoRepositorio
    {
        public List<Pontuacao> BuscarPontuacao(int pagina)
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Pontuacao.Skip((pagina - 1) * 10).Take(10).OrderBy(a => a.Score).ToList();
            }
        }

        public int BuscarQuantidade()
        {
            using (var contexto = new ContextoDeDados())
            {
                return contexto.Pontuacao.Count();
            }
        }

        public void SalvarPontuacao(Pontuacao pontuacao)
        {
            using (var contexto = new ContextoDeDados())
            {
                contexto.Entry(pontuacao.Jogador).State = EntityState.Unchanged;
                contexto.Pontuacao.Add(pontuacao);
                contexto.SaveChanges();
            }
        }
    }
}
