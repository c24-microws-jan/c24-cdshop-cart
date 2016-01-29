# c24-cdshop-cart

[![Build Status](https://travis-ci.org/c24-microws-jan/c24-cdshop-cart.svg)](https://travis-ci.org/c24-microws-jan/c24-cdshop-cart)
[![Dependencies](https://david-dm.org/c24-microws-jan/c24-cdshop-cart.svg)](https://david-dm.org/badges/shields)


### Create a shopping cart
#### Request
~~~
PUT /shoppingcarts
~~~
#### Response
Shopping cart id
~~~
201
110ec58aa0f24ac48393c866d813b8d1
~~~


### Get a shopping cart
#### Request
~~~
GET /shoppingcarts/<id>/
~~~
#### Response
~~~
200
{
    createdOn: 'Fri, 29 Jan 2016 13:23:15 GMT',
    products: [],
    closedOn: null
}
~~~


### Close shopping cart
#### Request
~~~
DELETE /shoppingcarts/<id>
~~~
#### Response
~~~
200
~~~


### Add product to shopping cart
#### Request
~~~
POST /shoppingcarts/<id>/products/<productId>
~~~


### Delete one product from shopping cart
~~~
DELETE /shoppingcarts/<id>/products/<productId>
~~~



## Run it on your local node.js installation

* Run `npm install` inside the root folder to restore all packages
* Run the service with `node index.js` (or `npm start`)
* Browse to [http://localhost:3000/](http://localhost:3000/) to see the output

## Build the Docker container

~~~ sh
docker build -t c24-cdshop-cart .
~~~

## Run the Docker container locally

~~~ sh
docker run -it -p 3000:3000 c24-cdshop-cart
~~~

## Push the Docker container into the private registry

~~~ sh
docker tag c24-cdshop-cart 46.101.193.82:5000/c24-cdshop-cart:1.0.0
docker push 46.101.193.82:5000/c24-cdshop-cart:1.0.0
~~~

