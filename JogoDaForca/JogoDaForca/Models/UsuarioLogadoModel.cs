﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JogoDaForca.Models
{
    public class UsuarioLogadoModel
    {
        public UsuarioLogadoModel(string nome)
        {
            this.Nome = nome;
        }

        public string Nome { get; private set; }
    }
}