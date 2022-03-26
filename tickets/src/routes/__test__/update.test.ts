import request from "supertest";
import { app } from '../../app'
import mongoose from 'mongoose'


it('it return 404 if ticket id not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'ddd',
            price: 20
        })
        .expect(404)
})


it('it return 401 if ticket id not authicated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'ddd',
            price: 20
        })
        .expect(401)
})

it('it return 401 if the user dose not own the ticket ', async () => {
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', global.signin())
        .send({
            title: 'ddd',
            price: 20
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'ddd3',
            price: 203
        })
        .expect(401)

})

it('it return 400 if the user provide a invalid title or price ', async () => {
    const cookie = global.signin()

    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'ddd',
            price: 20
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 203
        })
        .expect(400)

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            price: 203
        })
        .expect(400)
})


it('it update ticke provide valit title and pricee ', async () => {
    const cookie = global.signin()
    const response = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'ddd',
            price: 20
        })

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'newTitle',
            price: 203
        })
        .expect(200)


    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()

        expect(ticketResponse.body.title).toEqual('newTitle')
        expect(ticketResponse.body.price).toEqual(203)
})