import request from "supertest";
import { app } from '../../app'

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

        expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is singed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

        expect(response.status).toEqual(401)
})

it('return a status other than 401 if user is singed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

        expect(response.status).not.toEqual(401)
})


it('has a route handler listening to /api/tickets for post request', () => {

})


it('return a error if an invalid price is provided', async () => {

})

it('has a route handler listening to /api/tickets for post request', () => {

})

