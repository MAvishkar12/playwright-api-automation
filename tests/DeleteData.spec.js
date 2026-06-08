// import { test, expect } from "@playwright/test";

// test("Delete user using id ", async ({ request }) => {
//     const response = await request.post('https://restful-booker.herokuapp.com/auth', {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         data: {
//             "username": "admin",
//             "password": "password123"
//         }
//     })

//     const tokenObj = await response.json()
//     console.log("Token obj", tokenObj)
//     const deleteUser = await request.delete('https://restful-booker.herokuapp.com/booking/1', {
//         headers: {
//             "Content-Type": "application/json",
//             "Cookie": `token=${tokenObj.token}`
//         }
//     })
//     expect(deleteUser.statusText()).toBe('Created')
//     expect(deleteUser.status()).toBe(201)




// })