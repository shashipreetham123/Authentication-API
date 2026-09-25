require("./config/env")

const express = require("express")

const cookieParser = require("cookie-parser")

const checkAuth = require("./middleware/auth")

const app = express()

const connectDB = require("./config/db")

const authRoutes = require("./routes/auth-routes")

const userRoutes = require("./routes/user-routes")

const PORT = process.env.PORT

app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.use("/api/user", checkAuth, userRoutes)

app.get("/", (req, res) => {
    res.send("Authentication Server is Running")
})


async function startServer() {
    try {
        const db = await connectDB()

        console.log("MongoDB Connected Successfully")

        app.locals.db = db

        app.listen(PORT, () => {
            console.log(`Server Started at http://localhost:${PORT}/`)
        })


    } catch (error) {

        console.error(error)

        console.log("Failed to Start Server")

        process.exit(1)

    }

}

startServer()