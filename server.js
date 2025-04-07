const express = require('express')
const app = express()
const tasks = require('./routes/tasksroutes')
const auth = require('./routes/authRoutes')
const connectDB = require('./db/connect')

const PORT = 3000

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(express.static('./public'))
app.use(express.json())

app.get('/hello', (req, res) => {
    console.log(req.body)
    res.status(200).send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)
app.use('/api/v1/auth', auth)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, console.log(`Server running on ${PORT}.....`))
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()