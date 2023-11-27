import {updateUsers, users} from '../mock/users.js'
import {findUserByEmail} from '../helpers/findUserByEmail.js'

export const getUsers = (req, res, next) => {
    try {
        res.data = users
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

export const getUserByEmail = (req, res, next) => {
    try {
        const {email} = req.params

        if (!email)
            throw new Error('You should provide email')
        if (typeof email !== 'string')
            throw new Error('Email must be  type of string')

        const user = findUserByEmail(users, email)

        if (!user)
            throw new Error('The user with the specified email was not found')

        res.data = user
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

export const removeUserByEmail = (req, res, next) => {
    try {
        const {email} = req.body

        if (!email)
            throw new Error('You should provide email')
        if (typeof email !== 'string')
            throw new Error('Email must be type of string')

        const user = findUserByEmail(users, email)

        if (!user)
            throw new Error('The user with the specified email was not found')

        res.data = updateUsers(email)
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}