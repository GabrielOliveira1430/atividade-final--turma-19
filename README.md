📌 Atividade Final — API com Autenticação JWT e Swagger

Este projeto foi desenvolvido como atividade final do curso, com o objetivo de consolidar os principais conceitos de desenvolvimento backend utilizando Node.js e TypeScript, incluindo autenticação segura, uso de middleware e documentação interativa com Swagger.

🎯 Objetivo da Atividade

Implementar autenticação com JWT

Criptografar senhas usando bcrypt (algoritmo de mão única com salt)

Proteger rotas com middleware

Documentar a API com Swagger

Demonstrar o funcionamento da API por meio de evidências visuais

🚀 Tecnologias Utilizadas

Node.js

TypeScript

Express

routing-controllers

Prisma ORM

PostgreSQL

JSON Web Token (JWT)

bcrypt

Swagger (OpenAPI)

🔐 Segurança

Senhas armazenadas de forma segura utilizando bcrypt, impossibilitando a reversão para texto original

Autenticação baseada em JWT

Middleware responsável por validar o token antes da execução dos controllers

Rotas protegidas contra acesso não autenticado

🧩 Funcionalidades Implementadas

✔ Cadastro de usuário
✔ Login com usuário e senha
✔ Geração de token JWT
✔ Middleware de autenticação
✔ Rotas protegidas
✔ Controller de Alunos
✔ Documentação interativa com Swagger

🏗️ Estrutura do Projeto (resumo)
src/
├── config/          # Configurações (JWT, Swagger, server, etc.)
├── features/
│   ├── auth/        # Autenticação (login, token, bcrypt)
│   ├── user/        # Usuários
│   └── aluno/       # Alunos (rota protegida)
├── shared/
│   ├── middleware/  # Middlewares de autenticação
│   └── prisma.ts    # Prisma Client
├── server.ts        # Inicialização do servidor

▶️ Como Executar o Projeto
Pré-requisitos

Node.js

PostgreSQL

Instalação
npm install

Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/banco"
JWT_SECRET="sua_chave_secreta"

Banco de Dados
npx prisma migrate dev
npx prisma generate

Executar a Aplicação
npm run dev


Servidor disponível em:

http://localhost:3000

📚 Swagger — Documentação da API

A documentação interativa da API está disponível em:

http://localhost:3000/docs


No Swagger é possível:

Criar usuários

Fazer login

Autenticar com JWT

Testar rotas protegidas diretamente no navegador

🧪 Testes e Evidências da Atividade

As evidências do funcionamento da API foram obtidas através do Swagger (e também testadas no Postman), demonstrando:

1️⃣ Endpoint de Alunos não funciona sem autenticação
2️⃣ Criação de usuário e senha
3️⃣ Login com usuário criado
4️⃣ Endpoint de Alunos funcionando quando autenticado

Essas evidências comprovam o correto funcionamento da autenticação, do middleware e da proteção de rotas.

🏁 Conclusão

Este projeto atende todos os requisitos da atividade final, aplicando boas práticas de segurança, organização de código e documentação, servindo como uma base sólida para aplicações backend profissionais em Node.js com TypeScript.

🎓 Status do Projeto

✅ Atividade Final Concluída com Sucesso