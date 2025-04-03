const mongoose=require('mongoose')

const  connectionString=mongoose.connect('mongodb+srv://hemasri:H1234@hema1.8dmaeml.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Hema1')

const connectDB =  () =>{

    return mongoose.connect(connectionString)

}

module.exports=connectDB;

