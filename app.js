var express = require('express');
var app = express();
var mainctrl=require("./controllers/mainctrl.js");

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/book");

app.set("view engine","ejs");

app.get('/',                        mainctrl.showIndex);
app.get('/add',                     mainctrl.showAdd);
app.propfind('/ydbook/:shuming',     mainctrl.showCheck);
app.post('/ydbook/:shuming',       mainctrl.doUpdateYdbook);
app.post('/ydbook',                 mainctrl.DoAddYdbook);
app.get('/ydbook',                  mainctrl.showAllYdbook);
app.get('/ydbook/:shuming',        mainctrl.showUpdateydbook);
app.delete('/ydbook/:shuming',      mainctrl.deleteYdbook);

app.use(express.static("./public"));
app.listen(3000);
