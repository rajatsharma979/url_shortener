import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/userModel.js";
import { userType, loginData, signupData } from "../types/authTypes.js";

const generateTokens = (user: userType) => {
    const accessToken = jsonwebtoken.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email
        },
        process.env.JWT_Access_Secret!,
        { expiresIn: Number(process.env.JWT_Access_Token_Expiry) }

    );

    const refreshToken = jsonwebtoken.sign(
        {
            id: user._id
        },
        process.env.JWT_Refresh_Secret!,
        { expiresIn: Number(process.env.JWT_Access_Token_Expiry) }
    )
    return { accessToken, refreshToken };
}

const postSignup = async (req: Request, res: Response) => {

    try {
        const body = req.body as signupData;

        const name = body.name;
        const email = body.email;
        const pwd = body.password;

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            res.status(400).json({ 'error': validationErrors.array()[0].msg });
            return;
        }

        const encrptdPwd = await bcrypt.hash(pwd, 12);

        const user = new User({
            name: name,
            email: email,
            password: encrptdPwd
        });

        await user.save();

        res.status(200).json({ "msg": "User registered successfully" });

        // const info = transporter.sendMail({
        //     to: email,
        //     from: 'alexandre.the.conquerer@gmail.com',
        //     subject: 'SignUp successful',
        //     html: `<h1>Welcome to Open Aura</h1><p> We welcome you ${name} to our platform </p>`
        // }, (err) => {
        //     if (err) {
        //         console.log("Error in sending mail", err);
        //     }
        // });

        return;
    }
    catch (err) {
        console.log("Internal server error in registering user");
        // implement centralized error handling below and in all catch blocks
        res.status(500).json({'err': 'Error registrting user'});
    }
}

const postLogin = async (req: Request, res: Response) => {

    console.log("frontend url in post login", process.env.Frontend_Url);
    try {
        const body = req.body as loginData;

        const uEmail = body.email;
        const pwd = body.password;

        const validationErrors = validationResult(req);


        if (!validationErrors.isEmpty()) {
            res.status(400).json({ 'error': validationErrors.array()[0].msg });
            return;
        }

        const user = await User.findOne({ email: uEmail }) as userType;

        if (!user) {
            res.status(401).json({ 'error': "Invalid email or password" });
            return;
        }

        const isMatch = await bcrypt.compare(pwd, user.password);

        if (!isMatch) {
            res.status(401).json({ 'error': "Invalid email or password" });
            return;
        }
        // user authenticated successfully

        const { accessToken, refreshToken } = generateTokens(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,             // set this true in production as it sends cookie over https only
            sameSite: "strict",         // can be set to lax also. The cookie is sent with same-site requests and with "safe" cross-site requests like GET requests originating from links. 
            maxAge: Number(process.env.Access_Token_Cookie_Expiry)         //15 min in millis
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,            // set this true in production as it sends cookie over https only
            sameSite: 'strict',        // can be set to lax also. The cookie is sent with same-site requests and with "safe" cross-site requests like GET requests originating from links.
            maxAge: Number(process.env.Refresh_Token_Cookie_Expiry)              //1 day in millis
        })

        res.status(200).json({ "msg": "logged in successfully", name: user.name});
        return;
    }
    catch (err) {
        //handle error;
        console.log("Internal server in verifying login", err);
        res.status(500).json("");
    }
}

export default {
    postSignup,
    postLogin,
}