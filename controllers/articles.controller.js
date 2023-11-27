import {articles} from '../mock/articles.js'
import {findArticleByName} from '../helpers/findArticleByName.js'

export const getAllArticles = (req, res, next) => {
    try {
        res.data = articles
        res.status(200)
    } catch (error) {
        res.error = error
        res.status
    } finally {
        next()
    }
}

export const createNewArticle = (req, res, next) => {
    try {
        const {name, description, type, tags} = req.body

        if (!name || !description || !type || !tags)
            throw new Error('Some properties are missing. You should provide a name, description, type, and array of tags')
        if (typeof name !== 'string' || typeof description !== 'string' || typeof type !== 'string')
            throw new Error('Name, description and type must be type of string')
        if (!Array.isArray(tags))
            throw new Error('tags must be array of string')

        const newArticle = {name, description, type, tags}

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

export const updateTags = (req, res, next) => {
    try {
        const {name, tags} = req.body

        if (!tags || !name)
            throw new Error('You should provide name and tags')
        if (typeof name !== 'string')
            throw new Error('Name must be type of string')
        if (!Array.isArray(tags))
            throw new Error('Tags must be array of string')

        const article = findArticleByName(articles, name)

        if (!article)
            throw new Error('The article with the specified name was not found')

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