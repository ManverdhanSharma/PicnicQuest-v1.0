const express =
require("express");

const router =
express.Router();

const ActivityLog =
require(
"../models/ActivityLog"
);

router.get(
"/:username",

async(req,res)=>{

try{

const logs =

await ActivityLog.find({

username:
req.params.username

})

.sort({
timestamp:1
});

const monthlyMap = {

Jan:{
month:"Jan",
Bookings:0,
Reviews:0
},

Feb:{
month:"Feb",
Bookings:0,
Reviews:0
},

Mar:{
month:"Mar",
Bookings:0,
Reviews:0
},

Apr:{
month:"Apr",
Bookings:0,
Reviews:0
},

May:{
month:"May",
Bookings:0,
Reviews:0
},

Jun:{
month:"Jun",
Bookings:0,
Reviews:0
}

};

let historyCount=0;
let foodCount=0;
let natureCount=0;

logs.forEach((log)=>{

const monthStr =

new Date(
log.timestamp
)

.toLocaleString(
"en-US",
{
month:"short"
}
);

if(
monthlyMap[
monthStr
]
){

if(
log.action==="BOOKING"
){

monthlyMap[
monthStr
]
.Bookings++;

}

if(
log.action==="REVIEW"
){

monthlyMap[
monthStr
]
.Reviews++;

}

}

const details =

(
log.details
||
""
)

.toLowerCase();

if(

details.includes(
"mahabalipuram"
)

){

historyCount++;

}
else if(

details.includes(
"food"
)

){

foodCount++;

}
else{

natureCount++;

}

});

res.json({

chartData:
Object.values(
monthlyMap
),

donutData:[

{
name:
"Historical",

value:
historyCount,

color:
"#6366f1"
},

{
name:
"Food",

value:
foodCount,

color:
"#f59e0b"
},

{
name:
"Nature",

value:
natureCount,

color:
"#10b981"
}

]

});

}
catch(error){

res.status(500)
.json({

message:
"Analytics failed"

});

}

}

);

module.exports =
router;