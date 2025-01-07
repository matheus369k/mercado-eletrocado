
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
  <img src='./public/eletrocado-preview.png'/>
</div>

## Descrição
O projeto é um site e um e-commerce de eletrônicos, com a finalidade de praticar e aprender React. Tendo como principais funcionalidades...

- O carrinho de compras
- Filtro de produtos
- O registro e login de usuários
- Os produtos que foram comprados
- adicionar produtos favoritos
- O Permanecimento dos dados do usuário
- estoque de produtos limitados

Para criar esse projeto tive, como meta, cria-lo sem um back-end, ou seja manter todos os dados no front-end. contudo, os dados de interação fossem permanecidos vinculados ao login do usuário no mesmo negador.

Para gerenciar a quantidade massiva de dados, foi usado o Redux toolkit, como principal ferramenta de gerenciamento de estado. por facilitar o gerenciamento e compartilhamento de dados entre os componentes.

Se quiser ver o projeto em mais detalhes, basta clicar [aqui](https://github.com/matheus369k/mercado-eletrocado), para acessar o repositório.

## Iniciar
E necessário o [Node.js](https://nodejs.org/pt/download) instalado na máquina.

E nesse criar um aquivo env com o nome .env e adicionar as seguintes variáveis de ambiente:
```bash
VITE_DATABASE_URL='https://matheus369k.github.io/Data/eletrocado-api.json'
```

Para iniciar o projeto, basta clonar o repositório e instalar as dependências.
```bash
git clone https://github.com/matheus369k/mercado-eletrocado.git
cd mercado-eletrocado
npm install
```
Para iniciar o projeto, basta executar o comando:
```bash
npm run dev
```

## Licença
Fora usado a licença [MIT](./LICENSE).