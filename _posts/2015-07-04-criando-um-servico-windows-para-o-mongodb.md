---
author: liverton
comments: true
layout: article
title: Criando um Serviço Windows para o MongoDB
tags: [MongoDB, Serviço, Windows]
category: [MongoDB]
image:
  teaser: "media/compressed/thumbs/2015-07-04-450x250.png"
  feature: "media/compressed/posts/thumbs/2015-07-04.png"
  opengraph: "media/compressed/opengraph/2015-07-04-470x246.png"
---

Podemos economizar bastante tempo ao rodar o MongoDB localmente, se tivermos um serviço do Windows dedicado exclusivamente à ele. Neste post, veremos como criar este serviço de forma simples.

O primeiro passo é, executar o **prompt de comando** como **administrador** e dentro da pasta data, criar dois novos diretórios como na imagem abaixo.

<img src="{{ '/media/compressed/posts/2015-07-04/1.png' | prepend: site.baseurl }}" alt="">

Em seguida, precisamos criar um arquivo de configuração. Para isto, basta executarmos os comandos listados na figura abaixo.

<img src="{{ '/media/compressed/posts/2015-07-04/2.png' | prepend: site.baseurl }}" alt="">

Por fim, criaremos um serviço chamado **“MongoDB”** executando os comandos da figura abaixo. Se não houver nenhum erro, veremos a seguinte mensagem **“[SC] CreateService ÊXITO”**.

<img src="{{ '/media/compressed/posts/2015-07-04/3.png' | prepend: site.baseurl }}" alt="">

Para finalizar, apresento algumas opções de utilização que devem ser executadas no **prompt de comando**:

Iniciar o serviço: **net start MongoDB**
Parar o serviço: **net stop MongoDB**
Remover o serviço: **sc.exe delete MongoDB**
Obrigado e até a próxima.

## **Referência:**

http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
