
var util = require('util')
function getluntancontent(info,connection, callback) {


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
                console.log(info["curluntanpage"])
                var curquerysql = util.format("select * from luntan_content where luntan_name = '%s'  order by add_time desc limit %d,5",info["luntanname"],(info["curluntanpage"]-1)*5)
                // var curquerysql = "select * from luntan_content where add_time<='"+info["curtime"] + "' and luntan_name = '"+info["luntanname"]+"' limit "+(info["curluntanpage"]-1)*5+",5";
                console.log(curquerysql)
                connection.query(curquerysql, function (err, results) {
                    if (err) {
                        console.log(err)
                        console.log("查询论坛内容错误");
                        callback("-1");
                        return;

                    } else {
                        console.log("查询论坛内容成功");
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

module.exports = getluntancontent