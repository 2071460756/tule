var express = require('express');
var router = express.Router();
var userdao=require('./../dao/userDAO');
var formidable = require('formidable');
var util = require('util');
var createUnique = require('../util/createUnique');
var util=require('./../util/MD5');
var fs = require('fs');
/* GET users listing. */

router.post('/login', function(req, res, next) {
    var user=req.body;
    if(user!=null && user.phoneNum!=null && user.password!=null){
        if(user.phoneNum.length==11){
            userdao.getUserPassword(user,function(_res,name,uId,userPhoto) {
                res.json({result:_res,name:name,uId:uId,userPhoto:userPhoto});
            })
        }else {
            res.json({result:3});
        }
    }
});
router.post('/regist', function(req, res, next) {
    var user=req.body;
    if(user!=null && user.phoneNum!=null && user.password!=null &&user.nickName!=null){
        userdao.addUser(user,function(_result,name) {
            res.json({result:_result,name:name});
        });
    }else {
        res.json({result:3});
    }
});


router.get('/collectorInsert', function(req, res, next) {
    var collInfo=req.query;
    if(collInfo!=null && collInfo.uId!=null && collInfo.carId!=null && collInfo.eachCarId!=null){
        userdao.addCollector(collInfo,function(_result) {
            res.json({result:_result});
        });
    }else {
        res.json({result:3});
    }
});
router.get('/collectorDelete', function(req, res, next) {
    var collInfo=req.query;
    if(collInfo!=null && collInfo.uId!=null && collInfo.carId!=null){
        userdao.delCollById(collInfo,function(_result) {
            res.json({result:_result.affectedRows});
        });
    }else {
        res.json({result:3});
    }
});
router.get('/getCollectorById', function(req, res, next) {
    var collInfo=req.query;
    if(collInfo!=null && collInfo.uId!=null && collInfo.carId!=null&&collInfo.eachCarId!=null){
        userdao.getCollById(collInfo.carId,collInfo.uId,collInfo.eachCarId,function(_result) {
            res.json({result:_result.length});
            // console.log(_result.length);
        });
    }else {
        res.json({result:3});
    }
});


router.get('/registTurn', function(req, res, next) {
    var user=req.query;
    userdao.getUidByPhoneNum(user.phoneNum,function (_result,result) {
        if(_result==1){
            res.json({result:result});
        }
    })

});
router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            response.locals.error = err;
            // response.render("uploads");
            return;
        }
        // console.log(fields.user_phone_number.length);
        // console.log(files);
        userdao.getUserByPhoneNUm(fields.phoneNum, function (result) {
            console.log('here');
            if (result.length == 1) {
                var extName = '';  //后缀名
                // console.log('文件后缀名为 ' + files.file.type);
                switch (files.file.type) {  //此处in_file  为页面端 <input type=file name=in_file>
                    case 'image/jpeg':
                        extName = 'jpeg';
                        break;
                    case 'image/jpg':
                        extName = 'jpg';
                        break;
                    case 'image/png':
                        extName = 'png';
                        break;
                    case 'image/x-png':
                        extName = 'png';
                        break;
                }
                // console.log('extName=' + extName)
                if (extName.length == 0) {
                    res.send('只支持png和jpg格式图片');
                    return;
                } else {
                    form.uploadDir = "../public/images/userinfo/" ;     //设置上传目录
                    form.keepExtensions = true;     //保留后缀
                    form.maxFieldsSize = 2 * 1024;   //文件大小

                    var avatarName = createUnique.creatName() + '.' + extName;
                    var newPath = form.uploadDir + avatarName;
                    // console.log(newPath);
                    // fs.renameSync(files.file.path).pipe(newPath);

                    // fs.renameSync(files.file.path, newPath);  //重命名

                    //      fs.renameSync(files.upload.path, "./tmp/test.jpg");
                    var readStream = fs.createReadStream(files.file.path);
                    var writeStream = fs.createWriteStream(newPath);
                    readStream.pipe(writeStream);
                    readStream.on('end', function () {
                        fs.unlinkSync(files.file.path);
                    });

                    // console.log('upload end...');
                    //



                    var user={};
                    user.phoneNum=fields.phoneNum;
                    // console.log(fields.phoneNum);
                    user.user_icon=avatarName;
                    // console.log(avatarName);
                    userdao.updatePhoto(user,function (_result) {
                        if (_result.affectedRows == 1) {
                            // res.send('上传成功');
                            res.json({result:1});
                        } else {
                            res.json({result:0});
                        }
                    })

                }


            }
        }) //end getUserByid
    })//end form.parse

});
router.get('/getUserIcon', function(req, res, next) {
    var user=req.query;
    userdao.getPhoto(user.uId,function (result) {
        res.json(result);
    })

});
module.exports = router;

//business

