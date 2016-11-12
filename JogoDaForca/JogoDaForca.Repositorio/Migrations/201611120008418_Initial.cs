namespace JogoDaForca.Repositorio.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Jogador",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        Senha = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Palavra",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(),
                        Dificuldade = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pontuacao",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Score = c.Int(nullable: false),
                        Dificuldade = c.Int(nullable: false),
                        Jogador_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Jogador", t => t.Jogador_Id)
                .Index(t => t.Jogador_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Pontuacao", "Jogador_Id", "dbo.Jogador");
            DropIndex("dbo.Pontuacao", new[] { "Jogador_Id" });
            DropTable("dbo.Pontuacao");
            DropTable("dbo.Palavra");
            DropTable("dbo.Jogador");
        }
    }
}
