import express from 'express'
import users from './users.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('response from index.js router')
})

export default () => {
    users(router, '/api/users')
    return router
}