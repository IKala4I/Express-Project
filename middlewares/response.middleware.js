export const responseMiddleware = (req, res, next) => {
    if (res.error) {
        const {message} = res.error
        return res.json({
            error: true,
            message
        })
    }
    return res.json(res.data)
}