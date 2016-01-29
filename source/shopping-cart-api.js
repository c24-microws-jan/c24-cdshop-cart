const service = require('./shopping-cart-service');

module.exports = {
    registerEndpoints: function (app) {
        app.put('/shoppingcarts', function (req, res) {
            //console.log(req);
            service.createShoppingCart()
                .then((id) => {
                    console.log(req.method + ' ' + req.route.path);
                    res.status(201).json(id);
                })
                .catch(error => {
                    console.log('ERROR: ' + req.method + ' ' + req.route.path);
                    console.log(error);
                    res.status(400).end();
                });
        });

        // app.post('/shoppingcarts/:id/products', function (req, res) {
        //     service.addProduct(req.params.id, req.body); 
        // });
    }    
};