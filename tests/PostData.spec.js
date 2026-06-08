import { test, expect } from "@playwright/test";


const userData = {
    "firstname": "Virat",
    "lastname": "Kohli",
    "totalprice": 1231,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
}

test("Generate a  ticket for Bus using Post Method", async ({ request }) => {
    const data = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            "Content-Type": "application/json",

        },
        data: userData
    })

    const body = await data.json()
    expect(data.status()).toBe(200)
    expect(data.statusText()).toBe('OK')
    expect(body.bookingid).toBeTruthy()


})

//Put Metod
test("Update a booking for User using Id and Token", async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "username": "admin",
            "password": "password123"
        }
    })

    const tokenObj = await response.json()
    console.log('Token obj', tokenObj)
    const data = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            "Content-Type": "application/json",

        },
        data: userData
    })

    const body = await data.json()
    console.log("Bokking Id ", body.bookingid)

    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${body.bookingid}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${tokenObj.token}`
        },
        data: userData
    })
     expect(updateResponse.status()).toBe(200)
     expect(updateResponse.statusText()).toBe('OK')
     const newData= await updateResponse.json()
     console.log("Update response",newData)
    
  
})

