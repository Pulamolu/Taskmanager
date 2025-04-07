const mongoose=require('mongoose')

const TaskSchema= new mongoose.Schema({
    title: {
        type:String,
        required:[true,"title is required for the task"],
       maxlength:[20,"title cannot exceed 20 characters"],
    trim:true
}, 
    completed:{
      type:Boolean,
      default:false}
})

module.exports=mongoose.model('Task',TaskSchema)