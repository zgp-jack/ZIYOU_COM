var express = require("express");
var app = express();
var path = require("path");
// app.set('view',path.join(__dirname,'/view'));
var mysql = require("mysql");
var session = require('express-session');

app.use(session({
    secret:'123456',
    name:'cookie_aid',
    resave:true,
    saveUninitialized:true,
    cookie:{maxAafe:10*1000}
}));

app.use(express.static('public'));

global.cnt = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'ziyou_com'
});
cnt.connect();


var registermodel = require('./model/registerAction');
app.get('/registerAction',registermodel.registerAction);
app.get('/register.html',function(req,res){
    res.sendFile(__dirname+'/view/'+'register.html');
});

app.get('/login.html',function(req,res){
    res.sendFile(__dirname+'/view/'+'login.html');
})
app.get('/',function(req,res){
    res.sendFile(__dirname+'/view/'+'login.html');
})
app.get('/login',function(req,res){
    res.sendFile(__dirname+'/view/'+'login.html');
});

var loginmodel = require('./model/loginAction');
app.get('/loginAction',loginmodel.loginAction);

var resetmodel = require('./model/resetAction');
app.get('/resetAction',resetmodel.resetAction);
app.get('/reset.html',function(req,res){
    res.sendFile(__dirname+'/view/'+'reset.html');
});

app.get('/ZIYOU_COM',function(req,res){
    console.log(4,req.session.sign);
    if(req.session.sign){
        res.sendFile(__dirname+'/view/'+'ZIYOU_COM.html');
    }else{
        res.sendFile(__dirname+'/view/'+'login.html');
    }
});



app.listen(8888);

