import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { RequireAuth, validationRequest } from '@janciow1979/common'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.post('/api/tickets', RequireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .not()
        .isEmpty()
        .withMessage('Price must bye grather than 0')
], validationRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        })

        await ticket.save()

        res.status(201).send(ticket)
    })

export { router as createTicketRouter }