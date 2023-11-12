import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import userModel from '../models/user.model.js';

export default async function (req, res) {
    try {
        const { token } = req.body;
    if (!token) {
        return res.status(401).json({msg: "Token is missing, your email can not be verified."})
    }
        const payload = jwt.verify(token, process.env.JWT_TOKEN.toString())
        const user = await userModel.findOne({ email: payload.email });
        if (user.verified) {
            return res.status(401).json({msg: 'Your email address is already verified.'})
        }
        if (user.mailedToken !== token) {
            return res.status(401).json({ msg: "The provided token is invalid, you email was not verified." });
        }
        const updatedUser = await userModel.findOneAndUpdate({
            email: payload.email
        }, {
            mailedToken: '',
            verified: true
        });
        if (!updatedUser) {
            return res.status(401).json({msg: 'Your email address could not be verified.'})
        }
        return res.status(200).json({msg: 'Email address verified successfully.'})
    } catch (e) {
        return res.status(500).json({msg: 'Invalid verification link, it may have expired.'})
    }
}