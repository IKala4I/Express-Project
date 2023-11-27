import express from 'express'
import morgan from 'morgan'
import {createLogStream} from './helpers/createLogStream.js'
import {errorHandler} from './helpers/errorHandler.js'
import router from './routes/index.js'

const app = express()

app.use(morgan(':date[web] ":method :url" :status :res[content-length] - :response-time ms', {
    stream: createLogStream('logs'),
}))
app.use(morgan(':date[web] ":method :url" :status :res[content-length] - :response-time ms'))
app.use(express.json())

app.use(errorHandler)
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`)
})

app.use(router())