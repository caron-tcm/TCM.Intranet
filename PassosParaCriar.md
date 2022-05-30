# TCM.Intranet

### instalar tooling (globalmente)

```
dotnet tool install -g dotnet-ef
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool install -g Microsoft.Web.LibraryManager.Cli
```
---
### criar as pastas do projeto

```
md Intranet.API
md Intranet.CLI
```

---
## CRIAÇÃO DA SOLUTION (opcional)

(na pasta raiz)
```
dotnet new sln

[dotnet new -l] (lista os tipos de projeto disponíveis para criação)
```

para cada projeto, incluí-lo na solution:
```
dotnet sln NomeDaSolution.sln add PastaDoProjeto/NomeDoProjeto.csproj
```

---
## CRIAÇÃO DA API

```
cd Intranet.API
```

### criar um projeto tipo webapi

```
dotnet new webapi -f net5.0  

[dotnet watch run] (para  testar)

[dotnet sln NomeDaSolution.sln add PastaDoProjeto/NomeDoProjeto.csproj]
```

### instalar packages (localmente)

```
dotnet add package Microsoft.EntityFrameworkCore.Design -v 5.0.13
dotnet add package Microsoft.EntityFrameworkCore.SqlServer.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer -v 5.0.13
dotnet add package Microsoft.EntityFrameworkCore.Tools -v 5.0.13
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration -v 5.0.13
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design -v 5.0
```

### usar o codegenerator para gerar um controller chamado "PaginaController" na pasta "Controllers"

```
dotnet aspnet-codegenerator controller -name PaginaController -async -api --readWriteActions -outDir Controllers
```
no StartUp.cs:
            1. adicionar CORS
            2. adicionar o DbContext

### CodeFirst

1. gerar migration inicial
```
	dotnet-ef migrations add VersaoInicial -o Data/Migrations
```
2. gerar o banco de dados
```
	dotnet-ef database update
```
### DbFirst

scaffold do contexto
```	
	dotnet ef dbcontext scaffold "Server=XXX-H;Database=ProcessosTCM;User Id=XXX;Password=XXX;" Microsoft.EntityFrameworkCore.SqlServer -o Models 
```

> (NOTA: passamos a usar DAPPER para leituras, usando a infra do EF apenas para fazer a conexão via context)

```
	dotnet add package Dapper
	dotnet add package Slapper.AutoMapper --version 2.0.5
```

### fazer o scafold dos controllers a partir do BD
```
dotnet aspnet-codegenerator controller -name AniversarianteController -async -api -m Aniversariante -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name ComunicadoController -async -api -m Comunicado -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name MenuController -async -api -m ItemMenu -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name NoticiaController -async -api -m Noticia -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name PaginaController -async -api -m Pagina -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name AniversarianteController -async -api -m Aniversariante -dc IntranetContext -outDir Controllers
```

### ou (limpar)
```
dotnet aspnet-codegenerator controller -name RelatorioController -async -api -m TRelatorio -dc ProcessosTCMContext -outDir Controllers

dotnet aspnet-codegenerator controller -name ComunicadoController -async -api -m Comunicado -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name MenuController -async -api -m ItemMenu -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name NoticiaController -async -api -m Noticia -dc IntranetContext -outDir Controllers

dotnet aspnet-codegenerator controller -name PaginaController -async -api -m Pagina -dc IntranetContext -outDir Controllers
```

### confiar no certificado de desenvol
```
dotnet dev-certs https --trust
```

---
## CRIAÇÃO DO CLIENT (CORS)

```
cd Intranet.Cli
```
---
### criar o projeto
```
yarn create next-app [--example with-styled-components] intranetclient
```
> obs: [yarn create next-app --example with-styled-components intranetclient] <- se quiser criar com o modelo do styled

```
yarn add typescript @types/react @types/node -D

yarn add sass

yarn add react-icons

yarn add react-datepicker
```

### Extras:

```
yarn add next-auth

yarn add @types/next-auth -D
```

### Configurações:

1. tsconfig.json: configurar "baseUrl": "." e "paths": {*mapeamentos* }

2. next.config.js: configurar redirecionamentos

3. .env.local: configurar as variáveis de ambiente (secrets, urls etc.)

### no GitHub:

1. Client ID
2. Client secrets
