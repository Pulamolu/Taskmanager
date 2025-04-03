const express=require('express')
const app=express()
const tasks=require('./routes/tasks')
const connectDB =require('./db/connect')

const PORT=3000

app.use(express.static('./public'))
app.use(express.json())

app.get('/hello',(req,res)=>{
    console.log(req.body);
    res.status(200).send("Task Manager App")

})

app.use('/api/v1/tasks',tasks)

const startServer=async() =>{
await connectDB
app.listen(PORT,console.log(`Server running on ${PORT}.....`))
}

startServer()