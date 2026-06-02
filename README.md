# 🎭 Playwright API Testing Guide

A complete guide to API testing using Playwright's built-in `request` context — no extra libraries needed.

---

## 📦 Installation & Setup

**1. Install Playwright**

```bash
npm init playwright@latest
```

**2. Configure Base URL in `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://api.yourapp.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
  },
});
```

**3. Create a test file under `tests/api/`**

---

## 🔧 Using the `request` Fixture

Playwright injects the `request` object into every test automatically. It supports `get()`, `post()`, `put()`, `patch()`, and `delete()` — all returning an `APIResponse`.

### GET — Fetch a resource

```ts
import { test, expect } from '@playwright/test';

test('GET — fetch list of users', async ({ request }) => {
  const response = await request.get('/users');

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data).toBeInstanceOf(Array);
});
```

### POST — Create a resource

```ts
test('POST — create a new user', async ({ request }) => {
  const response = await request.post('/users', {
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
    },
  });

  expect(response.status()).toBe(201);
  const user = await response.json();
  expect(user.id).toBeDefined();
});
```

### PUT — Replace a resource

```ts
test('PUT — replace a user record', async ({ request }) => {
  const response = await request.put('/users/42', {
    data: { name: 'Jane Smith', email: 'jane@example.com', role: 'editor' },
  });

  expect(response.status()).toBe(200);
});
```

### PATCH — Partial update

```ts
test('PATCH — update specific fields', async ({ request }) => {
  const response = await request.patch('/users/42', {
    data: { role: 'viewer' },
  });

  expect(response.ok()).toBeTruthy();
});
```

### DELETE — Remove a resource

```ts
test('DELETE — remove a user', async ({ request }) => {
  const response = await request.delete('/users/42');

  expect(response.status()).toBe(204);
});
```

---

## 🌐 HTTP Methods Overview

| Method | Purpose | Idempotent | Request Body | Success Code |
|--------|---------|------------|--------------|--------------|
| `GET` | Read / retrieve a resource | ✅ Yes | ❌ No | `200 OK` |
| `POST` | Create a new resource | ❌ No | ✅ Yes | `201 Created` |
| `PUT` | Replace an entire resource | ✅ Yes | ✅ Yes | `200 OK` / `204` |
| `PATCH` | Partially update a resource | ✅ Yes | ✅ Yes | `200 OK` |
| `DELETE` | Remove a resource | ✅ Yes | ❌ Usually not | `204 No Content` |

### Quick notes

- **GET** — Safe and read-only. Parameters go in the URL query string (`?key=value`).
- **POST** — Not idempotent; calling it twice creates two resources.
- **PUT** — Must send the full resource body; partial updates should use PATCH.
- **PATCH** — Only send the fields you want to change. More bandwidth-efficient than PUT.
- **DELETE** — Idempotent; deleting an already-deleted resource typically returns `404` or `204`.

---

## ⚡ Playwright vs Selenium for API Testing

| Feature | Playwright | Selenium |
|---------|-----------|----------|
| Built-in API testing | ✅ Yes (`request` fixture) | ❌ No (needs RestAssured/Axios) |
| Parallel execution | ✅ Out of the box | ⚠️ Requires Selenium Grid |
| Auto-wait / flakiness | ✅ Built-in auto-wait | ❌ Manual waits needed |
| TypeScript support | ✅ Native, full typings | ⚠️ Requires extra config |
| Network interception | ✅ Native (`route`) | ❌ Not supported |
| Share UI + API auth | ✅ Shared cookie/session | ❌ Separate contexts |
| Browser driver setup | ✅ Single install | ❌ Per-browser drivers |
| Built-in reporter | ✅ HTML reporter included | ⚠️ Third-party plugins |

### Why Playwright wins for API testing

- **No extra libraries** — The `request` fixture is built in. No need to install or configure Axios, Supertest, or RestAssured.
- **Unified test suite** — You can mix UI and API tests in the same file, sharing authentication state between them.
- **Less flakiness** — Playwright handles network timing automatically, removing the need for manual `sleep()` or retry logic.
- **Modern DX** — First-class TypeScript, parallel runs by default, and a rich HTML report out of the box.

---

## ✅ Best Practices

- **Reuse auth state** — Use `storageState` to save a logged-in session and share it across tests.
- **Clean up after tests** — Use `test.afterEach` to delete resources you created so tests stay idempotent.
- **Isolated API context** — Create a standalone context with `playwright.request.newContext()` for API-only test suites.
- **Set timeouts** — Configure `timeout` globally in `playwright.config.ts` to prevent slow APIs from hanging CI.
- **Enable retries** — Use `retries: 2` in config for unstable external APIs without cluttering test logic.

---

## 📚 Resources

- [Playwright API Testing Docs](https://playwright.dev/docs/api-testing)
- [APIRequestContext Reference](https://playwright.dev/docs/api/class-apirequestcontext)
- [playwright.config.ts Options](https://playwright.dev/docs/test-configuration)
