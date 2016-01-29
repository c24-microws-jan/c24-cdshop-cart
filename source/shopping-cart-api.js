const service = require('./shopping-cart-service');

module.exports = {
    registerEndpoints: function (app) {
        app.put('/shoppingcarts', function (req, res) {
            service.createShoppingCart()
                .then((id) => {
                    res.status(201).json(id);
                })
                .catch(() => {
                    res.status(400);
                });
        });

        // app.post('/shoppingcarts/:id/products', function (req, res) {
        //     service.addProduct(req.params.id, req.body); 
        // });
    }    
};