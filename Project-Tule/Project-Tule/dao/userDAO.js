/**
 * Created by lzhan on 2017/4/21.
 */
//1表成功
//2 表示用户已存在
//3  表示数据库连接异常
var getClient=require('./../util/DBHelper');
var domain=require('domain');
var usesql=require('./sql/userSql');

var util=require('./../util/MD5');

var dom01=domain.create();
var user={
    addUser:function (user,callback) {
        that=this;
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            that.getUserByPhoneNUm(user.phoneNum,function (_res) {
                //判读是否已经存在改用户
                if(typeof _res=='object'){
                    if(_res.length!=0){
                        //2 表示用户已存在
                        callback(2);
                    }else{
                        getClient(function (client) {
                            client.query(usesql.addUser,[user.nickName,user.phoneNum, util.MD5(user.password)],function (error,result) {
                                if(error){
                                    client.release();
                                    callback(3);
                                    return;
                                }
                                // console.log(user.nickName);
                                // console.log(result);
                                callback(result.affectedRows,user.nickName);

                                client.release();

                            })
                        })
                    }
                    //    查询用户是否存在，出现数据库异常
                }else{
                    callback(_res);
                }
            });
        })

    },
    getUserByPhoneNUm:function (phoneNum,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getUserByPhoneNUm,[phoneNum],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result);
                    // console.log(result.length)

                });

            })
        })
    },
    //
    getUserPassword:function (user,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.getUserPassword,[user.phoneNum],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    if(result.length==1){
                        //    1 表示登录成功
                        if(result[0].password==util.MD5(user.password)){
                            callback(1,result[0].nickName,result[0].uId,result[0].userPhoto);

                        }else{
                            //2 表示密码错误
                            callback(2)
                        }
                    }else{
                        //0 该用户名不存在
                        callback(0);
                    }


                });

            })
        })
    },



    updatePhoto:function (users,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {

            getClient(function (client) {
                client.query("UPDATE person_info SET userPhoto =?  where uId = (select uId from user where phoneNum = ?)",[users.user_icon,users.phoneNum],function (error,result) {
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
    uploadUserIcon:function (data,callback) {
        dom01.on('error',function (err) {
            console.log(err.message+'-----');
            callback(3);
        });
        dom01.run(function () {


            getClient(function (client) {
                console.log("id+= "+data.file.length)
                client.query(usesql.uploadUserIcon,[data.file.toString(),data.user_phone_number],function (error,result) {
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
    getUserIcon:function (id,callback) {
        dom01.on('error',function (err) {
            console.log(err.message+'-----');
            callback(3);
        });
        dom01.run(function () {


            getClient(function (client) {
                client.query('select userPhoto from person_info where uId=(select uId from user where phoneNum=?)',[id],function (error,result) {
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




    addCollector:function (collInfo,callback) {
        that=this;
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            that.getCollById(collInfo.carId,collInfo.uId,collInfo.eachCarId,function (_res) {
                if(typeof _res=='object'){
                    if(_res.length!=0){
                        //2 表示用户已存在
                        callback(2);
                        console.log('收藏表中已存在');
                    }else{
                        getClient(function (client) {
                            client.query(usesql.insertCollector,[collInfo.carId,collInfo.uId,collInfo.eachCarId],function (error,result) {
                                if(error){
                                    client.release();
                                    callback(3);
                                    console.log('插入错误')
                                    return;
                                }
                                callback(result.affectedRows);
                                client.release();
                            })
                        })
                    }
                    //    查询用户是否存在，出现数据库异常
                }else{
                    callback(_res);
                }
            });
        })

    },
    //判断收藏表中是否存在
    getCollById:function (carId,uId,eachCarId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.isExitCollById,[carId,uId,eachCarId],function (error,result) {
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

    delCollById:function (collInfo,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query(usesql.deleteCollector,[collInfo.carId,collInfo.uId],function (error,result) {
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
    getUidByPhoneNum:function (phoneNum,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {

            getClient(function (client) {
                client.query(usesql.getUserByPhoneNUm,[phoneNum],function (error,result) {
                    if(error){
                        console.log('error123123');
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    console.log(result);
                    callback(1,result);

                });

            })
        })
    },
    getPhoto:function (uId,callback) {
        dom01.on('error',function (err) {
            console.log(err.message);
            callback(3);
        });
        dom01.run(function () {
            getClient(function (client) {
                client.query('select userPhoto from person_info where uId=?',[uId],function (error,result) {
                    if(error){
                        client.release();
                        //3  表示数据库连接异常
                        callback(3);
                    }
                    callback(result[0]);


                });

            })
        })
    },


};

module.exports=user;