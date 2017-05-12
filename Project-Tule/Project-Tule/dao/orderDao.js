/**
 * Created by wang on 2017/5/6.
 */
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var showRentCarSql=require('./sql/showRentCarSql');

// var util=require('./../util/MD5');

var dom01=domain.create();
var order={
    getRealUser:function (uId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query('select relName,idCardNum FROM person_info where uId = ?',[uId],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);


                });

            })
        })
    },
    insertOrder:function (order1,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query('INSERT into car_order(eachCarId,uId,total,returnStore,rentTime,returnTime,noNeedpay,orderStatus,ordertime,commStatus)VALUES(?,?,?,?,?,?,?,?,NOW(),?)', [order1.eachCarId,order1.uId,order1.total,order1.returnStormId,order1.rentDate,order1.backDate,order1.noNeedPay,order1.orderStatus,order1.commStatus],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);
                });

            })
        })
    },
    getCarInfo:function (eachCarId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query('SELECT * from AllCar where eachCarId= ?',[eachCarId],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);
                });

            })
        })
    },
    getStoreId:function (name,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query('SELECT id  from car_store where store= ?',[name],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);
                });

            })
        })
    },
};
module.exports=order;