import express, { Request, Response } from 'express'
import { Ticket } from '../models/ticket'

import { body } from 'express-validator'

import {
    validationRequest,
    NotFoundError,
    RequireAuth,
    NotAuthorizedError,
    currentUser,
} from '@janciow1979/common'

const router = express.Router()

router.put('/api/tickets/:id',
    RequireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .not()
            .isEmpty()
            .withMessage('Price must bye grather than 0')
    ],
    validationRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id)

        if (!ticket) {
            throw new NotFoundError()
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError()
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price
        })

        await ticket.save()

        res.send(ticket)
    })

export { router as updateTicketRouter }