require("dotenv").config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined")
}

if (!process.env.DB_NAME) {
    throw new Error("DB_NAME is not defined")
}

if (!process.env.JWT_SESSION_SECRET) {
    throw new Error("JWT_SESSION_SECRET is not defined")
}