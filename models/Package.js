const mongoose =  require("mongoose")

const packageSchema = new mongoose.Schema({
    testId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Test",
        required:true,
    }],
    total:{
        type:Number,
        required:true
    }
},{
    timestamps:true,
})

module.exports = new mongoose.model("Package",packageSchema)