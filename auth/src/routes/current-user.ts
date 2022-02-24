import express from 'express'

import { currentUser } from '@janciow1979/common'

const router = express.Router();

router.get(
    '/api/users/currentuser',
    currentUser,
    // RequireAuth,
    (req, res) => {
        res.send({ currentUser: req.currentUser || null })
    })

export { router as currentUserRouter }