import { describe, it, expect, vi, beforeEach, afterAll, test, beforeAll } from "vitest";
import request  from 'supertest'
import app from '../src/app-setup.ts'
import { prisma } from "../src/lib/db.ts";

const TEST_UNIQUE_USERNAME = 'TEST_USER'

beforeAll(async()=>{
    await prisma.user.deleteMany({
        where: {
            uniqueUsername: TEST_UNIQUE_USERNAME
        }
    })
})



test('Should load test.env', ()=>{
    expect(process.env.TEST_VAR).toBe('TESTING');
})




test('Upon successful /signup, receive the correct body and receive a cookie', async() => {

    const TEST_FAVORITE_FOOD = 'Pizza'

    const result = await request(app).post('/api/signup').send({ unique_username: TEST_UNIQUE_USERNAME, favorite_food: TEST_FAVORITE_FOOD,});
    
    //* Test that the received body is correct
    expect(result.body).toEqual({message: expect.any(String) , data: { favorite_food: TEST_FAVORITE_FOOD }});

    //* Test that the received cookie is correct
    expect(result.headers['set-cookie'][0]).toContain('EXAMPLE_JWT_COOKIE');
});




test('Upon successful /signup, user should be saved to the database', async() => { 

    //! This depends on the previous test.
    const user = await prisma.user.findFirst({
        where: {
            uniqueUsername: TEST_UNIQUE_USERNAME
        }
    })

    expect(user?.uniqueUsername).toBe(TEST_UNIQUE_USERNAME);
})

