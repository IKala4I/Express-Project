import {getStudentStatistics, getStudentWithWorstScore} from '../controllers/students.controller.js'
import {responseMiddleware} from '../middlewares/response.middleware.js'

export default (router, url) => {
    router.get(`${url}`, getStudentStatistics, responseMiddleware)
    router.get(`${url}/worst/:type`, getStudentWithWorstScore, responseMiddleware)
}