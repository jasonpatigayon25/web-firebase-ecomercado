const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://jasonpatigayon25:%40JasonPatz236@cluster0.qgadfaa.mongodb.net/ecomercadousers")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
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

const collection = mongoose.model("collection",newSchema)

module.exports=collection