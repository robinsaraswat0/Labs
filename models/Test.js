const mongoose =  require("mongoose")

const testSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true     
    },
    testCode:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    bySex:{
        type:String,
        required:true     

    },
    sampleType:{
        type:String,
        required:true
    },
    testMethod:{
        type:String,
        required:true     

    },
    unit:{
        type:Number,   
        required:true     
    },
    range:{
        min:{
            type:Number,
            default:0
        },
        max:{
            type:Number,
            default:10
        }
    }
},{
    timestamps:true,

})

module.exports = new mongoose.model("Test",testCodeSchema)