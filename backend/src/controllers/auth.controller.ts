import User from "../models/User";
import bcrypt from 'bcrypt';
import { generateJWToken, verifyJWTToken } from '../helpers/token.helper';
import { bcryptHash, bcryptCompare } from '../helpers/bcrypt.helper';
import { nextDay } from "date-fns";

export const createAccount = async (req, res, next) => {
    try {
        const {
            username,
            firstName,
            lastName,
            password,
            role,
            phone,
            birthday
        } = req.body;

        const isUserExists = await User.findOne({ username: username.toLowerCase() });
        if (isUserExists) {
            res.status(400).json({ message: 'Username is taken' });
        }

        const passwordHash = await bcryptHash(password);
        console.log(passwordHash);
        const name = firstName + ' ' + lastName;
        const newAccount = await new User({
            username,
            name,
            password: passwordHash,
            role,
            phone,
            birthday
        }).save();

        res.status(200).json({ success: true, savedUser: newAccount });
    }
    catch (err) {
        next(err);
    }

}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username.toString() }).select('+password');
        if (!user) {
            res.status(401).json({ message: `Invalid username or password` });
        };
        const checkPassword = await bcryptCompare(password, user.password);
        if (!checkPassword) {
            res.status(401).json({ message: `Invalid password` });
        }
        else if (!user.isActivate) {
            res.status(401).json({ message: 'Inactive account' });
        }
        
        sendTokenResponse(user, 200, res, next)
    } catch (err) {
        next;
    }
}

const sendTokenResponse = async (userData, statusCode, res, next) => {
    const payload = {
        user: {
            id: userData.id,
            username: userData.username
        }
    };

    const refreshOption = {
        expriresIn: "15d"
    }
    const accessOption = {
        expriresIn: "300s"
    }
    const cookieOptions = {
        expires: new Date(Date.now() + 169696),
        httpOnly: true
    }

    const refreshToken = generateJWToken(payload, process.env.JWT_REFRESH_SECRET, '15d');
    const accessToken = generateJWToken(payload, process.env.JWT_ACCESS_SECRET, '300s');

    setRefreshToken(refreshToken, userData, next);

    res
        .status(statusCode)
        .cookie('token', refreshToken, cookieOptions)
        .json({ 
            "success": true,
            userData, 
            "accessToken": accessToken,
            "refreshToken": refreshToken
        })
}

const setRefreshToken = async (token: string, userData, next) => {
    try {
        await new User(userData).save();
    }
    catch (err) {
        next(err);
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = await User.findOne({ _id: req.user.id}).select('token');
        if (refreshToken) {
            const accessOption = {
                expriresIn: 300
            }
            const decodedJWTToken = await verifyJWTToken(refreshToken, process.env.JWT_REFRESH_SECRET);
            if (decodedJWTToken) {
                const newAccessToken = await generateJWToken(decodedJWTToken, process.env.JWT_ACCESS_SECRET, accessOption);
                res.status(200).json({
                    newAccessToken: newAccessToken
                })
            }

        } else {
            res.status(401).json({
                message: "The user is not authenticated."
            })
        }
    } catch (error) {
        next(error);
    }
}