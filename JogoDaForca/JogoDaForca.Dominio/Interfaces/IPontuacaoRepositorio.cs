using JogoDaForca.Dominio.ClassesDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Interfaces
{
    public interface IPontuacaoRepositorio
    {
        void SalvarPontuacao(Pontuacao pontuacao);

        List<Pontuacao> BuscarPontuacao(int pagina);
        int BuscarQuantidade();
    }
}
