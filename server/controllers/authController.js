const bcrypt = require("bcrypt");
const User = require("../models/User");

const logActivity =
require(
"../utils/activityLogger"
);

exports.register =
async(req,res)=>{

try{

const {
username,
password
}
=
req.body;

const hashedPassword =

await bcrypt.hash(
password,
10
);

const newUser =
new User({

username,

password:
hashedPassword,

badges:[],

stats:{
totalBookings:0,
totalReviews:0,
lastActivity:
new Date()
}

});

await newUser.save();


// NEW LOG

await logActivity(

username,

"SIGNUP",

"Account created"

);

res.json({

message:
"✅ Registration successful!"

});

}
catch(error){

res.status(500)
.json({

message:
"❌ Error registering user"

});

}

};

exports.login =
async(req,res)=>{

try{

const {
username,
password
}
=
req.body;

const user =
await User.findOne({

username

});

if(!user){

// NEW LOG

await logActivity(

username,

"LOGIN_FAILED",

"User not found"

);

return res
.status(400)
.json({

message:
"❌ User not found"

});

}

const isMatch =

await bcrypt.compare(

password,

user.password

);

if(!isMatch){

// NEW LOG

await logActivity(

username,

"LOGIN_FAILED",

"Incorrect password"

);

return res
.status(400)
.json({

message:
"❌ Incorrect password"

});

}


// NEW LOG

await logActivity(

username,

"LOGIN",

"User logged in"

);

res.json({

message:
"✅ Login successful!",

user:{

username:
user.username

}

});

}
catch(error){

res.status(500)
.json({

message:
"❌ Error logging in"

});

}

};