import * as yup from 'yup'
import {students} from '../mock/students.js'
import {findStudentByWorstScore} from '../helpers/findStudentByWorstScore.js'

export const getStudentStatistics = (req, res, next) => {
    try {
        res.data = students
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(404)
    } finally {
        next()
    }
}

const typeSchema = yup
    .string()
    .oneOf(['homework', 'quiz', 'exam'], 'type must be homework, quiz or exam')

export const getStudentWithWorstScore = (req, res, next) => {
    try {
        const {type} = req.params
        typeSchema.validateSync(type)

        res.data = findStudentByWorstScore(students, type)
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(404)
    } finally {
        next()
    }
}