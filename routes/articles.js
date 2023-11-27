import {createNewArticle, getAllArticles, updateTags} from '../controllers/articles.controller.js'
import {responseMiddleware} from '../middlewares/response.middleware.js'

export default (router, url) => {
    router.get(`${url}`, getAllArticles, responseMiddleware)
    router.post(`${url}`, createNewArticle, responseMiddleware)
    router.patch(`${url}`, updateTags, responseMiddleware)
}