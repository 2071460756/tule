/**
 * Created by wang on 2017/5/6.
 */
var express = require('express');
var router = express.Router();
var orderDao = require('./../dao/orderDao')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getRealUser', function(req, res, next) {
    orderDao.getRealUser(req.query.uId,function (result) {
        res.json(result[0]);
    })
});
router.get('/insertOrder', function(req, res, next) {
    var order=JSON.parse(req.query.data);
    console.log(order);
    orderDao.insertOrder(order,function (result) {
        res.json(result.affectedRows);
    })
});
router.get('/getCarInfo', function(req, res, next) {
    var eachCarId=JSON.parse(req.query.eachCarId);
    orderDao.getCarInfo(eachCarId,function (result) {
        res.json(result);
    })
});
router.get('/getStoreId', function(req, res, next) {
    console.log('here')
    var name=req.query.name;
    console.log(name);
    orderDao.getStoreId(name,function (result) {
        res.json(result);
    })
});
module.exports = router;