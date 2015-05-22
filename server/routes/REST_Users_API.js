var express = require('express');
var facade = require('../model/facade');

var router = express.Router();
router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message fetched from the server, You are logged on as a User since you could fetch this data"}');
});



router.get('/partials/:partialName', function(req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});

router.get('/flights/:air/:time',function(req,res){
    var air = req.params.air;
    var time = req.params.time;
    facade.performSearch(air,time,function(err,result){

        result.forEach(function(datan){

            if(datan instanceof Array){
                res.send(datan)
            }})
    })
})

router.get('/getreservation', function(req,res){

});
module.exports = router;
