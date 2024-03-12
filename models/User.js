const mongoose =  require("mongoose")

const userSchema = new mongoose.Schema({
    labName:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    city:{
        type:String
    },
    address:{
        type:String
    },
    website:{
        type:String
    },
    headerImage:{
        type:String,        
    },
    footerImage:{
        type:String,
    },
    role:{
        type:String,
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,

})

module.exports = new mongoose.model("User",userSchema)