/**
 * Created by wang on 2017/4/27.
 */
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var showRentCarSql=require('./sql/showRentCarSql');

// var util=require('./../util/MD5');

var dom01=domain.create();
var showCar= {
    getCarShowInfo:function (callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(showRentCarSql.showRentALLInfo,function (error,result) {
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

    getBrand:function (callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(showRentCarSql.showBrand,function (error,result) {
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
    getCarType:function (callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(showRentCarSql.showCarType,function (error,result) {
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
    getCarCity:function (callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(showRentCarSql.showCarCity,function (error,result) {
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
    getCarStrom:function (cId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(showRentCarSql.getCarStrom,[cId],function (error,result) {
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
    showTime:function (callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(showRentCarSql.showTime,function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);


                });

            })
        })
    }
};

module.exports=showCar;