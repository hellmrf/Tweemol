[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/hellmrf/Tweemol">
    <img src="icon.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Tweemol</h3>

  <p align="center">
    Robô que publica, todos os dias, uma molécula no Twitter contendo as informações extraídas da Wikipédia, um link e a imagem.
    <br />
    <a href="https://twitter.com/tweemol" target="_blank">Acessar »</a>
    ·
    <a href="https://github.com/hellmrf/Tweemol/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/hellmrf/Tweemol/issues">Fazer sugestão</a>
  </p>
</p>



<!-- ÍNDICE -->
## Índice

* [Sobre o Projeto](#sobre-o-projeto)
  * [Motivação](#motivação)
  * [Feito com](#feito-com)
* [Começando](#começando)
  * [Pré-requisitos](#pré-requisitos)
  * [Configurando o ambiente](#configurando-o-ambiente)
* [Uso](#uso)
* [Contribuindo](#contribuindo)
* [Licença](#licença)
* [Contato](#contato)


<!-- SOBRE O PROJETO -->
## Sobre o Projeto

Tweemol é um robô desenvolvido por [Héliton Martins](https://github.com/hellmrf/) em Node.js que, todos os dias, escolhe uma molécula de interesse farmacológico e publica um Tweet com sua estrutura, informações e link para a Wikipédia. Isso é feito através de uma busca na Wikipédia seguida do resumo do texto. A imagem é obtida da Wikipédia ou Google Images, nesta ordem de prioridade. O robô, então, de posse de um texto de tamanho adequado para o Twitter e de uma imagem também adequada, publica esse conjunto de informações em [@Tweemol](https://twitter.com/tweemol) no Twitter.

### Motivação
Este projeto teve como principal objetivo o meu estudo pesosal do ambiente Node.js e utilização de APIs. Sou programador auto-didata e apaixonado pela programação. Assim, acredito que a melhor forma de estar sempre "em forma", isto é, alinhado com as novidades do mundo tecnológico, é desenvolvendo projetos pessoais que traduzam bem o instinto programador: resolver todos os problemas possíveis através de automação.

Antes de desenvolver este projeto, recebi grande influência do projeto *open-source* do youtuber [Filipe Deschamps](https://www.youtube.com/watch?v=kjhu1LEmRpY) e também do [@bot_RU_UFMG](https://github.com/vitor-mafra/bot_bandejao_UFMG), robô desenvolvido por [Vitor Mafra](https://github.com/vitor-mafra/) e que publica no Twitter o cardápio diário do Restaurante Universitário (bandejão) da UFMG, universidade na qual também estudo.

### Feito com
Este projeto foi desenvolvido com:

**Linguagem/Tecnologia**:
* [Node.js](https://nodejs.org/)

**Dependências**:
* [Axios](https://www.npmjs.com/package/axios) · requisições GET
* [Node-fetch](https://www.npmjs.com/package/node-fetch) · requisições POST
* [Sentence-Boundary-Detection (SBD)](https://www.npmjs.com/package/sbd) · detecção de frases
* [Sharp](https://www.npmjs.com/package/sharp) · conversão de imagens
* [Twit](https://www.npmjs.com/package/twit) · implementação em Node.js da API do Twitter
* [Twitter-Text](https://www.npmjs.com/package/twitter-text) · contagem precisa de caracteres

**APIs**:
* [Algorithmia](https://algorithmia.com/)
  * [nlp/Summarizer](https://algorithmia.com/algorithms/nlp/Summarizer) · resumo de textos
* [Google Custom Search API](https://developers.google.com/custom-search/v1/overview) · busca de imagens
* [Twitter Standard API](https://developer.twitter.com/) · publicação de Tweets

**Serviços**
* [Heroku](https://heroku.com/) · hospedagem e execução programada

<!-- COMEÇANDO -->
## Começando

Para reutilizar o projeto, seja para contribuir enviando um Pull-Request, ou para usar em seu projeto pessoal, veja a seguir o que será necessário.

### Pré-Requisitos

Você precisará ter pré-instalado:

* [Node.js](https://nodejs.org/) (> 10.16.3*)
* [npm](https://www.npmjs.com/) (> 6.14.5*)
* [Git](https://git-scm.com/)

<small>* Versões inferiores não testadas.</small>
### Configurando o ambiente
1. Clone o repositório utilizando `git clone`.

```sh
git clone git@github.com:hellmrf/Tweemol.git
```

2. Instale as dependências.

```sh
cd Tweemol
npm install
```

3. Consiga uma conta de desenvolvedor do Twitter.
ㅤ
Para evitar a utilização inadequada das APIs, o Twitter fará uma verificação das suas inteções antes de aprovar sua conta. Isso pode demorar algumas horas. Acesse o [Twitter Developer](https://developer.twitter.com/) ou [clique aqui](https://developer.twitter.com/en/apply-for-access) para aplicar para o acesso. Detalhe o máximo possível suas intenções.
Com a conta de desenvolvedor criada, [crie um app](https://developer.twitter.com/en/apps).
ㅤ

4. O projeto está quase completamente configurado, exceto pelas chaves de API que serão necessárias e que deverão estar corretamente configuradas dentro de [`/credentials/`](https://github.com/hellmrf/Tweemol/tree/master/credentials). Para ver as instruções detalhadas para consegui-las, acesse [este](https://github.com/hellmrf/Tweemol/blob/master/credentials/README.md) arquivo.


<!-- Uso -->
## Uso

Após tudo devidamente configurado, basta executar o arquivo de entrada do projeto.
```sh
node index.js
```


<!-- CONTRIBUINDO -->
## Contribuindo

Contribuições são o que tornam a comunidade *open-source* um ambiente incrível para aprender, se inspirar e criar. *Qualquer* contribuição que você fizer será **enormemente apreciada**.

1. Crie um fork do Projeto
2. Crie uma nova branch (`git checkout -b feature/recursoIncrivel`)
3. Faça o commit das suas alterações (`git add .` e `git commit -m 'Adicionando este incrível recurso.'`)
4. Envie para o seu Github (`git push origin feature/recursoIncrivel`)
5. Abra um Pull Request detalhando ao máximo o que você implementou, os problemas que ainda precisam ser resolvidos e o que mais julgar necessário.
6. Pronto! Você está contribuindo com o mundo *open-source*.


<!-- LICENÇA -->
## Licença

Distribuido sob Licensa MIT. Veja [`LICENSE`](./LICENSE.txt) para mais informações.


<!-- CONTACT -->
## Contato

Heliton Martins - [@hellmrf](https://twitter.com/hellmrf) - helitonmrf@gmail.com

Link do projeto: [https://github.com/hellmrf/Tweemol/](https://github.com/hellmrf/Tweemol/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/hellmrf/Tweemol.svg?style=flat-square
[contributors-url]: https://github.com/hellmrf/Tweemol/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hellmrf/Tweemol.svg?style=flat-square
[forks-url]: https://github.com/hellmrf/Tweemol/network/members
[stars-shield]: https://img.shields.io/github/stars/hellmrf/Tweemol.svg?style=flat-square
[stars-url]: https://github.com/hellmrf/Tweemol/stargazers
[issues-shield]: https://img.shields.io/github/issues/hellmrf/Tweemol.svg?style=flat-square
[issues-url]: https://github.com/hellmrf/Tweemol/issues
[license-shield]: https://img.shields.io/github/license/hellmrf/Tweemol.svg?style=flat-square
[license-url]: https://github.com/hellmrf/Tweemol/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/helitonmrf