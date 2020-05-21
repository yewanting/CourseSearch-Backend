

function getuserluntanname(info,connection, callback) {


    var token = info["token"]
    var querysql = 'select username from user_info where token=' + "'" + token + "'";
    connection.query(querysql, function (err, results) {
        if (err) {
            console.log('查询用户不存在');
            callback("-1")
            return
        } else {

            if (results.length > 0) {
                var username = results[0]["username"];
                var curquerysql = 'select luntanname from user_enterluntan where username=' + "'" + username+"'";
                connection.query(curquerysql, function (err, results) {
                    if (err) {
                        console.log(err)
                        console.log("查询加入论坛错误");
                        callback("-1");
                        return;

                    } else {
                        console.log("查询加入的论坛成功");
                        console.log(results)
                        var res = []
                        for(var i = 0 ; i < results.length ; i++)
                        {
                            res.push(results[i]["luntanname"])
                        }
                        callback(JSON.stringify(res))
                    }

                })
            }
            else{
                callback("-1")
            }

        }
    })




    connection.release()

}

module.exports = getuserluntanname