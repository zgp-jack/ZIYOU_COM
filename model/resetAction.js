exports.resetAction=function(req,res){
    var username = req.query.username;
    var passwd = req.query.passwd;
    
    var crypto = require("crypto");
    var md5 = crypto.createHash("md5");
    var cryptogray = md5.update(passwd).digest("hex");
    
    var data = [cryptogray,username]; 
    var selectsql = "select username,passwd from user where username=?";
    cnt.query(selectsql,username,function(err,result){
        if(result.length==0 || result[0].username!=username){
            res.end("无此用户");
            return;
        }
        var sql = "update user set passwd=? where username=?";
        cnt.query(sql,data,function(err,result){
            if(err){
                console.log('[UPDATE ERROR--]',err.message);
                return;
            }
            res.end("修改成功");
        });
    });
   
    
}




