---
author: liverton
comments: true
layout: article
title: Índices em documentos no MongoDB
tags: [MongoDB]
image:
  teaser: "media/compressed/posts/thumbs/2016-09-11.jpg"
  social: "media/compressed/posts/social/2016-09-11.jpg"
---

A utilização de índices em documentos no MongoDB é uma prática que deve ser adotada com cautela, pois, ao mesmo tempo que permite a execução de queries mais performáticas, pode em alguns cenários, comprometer a escrita de documentos nas collections.

Quando optamos por não utilizar índices, nossas queries resultam em "Collection Scans", isto quer dizer que, todos os documentos de nossa collection serão analisados perante a querie informada. Entretanto, caso haja um índice que possa ser utilizado para a obtenção do resultado esperado, o MongoDB selecionará apenas os documentos cujos atributos respeitem a querie estabelecida, resultando assim, em uma quantidade menor de documentos à serem analisados.

#### **Criando Índices**

Por curiosidade, até a versão 3.0, a criação de índices era feita através do comando **ensureIndex** que tornou-se obsoleto e foi substituído pelo comando **createIndex**.

Exemplo:

{% highlight javascript %}
db.collection.createIndex(keys, options)
{% endhighlight javascript %}

Por padrão, durante a criação de qualquer collection, um índice com a propriedade **unique** no campo **_id** é criado para garantir que não seja possível adicionar documentos com o mesmo valor para este campo.


#### **Tipos de índices**

##### Single Field

Índices do tipo Single Field, como o próprio nome sugere, servem para indexar apenas um campo de nossos documentos. É importante saber que, para este tipo de índice, pouco importa a ordem na qual o documento será encontrado caso seja utilizado um filtro de **Sort**. Assim, podemos utilizá-lo da seguinte forma:

Exemplo:
{% highlight javascript %}
db.Alunos.createIndex({ matricula: 1 })
{% endhighlight javascript %}

##### Compound Index

Índices do tipo Compound, suportam a adição de multiplos campos para indexação. Neste tipo de índice, a ordem especificada impacta diretamente no resultado da consulta.

Exemplo:
{% highlight javascript %}
db.Alunos.createIndex({ periodo: 1, matricula: -1 })
{% endhighlight javascript %}

Para continuar adicionando índices, basta, separá-los por virgula e especificar a ordem. Contudo, vale lembrar que existe um limite relativo a quantidade de campos adicionados, que exploraremos em outro artigo.

##### Multikey Index

Este índice, funciona de forma semelhante aos índices compostos, porém, é dedicado a indexação de campos contidos em arrays.

Exemplo:
{% highlight javascript %}
db.Alunos.createIndex({ "mensalidades.valorpago": 1 })
{% endhighlight javascript %}

##### Geospatial Index

Otimizam queries relacionadas a localização bi-dimensional. Para este tipo de índice, temos duas opções de indexação: **2d Indexes** e **2dsphere Indexes**, sendo o primeiro, aplicado em queries de geometria plana e o segundo geometria esférica.

Exemplos:
{% highlight javascript %}
db.Enderecos.createIndex( { "localizacao" : "2d" } )
db.Enderecos.createIndex( { "localizacao" : "2dsphere" } )
{% endhighlight javascript %}

##### Text Index

Providenciam índices para buscas em textos, onde, estas são retornadas por ordem de relevância. Podem ser aplicados em regras de linguísticas específicas, case sensitive e etc

Exemplo:
{% highlight javascript %}
db.Websites.createIndex( { bodycontent: "text" } )
{% endhighlight javascript %}



Até a próxima.


#### **Referências:**

- [Índices no MongoDB](https://docs.mongodb.com/manual/indexes/)