using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.ClassesDb
{
    public class Palavra
    {

        public int Id { get; set; }

        public string Nome { get; set; }

        public string Dificuldade { get; set; }

        public Palavra()
        {

        }
    }
}
