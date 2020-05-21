

function deleteluntan(info,connection,callback){

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
            var username = results[0]["username"];
               var deletesql = 'delete from user_enterluntan where username ='+"'"+username+"'";
               console.log(deletesql);
               connection.query(deletesql,function(error,results){
                   if(error)
                   {
                       console.log('删除论坛失败')
                       callback("-1")
                       return
                   }
                   callback("1")
                   console.log("成功删除论坛记录")
               })
            }
        }
             

    })

    
connection.release()


}

module.exports = deleteluntan