import * as yup from 'yup'
import {articles} from '../mock/articles.js'
import {findArticleByName} from '../helpers/findArticleByName.js'

const articleSchema = yup.object().strict(true).shape({
    name: yup.string().typeError('Name must be a string').required('Name is required'),
    description: yup.string().typeError('Description must be a string'),
    type: yup.string().typeError('Type must be a string').required('Type is required'),
    tags: yup
        .array()
        .typeError('Tags must be an array of strings')
        .of(yup.string().typeError('Tags must be an array of strings'))
})

export const getAllArticles = (req, res, next) => {
    try {
        res.data = articles
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(500)
    } finally {
        next()
    }
}

export const createNewArticle = async (req, res, next) => {
    try {
        const {name, description, type, tags} = articleSchema.validateSync(req.body)

        const article = findArticleByName(articles, name)

        if (article) {
            throw new Error('The article with the specified name exists already')
        }

        const newArticle = {
            name,
            description: description ? description : '',
            type,
            tags: tags ? tags : []
        }

        articles.push(newArticle)
        res.data = newArticle
        res.status(201)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}

export const updateTags = async (req, res, next) => {
    try {
        const {name, tags} = articleSchema.pick(['name', 'tags']).validateSync(req.body)

        const article = findArticleByName(articles, name)

        if (!article) {
            throw new Error('The article with the specified name was not found')
        }

        article.tags = tags

        res.data = article
        res.status(200)
    } catch (error) {
        res.error = error
        res.status(400)
    } finally {
        next()
    }
}
