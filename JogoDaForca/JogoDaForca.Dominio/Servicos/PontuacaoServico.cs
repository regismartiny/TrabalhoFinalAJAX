using JogoDaForca.Dominio.ClassesDb;
using JogoDaForca.Dominio.Exceptions;
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
            if (pontuacao.Jogador == null) throw new BancoException("Não tem nenhum jogador cadastro para registrar a pontuação");
            this.repositorio.SalvarPontuacao(pontuacao);
        }

        public List<Pontuacao> BuscarPontuacaoTopDez()
        {
            var listaDePontuacao = this.repositorio.BuscarPontuacao(null);
            if (listaDePontuacao.Count() == 0) throw new BancoException("Não tem nenhum registro");
            return listaDePontuacao;
        }

        public List<Pontuacao> BuscarPontuacaoJogador(Jogador jogador)
        {
            var listaDePontuacao = this.repositorio.BuscarPontuacao(jogador);
            if (listaDePontuacao.Count() == 0) throw new BancoException("O jogador não possui nenhum registro");
            return listaDePontuacao;
        }
    }
}
