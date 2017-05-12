/**
 * Created by dell on 2017/4/27.
 */
var express = require('express');
var router = express.Router();
var cardao=require('./../dao/carDao');

router.get('/index', function(req, res, next) {
    if(req.query!={}){
        cardao.getIndexCars(function(_res) {
            res.json({result:_res});

        })
    }
});

//详情页面得到车的信息
router.get('/detailCarInfo',function (req, res, next) {
    var carId=req.query.carId;
    cardao.getDetailCarInfo(carId,function (_res) {
        res.json({result:_res});
    })
});


router.get('/carStore',function (req, res, next) {
    var cId=req.query.cId;
    cardao.getCarStore(cId,function (_res) {
        res.json({result: _res});

    })
});
router.get('/carCity',function (req, res, next) {
    cardao.getCarCity(function (_res) {
        res.json({result: _res});
    })
});

//得到车的评价
router.get('/carIdComm',function (req, res, next) {
    var carId=req.query.carId;
    cardao.getCarCommById(carId,function (_res) {
        res.json({result: _res});
    })
});
router.get('/carCommGrade',function (req, res, next) {
    var carId=req.query.carId;
    cardao.getCommGradeBycarId(carId,function (_res) {
        res.json({result: _res});
    })
});
router.get('/getTime',function (req, res, next) {
    var eachCarId=req.query.eachCarId;
    cardao.getTimeByEachCarId(eachCarId,function (_res) {
        res.json( _res);
    })
});
router.get('/getEachCarId',function (req, res, next) {
    var storm=req.query.storm;
    cardao.getEachCarId(storm,function (_res) {
        res.json( _res);
    })
});
router.get('/getCarInfo',function (req, res, next) {
    var eachCarId=req.query.eachCarId;
    cardao.getCarInfo(eachCarId,function (_res) {
        res.json( _res);
    })
});
module.exports = router;