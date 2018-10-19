// var express = require("express");
// var router = express.Router();
// var state;
    // var crypto = require('crypto');
    // //2，生成口令的散列值，crypto模块功能是加密并生成各种散列，createHash(algorithm)方法 ,这是利用给定的算法生成hash对象
    // var md5 = crypto.createHash('md5');
    // //3,digest([encoding])方法，计算数据的hash摘要值，encoding是可选参数，不传则返回buffer (encoding可为 'hex'、'base64'等)；
    // var cryptogray = md5.update(passwd).digest('hex');  
    


exports.loginAction = function(req,res){
    var username = req.query.username;
    var passwd   = req.query.passwd;
    
    var selectsql = "select username,passwd from user where username=? and passwd=?";
    
    console.log(1,req.session.sign);

    var crypto = require("crypto");
    var md5 = crypto.createHash('md5');
    var cryptogray = md5.update(passwd).digest('hex');
    var data=[username,cryptogray];

    cnt.query(selectsql,data,function(err,result){
        if(err){
            console.log("[INSERT INTO--]",err.message);
            return;
        }
        // var arr=[];
        // var i = arr.indexOf.call(result,"{ username: 'lq', passwd: '202cb962ac59075b964b07152d234b70' }");
        // console.log(result,i);
        if(result.length==0 || result[0].username!=username){
            res.end("无此用户");
        }else if(result[0].passwd!=cryptogray){
            res.end("密码错误");
        }else if(result[0].username==username&&result[0].passwd==cryptogray){
            console.log(2,req.session.sign);
            req.session.sign=true;
            console.log(3,req.session.sign);
            res.end("登录成功");
            // global.datastate=1;
        }else{
            res.end("未知错误");
        }
    });
}


// router.get('/login.html',function(req,res){
//     if(state==1){
//         res.sendFile(__dirname+'/view/'+"ZIYOU_COM.html");
//     }
// });

// module.exports = router;






