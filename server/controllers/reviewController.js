const Review =
require("../models/Review");

const User =
require("../models/User");

const logActivity =
require(
"../utils/activityLogger"
);

exports.submitReview =
async(req,res)=>{

try{

const {

locationName,
nearestLandmark,
reason,
username

} = req.body;

if(

!locationName
||
!nearestLandmark
||
!reason

){

return res
.status(400)
.json({

message:
"❌ All fields are required!"

});

}

const newReview =
new Review({

locationName,
nearestLandmark,
reason

});

await newReview.save();


// NEW — Review Activity

if(username){

await logActivity(

username,

"REVIEW",

`Reviewed ${locationName}`

);

}

if(username){

const user =
await User.findOne({

username

});

if(user){

user.stats.totalReviews =

(
user.stats.totalReviews
||
0
)

+1;

user.stats.lastActivity =
new Date();


// FIRST REVIEW BADGE

if(

user.stats.totalReviews===1

&&

!user.badges.some(

b=>

b.name===

"First Review"

)

){

user.badges.push({

name:
"First Review",

description:
"Wrote your first review",

icon:
"/badges/first-review.svg"

});


// NEW — Badge Activity

await logActivity(

username,

"BADGE_EARNED",

"Earned First Review badge"

);

}

await user.save();

}

}

res.json({

message:
"✅ Review submitted successfully!"

});

}
catch(error){

res
.status(500)
.json({

message:
"❌ Error submitting review!"

});

}

};

exports.getReviews =
async(req,res)=>{

try{

const reviews =
await Review
.find()

.sort({

submittedAt:-1

});

res.json(reviews);

}
catch(error){

res
.status(500)
.json({

message:
"❌ Error fetching reviews!"

});

}

};