import express from 'express'
import morgan from 'morgan'
import {createLogStream} from './helpers/createLogStream.js'

const app = express()

app.use(morgan(':date[web] ":method :url" :status :res[content-length] - :response-time ms', {
    stream: createLogStream('logs'),
}))
app.use(morgan(':date[web] ":method :url" :status :res[content-length] - :response-time ms'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    console.log(`error ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).send(error.message)
}
app.use(errorHandler)
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`)
})