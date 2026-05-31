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

test("Update a Particular user", async ({ request }) => {
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

    const updatePaticulaPart = await request.patch(`https://restful-booker.herokuapp.com/booking/${body.bookingid}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${tokenObj.token}`

        },
        data: {
            "firstname": "James",
            "lastname": "Brown"
        }
    })
    expect(updatePaticulaPart.status()).toBe(200)
    expect(updatePaticulaPart.statusText()).toBe('OK')
    const data1 = await updatePaticulaPart.json()
    expect(data1).toHaveProperty('firstname')
    expect(data1.lastname).toBe('Brown')


})