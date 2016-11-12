using JogoDaForca.Dominio.ClassesDb;
using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Servicos
{
    public class JogadorServico
    {
        private IJogadorRepositorio repositorio;

        public JogadorServico(IJogadorRepositorio repositorio)
        {
            this.repositorio = repositorio;
        }

        public Jogador AutenticarJogador(string nome)
        {
            Jogador jogadorEncontrado = this.repositorio.BuscarPorNome(nome);
            if(jogadorEncontrado == null)
            {
                var novoJogador = new Jogador(nome);
                return repositorio.SalvarJogador(novoJogador);
            }
            else return jogadorEncontrado;
        }

    }
}
