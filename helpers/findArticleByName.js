export const findArticleByName = (articles, name) => {
    return articles.find(article => article.name === name)
}