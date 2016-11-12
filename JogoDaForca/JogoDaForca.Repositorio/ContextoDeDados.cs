using JogoDaForca.Dominio.ClassesDb;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JogoDaForca.Repositorio
{
    class ContextoDeDados : DbContext
    {
        public ContextoDeDados() : base("JogoDaForca")
        {

        }

        public DbSet<Jogador> Jogador { get; set; }

        public DbSet<Pontuacao> Pontuacao { get; set; }

        public DbSet<Palavra> Palavra { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
