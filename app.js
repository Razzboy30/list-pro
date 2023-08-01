//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser");

var WorkList = [];
var items = [];

const app = express();
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get("/",function (req,res){
    var today = new Date();
    var currentDay = today.getDay();
    var options = {
        weekday: "long",
        month : "short",
        day : "numeric"
    }

    var day = today.toLocaleDateString("en-US",options)
    res.render("list", {
        newItems : items,
        listTitle : day
    })
    
})

app.post("/",(req,res)=>{
    var item = req.body.newItem;
    if (req.body.list === 'Work') {
        WorkList.push(item)
        res.redirect("/work");
    } else {
        items.push(item);   
        res.redirect("/");
    }
    
})

app.get("/work",(req,res)=>{
    res.render("list", {
        newItems : WorkList,
        listTitle : "Work List"
    })

    console.log(WorkList);
})
app.post("/work",(req,res)=>{
    var wItem = req.body.newItem;

    WorkList.push(wItem);
    res.redirect("/work");
})

app.get("/about",(req,res)=>{
    res.render("about")
})
app.listen(3000,()=>{
    console.log("Server Started");
})
