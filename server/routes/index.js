var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var Info = mongoose.model('info', {task: String, flag: Boolean});



router.get("/todo", function(req, res, next){
    return Info.find({}).exec(function(err, info){
        if (err) throw new Error(err);
        res.send(JSON.stringify(info));
    });
});

router.post("/todo", function(req, res, next){
    console.log(req.body);
    var info = new Info({task: req.body.task, flag: false});
    info.save(function(err){
        if(err) console.log('Broke this: ', err);
        res.send("maybe");
    });
});

router.delete("/todo/:id", function(req, res, next){    //used remove and called the ID off the body object
    Info.findByIdAndRemove(req.params.id, {task: req.body.task}, function(err) {
        if (!err) {
        }
        else {
            console.log('Delete Failed');
        }
    });
    res.send("Im a doctor not a poolman!");
});

router.put("/todo/:id", function(req, res, next){
    Info.findByIdAndUpdate(req.params.id, {task: req.body.task, flag: !req.body.flag}, function() {
    });
    res.send("Task complete!(zorg zorg)");
});

router.get("/*", function(req, res, next){      //wildcard picks up all else
    var file = req.params[0] || "/assets/views/index.html";
    res.sendFile(path.join(__dirname, '../public/', file));
});



module.exports = router;