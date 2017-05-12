/**
 * Created by wang on 2017/4/27.
 */
var sql={
    showRentALLInfo:'SELECT a.eachCarId ,b.carId,b.carName,b.carPhoto,rentPrice,yajin,insurance,b.carSize,c.type,c.typeIcon,c.tBrief,f.brand,h.store,h.storeAddr,h.storePhoneNum,i.city,j.output,j.sitNum from detail_car as a INNER JOIN car_info as b ON a.carId=b.carId INNER JOIN car_type as c on b.type=c.id INNER JOIN car_base_info as d on b.carId=d.carId INNER JOIN car_series as e on d.series=e.sId INNER JOIN car_brand as f on e.bId=f.bId INNER JOIN detail_car as g on b.carId=g.carId INNER JOIN car_store as h on a.store=h.id INNER JOIN city_type as i on h.cId=i.cId INNER JOIN car_config_info as j on j.carId=b.carId GROUP BY a.eachCarId',
    showBrand:'select * from car_brand',
    showCarType:'select * from car_type',
    showCarCity:'select * from city_type',
    getCarStrom:'select * from car_store where cId=?',
    showTime:'SELECT eachCarId,  from_unixtime(unix_timestamp(rentTime),"%Y-%m-%d %h:00") as rentTime,  from_unixtime(unix_timestamp(returnTime),"%Y-%m-%d %h:00") as returnTime, orderStatus from car_order',

}

module.exports=sql;