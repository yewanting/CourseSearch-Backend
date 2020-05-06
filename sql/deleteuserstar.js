var mysql = require('mysql')



var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'515136123321jy.',
    port:'3306',
    database:'coursesearch'
})

connection.connect();

function deleteuserinfo(info,callback){

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
               var deletesql = 'delete from stardatatable where courseid ='+"'"+info["courseid"]+"'";
               connection.query(deletesql,function(error,results){
                   if(error)
                   {
                       console.log('删除失败')
                       callback("-1")
                       return
                   }
                   callback("1")
                   console.log("成功删除一条用户的收藏记录")
               })
            }
        }
             

    })

    
 


}

module.exports = deleteuserinfo