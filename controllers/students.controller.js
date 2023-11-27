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

export const getStudentWithWorstScore = (req, res, next) => {
    try {
        const {type} = req.params

        if (type !== 'homework' && type !== 'quiz' && type !== 'exam')
            throw new Error('type must be homework, quiz or exam')

        res.data = findStudentByWorstScore(students, type)
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(404)
    } finally {
        next()
    }
}