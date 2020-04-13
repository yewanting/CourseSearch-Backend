var selectsql = require('./sql/select')
var express = require('express')

var bodyParser = require('body-parser')
var app = express();


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
    var objselect = new selectsql(searchval,curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,null);
    // objselect.getjson 获得搜索的全部课程,select.js里面的函数
    objselect.getjson(function(err,data){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//让中文正常显示
        // console.log(data);
        console.log("成功返回对象")
        res.end(JSON.stringify(data));

        
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

    var objselect = new selectsql(searchval,curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,null);
    // objselect.getcount 获得搜索的全部课程数量,select.js里面的函数

    // 获得搜索课程的总数；
    objselect.getcount(function(err,data){
        console.log("成功返回数据")
        res.end(data)
    });
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
    var objselect = new selectsql(searchval,curpage,pagesize,coursesourse,isFree,isSort,minprice,maxprice,coursetotallabel);
    // objselect.getcount 获得搜索的全部课程数量,select.js里面的函数

    // 获得搜索课程的总数；
    objselect.getdiscoverygoods(function(err,data){
        console.log("成功返回数据")
        res.end(data)
    });
})

app.get('/api/test',urlencodedParser,async function(req,res){

    
   
        res.end("傻猪猪！")
  
})

var server = app.listen(8081,function(){
    console.log("成功！")
})



