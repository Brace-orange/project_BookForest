var mongoose=require("mongoose");
var bookschema=new mongoose.Schema({
  leibie:String,
  shuming:String,
  zuozhe:String,
  cishu:Number
});
//创建类

    bookschema.statics.addYdbook=function(json,callback){
      //增加书籍检查合法性
      this.checkYdbook(json.shuming,function(results){
      if(results){

      var yd=new Ydbook(json);
      yd. save(function(err){
        if(err){
          //服务器错误
          callback(-2);
          return;
        }
        //成功加入数据库
        callback(1);
      });
    
    //书名为空

    }
      //请求成功
      //书名号已被加入返回-1
    else {callback(-1);}

    });}




  bookschema.statics.checkYdbook=function(shuming,callback){
     this.find({"shuming":shuming},function(err,results){
      callback(results.length==0);
     });
  }
  var Ydbook=mongoose.model("Ydbook",bookschema);

module.exports=Ydbook;
