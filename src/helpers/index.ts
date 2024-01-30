import crypto from 'crypto';

export const authentication = (salt: string, password: string): string => {
    const secret = process.env.SECRET || '';
    return crypto
        .createHmac('sha256', [salt, password].join('-'))
        .update(secret)
        .digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');
