var util = require('util')
// var mysql = require('mysql')
// var connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'515136123321jy.',
//     port:'3306',
//     database:'coursesearch'
// })

// connection.connect();

//查询数据
// "SELECT * FROM xxx WHERE xxx LIKE '%xxx%'"
function selectsql(queryParams, curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,coursetotallabel,connection){


    coursesourse = coursesourse.join("','")
    coursesourse = "'" + coursesourse + "'"
    

    var querysql = ""
    if(coursesourse==""){  //如果没选网站，默认是全选
        if(minprice!=""&&maxprice!="")
        {
            if(isSort===0) //如果排序也是综合的话
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice >= %s AND courseprice <= %s LIMIT %d, %d",queryParams,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }
            else
            if(isSort===1)  //如果排序是价格从低到高
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice >= %s AND courseprice <= %s ORDER BY courseprice LIMIT %d, %d",queryParams,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }else
            if(isSort===2)  //如果排序是价格从高到低
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice >= %s AND courseprice <= %s ORDER BY courseprice DESC LIMIT %d, %d",queryParams,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }else
            if(isSort===3) //如果排序是销量从高到低
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice >= %s AND courseprice <= %s ORDER BY  coursenumber DESC LIMIT %d, %d",queryParams,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }
        }else
        {
            if(isFree===-1)  //综合 免费+收费
            {
                if(isSort===0) //如果排序也是综合的话
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }
                else
                if(isSort===1)  //如果排序是价格从低到高
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' ORDER BY courseprice LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===2)  //如果排序是价格从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' ORDER BY courseprice DESC LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }
                else 
                if(isSort===3){  //如果排序是销量从高到低
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' ORDER BY coursenumber DESC LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }
            }
             else if(isFree===0)  //价格免费
            {
                //因为价格是免费的，所以价格的排序与这里无关，销量的排序才有关
                if(isSort===3)  //销量从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice = 0 ORDER BY coursenumber DESC LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }
                else
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice = 0 LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }
               
                
            }else if(isFree===1)  //价格收费
            {
                if(isSort===0) //如果排序是综合的
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===1)  //如果排序是价格从低到高
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 ORDER BY courseprice LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===2) //如果排序是价格从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 ORDER BY courseprice DESC LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===3) //如果排序是销量从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 ORDER BY coursenumber DESC LIMIT %d, %d",queryParams,(curpage-1)*pagesize,pagesize) 
                }
            }
        }


    }
    else{   //如果选了网站
        if(minprice!=""&&maxprice!="")
        {
            if(isSort===0) //如果排序是综合的
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s) AND courseprice >= %s AND courseprice <= %s  LIMIT %d, %d",queryParams, coursesourse,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }else
            if(isSort===1)  //如果排序是价格从低到高
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s) AND courseprice >= %s AND courseprice <= %s ORDER BY courseprice LIMIT %d, %d",queryParams, coursesourse,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }else
            if(isSort===2) //如果排序价格是从高到低
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s)  AND courseprice >= %s AND courseprice <= %s ORDER BY courseprice DESC LIMIT %d, %d",queryParams, coursesourse,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }else
            if(isSort===3)  //如果排序销量是从高到低
            {
                querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s)  AND courseprice >= %s AND courseprice <= %s ORDER BY coursenumber DESC LIMIT %d, %d",queryParams, coursesourse,minprice,maxprice,(curpage-1)*pagesize,pagesize) 
            }
        }else
        {
            if(isFree===-1) //综合 免费+收费
            {
                if(isSort===0) //如果排序是综合的
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s) LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===1)  //如果排序是价格从低到高
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s) ORDER BY courseprice LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===2) //如果排序价格是从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s) ORDER BY courseprice DESC LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===3) //如果排序是销量从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'  AND coursesourse IN (%s) ORDER BY coursenumber DESC LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }
               
            }   
            else if(isFree===0) //免费课程
            {
                if(isSort===3)  //销量从高到低，因为这是免费课程，所以不存在价格的排序
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice = 0 AND coursesourse IN (%s) ORDER BY coursenumber DESC LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }else
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice = 0 AND coursesourse IN (%s) LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }
                
            }else if(isFree===1)//收费课程
            {
                if(isSort===0) //如果排序是综合的话
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 AND coursesourse IN (%s) LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===1)//如果排序是价格从低到高
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 AND coursesourse IN (%s) ORDER BY courseprice LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }else
                if(isSort===2)  //如果排序是价格从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 AND coursesourse IN (%s) ORDER BY courseprice DESC LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }
                else if(isSort===3) //如果排序是销量从高到低
                {
                    querysql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice > 0 AND coursesourse IN (%s) ORDER BY coursenumber DESC LIMIT %d, %d",queryParams, coursesourse,(curpage-1)*pagesize,pagesize) 
                }            
            }
        }

    }
    
    



    //课程的总数量
    var countsql;
    if(coursesourse=="")
    {
        if(minprice!=""&&maxprice!="")
        {
            countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice >= %s AND courseprice <= %s",queryParams,minprice,maxprice)
        }else
        {
            if(isFree==-1)
            {
                countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'",queryParams)
            }else
            if(isFree==0)
            {
                countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice = 0",queryParams)
            }else
            if(isFree==1)
            {
                countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'AND courseprice > 0",queryParams)
            }
        }
    }else  //如果选了网站
    {
        if(minprice!=""&&maxprice!="")
        {
            countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice >= %s AND courseprice <= %s  AND coursesourse IN (%s)",queryParams,minprice,maxprice,coursesourse)
        }else
        {
            if(isFree==-1)
            {
                countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND coursesourse IN (%s)",queryParams,coursesourse)
            }else
            if(isFree==0)
            {
                countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%' AND courseprice = 0 AND coursesourse IN (%s) ",queryParams,coursesourse)
            }else
            if(isFree==1)
            {
                countsql = util.format("SELECT * FROM coursetable WHERE coursetitle LIKE '%%%s%%'AND courseprice > 0 AND coursesourse IN (%s) ",queryParams,coursesourse)
            }
        }
    }
    var querycount = util.format("SELECT COUNT(*) FROM ( %s )AS t",countsql);

    var querydiscgoods = util.format("SELECT * FROM coursetable WHERE coursetotallabel = '%s' order by rand()limit 8 ",coursetotallabel)
    // console.log(querycount);
    //获得数据的JSON对象
    this.getjson = function(callback){
        var data;
        connection.query(querysql,function(err,result){
            if(err){
                console.log(err);
                return;
            }
            data = JSON.stringify(result)
            callback(err,data);
        })
    }


    //获得数据的总数
    this.getcount = function(callback){
            connection.query(querycount,(err,result)=>{
                if(err){
                    console.log(err);
                    return;
                }
                callback(err,JSON.stringify(result[0]));
            })
         }
    //获得discovery页面的课程
    this.getdiscoverygoods = function(callback){
        connection.query(querydiscgoods,(err,result)=>{
            console.log(querydiscgoods)
            if(err){
                console.log(err);
                return;
            }
            // console.log(JSON.stringify(result))
            // callback(err,JSON.stringify(result[0]));
            callback(err,JSON.stringify(result));
        })
    }
    
    connection.release()
}
module.exports = selectsql

// connection.end();