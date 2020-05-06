var mysql = require('mysql')



var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'515136123321jy.',
    port:'3306',
    database:'coursesearch'
})

connection.connect();

function insertuserplan(info,callback){

    var token = info["token"];
    var querysql = 'select username from user_info where token='+"'"+token+"'";
    connection.query(querysql,function(err,results){
        if(err)
        {
            console.log('查询用户不存在');
            callback("-1")
            return
        }else
        {
            
            if(results.length==0)
            {
                console.log("非法查询")
                callback("-1")
            }else
            {
                var addsql = 'INSERT INTO userplan(date,content,ifSuccess,score,username)VALUES(?,?,?,?,?)';
                var username = results[0]["username"]
                var addsqlParams = [info["date"],info["content"],info["ifSuccess"],info["score"],username];
                connection.query(addsql, addsqlParams,function (error, results){
                    if(error){
                        console.log(error);
                        console.log('插入错误');
                        callback("-1")
                        return
                      
                    }
                
                  console.log("成功插入一条用户的计划记录");
                  callback("1")
                });
            }
        }

    })

    
 


}

module.exports = insertuserplan