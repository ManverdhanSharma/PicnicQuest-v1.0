const Booking =
require("../models/Booking");

const User =
require("../models/User");

const logActivity =
require(
"../utils/activityLogger"
);

exports.bookPicnic =
async(req,res)=>{

try{

const newBooking =
new Booking(req.body);

await newBooking.save();

if(req.body.username){

const user =
await User.findOne({

username:
req.body.username

});

if(user){

user.stats.totalBookings =

(
user.stats.totalBookings
||
0
)

+1;

user.stats.lastActivity =
new Date();


// NEW — Booking Activity Log

await logActivity(

req.body.username,

"BOOKING",

`Booked ${
req.body.eventName
||
"Picnic Event"
}`

);


// FIRST BOOKING BADGE

if(

user.stats.totalBookings===1

&&

!user.badges.some(

b=>

b.name===

"First Booking"

)

){

user.badges.push({

name:
"First Booking",

description:
"Made your first booking",

icon:
"/badges/first-booking.svg"

});


// NEW — Badge Activity Log

await logActivity(

req.body.username,

"BADGE_EARNED",

"Earned First Booking badge"

);

}


// BOOKING PRO BADGE

if(

user.stats.totalBookings>=5

&&

!user.badges.some(

b=>

b.name===

"Booking Pro"

)

){

user.badges.push({

name:
"Booking Pro",

description:
"Made 5 or more bookings",

icon:
"/badges/booking-pro.svg"

});


// NEW — Badge Activity Log

await logActivity(

req.body.username,

"BADGE_EARNED",

"Earned Booking Pro badge"

);

}

await user.save();

}

}

res
.status(201)
.json({

message:
"✅ Picnic booking successful!"

});

}
catch(error){

res
.status(500)
.json({

message:
"❌ Error saving booking",

error:
error.message

});

}

};

exports.getBadges =
async(req,res)=>{

try{

const user =
await User.findOne({

username:
req.params.username

});

if(

!user

||

!user.badges

){

return res.json([]);

}

res.json(

user.badges

);

}
catch(error){

res
.status(500)
.json({

message:
"Error fetching badges",

error:
error.message

});

}

};