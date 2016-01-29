const service = require('./shopping-cart-service');

module.exports = {
    registerEndpoints: function (app) {
        app.put('/shoppingcarts', function (req, res) {
            console.log(req.method + ' ' + req.route.path);
            service.createShoppingCart()
                .then((id) => {
                    res.status(201).send(id);
                })
                .catch(error => {
                    console.log('ERROR: ' + req.method + ' ' + req.route.path);
                    console.log(error);
                    res.status(400).end();
                });
        });
        
        app.get('/shoppingcarts/:id', function (req, res) {
            console.log(req.method + ' ' + req.route.path);
            service.getShoppingCart(req.params.id)
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch(error => {
                    console.log('ERROR: ' + req.method + ' ' + req.route.path);
                    console.log(error);
                    res.status(400).end();
                });
        });
        
        app.delete('/shoppingcarts/:id', function (req, res) {
            console.log(req.method + ' ' + req.route.path);
            service.closeShoppingCart(req.params.id)
                .then(() => {
                    res.status(200).end();
                })
                .catch(error => {
                    console.log('ERROR: ' + req.method + ' ' + req.route.path);
                    console.log(error);
                    res.status(400).end();
                });
        });
        
        app.post('/shoppingcarts/:id/products/:productId', function (req, res) {
            console.log(req.method + ' ' + req.route.path);
            service.addProductToShoppingCart(req.params.id, req.params.productId)
                .then(() => {
                    res.status(200).end();
                })
                .catch(error => {
                    console.log('ERROR: ' + req.method + ' ' + req.route.path);
                    console.log(error);
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.status(400).end();
                    }
                });
        });
    }    
};