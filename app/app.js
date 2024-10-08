require('dotenv').config()
require('express-async-errors')
const express = require('express')

app = express()

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

app.get("/", (req, res) => {
    res.json({status: 'ok'})
  })

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => 
        console.log(`Server is listening on port ${port}...`)
        )
    } catch(error) {
        console.log(error)
    }
}

start()