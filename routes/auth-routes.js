const express = require("express")

const jwt = require("jsonwebtoken");

const argon2 = require("argon2")

const router = express.Router()

const { validation, loginValidation, registerValidation } = require("../middleware/validation")

router.post("/login", validation, loginValidation, async (req, res) => {
    try {
        const { username, password } = req.body

        const normalizedUsername = username.toLowerCase()

        const db = req.app.locals.db

        const users = db.collection("users")

        const user = await users.findOne({ username: normalizedUsername })

        if (!user) {
            return res.status(404).json({
                message: "User not Found. Authentication Failed",
                data: null
            })
        }

        const isValid = await argon2.verify(user.password, password)

        if (isValid) {

            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    username: user.username
                },
                process.env.JWT_SESSION_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 60 * 60 * 1000
            });

            return res.status(200).json({
                message: "Authentication Successful",
                data: {
                    username,
                    id: user._id
                }
            })
        } else {
            return res.status(404).json({
                message: "Username or Password. Authentication Failed",
                data: null
            })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "Internal Server Error. Authentication Failed",
            data: null
        })
    }
})

router.post("/register", validation, registerValidation, async (req, res) => {
    try {
        const { username, password } = req.body

        const db = req.app.locals.db

        const users = db.collection("users")

        const normalizedUsername = username.toLowerCase().trim()

        const exists = await users.findOne({ username: normalizedUsername })

        if (exists) {
            return res.status(400).json({
                message: `User with Username ${normalizedUsername} Already Exists.`,
                data: null
            })
        }

        const hashedPassword = await argon2.hash(password)

        const user = { username: normalizedUsername, password: hashedPassword }

        await users.insertOne(user)

        return res.status(201).json({
            message: "User Created Successfully",
            data: {
                id: user._id.toString(),
                username
            }
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Internal Server Error. Unable to Create User",
            data: null
        })
    }

})

router.post("/logout", (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    });

    res.status(200).json({
        message: "Logout successful"
    });
});

module.exports = router