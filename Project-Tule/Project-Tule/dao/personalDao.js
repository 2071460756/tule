/**
 * Created by 94802 on 2017/4/28.
 */
//获得连接数据库
var getClient = require('./../util/DBHelper');
var domain = require('domain');
var usesql = require('./sql/userSql');
var personalSql = require('./sql/personalSql');

var dom01 = domain.create();
var personal = {
    //通过手机号查询得到用户的信息
    getMyInfo: function (phoneNum, callback) {
        //注册错误事件
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });
        //执行查找代码
        dom01.run(function (){
            getClient(function (client) {
                //查找获得信息并返回
                console.log(phoneNum);
                client.query(personalSql.getMyInfoByPhoneNum, [phoneNum], function (error, result) {
                    //查询出现错误
                    console.log(result);
                    if (error) {
                        console.log('error123123');
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }//没有出现错误
                    //表示查询成功
                    if (result.length == 1) {
                        console.log('good123123');
                        callback(result);
                    }else{
                        console.log(goodliang)
                    }

                })

            })
        })
    },//end of getClient

    //保存修改过的信息
    updateMyInfoByUid:function (upDateInfo,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function (){
            getClient(function (client) {
                client.query(personalSql.upDateMyInfoByUid,[upDateInfo.nickName,upDateInfo.email,upDateInfo.uId],function (error,result) {
                    //更新出现错误
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        //更新的是一行
                        callback(1,result);
                    }


                })
            })
        })
    },//end of updateMyInfoByUid

    //获取收藏的信息
    getCollectByUid:function (uId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                client.query(personalSql.getCollectByUid,[uId],function (error,result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })

    },
    //删除收藏的信息
    deleteByCarIdAndUid:function (uId,carId,eachCarId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                console.log(uId);
                console.log(carId);
                client.query(personalSql.deleteByCarIdAndUid,[uId,carId,eachCarId],function (error,result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })

    },
    //更改密码
    upDatePasswordByUid:function (upDateInfo,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });


        dom01.run(function () {
            console.log('------------');
            console.log(upDateInfo);
            getClient(function (client) {
                client.query(personalSql.upDatePasswordByUid,[upDateInfo.newPas,upDateInfo.uId,upDateInfo.oldPas],function (error,result) {
                    if (error) {
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    },
    //通过uId来获取订单的信息
    getOrderByUid:function (uId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            console.log("dom01....");
            console.log(uId);
            getClient(function (client) {
                client.query(personalSql.getPerOrder,[uId],function (error,result) {
                    if (error) {
                        console.log("error......");
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    },

    //上传评论内容
    putComtext:function (uId,oId,score,context,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                client.query(personalSql.insertIntoComByUidAndOid,[uId,oId,score,context],function (error,result) {
                    if (error) {
                        console.log("error......");
                        console.log(error.message);
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        console.log("111111");
                        callback(1,result);
                    }
                })
            })
        })
    },

    //查看评论
    getComByUid:function (uId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                client.query(personalSql.getComByUid,[uId],function (error,result) {
                    if (error) {
                        console.log("error......");
                        console.log(error.message);
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    },
    //更新具体信息
    updateMyInfo:function (myInfo,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                        client.query(personalSql.updatePersonInfo,[myInfo.myNickName,myInfo.myPhoneNum,myInfo.myRealName,myInfo.myCard,myInfo.myEmail,myInfo.myUid],function (error,result) {
                    if (error) {
                        console.log("error......");
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    },
    //通过订单获取信息
    getInfoByOid:function (oId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                client.query(personalSql.getInfoByOid,[oId],function (error,result) {
                    if (error) {
                        console.log("error......");
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    },
    //通过订单编号取消订单
    CanOrderByOid:function (oId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                client.query(personalSql.cancelOrderByOid,[oId],function (error,result) {
                    if (error) {
                        console.log("error......");
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    },

    //插入评价的同时更新评论状态
    updateOrdStaByOid:function (oId,callback) {
        dom01.on('error', function (err) {
            console.log(err.message);
            callback(3);
        });

        dom01.run(function () {
            getClient(function (client) {
                client.query(personalSql.updateOrdStaByOid,[oId],function (error,result) {
                    if (error){
                        console.log("error......");
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }else{
                        callback(1,result);
                    }
                })
            })
        })
    }
    //

};
module.exports = personal;
