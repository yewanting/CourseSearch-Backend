

function deleteuserplan(info,connection,callback){

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
               var deletesql = 'delete from userplan where id ='+"'"+info["id"]+"'";
               console.log(deletesql);
               connection.query(deletesql,function(error,results){
                   if(error)
                   {
                       console.log('删除计划失败')
                       callback("-1")
                       return
                   }
                   callback("1")
                   console.log("成功删除一条用户的计划记录")
               })
            }
        }
             

    })

    
connection.release()


}

module.exports = deleteuserplan