export const errorHandler = (err, req, res, next) => {
    console.error("Global Error Handler caught:", err.message);

    const message = err.message || "An unexpected error occurred.";
    let status = 500;

    if (message.includes("not found")) {
        status = 404;
    } else if (
        message.includes("Invalid") ||
        message.includes("required") ||
        message.includes("Allowed values")
    ) {
        status = 400;
    }

    return res.status(status).json({
        success: false,
        error: message
    });
};