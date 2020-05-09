// var mysql = require('mysql')



// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '515136123321jy.',
//     port: '3306',
//     database: 'coursesearch'
// })

// connection.connect();


function selectplan(info,connection, callback) {
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
                var curquerysql = 'select * from userplan where username=' + "'" + username + "'" ;
                connection.query(curquerysql, function (err, results) {
                    if (err) {
                        console.log("查询计划失败");
                        callback("-1");
                        return;

                    } else {
                        console.log("查询计划成功");
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

module.exports = selectplan