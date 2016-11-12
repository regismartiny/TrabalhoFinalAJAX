using JogoDaForca.Dominio.ClassesDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Interfaces
{
    public interface IPalavraRepositorio
    {
        Palavra BuscarPalavra(IList<Palavra> palavrasJaUsadas, Dificuldade dificuldade);
    }
}
