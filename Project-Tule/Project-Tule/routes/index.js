var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/login', function(req, res, next) {
//     res.send('respond with a login');
// });
//
// router.post('/login', function(req, res, next) {
//     res.send('respond with a login');
// });
//
// router.post('/regist', function(req, res, next) {
//     var user=req.body;
//     if(user!=null && user.user_phone_number!=null && user.user_login_password!=null){
//         userdao.addUser(user,function (_result) {
//             res.json({result:_result});
//         });
//     }
// });
module.exports = router;

