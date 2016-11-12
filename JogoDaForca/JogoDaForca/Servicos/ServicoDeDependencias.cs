using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using JogoDaForca.Dominio.Interfaces;
using JogoDaForca.Dominio.Servicos;
using JogoDaForca.Repositorio;

namespace JogoDaForca.Servicos
{
    public class ServicoDeDependencias
    {
        internal static PalavraServico MontarPalavraRepositorio()
        {
            PalavraServico servico = new PalavraServico(new PalavraRepositorio());
            return servico;
        }
    }
}