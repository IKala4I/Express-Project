import {getUserByEmail, getUsers, removeUserByEmail} from '../controllers/users.controller.js'
import {responseMiddleware} from '../middlewares/response.middleware.js'

export default (router, url) => {
    router.get(`${url}`, getUsers, responseMiddleware)
    router.get(`${url}/:email`, getUserByEmail, responseMiddleware)
    router.delete(`${url}`, removeUserByEmail, responseMiddleware)
}