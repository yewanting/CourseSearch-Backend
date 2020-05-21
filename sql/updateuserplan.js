

function updateuserplan(info,connection,callback){

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
                var updatesql = 'update userplan SET date = ?,content = ?,ifSuccess = ?,score = ? WHERE id = ?';
                var updatesqlParams = [info["date"],info["content"],info["ifSuccess"],info["score"],info["id"]];
                connection.query(updatesql, updatesqlParams,function (error, results){
                    if(error){
                        console.log(error);
                        console.log('更新错误');
                        callback("-1")
                        return
                      
                    }
                
                  console.log("成功更新一条用户的计划记录");
                  callback("1")
                });
            }
        }

    })

    
 

    connection.release()
}

module.exports = updateuserplan