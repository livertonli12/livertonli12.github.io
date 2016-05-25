---
author: liverton
comments: true
layout: article
title: Como Importar Documentos para o MongoDB
tags: [MongoDB]
image:
  teaser: "media/compressed/posts/thumbs/2015-07-12.png"
---

Hoje veremos como é simples importar documentos para o MongoDB. Para isto, encontrei neste [GitHub](https://github.com/tmcnab/northwind-mongo), um conjunto de arquivos com dados extraídos do famoso database Northwind da Microsoft.

Por tratar-se de uma quantidade razoável de arquivos, alguns de vocês irão optar por criar um laço de repetição no **prompt de comando** para importar cada arquivo, enquanto que, outros irão importá-los individualmente por não dominar ainda o prompt.

O que gostaria de registrar neste artigo, é o comando **mongoimport**, que utilizaremos em qualquer um dos métodos escolhidos.

A imagem abaixo nos ajudará a entender algumas opções para esta importação.

<img src="{{ '/media/compressed/posts/2015-07-12/1.png' | prepend: site.baseurl }}" alt="">

Os tópicos abaixo, definem o que significa cada um dos items utilizado neste mongoimport:

- **/host**: endereço para qual importaremos os dados. Este atributo permite também, informar a porta e caso exista, a réplica;
- **/db**: através deste atributo específico que meus documentos serão importados para o database Northwind;
- **/file**: neste cenário eu já estava com o prompt no mesmo nível dos meus arquivos, então especificamos apenas o nome do arquivo;
- **/type**: como podemos importar arquivos com as seguintes extensões: .json (padrão), .csv e .tsv, tivemos de especificar a extensão;
- **/c**: este atributo indica à qual collection serão importados os dados;
- **/headerline**: este último foi necessário devido à cada arquivo ter uma linha inicial como cabeçalho. Caso removidas, podemos optar por não informá-lo.

Caso a importação ocorra com sucesso, teremos como mensagem final, a quantidade de documentos importados. É importante lembrar que, existem inúmeros outros atributos disponíveis para uma importação que podem ser conferidos [aqui](http://docs.mongodb.org/manual/reference/program/mongoimport/).

Espero que as próximas importações tornem-se mais fáceis à todos.

#### **Referências:**

https://github.com/tmcnab/northwind-mongo

http://docs.mongodb.org/manual/reference/program/mongoimport/
