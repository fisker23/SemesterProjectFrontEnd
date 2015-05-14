/**
 * Created by Fisker on 12-05-2015.
 */
db = require("./db");
var mongoose = require('mongoose');
var User = mongoose.model("User");



function _addUser(uName, uEmail, uPw, role){
    var newUser = new User({
        userName: uName,
        email: uEmail,
        pw: uPw,
        role: role
    })
    newUser.save(function(err, newUser) {
        if (err) return console.error(err);
        //console.dir(newUser);
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


//_checkUser("henning","kage");

module.exports = {
    addUser: _addUser,
    checkUser: _checkUser
}