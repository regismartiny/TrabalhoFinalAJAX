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

        public string Dificuldade { get; set; }

        public Jogador Jogador { get; set; }

        public Pontuacao()
        {

        }

        public Pontuacao(int Score, string Dificuldade, Jogador Jogador)
        {
            this.Score = Score;
            this.Dificuldade = Dificuldade;
            this.Jogador = Jogador;
        }
    }
}
