


exports.registerAction = function(req,res){
    var username = req.query.username;
    var passwd = req.query.passwd;

    var crypto = require('crypto');
    //2，生成口令的散列值，crypto模块功能是加密并生成各种散列，createHash(algorithm)方法 ,这是利用给定的算法生成hash对象
    var md5 = crypto.createHash('md5');
    //3,digest([encoding])方法，计算数据的hash摘要值，encoding是可选参数，不传则返回buffer (encoding可为 'hex'、'base64'等)；
    var cryptogray = md5.update(passwd).digest('hex');

    var selectsql = 'select * from user where username=?';
    cnt.query(selectsql,username,function(err,result){
        if(err){
            console.log("SELECT ERROR--",err.massage);
        }
        if(result.length==0){
            var insertsql = 'insert into user(username,passwd) values(?,?)';
            var data = [username,cryptogray];
            cnt.query(insertsql,data,function(err,result){
                if(err){
                    console.log("INSERT INTO--",err.massage);
                }
                // 可以传回页面，用ejs模块
                res.end("注册成功");
            });
        }else{
            res.end('该用户已经注册');
        }
    });
}
