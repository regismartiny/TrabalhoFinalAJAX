using JogoDaForca.Dominio.ClassesDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Interfaces
{
    public interface IJogadorRepositorio
    {
       Jogador BuscarPorNome(string nome);

        Jogador SalvarJogador(Jogador jogador);
    }
}
