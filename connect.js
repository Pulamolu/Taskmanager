const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://hemasri:H1234@hema1.8dmaeml.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=Hema1'

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connectDB

