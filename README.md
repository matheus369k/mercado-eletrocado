<h1 align='center' >
  💻Mercado Eletrocado
</h1>
<div align='center'>

[Descrição](#descrição)
|
[Iniciar](#iniciar)
|
[Licença](#licença)

</div>

<div align='center'>
  <img src='https://img.shields.io/github/license/matheus369k/mercado-eletrocado.svg'/>
</div>

<div align='center'>
  <img src='https://drive.google.com/thumbnail?id=1GnlR_gN65PwmD5UKl434BD3FFnIjZVZg&sz=w1224'/>
</div>

## Descrição

O projeto é um site de e-commerce de eletrônicos. Tendo como principais funcionalidades...

- adicione ou remova produtos do carrinho
- filtre os dados de acordo com a categoria
- registro e login de usuário, com autenticação JWT(json web token)
- verifique os produtos que foram adicionados ao carrinho
- adicione ou remova o status de favorito a produtos
- lista de produtos já comprados
- atualize os dados do perfil

Para gerenciar a quantidade massiva de dados, foi usado o Redux toolkit, como principal ferramenta de gerenciamento de estado. por facilitar o gerenciamento e compartilhamento de dados entre os componentes.

Se quiser ver o projeto em mais detalhes clique [Mercado Eletrocado](https://mercado-eletrocado-pink.vercel.app/)

## Iniciar

E necessário o [Node.js](https://nodejs.org/pt/download) instalado na máquina e o back-end da aplicação acesse [mercado-eletrocado-api](https://github.com/matheus369k/mercado-eletrocado-api).

Para iniciar o projeto, basta clonar o repositório e instalar as dependências.

```bash
git clone https://github.com/matheus369k/mercado-eletrocado.git
cd mercado-eletrocado
npm install
```

E nesse criar um aquivo chamado **.env** e adicione a seguinte variável de ambiente:

```bash
VITE_DATABASE_URL=http:localhost:3000
```

Para iniciar o projeto, basta executar o comando:

```bash
npm run dev
```

## Licença

Fora usado a licença [MIT](./LICENSE).
