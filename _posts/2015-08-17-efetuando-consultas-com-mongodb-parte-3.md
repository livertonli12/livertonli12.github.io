---
author: liverton
comments: true
layout: article
title: Ordenando e limitando documentos com mongoDB
tags: [Consultas, MongoDB]
image:
  teaser: "media/compressed/thumbs/2015-08-17-450x250.png"
  feature: "media/compressed/posts/thumbs/2015-08-17.png"
  opengraph: "media/compressed/opengraph/2015-08-17-600x600.png"
---

Neste artigo, utilizaremos os métodos de Sort e Limit do MongoDB.

## **Relembrando** **…**

[Anteriormente][link-post-primeiro-artigo], tivemos a oportunidade de entender como efetuar consultas utilizando o comando **find** para retornar informações de uma série de documentos e vimos também, o conceito de **projection** onde podemos limitar as informações à serem exibidas de cada documento resultante da busca.

Em seguida, no [segundo artigo][link-post-segundo-artigo], exploramos mais possibilidades de consulta vendo, queries com **dot notation, seletores de query e operadores lógicos**. O mais importante é que esta base nos possibilita utilizar os comandos aprendidos na construção de quaisquer outros comandos do MongoDB.

## **Mais possibilidades**

Ainda utilizando a database do artigo anterior, imaginemos que fosse necessário encontrar todos os restaurantes de cozinha irlandesa, organizados por vila, como faríamos ?

Para responder a esta pergunta, precisamos primeiro, conhecer o comando **sort**, responsável por especificar a ordem de retorno dos documentos. Agora, fica mais simples construirmos uma query como a seguinte:

{% highlight javascript %}
db.Restaurants.find({"cuisine":"Irish"}).sort({"borough":1});
{% endhighlight %}

Vale lembrar que o sort também aceita comandos já vistos anteriormente, por exemplo, **dot notation**, caso quiséssemos retornar documentos organizados por um item de array.

Outro ponto interessante é que, podemos organizar os documentos de forma crescente e decrescente especificando como parâmetro **1 e -1** respectivamente. Além disso, também é possível combinar mais de um parâmetro para a ordenação, separando por vírgula os adicionais.

Para limitar a quantidade de documentos retornados, podemos utilizar o comando limit que funciona muito bem tanto com o find, quanto o sort, basta especificar a quantidade de documentos a serem retornados da seguinte forma:

{% highlight javascript %}
db.Restaurants.find({"cuisine":"Irish"}).sort({"borough":-1}).limit(5);

db.Restaurants.find({"cuisine":"Irish"}).limit(5);
{% endhighlight %}

Para finalizar, só não façam queries com limit(1) né ?  Para isto, podemos usar o findOne para restringir a busca à um único documento e aplicar filtros semelhantes ao que já aprendemos anteriormente:

{% highlight javascript %}
db.Restaurants.findOne({"cuisine":"Irish"});
{% endhighlight %}

Neste caso, restringimos a busca à um único documento cuja cozinha seja irlandesa.
O próximo passo é treinar bastante todos os comandos aprendidos e esperar pelos próximos artigos :)

Até a próxima.

## **Referências:**

Documentação do comando **sort**: http://docs.mongodb.org/v2.6/reference/method/cursor.sort/

Documentação do comando **limit**: https://docs.mongodb.org/v3.0/reference/method/cursor.limit/

Documentação do comando **findOne**: http://docs.mongodb.org/master/reference/method/db.collection.findOne/

[link-post-primeiro-artigo]:/blog/efetuando-consultas-com-mongodb-parte-1/
[link-post-segundo-artigo]:/blog/efetuando-consultas-com-mongodb-parte-2/
