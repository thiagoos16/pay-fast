module.exports = function(app){
    app.get('/payments', function(req, res){
        console.log('Recebida requisicao de teste na porta 3000.')
        res.send('OK.');
    });

    app.post("/payments/payment", function(req, res) {
        var payment = req.body;
        console.log("processing payment");
        
        var connection = app.persistency.connectionFactory();
        var paymentDao = new app.persistency.paymentDao(connection); //Para as threads não conflitarem e executarem ao mesmo tempo
        
        payment.status = "CRIADO";
        payment.data = new Date;

        req.assert('payment_way', 'Payment way is required!').notEmpty();
        req.assert('value', 'Value is required!').notEmpty();
        req.assert('coin', 'Coin is required!').notEmpty();
        req.assert('description', 'Description is required!').notEmpty();

        errors = req.validationErrors();

        if (errors) {
            res.status(400).send(errors);
            return;
        }

        paymentDao.save(payment, function(error, result) {
            if (error) {
                res.send(error);
            } else {
                res.location('/payments/payments/' + result.insertId);

                console.log('payment created: ' + result);
                res.status(201).json(payment);
            }
        });
    });
  }