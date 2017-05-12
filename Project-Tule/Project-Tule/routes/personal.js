/**
 * Created by 94802 on 2017/4/28.
 */
//路由分发的工具
var express = require('express');
var router = express.Router();
var personalDao = require('./../dao/personalDao');

router.get('/', function(req, res, next) {
    console.log("here...get...");
});

router.get('/myInfo', function(req, res, next) {
    //通过get方式获取提交到的信息
    var phoneNum = req.query.phoneNum;
    //调用方法查找
    personalDao.getMyInfo(phoneNum,function (name) {
        console.log(name);
        res.json(name);
    })
});

router.get('/upDateMyInfo', function(req, res, next) {
    //通过get方式获取提交到的信息
    var upDateInfo = JSON.parse(req.query.upDate);
    console.log(upDateInfo.uId);
    //调用方法查找
    personalDao.updateMyInfoByUid(upDateInfo,function (_result,result) {
        res.json(result);
    })
});

router.get('/getCollectInfo', function(req, res, next) {
    //通过get方式获取提交到的信息
    var uId = req.query.uId;
    personalDao.getCollectByUid(uId,function (_result,result) {
        if(_result==1){
            console.log("查询成功");
            res.json(result);
        }else{
            console.log("查询失败");
        }
    });
    //调用方法查找
});

router.get('/deleteCollect', function(req, res, next) {
    var info = req.query;
    var uId = info.uId;
    var carId = info.carId;
    var eachCarId = info.eachCarId;
   console.log(JSON.stringify(info));
    personalDao.deleteByCarIdAndUid(uId,carId,eachCarId,function (_result,result) {
        if(_result==3){
            console.log("删除失败")
        }else{
            res.json(result);
        }
    })
});

router.post('/upDatePas', function(req, res, next) {
    var upDateinfo = req.body;
    console.log(upDateinfo);
    console.log(upDateinfo);
    personalDao.upDatePasswordByUid(upDateinfo,function (_result,result) {
        if(_result==3){
            console.log("更新失败");
            res.json(3);
        }else{
            if (result.affectedRows==1||result.affectedRows==0){
                res.json(1);
            }
        }
    })

});

router.get('/getOrder', function(req, res, next) {
    var uId = req.query.uId;
    personalDao.getOrderByUid(uId,function (_result,result) {
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            res.json(result);
        }
    })
});

router.get('/putComment',function(req, res, next) {
    console.log("putComment.......here....");
    console.log(req.query);
    var uId = req.query.uId;
    var orderId = req.query.orderId;
    var score = req.query.score;
    var comContent = req.query.comContent;
    personalDao.putComtext(uId,orderId,score,comContent,function (_result,result) {
        console.log(_result);
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            res.json(result);
        }
    })
});

router.get('/getCom',function(req, res, next) {
    var uId = req.query.uId;
    personalDao.getComByUid(uId,function (_result,result) {
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            res.json(result);
        }
    })

});

router.post('/upDateMyInfo', function(req, res, next) {
    var myInfo = req.body;
    console.log(myInfo);
    personalDao.updateMyInfo(myInfo,function (_result,result) {
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            //console.log(result);
            res.json(result.affectedRows);
        }
    });
});

router.get('/getInfoByOid',function (req, res, next) {
    var oId = req.query.oId;
    personalDao.getInfoByOid(oId,function (_result,result) {
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            res.json(result);
        }
    })
});

router.get('/CanOrderByOid',function (req, res, next) {
    var oId = req.query.oId;
    personalDao.CanOrderByOid(oId,function (_result,result) {
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            res.json(result);
        }
    })
});

router.get('/updateOrdStaByOid',function (req, res, next) {
    var oId = req.query.oId;
    personalDao.updateOrdStaByOid(oId,function (_result,result) {
        console.log(result);
        if(_result==3){
            console.log("查询失败");
        }else if(_result==1){
            res.json(result);
        }
    })
});



//将此模块定义为router
module.exports = router;