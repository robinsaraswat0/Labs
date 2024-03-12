const mongoose =  require("mongoose")

const organisationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    compliment:{
        type:String,
        required:true,
    },
    referralType:{
        type:String,
        enum:{
            values:["Doctor","Hospital"],
            message:`{VALUE} is not a valid`,
        },
    }
},{
    timestamps:true,
})

module.exports = new mongoose.model("Organisation",organisationSchema)