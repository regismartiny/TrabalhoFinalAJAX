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
        private IServicoDeCriptografia criptografia;

        public JogadorServico(IJogadorRepositorio repositorio, IServicoDeCriptografia criptografia)
        {
            this.repositorio = repositorio;
            this.criptografia = criptografia;
        }

        public Jogador AutenticarJogador(string nome, string senha)
        {
            Jogador jogadorEncontrado = this.repositorio.BuscarPorNome(nome);

            string senhaCriptografada = this.criptografia.Criptografar(nome, senha);

            if(jogadorEncontrado != null && jogadorEncontrado.Senha.Equals(senhaCriptografada))
            {
                return jogadorEncontrado;
            }
            return null;
        }
    }
}
