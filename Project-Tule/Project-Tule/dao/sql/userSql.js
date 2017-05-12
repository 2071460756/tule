/**
 * Created by lzhan on 2017/4/21.
 */
var sql={
    getAllByPhoneNum:'select nickName,phoneNum from user where phoneNum=? AND password = ?',
    getUserByPhoneNUm:'select uId from user where phoneNum=?',
    addUser:'insert into user(nickName,phoneNum,password) values(?,?,?)',
    getUserPassword:'select user.uId,password,nickName,userPhoto from user,person_info where user.uId = person_info.uId and phoneNum=?',


    // getMyInfoByPhoneNum:'SELECT user.uId,nickName,relName,idCardNum,phoneNum,email,userPhoto,jifen from user,person_info WHERE user.uId = person_info.uId and phoneNum=?',
    // upDateMyInfoByUid:"UPDATE user,person_info SET nickName=?,email=? where user.uId = person_info.uId and user.uId=?",

    getCollectByUid:"select uId,collector.carId,from_unixtime(unix_timestamp(collTime),'%Y-%m-%d %h:%m') as collTime,carName,rentPrice,carPhoto,carSize,sitNum,doorNum,gearBoxType,output from collector,car_info,car_config_info WHERE collector.carId=car_info.carId=car_config_info.carId and uId = ?",
    deleteByCarIdAndUid:"DELETE from collector WHERE uId = ? and carId = ?",

    //判断收藏表中是否存在
    isExitCollById:'select * from collector where carId=? and uId=? and eachCarId=?',
    //插入收藏
    insertCollector:'INSERT into collector(carId,uId,collTime,eachCarId)VALUES(?,?,now(),?)',
    //删除收藏
    deleteCollector:'delete from collector where carId=? and uId=?',
};
module.exports=sql;