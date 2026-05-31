import { test, expect } from "@playwright/test";


test("Generate a token using Post Method", async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: {
             "Content-Type": "application/json"
        },
        data: {
            "username": "admin",
            "password": "password123"
        }
    })

    const tokenObj= await response.json()
    expect(tokenObj.token).toBeTruthy()
    
})