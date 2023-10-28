import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import * as jwt from 'jsonwebtoken';
import config from '../config/index';
import * as crypto from 'crypto-js';
import userModel from '../models/user.model';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    let token = <string>req.headers['authorization'];

    if(!token){
        return res.status(401).json({ status: 401, message: 'Token not exists' });
    }
    token = token.replace('Bearer ','');

    jwt.verify(token, config.jwtSecret, async function (err, decode) {
        if (err) {
            return res.status(401).json({ status: 401, message: 'Invalid auth token' });
        }

        res.locals.jwtTTL = { exp: decode.exp, jwt: token };
        const bytes = crypto.AES.decrypt(decode.sub, config.aesSecretkey);
        const decryptedData = bytes.toString(crypto.enc.Utf8);

        res.locals.jwtPayload = JSON.parse(decryptedData);
        let user = await userModel.findOne({ id: res.locals.jwtPayload.userId, active: true });
        if (user) {
            return res.status(401).json({ status: 401, message: 'Your Account is not active' });
        } else {
            Container.set('auth-token', res.locals.jwtPayload);
            next();
        }
    });
};


