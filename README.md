# projeto17-shortly

O projeto "Shortly" é uma aplicação Node.js de back-end, que faz o controle das regras de negócio de uma rede social ligada a links. Os links são encurtados, armazenados e rankeados. O usuário pode organizar, criar e deletar links vinculados à sua conta. 

## Rodar localmente com Docker

E para testar localmente, primeiro clone o projeto a partir desse repositório:
```bash
  https://github.com/Isabel-Dias/projeto17-shortly
```

Vá para a pasta do projeto.

Na pasta do projeto, abra o terminal e digite o seguinte comando:


```bash
  npm install
```

E para rodar o projeto localmente e testar as funcionalidades, crie e configure o documento .env na pasta src. 

Para configurar o .env, siga o exemplo dado no .env.example e crie um database postgres se utilizando das configurações do dump.sql.

Para configurar o [Docker](https://www.docker.com/), rode o seguinte comando pra criar a imagem docker:

```bash
  docker build -t shortly-app .
```
E então rode o container docker com o seguinte comando:

```bash
  docker run -p 5000:5000 -d shortly-app
```

Por fim, digite o seguinte comando no terminal:

```bash
  npm run dev
```

    
## Deployment

Deploy feito através do [Render](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjsiZODiJeEAxW_p5UCHRQ4AUsQFnoECBEQAQ&url=https%3A%2F%2Frender.com%2F&usg=AOvVaw3kFSb080wcDQvO4YkWaPI9&opi=89978449) com variáveis de ambiente configuradas de acordo com o .env.example. Para acessar, siga esse [link](https://shortly-api-0sf6.onrender.com).
