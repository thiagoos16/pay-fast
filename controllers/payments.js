module.exports = function(app){
    app.get('/payments', function(req, res){
      console.log('Recebida requisicao de teste na porta 3000.')
      res.send('OK.');
    });

    app.post("/payments/payment", function(req, res) {
        var payment = req.body;
        console.log(payment);
        res.send('ok');
    });
  }