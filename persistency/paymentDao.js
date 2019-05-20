    function paymentDao(connection) {
        this._connection = connection;
    }

    paymentDao.prototype.save = function(payment,callback) {
        this._connection.query('INSERT INTO payments SET ?', payment, callback);
    }

    paymentDao.prototype.list = function(callback) {
        this._connection.query('select * from payments',callback);
    }

    paymentDao.prototype.findById = function (id,callback) {
        this._connection.query("select * from payments where id = ?",[id],callback);
    }

    module.exports = function(){
        return paymentDao;
    };