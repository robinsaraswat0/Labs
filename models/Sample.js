const mongoose =  require("mongoose")

const sampleSchema = new mongoose.Schema({
    user:{
        required:true
    },
    collectorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    testId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Test",
        required:true,
    }],
    orgId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organisation",
        required:true
    },
    place:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["Booking","Test Process","Test Result","Result Check","Report Share"],
            message:`{VALUE} is not a valid`
        },
        default:"Booking"
    },
    payment:{
        required:true
    }

},{
    timestamps:true,
})

module.exports = new mongoose.model("Sample",sampleSchema)