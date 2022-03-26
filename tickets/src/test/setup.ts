import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'


import jwt from 'jsonwebtoken'

declare global {
    var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'sdfasdfaf'

    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})

    }
})

afterAll(async () => {
    await mongoose.connection.close()
    await mongo.stop()
})

global.signin = () => {

    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    const token = jwt.sign(payload, process.env.JWT_KEY!)
    const session = { jwt: token }

    const sessionJSON = JSON.stringify(session)

    const base64 = Buffer.from(sessionJSON).toString('base64')

    return [`session=${base64}`]
}
