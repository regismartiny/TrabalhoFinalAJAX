using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.ClassesDb
{
    public class Pontuacao
    {
        public int Id { get; set; }

        public int Score { get; set; }

        public Dificuldade Dificuldade { get; set; }

        public Jogador Jogador { get; set; }

        public Pontuacao()
        {

        }
    }
}
