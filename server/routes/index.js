var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var facade = require('../model/facade');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("app/index.html")
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

router.post('/authenticate', function (req, res) {

       facade.checkUser(req.body.username,req.body.password,function(data)
       {
           console.log(data)
           if(data===null){
               res.status(401).send('Wrong user or password');
               return;
           }
           else if(data.role === 'user'){
               var token = jwt.sign(data, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60*5 });
               res.json({ token: token });
              return;
           }
           else if(data.role === 'admin'){
               var token = jwt.sign(data, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
               res.json({ token: token });
               return;
           }

       })
});


//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
  var name = req.params.partialName;
  res.render('partials/' + name);
});

router.post('/createuser/',function(req,res){
    var kage = facade.addUser(req.body.uName,req.body.uEmail,req.body.uPw);
    res.redirect('../#/view1');
})

router.get('/getflights/:airport/:datan',function(req,res){
facade.performSearch(req.params.airport,req.params.datan,function(err,data){
    data.forEach(function(item){

        if(item instanceof Array){
            console.log(item)
            res.send(item)
        }})
});

});

router.post('/makeReservation/', function(req,res){
    facade.performPost(req.body.Passengers, req.body.flightInstanceJson, req.body.URL, req.body.userName, function(err, result){
        res.send(result);
    })
})


module.exports = router;
