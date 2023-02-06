const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const User = require("../models/authModel");

//register 
app.post("/register", async (req, res) => {

            // Our register logic starts here
            try {
                //input user
                const {
                    name,
                    username,
                    password
                } = req.body;

                // Validate user input
                if (!( name && username && password )) {
                    // const eror = await Promise.resolve()
                    // const salt = await bcrypt.genSaltSync(10);
                    res.status(400).send("All input is required");
                }

                // check if user already exist
                // Validate if user exist in our database
                const oldUser = await User.findOne({
                    username
                });

                if (oldUser) {
                    // const already = await Promise.resolve()
                    return res.status(409).send("User Already Exist. Please Login");
                }

                //Encrypt user password
                encryptedPassword = bcrypt.hash(password, 10 );

                // Create user in our database
                const user = await User.create({
                    name,
                    username,
                    // password,
                    // email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: encryptedPassword,
                });

                // Create token
                const token = jwt.sign({
                        user_id: user._id,
                        username
                    },
                    process.env.TOKEN_KEY, {
                        expiresIn: "2h",
                    }
                );
                // save user token
                user.token = token;

                // return new user
                res.status(201).json(user);
            } catch (err) {
                console.log(err);
            }
        });
app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const {
            username,
            password
        } = req.body;

        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({
            username
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({
                    user_id: user._id,
                    username
                },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

module.exports = app;