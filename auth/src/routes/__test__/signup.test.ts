import request from "supertest";
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: "password"
        })
        .expect(201)
})

it('returns a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@com',
            password: "password"
        })
        .expect(400)
})

it('returns a 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@com.pl',
            password: "pd"
        })
        .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@com.pl' })
        .expect(400)

    await request(app)
        .post('/api/users/signup')
        .send({ password: "password" })
        .expect(400)
})


