/**
 * Created by 94802 on 2017/5/2.
 */
var personalSql={

    getMyInfoByPhoneNum:'SELECT user.uId,nickName,relName,idCardNum,phoneNum,email,userPhoto,jifen from user,person_info WHERE user.uId = person_info.uId and phoneNum=?',
    upDateMyInfoByUid:"UPDATE user,person_info SET nickName=?,email=? where user.uId = person_info.uId and user.uId=?",
    getCollectByUid:"select uId,eachCarId,collector.carId,from_unixtime(unix_timestamp(collTime),'%Y-%m-%d %h:%m') as collTime,carName,rentPrice,carPhoto,carSize,sitNum,doorNum,gearBoxType,output from collector,car_info,car_config_info WHERE collector.carId=car_info.carId=car_config_info.carId and uId = ?",
    deleteByCarIdAndUid:"DELETE from collector WHERE uId = ? and carId = ? and eachCarId = ?",
    upDatePasswordByUid:"UPDATE user set password=? where uId = ? and password=?",
    getPerOrder:'SELECT a.*,b.carId from newGetOrder as a,detail_car as b WHERE a.eachCarId=b.eachCarId AND a.uId = ? order by orderTime DESC',
    insertIntoComByUidAndOid:'insert INTO comments (uId,orderId,grade,comContent,comTime) VALUES (?,?,?,?,NOW())',
    getComByUid:'SELECT a.id,a.uId,b.eachCarId,b.carId,a.orderId,a.grade,a.comContent,from_unixtime(unix_timestamp(a.comTime),"%Y-%m-%d %h:%m") as collTime,c.carName,c.carSize,d.output,d.sitNum from comments as a INNER JOIN car_order as e on e.oId=a.orderId INNER JOIN detail_car as b on e.eachCarId=b.eachCarId INNER JOIN car_info as c on b.carId=c.carId INNER JOIN car_config_info as d on c.carId=d.carId WHERE a.uId=? order By collTime asc',
    updatePersonInfo:"update user u1,person_info p1 set u1.nickName= ?,u1.phoneNum= ?,p1.relName = ?,p1.idCardNum= ?,p1.email= ? WHERE u1.uId = p1.uId and u1.uId=?",
    getInfoByOid:'SELECT a.*,b.relName from newGetOrder a,person_info as b WHERE a.uId = b.uId and a.oId =?',
    cancelOrderByOid:'UPDATE car_order SET orderStatus = 6 WHERE oId = ?',
    updateOrdStaByOid:'update car_order set commStatus = 1 WHERE oId = ?'

};
module.exports = personalSql;