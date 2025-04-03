const mongoose=require('mongoose')

const TaskSchema= new mongoose.Schema({
    name: {
        type:String,
        required:[true,"name is required for the task"],
       maxlength:[20,"name cannot exceed 20 characters"],
    trim:true
}, 
    completed:{
      type:Boolean,
      default:false}
})

module.exports=mongoose.model('Task',TaskSchema)