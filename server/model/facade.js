/**
 * Created by Fisker on 12-05-2015.
 */
db = require("./db");
var mongoose = require('mongoose');
var request = require('request');
var User = mongoose.model("User");
var airline = mongoose.model("Airline");
var Ticket = mongoose.model("Ticket");
var bodyParser = require('body-parser');
var async = require('async');

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

//function getAllAvailableFlights(callback) {
//var airtemp = [];
//    airline.find({}, function(err, result){
//
//        result.forEach(function(data){
//
//            request(data.URLtosite+'api/flights/BER/1432283031', function(err,res,body){
//              airtemp.push(body)
//                console.log(body)
//                callback(null, body);
//            })
//
//        })
//
//    });
//
//}


function _checkUser(uName,uPw,callback){
    User.findOne({userName : uName, pw: uPw}, function(err, result){
       // console.log(result)
    callback(result);
    });
    //User.find(usertoCheck)
   // console.log(User.find(usertoCheck));
}

var performSearch = function (startAirport, startDate ,callback){

    airline.find({}, function(err, data){
        if(err){return callback(err);}

        var tasks = [];

        for(var i = 0; i < data.length; i++){
            tasks.push(getRequest({
                url: data[i].URLtosite+"api/flights/"+startAirport+"/"+startDate,
                method: 'GET',
                json: true
            }));
        };

        async.parallel(tasks,function(err, result){
            if(err) return console.log(err);
            return callback(null, result);
        });


    });
};
var performPost = function (Passengers, flightInstanceJson, URL, userName, callback){
        var tasks = [];
            tasks.push(getRequest({
                url: URL+"api/flights/"+flightInstanceJson.flightID,
                method: 'POST',
                json: true,
                body: Passengers
            }));
        async.parallel(tasks,function(err, result){
            if(err) return console.log(err);
            var ticket = new Ticket({
                Airline: flightInstanceJson.airline,
                price: flightInstanceJson.price,
                AirportFrom: flightInstanceJson.departure,
                AirportTo: flightInstanceJson.destination,
                takeOffDate: flightInstanceJson.takeOffDate,
                landingDate: flightInstanceJson.landingDate,
                userName: userName
            })
            ticket.save(function(err, ticket) {
                if (err) return console.error(err);
            });
            return callback(null, result);
        });
};
//price : String,
//    AirportFrom : String,
//    AirportTo : String,
//    departure : String,
//    user : {userName : String,
//    email:String,
//    role: String,
//    pw: String,
//    created: Date},
//airline : String



var getRequest = function (elem){
    return (function(callback)
    {
        request(elem, function (error, response, body) {
            if (!error) {
                callback(null, body);
            }
            else {
                callback(error);
            }
        });
    });
};
//
//
//performSearch("CPH",1430784000000,function(err,res){
////console.log("data", res)
//    res.forEach(function(datan){
//
//        if(datan instanceof Array){
//            console.log(datan)
//        }})
//})
//var Passengers = {Passengers: [{firstName: "Arne",
//    lastName: "Arnesen",
//    city: "Shitville",
//    country: "Airlineland",
//    street: "PhaggotStreet"},
//    {firstName: "Arne2",
//        lastName: "Arnesen2",
//        city: "Shitville2",
//        country: "Airlineland2",
//        street: "PhaggotStreet2"}]};
//var flightInstanceJson = {
//    airline: "LibertyJet",
//    price: "1000.37",
//    flightID: "1016",
//    takeOffDate:"Jan 5, 2017 12:00:00 AM",
//    landingDate:"Jan 5, 2017 12:00:00 AM",
//    departure: "BIL",
//    destination: "BAR",
//    seats: 245,
//    freeSeats: 241,
//    bookingCode: true
//}
//performPost(Passengers, flightInstanceJson, "http://libertyjet-team05.rhcloud.com/", "carsten", function(err, datan){
//    console.log(datan);
//} )
module.exports = {
    performSearch: performSearch,
    addUser: _addUser,
    checkUser: _checkUser,
    performPost: performPost


}


