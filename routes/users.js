import {
    createNewUser,
    getUserByEmail,
    getUsers,
    removeUserByEmail,
    updateUserByEmail
} from '../controllers/users.controller.js'
import {responseMiddleware} from '../middlewares/response.middleware.js'

export default (router, url) => {
    router.get(`${url}`, getUsers, responseMiddleware)
    router.get(`${url}/:email`, getUserByEmail, responseMiddleware)
    router.delete(`${url}`, removeUserByEmail, responseMiddleware)
    router.post(`${url}`, createNewUser, responseMiddleware)
    router.patch(`${url}`, updateUserByEmail, responseMiddleware)
}