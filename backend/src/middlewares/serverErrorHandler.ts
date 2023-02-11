export const serverErrorHandler = (req, err, res, next) => {
    console.log(err.stack.red);

    res.status(500).json({
        success: false,
        message: err.message
    })
}