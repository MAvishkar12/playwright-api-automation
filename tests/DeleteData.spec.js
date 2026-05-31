import { test, expect } from "@playwright/test";

test("Delete user using id ", async ({ request }) => {
    const deleteUser = await request.delete('https://restful-booker.herokuapp.com/booking/1')

    expect(deleteUser.status()).toBe(403)
    expect(deleteUser.statusText()).toBe('Forbidden')



})