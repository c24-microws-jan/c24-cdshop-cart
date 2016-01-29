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
            const result = JSON.parse(res.data);
            if (!getData) {
                resolve(result);  
            } else {
                resolve(getData(result));
            }                
        }
    };
};

function createShoppingCart() {
    return new Promise((resolve, reject) => {
        const shoppingCart = {
            createdOn: new Date().toUTCString(),
            products: []
        };
       
        const shoppingCartId = nodeUuid.v4().replace(/-/g, '');
        client.put(`/c24-cdshop-cart/${shoppingCartId}`, { data: shoppingCart }, handleResponse(resolve, reject)); 
    });
}

function getShoppingCart(shoppingCartId) {
    return new Promise((resolve, reject) => {
        client.get(`/c24-cdshop-cart/${shoppingCartId}`, handleResponse(resolve, reject, (obj) => {
            return {
                createdOn: obj.createdOn,
                products: obj.products
            };
        }))
    });
}

module.exports = {
    createShoppingCart,
    getShoppingCart
};