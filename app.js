import express from 'express'
import morgan from 'morgan'
import {createLogStream} from './helpers/createLogStream.js'
import router from './routes/index.js'
import {errorMiddleware} from './middlewares/error.middleware.js'

const app = express()

app.use(morgan(':date[web] ":method :url" :status :res[content-length] - :response-time ms', {
    stream: createLogStream('logs'),
}))
app.use(morgan(':date[web] ":method :url" :status :res[content-length] - :response-time ms'))
app.use(express.json())


const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(router())

app.use(errorMiddleware)

export default app