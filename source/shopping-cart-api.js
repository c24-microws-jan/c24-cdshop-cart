const service = require('./shopping-cart-service');

module.exports = {
    registerEndpoints: function (app) {
        app.put('/shoppingcarts', function (req, res) {
            service.createShoppingCart(req.params.id, req, res);
        });

        app.post('/shoppingcarts/:id/products', function (req, res) {
            service.addProduct(req.params.id, req.body); 
        });
    }    
};