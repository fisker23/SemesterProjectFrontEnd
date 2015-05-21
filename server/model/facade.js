/**
 * Created by Fisker on 12-05-2015.
 */
db = require("./db");
var mongoose = require('mongoose');
var request = require('request');
var User = mongoose.model("User");
var airline = mongoose.model("Airline");
var bodyParser = require('body-parser');

//var bob = new airline({URLtosite: 'http://semesterproject-testnikolai1.rhcloud.com/SemesterProjectFligths/', name: 'Gruppe03'});
//bob.save(function(err) {
//    if (err) return console.error(err)});
//var bob2 = new airline({URLtosite: 'http://libertyjet-team05.rhcloud.com/', name: 'LibertyJet'});
//bob2.save(function(err) {
//    if (err) return console.error(err)});
//var bob3 = new airline({URLtosite: 'http://Airline7-team007.rhcloud.com', name: 'Gruppe07'});
//bob3.save(function(err) {
//    if (err) return console.error(err)});

//
//})
//({URLtosite: 'http://semesterproject-testnikolai1.rhcloud.com/SemesterProjectFligths/', name: 'Gruppe03'}.save(function(err, result){
//
//})
//({URLtosite: 'http://libertyjet-team05.rhcloud.com/', name: 'LibertyJet'}.save(function(err, result){
//
//})
//({URLtosite: 'http://Airline7-team007.rhcloud.com', name: 'Gruppe07'}.save(function(err, result){
//
//})


function _addUser(uName, uEmail, uPw){
    var newUser = new User({
        userName: uName,
        email: uEmail,
        pw: uPw

    })
    newUser.save(function(err, newUser) {
        if (err) return console.error(err);
        //console.dir(newUser);
    });
}

function getAllAvailableFlights(callback) {

    airline.find({}, function(err, result){

        result.forEach(function(data){

            request(data.URLtosite+'api/flights', function(err, data){
                callback(null, data);
            })

        })

    });

}
function _checkUser(uName,uPw,callback){
    User.findOne({userName : uName, pw: uPw}, function(err, result){
       // console.log(result)
    callback(result);
    });
    //User.find(usertoCheck)
   // console.log(User.find(usertoCheck));
}

//_addUser("Lars","HAADASDJOKL","test")
//_addUser("Allan","HASSAN@cphbusiness.dk","test")
//_addUser("HADI ABDUL","SKINKE@cphbusiness.dk","test")
//
//getAllAvailableFlights(function(item){
//
//});
//_checkUser("henning","kage");

module.exports = {
    addUser: _addUser,
    checkUser: _checkUser,
    getAllAvailableFlights: getAllAvailableFlights

}