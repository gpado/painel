# GoDigital Code Painel

<!--Tecnologias Utilizadas e suas versões-->

[![ReactJS Version][react-badge]][react-doc] [![MUI Version][mui-badge]][mui-doc] [![Node.js Version][node-badge]][node-doc] [![Yarn Version][yarn-badge]][yarn-doc]

> Status: :factory: Under development

## Indíce :bookmark_tabs:

:cd: [Descrição](#descrição-clipboard) 

:cd: [Funcionalidades](#funcionalidades-gear)    

:cd: [Back-end](#back-end-dvd) 

:cd: [Instalação](#instalação-floppy_disk)

:cd: [Contribuir](#contribuir-gift) 

## Descrição :clipboard:

<p style="text-align:justify">
GoDigital Code Painel é a parte frontend de um sistema de gestão empresarial para administração de uma corretora de seguros. O gestor pode manter os dados de todos os seus funcionários, clientes e contratos firmados com uma interface intuitiva com foco em usabilidade, contruída com ReactJS, e conectada a um serviço de Rest API proprietário.
</p>

*([Acessar repositório do back-end][back-end-repo])*

## Funcionalidades :gear:

- O gestor pode:
    - Autenticar suas credenciais para liberar acesso ao sistema
    - Manter os registros de funcionários
    - Manter os registros de contratos firmados
    - Manter os registros de clientes
<br>
- O sistema faz:
    - Requisições à rest API para controlar os dados do sistema
    - Redirecionamentos ao sistema protegido do keycloak para:
        - Autenticar o gestor
        - Atualizar Token de acesso
        - Encerrar sessão e acesso à aplicação

## Back-end :dvd:

*Você pode [acessar o repositório back-end do sistema][back-end-repo] para mais detalhes*

## Instalação :floppy_disk:

<!--Indique o passo a passo para se instalar o projeto, como também os pré-requisitos para isso-->

### Pré-requisitos

- [GoDigital Code API][back-end-repo]
- [Node][node-download]
- [NPM][node-download] ou [Yarn][yarn-download]

### Iniciando o projeto 
> Os comandos listados a seguir foram feitos pelo terminal do Windows

1. **Clone** o projeto no seu computador:

```
git clone https://github.com/gpado/painel.git
```

2. Siga toda a lista de passos para **[instalação do GoDigital Code API][back-end-repo]**
<br>

3. Acesse a pasta raiz do projeto e inicie o servidor com **NPM** ou **Yarn**:

```
npm run start
```
```
yarn start
```

## Contribuir :gift:

Se você tem alguma ideia, sugestão, ou viu algum erro, você pode [abrir uma issue][issues] e contar para gente.

<!---Links utilizados no documento-->

<!--Badges-->
[node-badge]: https://img.shields.io/badge/Node.js-18.16-green?style=for-the-badge&logo=node.js&logoColor=green


[react-badge]: https://img.shields.io/badge/React_JS-18.2-blue?style=for-the-badge&logo=react


[mui-badge]: https://img.shields.io/badge/MUI-5-purple?style=for-the-badge&logo=mui&logoColor=violet

[yarn-badge]: https://img.shields.io/badge/Yarn-3.5.1-orange?style=for-the-badge&logo=yarn&logoColor=orange


<!--Documentations-->
[yarn-doc]: https://classic.yarnpkg.com/en/docs

[react-doc]: https://react.dev/

[node-doc]: https://nodejs.org/en/docs

[mui-doc]: https://mui.com/

<!-- Downloads -->
[node-download]: https://nodejs.org/en/download

[yarn-download]: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

[back-end-repo]: https://github.com/shDupont/go-digital-api

[issues]: https://github.com/gpado/painel/issues