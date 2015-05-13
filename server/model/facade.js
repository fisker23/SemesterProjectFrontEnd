/**
 * Created by Fisker on 12-05-2015.
 */
db = require("./db");
var mongoose = require('mongoose');
var User = mongoose.model("User");



function _addUser(inusername, inemail, inpassword){
    var newUser = new User({
        username: inusername,
        email: inemail,
        password: inpassword
    })
    newUser.save(function(err, newUser) {
        if (err) return console.error(err);
        //console.dir(newUser);
    });
}

_addUser("Lars","lam@cphbusiness.dk","test")
//user.addUser({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
//user.addUser({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
//
//
//user.addUser({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})

module.exports = {
    addUser: _addUser
}