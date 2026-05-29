const ActivityLog =
require(
"../models/ActivityLog"
);

const logActivity =
async(

username,
action,
details=""

)=>{

try{

await ActivityLog.create({

username,
action,
details

});

}
catch(error){

console.error(
"Activity Log Error:",
error.message
);

}

};

module.exports =
logActivity;