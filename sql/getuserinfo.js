var util = require('util')
var UUID = require('uuid')



function insertuserinfo(userinfo,connection,callback){

    var querysql = 'select id from user_info where username='+"'"+userinfo.username+"'"+' and password='+"'"+userinfo.password+"'";
    
    console.log(querysql)
    connection.query(querysql,function (error, results){
        if(error){
            console.log('该用户不存在');
            callback("-1")
            return
        }
        if(results.length==0){
            console.log('该用户不存在');
            callback("-1")
           return
        }
      console.log("查询成功");
      var uuid = UUID.v1()
      //这里加一个更新数据库的uuid表
    //写一个插入更新语句
      var updatetoken = 'update user_info set token = "'+uuid+'" where username='+"'"+userinfo.username+"'";
      connection.query(updatetoken);
     callback(uuid)
    });

    connection.release()
}

module.exports = insertuserinfo