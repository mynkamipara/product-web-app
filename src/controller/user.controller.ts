import { Container } from 'typedi';
import config from '../config';
import { User } from '../interfaces/user.interface';
import userModel from '../models/user.model';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dtos';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto-js';

export class UserController {

    static async SignUpUser(data: CreateUserDto) {
        try {
            const userCheck = await userModel.findOne({ email: data.email });
            console.log(userCheck,'-userCheck')

            if (userCheck) return { status: 302, message: 'Email already exists' };

            const createUser = new userModel({
                ...data,
                active: true
            })

            await createUser.save();

            return {
                status: 200,
                message: `User Register Successfully.`,
            };
        } catch (error) {
            return { status: 500, message: 'Something went wrong!' };
        }
    }

    static async logInUser(data: LoginUserDto) {
        try {
            const user: any = await userModel.findOne({ email: data.email });

            if (!user) return { status: 404, message: 'Email does not exists.' };

            const checkPassword = await user.comparePassword(data.password);
            console.log(checkPassword,'-checkPassword')

            if (!checkPassword) {
                return { status: 404, message: 'Password is Wrong.' };
            }


            const token_data = { userId: user._id, email: user.email };
            console.log(token_data,'-token_data')

            // Encrypt
            const ciphertext = crypto.AES.encrypt(JSON.stringify(token_data), config.aesSecretkey);

            //Sign JWT
            const token = jwt.sign({ sub: ciphertext.toString() }, config.jwtSecret, {
                expiresIn: config.jwtetl,
            });

            return {
                status: 200,
                message: 'Sucessfully LogIn',
                result: {
                    firstName: user.firstName,
                    lastName: user.lastNamem,
                    email: user.email,
                    user_id: user._id,
                    token: token,
                },
            };
        } catch (error) {
            return { status: 500, message: 'Something went wrong!' };
        }
    }

    static async protectedRoute() {
        const tokenData = Container.get('auth-token');
        try {

            return { status: 200, data: [{ name: 'Mayank Amipara ckndvnkfjdvj', tokenInfo:tokenData }] }
        } catch (error) {
            return { status: 500, message: 'Something went wrong' };
        }
    }



}
