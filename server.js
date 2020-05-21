var selectsql = require('./sql/select')
var postuserinfo = require('./sql/postuserinfo')
var getuserinfo = require('./sql/getuserinfo')
var insertuserstar = require('./sql/insertuserstar')
var deleteuserstar = require('./sql/deleteuserstar')
var selectuserstar = require('./sql/selectuserstar')
var selectplan = require('./sql/selectplan')
var insertuserplan = require('./sql/insertuserplan')
var updateuserplan = require('./sql/updateuserplan')
var deleteuserplan = require('./sql/deleteuserplan')
var getuserluntanname = require('./sql/getuserluntanname')
var postuserluntanname = require('./sql/postuserluntanname')
var postluntancontent = require('./sql/postluntancontent')
var getluntancontent = require('./sql/getluntancontent')
var getluntanpagerscount = require('./sql/getluntanpagerscount.js')
var deleteluntan = require('./sql/deleteluntan')
var express = require('express')
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();

var pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'515136123321jy.',
        port:'3306',
        database:'coursesearch'
})

app.use(bodyParser.json());   //解析JSON数据
//创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended:false})

//解决跨域报错以下问题
//Access to XMLHttpRequest at 'http://localhost:8080/api/user/login' from origin 'http://localhost:808
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

//获取搜索框的内容


app.post('/api/postdata',urlencodedParser,async function(req,res){
 
    var searchval = req.body["searchtext"]; //获取到搜索框的内容
    var curpage = req.body["curpage"];
    var pagesize = req.body["pagesize"];
    var coursesourse = req.body["searchwebsite"];
    var isFree = req.body["isFree"];
    var isSort = req.body["isSort"];
    var minprice = req.body["minprice"];
    var maxprice = req.body["maxprice"]
    pool.getConnection(function(err,connection){
        if(err)
        throw err;
        var objselect = new selectsql(searchval,curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,null,connection);
        // objselect.getjson 获得搜索的全部课程,select.js里面的函数
        objselect.getjson(function(err,data){
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//让中文正常显示
            // console.log(data);
            console.log("成功返回对象")
            res.end(JSON.stringify(data));
    
            
        })
    })




    // 获得搜索课程的总数；
    // objselect.getcount(function(err,data){
    //     res.end(data)
    // });
})

app.post('/api/getcount',urlencodedParser,async function(req,res){
    
    // console.log(req.body)
    
    var searchval = req.body["searchtext"]; //获取到搜索框的内容
    var curpage = req.body["curpage"];
    var pagesize = req.body["pagesize"];
    var coursesourse = req.body["searchwebsite"];
    var isFree = req.body["isFree"];
    var isSort = req.body["isSort"];
    var minprice = req.body["minprice"];
    var maxprice = req.body["maxprice"]
    
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        var objselect = new selectsql(searchval,curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,null,connection);
        // objselect.getcount 获得搜索的全部课程数量,select.js里面的函数
    
        // 获得搜索课程的总数；
        objselect.getcount(function(err,data){
            console.log("成功返回数据")
            res.end(data)
        });
    })

})
app.post('/api/gethomegoods',urlencodedParser,async function(req,res){

    var searchval = req.body["searchtext"]; //获取到搜索框的内容
    var curpage = req.body["curpage"];
    var pagesize = req.body["pagesize"];
    var coursesourse = req.body["searchwebsite"];
    var isFree = req.body["isFree"];
    var isSort = req.body["isSort"];
    var minprice = req.body["minprice"];
    var maxprice = req.body["maxprice"];
    var coursetotallabel = req.body["coursetotallabel"]

    pool.getConnection(function(err,connection){
        if(err)
        throw err

        var objselect = new selectsql(searchval,curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,coursetotallabel,connection);
        // objselect.getcount 获得搜索的全部课程数量,select.js里面的函数
        // 获得搜索课程的总数；
        objselect.getdiscoverygoods(function(err,data){
            console.log("成功返回数据")
            res.end(data)
        });
    })

})
app.post('/api/postuserinfo',urlencodedParser,async function(req,res){

    // console.log(req.body["username"]);
    // console.log(req.body["password"])
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        postuserinfo(req.body,connection,IfInsert=>{
            res.end(IfInsert);
        });
    })

})


app.post('/api/getuserinfo',urlencodedParser,async function(req,res){

    // console.log(req.body["username"]);
    // console.log(req.body["password"])
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        getuserinfo(req.body,connection,Ifexits=>{
            res.end(Ifexits);
        });
    })

})

app.post('/api/insertuserstar',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        insertuserstar(req.body,connection,IfStar=>{
            res.end(IfStar);
        });
    })

})

app.post('/api/deleteuserstar',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        deleteuserstar(req.body,connection,IfCancelStar=>{
            // console.log(IfCancelStar)
            res.end(IfCancelStar);
        });
    })

})

app.post('/api/selectuserstar',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        selectuserstar(req.body,connection,IfExitsStar=>{
            // console.log(IfExitsStar)
            res.end(IfExitsStar);
        });
    })

})

app.post('/api/selectplan',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err 
        selectplan(req.body,connection,IfExitsPlan=>{
            // console.log(IfExitsPlan)
            res.end(IfExitsPlan);
        });
    })

})


app.post('/api/insertuserplan',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        insertuserplan(req.body,connection,IfInsertPlan=>{
            // console.log(IfInsertPlan)
            res.end(IfInsertPlan);
        });
    })


})

app.post('/api/updateuserplan',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        updateuserplan(req.body,connection,IfupdatePlan=>{
            // console.log(IfInsertPlan)
            res.end(IfupdatePlan);
        });
    })

})

app.post('/api/deleteuserplan',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        deleteuserplan(req.body,connection,IfDeletePlan=>{
            // console.log(IfInsertPlan)
            res.end(IfDeletePlan);
        });
    })

})

app.post('/api/getuserluntanname',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        getuserluntanname(req.body,connection,IfGetName=>{
            // console.log(IfGetName)
            res.end(IfGetName);
        });
    })

})

app.post('/api/postuserluntanname',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        postuserluntanname(req.body,connection,IfpostName=>{
            // console.log(IfGetName)
            res.end(IfpostName);
        });
    })

})

app.post('/api/postluntancontent',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        postluntancontent(req.body,connection,IfpostLuntanContent=>{
            // console.log(IfGetName)
            res.end(IfpostLuntanContent);
        });
    })

})

app.post('/api/getluntancontent',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        getluntancontent(req.body,connection,IfgetLuntanContent=>{
            // console.log(IfGetName)
            res.end(IfgetLuntanContent);
        });
    })

})



app.post('/api/getluntanpagerscount',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        getluntanpagerscount(req.body,connection,Ifgetpagerscount=>{
            // console.log(IfGetName)
            res.end(Ifgetpagerscount);
        });
    })

})

app.post('/api/deleteluntan',urlencodedParser,async function(req,res){
    pool.getConnection(function(err,connection){
        if(err)
        throw err
        deleteluntan(req.body,connection,Ifdelete=>{
            // console.log(IfGetName)
            res.end(Ifdelete);
        });
    })

})




var server = app.listen(8081,function(){

    console.log("成功！")
})



