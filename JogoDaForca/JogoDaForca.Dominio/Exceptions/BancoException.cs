using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Dominio.Exceptions
{
    public class BancoException : ApplicationException
    {
        public BancoException(string message) : base (message)
        {

        }
    }
}
