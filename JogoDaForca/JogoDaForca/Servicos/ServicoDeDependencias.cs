using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using JogoDaForca.Dominio.Interfaces;
using JogoDaForca.Dominio.Servicos;
using JogoDaForca.Repositorio;
using RepositorioMock;
using JogoDaForca.Repositorio.Repositorios;

namespace JogoDaForca.Servicos
{
    public class ServicoDeDependencias
    {
        internal static PalavraServico MontarPalavraRepositorio()
        {
            PalavraServico servico = new PalavraServico(new PalavraRepositorio());
            return servico;
        }

        internal static JogadorServico MontarJogadorRepositorio()
        {
            JogadorServico servico = new JogadorServico(new JogadorRepositorio());
            return servico;
        }

        internal static PontuacaoServico MontarPontuacaoRepositorio()
        {
            PontuacaoServico servico = new PontuacaoServico(new PontuacaoRepositorio());
            return servico;
        }

        internal static PalavraServico MontarPalavraRepositorioMock()
        {
            PalavraServico servico = new PalavraServico(new PalavraRepositorioMock());
            return servico;
        }
    }
}