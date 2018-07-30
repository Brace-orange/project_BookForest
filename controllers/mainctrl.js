var Ydbook=require("../models/BooksData.js");
var formidable=require("formidable");

exports.showIndex=function(req,res){
  res.render("index");
}

exports.showAdd=function(req,res){
   res.render("add");
}

exports.DoAddYdbook=function(req,res){
     var form = new formidable.IncomingForm();
     form.parse(req,function(err,fields,files){
       Ydbook.addYdbook(fields,function(csp){

           res.json({"csp":csp});
       });

     });
}
//检查用户名是否被书写，RestFul请求
exports.showCheck=function(req,res){
  var shuming=req.params.shuming;
  Ydbook.checkYdbook(shuming,function(results){
    res.json({"results":results});
  });

}

exports.showAllYdbook=function(req,res){
  Ydbook.find({},function(err,results){
    res.json({"results":results});
  });
}

exports.showUpdateydbook=function(req,res){
  var shumingup=req.params.shuming;
  Ydbook.find({"shuming":shumingup},function(err,results){
    if(results.length==0){res.send("已读书单里没有此书，请检查网址")}
    res.render("update",{
    info: results[0]
  });});
}

exports.doUpdateYdbook=function(req,res){
  var form=new formidable.IncomingForm();
  form.parse(req,function(err,fields,file){
    Ydbook.find({"shuming":req.params.shuming},function(err,results){
      if(results.length==0){
        res.send("没有此书");
        return;
      }
      var theydbook=results[0];
      theydbook.leibie=fields.leibie;
      theydbook.zuozhe=fields.zuozhe;
      theydbook.cishu=fields.cishu;
     theydbook.save(function(err){
       if(err){
         res.json({
           "results":-1
         });
       }
       res.json({
         "results":1
       });
        });
    });
  });
}

exports.deleteYdbook=function(req,res){
     var shuming=req.params.shuming
  Ydbook.find({"shuming":shuming},function(err,results){
    if(err  || results==0){
      res.json({"results":-1});
    }
    results[0].remove(function(err){
      if(err){
        res.json({"results":-1});
      }
      res.json({"results":1});
    });
  });

}
