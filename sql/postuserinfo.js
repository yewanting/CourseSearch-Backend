var mysql = require('mysql')
var util = require('util')
var UUID = require('uuid')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'515136123321jy.',
    port:'3306',
    database:'coursesearch'
})

connection.connect();

function insertuserinfo(userinfo,callback){

    var uuid = UUID.v1()
    var addsql = 'INSERT INTO user_info(username,password,token)VALUES(?,?,?)';
    var addsqlParams = [userinfo["username"],userinfo["password"],uuid];
    connection.query(addsql, addsqlParams,function (error, results){
        if(error){
            console.log('插入错误');
            callback("-1")
            return
          
        }
      console.log("成功插入一条用户记录");
     callback("1")
    });


}

module.exports = insertuserinfo