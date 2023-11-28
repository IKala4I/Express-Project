import {updateUsers, users} from '../mock/users.js'
import {findUserByEmail} from '../helpers/findUserByEmail.js'
import {ifUserExist} from '../helpers/ifUserExist.js'

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

export const createNewUser = (req, res, next) => {
    try {
        /*firstName: 'Michael',
                lastName: 'Brown',
                email: 'michaelbrown@example.com',
                password: 'brownie123',
                age: 35,
                address: {
                    street: '222 Maple St',
                    city: 'Maplewood',
                    state: 'NJ',
                    zip: '45678',
                    country: 'USA'
                },
                createdAt: '2023-05-10T12:59:18.901Z',
                tags: ['Management', 'Leadership']*/
        const {email, password} = req.body
        const emailRegExp = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!email || !password)
            throw new Error('Email and password are required')

        if (typeof email !== 'string' || typeof password !== 'string')
            throw new Error('Email and password must be type of string')

        if (!emailRegExp.test(email))
            throw new Error('Incorrect email')

        if (ifUserExist(users, email))
            throw new Error('The user with the specified email exists already')

        if (password.length < 8)
            throw new Error('Password must contain at least 8 symbols')

        const user = {
            firstName: '',
            lastName: '',
            email: email,
            password: password,
            age: 0,
            address: {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            createdAt: new Date().toISOString(),
            tags: []
        }

        const {firstName, lastName, age, address, tags} = req.body


    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}