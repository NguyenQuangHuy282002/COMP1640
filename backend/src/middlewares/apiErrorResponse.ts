export const apiErrorResponse = (message, statusCode, res) => {
    res.status(statusCode).json({
        'success': false,
        'message': message
    })
}