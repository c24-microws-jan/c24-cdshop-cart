const nodeUuid = require('node-uuid');
const resilient = require('resilient');
const consul = require('resilient-consul');


const client = resilient();
client.use(consul({ 
  service: 'couchdb-cart',
  servers: [
    'http://http://46.101.245.190:8500'
  ], 
  onlyHealthy: true, 
  mapServers: function (list) {
    return list.map(function (svc) { return svc.ServiceAddress + '/c24-cdshop-cart/' })
  }
}));

function createShoppingCart() {
    return new Promise((resolve, reject) => {
        const shoppingCart = {
            creationData: new Date().toUTCString(),
            products: []
        };
        
        const shoppingCartId = nodeUuid.v4();
        client.put(`/${shoppingCartId}`, shoppingCart, function (err, res) {
            if (err !== null) {
                reject(err);
            } else {
                console.log('Response:', res);
                resolve(res.data);                
            }
        }); 
    });
}

module.exports = {
    createShoppingCart
};