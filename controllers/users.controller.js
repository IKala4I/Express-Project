import {updateUsers, users} from '../mock/users.js'
import {findUserByEmail} from '../helpers/findUserByEmail.js'
import {ifUserExist} from '../helpers/ifUserExist.js'
import * as yup from 'yup'

const createUserSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    firstName: yup.string().default(''),
    lastName: yup.string().default(''),
    age: yup.number().positive('Age must be a positive number').min(12, 'You must be over 12 years old').required('Age is required'),
    address: yup.object()
        .typeError('Address must be an object. (Optional, default = empty string) street, city, state, zip, and country')
        .shape({
            street: yup.string().default(''),
            city: yup.string().default(''),
            state: yup.string().default(''),
            zip: yup.string().default(''),
            country: yup.string().default('')
        }).default({
            street: '',
            city: '',
            state: '',
            zip: '',
            county: ''
        }),
    tags: yup.array().typeError('Tags must be an array of strings')
        .of(yup.string().typeError('Tags must be an array of strings'))
        .default([]),
})

const updateUserSchema = yup.object().strict(true).shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters'),
    firstName: yup.string(),
    lastName: yup.string(),
    age: yup.number().positive('Age must be a positive number').min(12, 'You must be over 12 years old'),
    address: yup.object()
        .typeError('Address must be an object. (Optional, default = prevValue) street, city, state, zip, and country')
        .shape({
            street: yup.string(),
            city: yup.string(),
            state: yup.string(),
            zip: yup.string(),
            country: yup.string()
        }),
    tags: yup.array().typeError('Tags must be an array of strings')
        .of(yup.string().typeError('Tags must be an array of strings'))
})

export const createNewUser = (req, res, next) => {
    try {
        const {email, password, firstName, lastName, age, address, tags} = createUserSchema.validateSync(req.body)

        if (ifUserExist(users, email)) {
            throw new Error('The user with the specified email already exists')
        }

        const user = {
            firstName: firstName,
            lastName: lastName,
            email,
            password,
            age: age,
            address: address,
            createdAt: new Date().toISOString(),
            tags: tags,
        }

        users.push(user)

        res.data = user
        res.status(201)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

export const updateUserByEmail = (req, res, next) => {
    try {
        const newUserData = updateUserSchema.validateSync(req.body)
        console.log(newUserData)
        let user = findUserByEmail(users, newUserData.email)

        if (!user)
            throw new Error('The user with the specified email was not found')

        user = {
            ...user,
            ...newUserData,
            address: newUserData.address ? {
                ...user.address,
                ...newUserData.address
            } : {
                ...user.address
            },
        }

        res.data = user
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

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
        const {email} = createUserSchema.pick(['email']).validateSync(req.params)

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
        const {email} = createUserSchema.pick(['email']).validateSync(req.body)

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