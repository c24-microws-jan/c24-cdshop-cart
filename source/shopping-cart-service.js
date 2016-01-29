'use strict';

const nodeUuid = require('node-uuid');
const resilient = require('resilient');
const consul = require('resilient-consul');


const client = resilient();
client.use(consul({ 
  service: 'couchdb-cart',
  servers: [
    'http://46.101.245.190:8500'
  ],
  onlyHealthy: true, 
  mapServers: function (list) {
    return list.map(function (svc) { return 'http://' + svc.Service.Address + ':' + svc.Service.Port; });
  }
}));

const handleResponse = function(resolve, reject, getData) {
    return function (err, res) {
        if (err !== null) {
            reject(err);
        } else if (res.data.error) {
            console.log(res.data);
            reject(res.data.error);
        } else {
            if (!getData) {
                resolve(res.data);  
            } else {
                let json;
                if (typeof res.data === 'string') {
                    json = JSON.parse(res.data);    
                } else {
                    json = res.data;
                }
                
                const data = getData(json);
                resolve(data);
            }                
        }
    };
};

function createShoppingCart() {
    return new Promise((resolve, reject) => {
        const shoppingCart = {
            createdOn: new Date().toUTCString(),
            products: [],
            closedOn: null
        };
       
        const shoppingCartId = nodeUuid.v4().replace(/-/g, '');
        client.put(
            `/c24-cdshop-cart/${shoppingCartId}`, 
            { data: shoppingCart }, 
            handleResponse(resolve, reject, 
            (jsonObject) => {
                return jsonObject.id;
            })); 
    });
}

function getShoppingCart(shoppingCartId, returnOriginal) {
    return new Promise((resolve, reject) => {
        client.get(`/c24-cdshop-cart/${shoppingCartId}`, handleResponse(resolve, reject, (jsonObject) => {
            if (returnOriginal) {
                return jsonObject;
            }
            
            return {
                createdOn: jsonObject.createdOn,
                products: jsonObject.products,
                closedOn: jsonObject.closedOn
            };
        }))
    });
}

function closeShoppingCart(shoppingCartId) {
    return getShoppingCart(shoppingCartId, true)
        .then((shoppingCart) => {
            return new Promise((resolve, reject) => {
                shoppingCart.closedOn = new Date().toUTCString();
            
                client.put(`/c24-cdshop-cart/${shoppingCart._id}`, { data: shoppingCart }, handleResponse(resolve, reject)); 
            });
        });
}

module.exports = {
    createShoppingCart,
    getShoppingCart,
    closeShoppingCart
};