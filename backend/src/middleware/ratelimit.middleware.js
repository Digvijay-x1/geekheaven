import rateLimit from "express-rate-limit";

// Limit each IP to 10 requests per 15 minutes for login/register
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 5 requests
    message: {
        status: 429,
        error: "Too many attempts, please try again after 15 minutes."
    },
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false,  // Disable the X-RateLimit-* headers
});
