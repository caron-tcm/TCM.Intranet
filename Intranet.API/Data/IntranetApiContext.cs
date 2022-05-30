using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

using Intranet.ProcessosTCM.Models;

#nullable disable

/*
 A inicialização do contexto pelo NetFramework ficou apenas para aproveitar a estrutura
 de conexão/contexto, já que passamos a utilizar o Dapper
*/

namespace Intranet.API.Models
{
    public partial class IntranetApiContext : DbContext
    {
        public IntranetApiContext()
        {
        }

        public IntranetApiContext(DbContextOptions<IntranetApiContext> options)
            : base(options)
        {
        }

//-------- Projeções

// Deixando aqui o builders das projeções apenas para documentação, já que passamos a utilizar Dapper.

        public virtual DbSet<Aniversariante> Aniversariantes { get; set; }  
        public virtual DbSet<Comunicado> Comunicados { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<MenuItem> ItensMenuRodape { get; set; }
        public virtual DbSet<MenuSimples> MenusRodape { get; set; }
        public virtual DbSet<Noticia> Noticias { get; set; }
        public virtual DbSet<Processo> Processos { get; set; }
        public virtual DbSet<Relatorio> Relatorios { get; set; }
        public virtual DbSet<Relatorio_Documento> RelatorioDocumentos { get; set; }
        public virtual DbSet<Relatorio_FaleConosco> RelatorioFalemConosco { get; set; }
        public virtual DbSet<Relatorio_Link> RelatorioLinks { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<TipoRelatorio> TiposRelatorio { get; set; }
        public virtual DbSet<SubTipoRelatorio> SubTiposRelatorio { get; set; }
        public virtual DbSet<UsuarioAD> UsuariosAD { get; set; }

// ------- Repositórios

// Os DbSet dos repositórios foram retirados, já que passamos a utilizar Dapper.
        public virtual DbSet<Configuracao> Configuracoes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //                optionsBuilder.UseSqlServer("Server=SQL2016-H;Database=ProcessosTCM;User Id=sa;Password=Xxxxx;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AI");

//-------- Projeções

// Deixando aqui o builders das projeções apenas para documentação, já que passamos a utilizar Dapper.

            modelBuilder.Entity<Aniversariante>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Comunicado>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Menu>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<MenuItem>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<MenuSimples>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Noticia>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Processo>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_Documento>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_FaleConosco>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_Inscrito>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_Item>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_Link>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_Processo>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Relatorio_SubItem>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Tag>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<Tema>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<TipoRelatorio>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<SubTipoRelatorio>(entity => { entity.HasNoKey(); });
            modelBuilder.Entity<UsuarioAD>(entity => { entity.HasNoKey(); });

// ------- Repositórios

// Os modelBuilder dos repositórios foram retirados, já que passamos a utilizar Dapper.

            modelBuilder.Entity<Configuracao>(entity =>
            {
                entity.ToTable("tConfiguracao");

                entity.HasIndex(e => e.Id, "NonClusteredIndex-20191001-103116");

                entity.HasIndex(e => e.Chave, "NonClusteredIndex-20210929-100921")
                    .IsUnique();

                entity.Property(e => e.Chave)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Valor).IsRequired();
            });

             OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
