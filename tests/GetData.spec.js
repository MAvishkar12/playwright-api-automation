import { test, expect } from "@playwright/test"
const url = "https://restful-booker.herokuapp.com/apidoc/#api-Booking-GetBookings"
test("Check the api testing", async ({ request }) => {
    const response = await request.get("https://restful-booker.herokuapp.com/booking/1")
    const data = await response.json()
    console.log("data is",data)
    if (response.status() === 404) {
        console.log("Booking not found");
        return; // stop test execution
    }
    expect(response.status()).toBe(200)
    console.log(response.ok())
    expect(response.ok()).toBeTruthy()
    expect(data).toHaveProperty('firstname')
    expect(data.firstname).toBeTruthy()

})