/**
 * Created by dell on 2017/4/27.
 */
var carSql= {
    //首页展示车信息
    getIndexCarInfo: 'select a.carId as carId,d.brand as brand,c.series as series,a.rentPrice as rentPrice FROM car_info as a INNER JOIN  car_base_info as b on a.carId=b.carId INNER JOIN  car_series as c on c.sId=b.series INNER JOIN  car_brand  as d on c.bId=d.bId GROUP BY a.carId ORDER BY a.rentPrice asc;',
    //详情页面
    getDetailCarInfo: 'SELECT * from detailCarInfo WHERE carId=?',

    //得到门店
    getCarStore:'select id,store,cId from car_store where cId=?',
    getCarCity:'SELECT cId, city from city_type ;',


    //车辆详情页面展示评价
    getCarCommById:'SELECT b.nickName,c.userPhoto,a.comContent,a.grade,from_unixtime(unix_timestamp(a.comTime),"%Y-%m-%d %h:%m") as comTime,from_unixtime(unix_timestamp(d.rentTime),"%Y-%m-%d") as rentTime,f.store,e.carId FROM comments as a INNER JOIN user as b on b.uId=a.uId INNER JOIN person_info as c on c.uId=b.uId INNER JOIN car_order as d on d.oId=a.orderId INNER JOIN detail_car as e on d.eachCarId=e.eachCarId INNER JOIN car_store as f on f.id=e.store where carId=?',
    getCommGradeByCarId:'select sum(grade) as carGrade,carId from commBycarId where carId=?;',

    getTime:'SELECT rentTime, returnTime, orderStatus from car_order where eachCarId=?',
    getEachCarId:'SELECT eachCarId FROM AllCar WHERE store=?',
    getCarInfo:'SELECT * FROM AllCar WHERE eachCarId=?',

}
module.exports=carSql;