

function deleteuserinfo(info,connection,callback){

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

    
 
    connection.release()

}

module.exports = deleteuserinfo