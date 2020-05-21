

function postuserluntanname(info,connection,callback){

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
                for(var i = 0 ; i < info["luntanname"].length ;i++)
                {
                    var addsql = 'INSERT INTO user_enterluntan(username,luntanname,entertime)VALUES(?,?,?)';
                    var username = results[0]["username"]
                    var addsqlParams = [username,info["luntanname"][i],info["entertime"]];
                    connection.query(addsql, addsqlParams,function (error, results){
                        if(error){
                            console.log(error);
                            console.log('插入错误');
                            callback("-1")
                            return
                          
                        }
                    
                      console.log("成功插入用户加入论坛的记录");
                      callback("1")
                    });
                }

            }
        }

    })

    
    connection.release()


}

module.exports = postuserluntanname