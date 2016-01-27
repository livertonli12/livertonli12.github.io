---
author: liverton
comments: true
layout: article
title: Primeiras consultas com mongoDB
tags: [Consultas, MongoDB, Robomongo]
category: [MongoDB]
image:
  teaser: "media/compressed/thumbs/2015-07-21-450x250.jpg"
  feature: "media/compressed/posts/thumbs/2015-07-21.jpg"
---

Hoje veremos como efetuar consultas com o MongoDB. Para isto, utilizaremos a database Northwind importada no artigo anterior onde aprendemos [como importar documentos para o MongoDB]({{ site.baseurl | replace: '//', '/' }}/mongodb/como-importar-documentos-para-o-mongodb).

Para facilitar o entendimento de todas as operações executadas, utilizaremos uma ferramenta open source de gerenciamento chamada [Robomongo](http://robomongo.org/), disponível para download nas plataformas Windows, Linux e Mac e constantemente atualizada pela comunidade.

## **Vamos começar ?**

Com o Robomongo instalado, precisaremos configurar a nossa conexão local, neste ponto, seria interessante ter o [MongoDB como um serviço do Windows]({{ site.baseurl | replace: '//', '/'}}/mongodb/criando-um-servico-windows-para-o-mongodb/), ou, iniciá-lo em uma janela do prompt de comando através do comando mongod.

Para configurar a conexão local, clicamos no botão de conexões do Robomongo:

<img src="{{ '/media/compressed/posts/2015-07-21/1.png' | prepend: site.baseurl }}" alt="">

para visualizarmos a seguinte caixa:

<img src="{{ '/media/compressed/posts/2015-07-21/2.png' | prepend: site.baseurl }}" alt="">

Assim, o primeiro passo será criar uma nova conexão, clicando no menu create demonstrado no primeiro item e informar os parâmetros necessários na janela que se abre, sendo eles: nome da conexão, endereço, e porta, representado pelos item dois. Caso a instalação seja padrão, não precisaremos alterar mais nada, basta **testar e salvar** conforme podemos ver nos itens três e quatro respectivamente.

Com a conexão estabelecida, temos a seguinte visualização na interface do Robomongo:

<img src="{{ '/media/compressed/posts/2015-07-21/3.png' | prepend: site.baseurl }}" alt="">

Para entendermos melhor, descrevo abaixo o que significa cada um dos itens;

- 1: Este primeiro item, exibe a database que configuramos para o localhost. Se houverem mais databases configuradas, poderemos visualizá-las em sequência.
- 2: Expandindo a database, podemos visualizar nossas collections, que por [definição](http://docs.mongodb.org/manual/reference/glossary/), são um grupo de documentos do MongoDB.
- 3: Ao expandir cada collection, podemos visualizar seus índices.
- 4: Este quarto item, representa o shell do MongoDB, espaço onde executaremos nossas queries.
- 5: Em seguida, temos o espaço onde são retornadas as informações de cada query executada.
- 6: Todos os logs são registrados neste último item.

Agora que já conhecemos a interface do Robomongo, podemos nos aventurar nas queries. Vamos aproveitar a collection **customers** para entender como utilizar o método **find**.

Tanto este, como outros métodos, possuem variações importantes que podem alterar a forma como são retornados os resultados. Para retornar todos os dados de uma collection utilizamos o método sem nenhuma condição entre chaves:

{% highlight JavaScript %}
db.customers.find({})
{% endhighlight %}

Notem que, primeiramente precisamos informar a collection à qual estamos executando a query, seguido do método. Quando nenhuma condição é informada, o MongoDB nos retorna todos os documentos contidos na collection.

Para filtrar documentos específicos, podemos inserir condições entre as chaves. Supondo que queremos saber todos os **clients** cujo país é o Canadá, executamos o find da seguinte forma:

{% highlight JavaScript %}
db.customers.find({"Country": "Canada"})
{% endhighlight %}

É importante registrar que, o MongoDB faz diferenciação entre os tipos de itens, por este motivo, tivemos de informar tanto **Country** como **Canada** com aspas duplas, pois estamos utilizando como chave da busca, uma string.

Podemos refinar nossa busca, informando condições adicionais a query. Assim, para obter os clientes cujo país é o Canada e a cidade é Vancouver, podemos executar a seguinte consulta:

{% highlight JavaScript %}
db.customers.find({"Country": "Canada", "City":"Vancouver"})
{% endhighlight %}

Ainda dentro das chaves, separei minha primeira condição com uma virgula e informei o **“City”:”Vancouver”** como segundo parâmetro de busca.

Também é possível filtrar as informações à serem exibidas de cada documento encontrado, esta operação é chamada de **projection**. Para isto, após o fechamento da primeira chave, podemos iniciar um novo par de chaves informando com **true** ou **false** as propriedades que desejamos exibir:

{% highlight JavaScript %}
db.customers.find(
    {"Country": "Canada", "City":"Vancouver"},
    {"_id": false, "ContactName": true, "ContactTitle": true}
)
{% endhighlight %}

O **“_id”** é o único registro exibido quando não o colocamos como **false**. Notem que, embora o documento tenha inúmeras outras informações, restringimos a exibição para **ContactName** e **ContactTitle**. O resultado pode ser visto na imagem abaixo:

<img src="{{ /media/compressed/posts/2015-07-21/3.png' | prepend: site.baseurl }}" alt="">

No próximo artigo, veremos mais possibilidades de consulta utilizando o MongoDB.

Até a próxima :)

## **Referências:**

Site oficial do Robomongo: http://robomongo.org/

Documentação do método find: http://docs.mongodb.org/manual/reference/method/db.collection.find/
