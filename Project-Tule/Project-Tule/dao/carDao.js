/**
 * Created by lzhan on 2017/4/21.
 */
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var carsql=require('./sql/carSql');
var dom01=domain.create();
var car={

    getIndexCars:function (callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getIndexCarInfo,function (error,result) {
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


    //详情页面
    getDetailCarInfo:function (carId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);

        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getDetailCarInfo,[carId],function (error,result) {
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


    //得到车的门店
    getCarStore:function (cId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getCarStore,[cId],function (error,result) {

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
                client.query(carsql.getCarCity,function (error,result) {
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

    //车辆详情页面展示评价
    getCarCommById:function (carId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getCarCommById,[carId],function (error,result) {

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
    getCommGradeBycarId:function (carId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getCommGradeByCarId,[carId],function (error,result) {
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
    getTimeByEachCarId:function (eachCarId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getTime,[eachCarId],function (error,result) {
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
    getEachCarId:function (storm,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(carsql.getEachCarId,[storm],function (error,result) {
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
                client.query(carsql.getCarInfo,[eachCarId],function (error,result) {
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

}



module.exports=car;