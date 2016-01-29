const service = require('./shopping-cart-service');

module.exports = {
    registerEndpoints: function (app) {
        app.put('/shoppingcarts', function (req, res) {
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
        
        app.get('/shoppingcarts/:id', function (req, res) {
            service.getShoppingCart(req.params.id)
                .then((data) => {
                    console.log(req.method + ' ' + req.route.path);
                    res.status(201).json(data);
                })
                .catch(error => {
                    console.log('ERROR: ' + req.method + ' ' + req.route.path);
                    console.log(error);
                    res.status(400).end();
                });
        });
    }    
};