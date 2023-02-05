const express = require('express')

const router = express.Router()

const baseUrl = 'http://localhost:5000'
const User = require(".models/authModel");

//register 
router.post("/register", async (req, res) => {

            // Our register logic starts here
            try {
                //input user
                const {
                    full_name,
                    username,
                    password
                } = req.body;

                // Validate user input
                if (!(username && password && full_name)) {
                    res.status(400).send("All input is required");
                }

                // check if user already exist
                // Validate if user exist in our database
                const oldUser = await User.findOne({
                    username
                });

                if (oldUser) {
                    return res.status(409).send("User Already Exist. Please Login");
                }

                //Encrypt user password
                encryptedPassword = await bcrypt.hash(password, 10);

                // Create user in our database
                const user = await User.create({
                    full_name,
                    username,
                    // email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: encryptedPassword,
                });

                // Create token
                const token = jwt.sign({
                        user_id: user._id,
                        email
                    },
                    process.env.TOKEN_KEY, {
                        expiresIn: "1h",
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