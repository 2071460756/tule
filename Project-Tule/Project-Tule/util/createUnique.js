/**
 * Created by lzhan on 16/8/23.
 */
function createFileName() {
    var date=new Date().valueOf();
    var ran=Math.random();

    var _name=ran.toString()+date;
    return _name;
}
exports.creatName=createFileName;