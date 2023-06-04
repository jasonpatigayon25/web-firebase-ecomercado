const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://jasonpatigayon25:%40JasonPatz236@cluster0.qgadfaa.mongodb.net/sysarchdb")
.then(()=>{
    console.log("MongoDB is connected");
})
.catch(()=>{
    console.log('MongoDB connection failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("users",newSchema)

module.exports=collection