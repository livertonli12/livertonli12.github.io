---
author: liverton
comments: true
layout: article
title: Seletores de Query e Operadores Lógicos com MongoDB
tags: [MongoDB]
image:
  teaser: "media/compressed/posts/thumbs/2015-08-01.png"
---

Continuaremos a série de artigos sobre mongoDB com a exploração de seletores de query e operadores lógicos. Para isto, utilizaremos [estes dados][dados-import] que encontrei no Github, que podem ser importados utilizando o comando **mongoimport**. Você pode relembrar como utilizá-lo no link onde explico [como importar documentos utilizando o MongoDB][link-post-importar-documentos].

Com os documentos importados, quero demonstrar um tipo de query chamado **“dot notation”**,  extremamente útil no dia a dia, que nada mais é do que, uma busca por itens dentro de um array:

{% highlight javascript %}
db.Restaurants.find({"grades.grade":"A"})
{% endhighlight %}

Neste caso, cada restaurante, possui um array de notas e eu estou buscando todos os restaurantes que tenham ao menos uma nota **“A”**, simples, não ?

E se quiséssemos encontrar restaurantes que tenham nota maior que 5, ou menor que 20 ? Podemos utilizar os seletores de query, sendo algumas possibilidades:

- **EQ – (Equal)**: Este seletor, fará com que a busca retorne resultados com ao menos um item equivalente ao que está sendo filtrado. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"grades.score" : {$eq: 5}});
{% endhighlight %}

- **GT (Greather Than)**: Este seletor, retornará documentos que contenham registros maiores do que o valor filtrado. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"grades.score" : {$eq: 5}});
{% endhighlight %}

- **GTE (Greater Than Equal)**: Semelhante ao GT, porém, inclui o próprio valor de busca como possibilidade de retorno. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"grades.score" : {$gte: 20}});
{% endhighlight %}

- **LT (Less Than)**: Existe também, a possibilidade de precisarmos de itens que estejam abaixo de determinada condição. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"grades.score" : {$lt: 3}});
{% endhighlight %}

- **LTE (Less Than Equal)**: Semelhante ao LT, podemos também retornar itens que estejam abaixo de uma determinada condição mas que também incluam o próprio valor de busca informado. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"grades.score" : {$lte: 2}});
{% endhighlight %}

- **NE (Not Equal)**: Diferente dos anteriores, faz com que tenhamos no resultado de uma busca, apenas documentos que não tenham o parâmetro informado. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"cuisine" : {$ne: "Hamburgers"}});
{% endhighlight %}

Conseguiram perceber a semelhança na construção da query destas quatro possibilidades  ? O seletor de query está sempre envolvido por chaves. Entretanto, existem seletores que não seguem este padrão de formatação:

- **IN (In)**: Este, restringe os resultados da busca aos valores informados dentro de um array. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"cuisine": {$in:["Hamburgers", "Irish"]}});
{% endhighlight %}

- **NIN (Not In)**: Contrário ao In, utilizamos este seletor quando desejamos que no resultado não contenham documentos com os itens informados no array. Exemplo:

{% highlight javascript %}
db.Restaurants.find({"cuisine": {$nin: ["Other","Chicken"]}});
{% endhighlight %}

Embora estes dois seletores estejam envolvidos por chaves, é necessário informarmos um array de dados.

Além de seletores de query, podemos refinar nossas buscas, utilizando operadores lógicos:

- **AND**: Retorna itens que contenham um parâmetro de busca E outro E outro E outro E outro ..

{% highlight javascript %}
db.Restaurants.find({
	$and: [
    	{"grades.grade": "A"},
        {"grades.grade": "B"},
    ]
});
{% endhighlight %}

- **OR**: Retorna itens que contenham um parâmetro de busca OU outro Ou outro Ou Outro ..

{% highlight javascript %}
db.Restaurants.find({
	$or: [
    	{"cuisine": "Irish"},
        {"borough": "Brooklyn"},
    ]
});
{% endhighlight %}

- **NOT**: Retorna itens que não contenham o parâmetro informado.

{% highlight javascript %}
db.Restaurants.find({
	"grades.grade":{ $not: {$lte: 10}}
});
{% endhighlight %}

- **NOR**: Retorna itens que não contenham um parâmetro de busca NEM outro NEM outro ..

{% highlight javascript %}
db.Restaurants.find({
	$nor: [
    	{"borough": "Manhattan"},
        {"borough": "Bronx"},
    ]
});
{% endhighlight %}

Nosso próximo artigo será o último dessa série de buscas mais simples com o MongoDB.

Até a próxima.

#### **Referências:**

Dados para collection Restaurants: https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/dataset.json

[dados-import]: https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/dataset.json

[link-post-importar-documentos]: /mongodb/como-importar-documentos-para-o-mongodb/
