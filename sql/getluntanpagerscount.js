

function getluntanpagerscount(info,connection, callback) {


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
                var curquerysql = "select count(*) from (select * from luntan_content where add_time<='"+info["curtime"] + "' and luntan_name = '"+info["luntanname"]+"') as new_table";
                console.log(curquerysql)
                connection.query(curquerysql, function (err, results) {
                    if (err) {
                        console.log(err)
                        console.log("查询论坛内容总数错误");
                        callback("-1");
                        return;

                    } else {
                        console.log("查询论坛内容总数成功");
                        console.log(results)
                        callback(JSON.stringify(results))
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

module.exports = getluntanpagerscount