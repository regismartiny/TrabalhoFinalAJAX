using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.ClassesDb
{
    public class Jogador
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public Jogador()
        {

        }

        public Jogador(string nome)
        {
            this.Nome = nome;
        }
    }
}
