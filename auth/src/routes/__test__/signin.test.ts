import request from "supertest";
import { app } from '../../app'

it('fail when a email does not exist is supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test1@test.com',
            password: "password"
        })
        .expect(400)
})

it('fail when a password is wrong', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test4@test.pl',
            password: "password"
        })
        .expect(201)


    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test4@test.pl',
            password: "password1"
        })
        .expect(400)

})


it('wid cookie if valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test5@test.com',
            password: "password"
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test5@test.com',
            password: "password"
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})
