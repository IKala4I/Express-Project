export default (router, url) => {
    router.get(`${url}`, (req, res, next) => {
        res.send('respond with a resource from Users')
    })
}