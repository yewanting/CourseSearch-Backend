

function selectuserstar(info,connection, callback) {


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
                var curquerysql = 'select * from stardatatable,coursetable where username=' + "'" + username + "'" + " and stardatatable.courseid = coursetable.id";
                connection.query(curquerysql, function (err, results) {
                    if (err) {
                        console.log("查询收藏错误");
                        callback("-1");
                        return;

                    } else {
                        console.log("查询收藏成功");
                        // console.log(JSON.stringify(results))
                        // var li = []
                        // for(let i=0;i<results.length;i++){
                        //     li.push(results[i]["courseid"])
                        // }
                        // console.log(li)
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

module.exports = selectuserstar