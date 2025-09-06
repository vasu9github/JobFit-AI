import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.BACKEND_URL}/api/auth/google/callback`
);

export const googleLogin = (req, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline', 
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
    });
    res.redirect(authUrl);
};

export const googleCallback = async (req, res) => {
    const { code } = req.query; 

    try {
        const { tokens } = await client.getToken(code);
        const idToken = tokens.id_token;
        
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: firebaseUid, name, email, picture } = payload;

        const user = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    firebaseUid, 
                    name: name || 'New User',
                    email: email,
                    profilePicture: picture || 'default_profile_pic_url',
                }
            },
            { new: true, upsert: true, runValidators: true }
        );
        
        const appTokenPayload = { id: user._id, name: user.name };
        const appToken = jwt.sign(appTokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${appToken}&user=${encodeURIComponent(JSON.stringify(user))}`);

    } catch (error) {
        console.error("Google OAuth callback error:", error);
        res.redirect(`${process.env.FRONTEND_URL}/auth?error=AuthenticationFailed`);
    }
};

