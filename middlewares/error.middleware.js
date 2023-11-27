export const errorMiddleware = (req, res, next) => {
    const message = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)

    return res.json({
        error: true,
        message: message.message
    })
}