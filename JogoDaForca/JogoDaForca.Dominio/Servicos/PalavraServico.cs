using JogoDaForca.Dominio.ClassesDb;
using JogoDaForca.Dominio.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Servicos
{
    public class PalavraServico
    {
        private IPalavraRepositorio repositorio;
        
        public PalavraServico(IPalavraRepositorio repositorio)
        {
            this.repositorio = repositorio;
        }

        public Palavra BuscarPalavraPorDificuldade(string dificuldade, List<String> palavrasJaUsadas)
        {
            return repositorio.BuscarPalavra(palavrasJaUsadas,dificuldade);
        }
    }
}
