import express from 'express'
import users from './users.js'
import students from './students.js'
import articles from './articles.js'

const router = express.Router()

router.get('/', (req, res, next) => {
    res.send('Welcome to the API!')
})

export default () => {
    users(router, '/api/users')
    students(router, '/api/students')
    articles(router, '/api/articles')
    return router
}