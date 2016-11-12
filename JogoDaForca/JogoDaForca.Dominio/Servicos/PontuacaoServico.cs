using JogoDaForca.Dominio.ClassesDb;
using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Servicos
{
    public class PontuacaoServico
    {
        private IPontuacaoRepositorio repositorio;

        public PontuacaoServico(IPontuacaoRepositorio repositorio)
        {
            this.repositorio = repositorio;
        }

        public void GuardarPontuacao(Pontuacao pontuacao)
        {
            this.repositorio.SalvarPontuacao(pontuacao);
        }

        public List<Pontuacao> BuscarPontuacaoTopDez()
        {
            return this.repositorio.BuscarPontuacao(null);
        }

        public List<Pontuacao> BuscarPontuacaoJogador(Jogador jogador)
        {
            return this.repositorio.BuscarPontuacao(jogador);
        }
    }
}
