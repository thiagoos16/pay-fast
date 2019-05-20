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

        paymentDao.save(payment, function(exception, result) {
            console.log('payment created: ' + result);
            res.json(payment);
        });
    });
  }