var express = require('express');
var router = express.Router();
var showCarDao = require('./../dao/showCarDao')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/showCar', function(req, res, next) {
    showCarDao.getCarShowInfo(function (result) {
        // console.log(result);
        res.json(result);
    })
});
router.get('/getBrand', function(req, res, next) {
    showCarDao.getBrand(function (result) {
        res.json(result);
    })
});
router.get('/getCarType', function(req, res, next) {
    showCarDao.getCarType(function (result) {
        res.json(result);
    })
});
router.get('/getCarCity', function(req, res, next) {
    showCarDao.getCarCity(function (result) {
        res.json(result);
    })
});
router.get('/getCarStrom', function(req, res, next) {
    showCarDao.getCarStrom(req.query.cId,function (result) {
        res.json(result);
    })
});
router.get('/showTime', function(req, res, next) {
    showCarDao.showTime(function (result) {
        res.json(result);
    })
});
module.exports = router;

