import express, { Request, Response } from 'express'
import { validationRequest, BadRequestError } from '@janciow1979/common';

import jwt from 'jsonwebtoken'
import { Password } from '../servicess/password';
import { body } from 'express-validator';
import { User } from '../models/user'

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email is not valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('you must supply a password')
    ],
    validationRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        )

        if(!passwordMatch) {
            throw new BadRequestError('Invalid credentials')
        }

        
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
            process.env.JWT_KEY!
        )

        req.session = {
            jwt: userJwt
        }

        res.status(200).send(existingUser)
    })

export { router as signinRouter }