import jwt from 'jsonwebtoken';
import { PayloadProps } from '../types/payload';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET!;
const expiration = '24h';

export function signToken(user: PayloadProps): string {
    const payload = { 
        id: user.id,
        email: user.email
    };

    return jwt.sign(payload, secret, { expiresIn: expiration });
};