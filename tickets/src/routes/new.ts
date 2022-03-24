import express, { Request, Response } from 'express'
import { RequireAuth } from '@janciow1979/common'

const router = express.Router()

router.post('/api/tickets', RequireAuth, (req: Request, res: Response) => {
    res.sendStatus(200)
})

export { router as createTicketRouter }