<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Playwright API Testing Guide</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #0a0d14;
    --surface: #10141f;
    --surface2: #161b2e;
    --border: #1e2740;
    --accent: #00e5a0;
    --accent2: #7c6aff;
    --accent3: #ff6a6a;
    --accent4: #ffb347;
    --text: #e2e8f7;
    --muted: #6b7a9e;
    --code-bg: #080b12;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    line-height: 1.7;
    min-height: 100vh;
  }

  /* === HERO === */
  .hero {
    position: relative;
    overflow: hidden;
    padding: 80px 40px 60px;
    text-align: center;
    border-bottom: 1px solid var(--border);
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,229,160,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(124,106,255,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-block;
    background: rgba(0,229,160,0.1);
    border: 1px solid rgba(0,229,160,0.3);
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 4px;
    margin-bottom: 24px;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #ffffff 0%, var(--accent) 50%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    font-size: 1.15rem;
    color: var(--muted);
    max-width: 600px;
    margin: 0 auto 36px;
  }

  .hero-meta {
    display: flex;
    justify-content: center;
    gap: 28px;
    flex-wrap: wrap;
  }

  .hero-meta span {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .hero-meta span::before {
    content: '◆';
    color: var(--accent);
    font-size: 8px;
  }

  /* === LAYOUT === */
  .container {
    max-width: 980px;
    margin: 0 auto;
    padding: 0 32px 80px;
  }

  /* === SECTION HEADERS === */
  .section {
    margin-top: 70px;
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }

  .section h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
  }

  .section p {
    color: #a0aec8;
    font-size: 1rem;
    margin-bottom: 24px;
    max-width: 720px;
  }

  /* === CODE BLOCKS === */
  .code-wrap {
    position: relative;
    margin: 24px 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: 0 4px 32px rgba(0,0,0,0.4);
  }

  .code-header {
    background: var(--surface2);
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border);
  }

  .code-dots {
    display: flex;
    gap: 6px;
  }

  .code-dots span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }

  .code-dots span:nth-child(1) { background: #ff5f57; }
  .code-dots span:nth-child(2) { background: #febc2e; }
  .code-dots span:nth-child(3) { background: #28c840; }

  .code-filename {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    margin-left: 6px;
  }

  pre {
    background: var(--code-bg);
    padding: 24px;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 1.8;
  }

  .kw { color: #7c6aff; }
  .fn { color: #00e5a0; }
  .str { color: #ffb347; }
  .cm { color: #4a5680; font-style: italic; }
  .num { color: #ff6a6a; }
  .var { color: #93c5fd; }
  .op { color: #c0cde8; }

  /* === HTTP METHOD CARDS === */
  .methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    margin-top: 28px;
  }

  .method-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 22px 24px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }

  .method-card:hover {
    transform: translateY(-3px);
    border-color: var(--method-color, var(--accent));
  }

  .method-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--method-color, var(--accent));
  }

  .method-card::after {
    content: attr(data-method);
    position: absolute;
    top: 18px; right: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--method-color, var(--accent));
    opacity: 0.25;
    font-size: 36px;
    line-height: 1;
  }

  .method-badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--bg);
    background: var(--method-color, var(--accent));
    padding: 3px 10px;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  .method-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #fff;
  }

  .method-card p {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.6;
  }

  .method-card ul {
    margin-top: 10px;
    padding-left: 16px;
    font-size: 0.85rem;
    color: var(--muted);
  }

  .method-card ul li { margin-bottom: 3px; }

  /* === VS TABLE === */
  .vs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 28px;
  }

  .vs-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }

  .vs-header {
    padding: 16px 22px;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border);
  }

  .vs-header.playwright { background: rgba(0,229,160,0.08); color: var(--accent); }
  .vs-header.selenium   { background: rgba(255,106,106,0.08); color: var(--accent3); }

  .vs-icon { font-size: 1.4rem; }

  .vs-list {
    list-style: none;
    padding: 18px 22px;
  }

  .vs-list li {
    padding: 8px 0;
    font-size: 0.9rem;
    color: #a0aec8;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .vs-list li:last-child { border-bottom: none; }

  .vs-list li::before {
    content: attr(data-icon);
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* === INSTALL STEPS === */
  .steps {
    counter-reset: step;
    margin-top: 24px;
  }

  .step {
    display: flex;
    gap: 20px;
    margin-bottom: 28px;
  }

  .step-num {
    counter-increment: step;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 14px;
    color: var(--bg);
  }

  .step-body h4 {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
  }

  .step-body p {
    font-size: 0.9rem;
    color: var(--muted);
    margin-bottom: 10px;
  }

  .inline-code {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2px 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: var(--accent);
  }

  /* === TIPS === */
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
    margin-top: 24px;
  }

  .tip {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent2);
    border-radius: 0 8px 8px 0;
    padding: 16px 18px;
    font-size: 0.88rem;
    color: #a0aec8;
  }

  .tip strong { color: var(--accent2); font-size: 0.95rem; display: block; margin-bottom: 5px; }

  /* === FOOTER === */
  footer {
    margin-top: 80px;
    border-top: 1px solid var(--border);
    padding: 32px 40px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--muted);
  }

  footer span { color: var(--accent); }

  /* === HIGHLIGHT INFO BOX === */
  .info-box {
    background: rgba(124,106,255,0.07);
    border: 1px solid rgba(124,106,255,0.25);
    border-radius: 10px;
    padding: 20px 24px;
    margin: 24px 0;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .info-icon { font-size: 1.4rem; flex-shrink: 0; }
  .info-text { font-size: 0.92rem; color: #a0aec8; }
  .info-text strong { color: var(--accent2); }

  @media (max-width: 600px) {
    .vs-grid { grid-template-columns: 1fr; }
    .hero { padding: 50px 20px 40px; }
    .container { padding: 0 16px 60px; }
    pre { font-size: 12px; padding: 16px; }
  }
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-badge">📖 Developer Guide</div>
  <h1>Playwright API Testing</h1>
  <p>A complete guide to API testing with Playwright's <code style="color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:0.9em">request</code> context — fast, reliable, and framework-native.</p>
  <div class="hero-meta">
    <span>Playwright v1.x</span>
    <span>TypeScript / JavaScript</span>
    <span>REST API Testing</span>
    <span>No Extra Libraries</span>
  </div>
</div>

<div class="container">

  <!-- WHAT IS PLAYWRIGHT API TESTING -->
  <div class="section">
    <div class="section-label">Introduction</div>
    <h2>What is Playwright API Testing?</h2>
    <p>
      Playwright's built-in <strong>APIRequestContext</strong> lets you send HTTP requests directly — without a browser —
      making it ideal for testing REST APIs alongside your UI tests. It shares cookies, authentication, and base URL config
      seamlessly with the browser context.
    </p>
    <div class="info-box">
      <div class="info-icon">💡</div>
      <div class="info-text">
        <strong>Key Insight:</strong> Playwright's <code style="font-family:'JetBrains Mono',monospace">request</code> fixture is a first-class citizen.
        You don't need Axios, Supertest, or any third-party library. Everything ships with Playwright out of the box.
      </div>
    </div>
  </div>

  <!-- INSTALLATION -->
  <div class="section">
    <div class="section-label">Getting Started</div>
    <h2>Installation & Setup</h2>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-body">
          <h4>Install Playwright</h4>
          <p>Run the following command in your project root:</p>
          <div class="code-wrap">
            <div class="code-header">
              <div class="code-dots"><span></span><span></span><span></span></div>
              <span class="code-filename">terminal</span>
            </div>
            <pre>npm init playwright@latest</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">2</div>
        <div class="step-body">
          <h4>Configure Base URL</h4>
          <p>Set your API's base URL once in <span class="inline-code">playwright.config.ts</span>:</p>
          <div class="code-wrap">
            <div class="code-header">
              <div class="code-dots"><span></span><span></span><span></span></div>
              <span class="code-filename">playwright.config.ts</span>
            </div>
            <pre><span class="kw">import</span> { <span class="var">defineConfig</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="kw">export default</span> <span class="fn">defineConfig</span>({
  use: {
    baseURL: <span class="str">'https://api.yourapp.com'</span>,
    extraHTTPHeaders: {
      <span class="str">'Accept'</span>: <span class="str">'application/json'</span>,
      <span class="str">'Authorization'</span>: <span class="str">`Bearer <span class="var">${process.env.API_TOKEN}</span>`</span>,
    },
  },
});</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-num">3</div>
        <div class="step-body">
          <h4>Create Your First API Test File</h4>
          <p>Create a test file under <span class="inline-code">tests/api/</span> and import Playwright's test runner.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- USING REQUEST -->
  <div class="section">
    <div class="section-label">Core Concept</div>
    <h2>Using the <code style="color:var(--accent);font-size:0.9em">request</code> Fixture</h2>
    <p>
      Every Playwright test function receives the <span class="inline-code">request</span> object for free.
      It exposes methods like <span class="inline-code">get()</span>, <span class="inline-code">post()</span>,
      <span class="inline-code">put()</span>, <span class="inline-code">delete()</span>, and <span class="inline-code">patch()</span>
      — all returning an <code style="font-family:'JetBrains Mono',monospace;color:var(--accent2)">APIResponse</code>.
    </p>

    <!-- GET -->
    <div class="code-wrap">
      <div class="code-header">
        <div class="code-dots"><span></span><span></span><span></span></div>
        <span class="code-filename">api/users.spec.ts — GET Request</span>
      </div>
      <pre><span class="kw">import</span> { <span class="var">test</span>, <span class="var">expect</span> } <span class="kw">from</span> <span class="str">'@playwright/test'</span>;

<span class="fn">test</span>(<span class="str">'GET — fetch list of users'</span>, <span class="kw">async</span> ({ <span class="var">request</span> }) => {
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="var">request</span>.<span class="fn">get</span>(<span class="str">'/users'</span>);

  <span class="fn">expect</span>(<span class="var">response</span>.<span class="fn">status</span>()).<span class="fn">toBe</span>(<span class="num">200</span>);
  <span class="kw">const</span> <span class="var">body</span> = <span class="kw">await</span> <span class="var">response</span>.<span class="fn">json</span>();
  <span class="fn">expect</span>(<span class="var">body</span>).<span class="fn">toHaveProperty</span>(<span class="str">'data'</span>);
  <span class="fn">expect</span>(<span class="var">body</span>.<span class="var">data</span>).<span class="fn">toBeInstanceOf</span>(Array);
});</pre>
    </div>

    <!-- POST -->
    <div class="code-wrap">
      <div class="code-header">
        <div class="code-dots"><span></span><span></span><span></span></div>
        <span class="code-filename">api/users.spec.ts — POST Request</span>
      </div>
      <pre><span class="fn">test</span>(<span class="str">'POST — create a new user'</span>, <span class="kw">async</span> ({ <span class="var">request</span> }) => {
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="var">request</span>.<span class="fn">post</span>(<span class="str">'/users'</span>, {
    data: {
      name:  <span class="str">'Jane Doe'</span>,
      email: <span class="str">'jane@example.com'</span>,
      role:  <span class="str">'admin'</span>,
    },
  });

  <span class="fn">expect</span>(<span class="var">response</span>.<span class="fn">status</span>()).<span class="fn">toBe</span>(<span class="num">201</span>);
  <span class="kw">const</span> <span class="var">user</span> = <span class="kw">await</span> <span class="var">response</span>.<span class="fn">json</span>();
  <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">id</span>).<span class="fn">toBeDefined</span>();
  <span class="fn">expect</span>(<span class="var">user</span>.<span class="var">email</span>).<span class="fn">toBe</span>(<span class="str">'jane@example.com'</span>);
});</pre>
    </div>

    <!-- PUT -->
    <div class="code-wrap">
      <div class="code-header">
        <div class="code-dots"><span></span><span></span><span></span></div>
        <span class="code-filename">api/users.spec.ts — PUT &amp; PATCH &amp; DELETE</span>
      </div>
      <pre><span class="fn">test</span>(<span class="str">'PUT — replace a user record'</span>, <span class="kw">async</span> ({ <span class="var">request</span> }) => {
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="var">request</span>.<span class="fn">put</span>(<span class="str">'/users/42'</span>, {
    data: { name: <span class="str">'Jane Smith'</span>, email: <span class="str">'jane@example.com'</span>, role: <span class="str">'editor'</span> },
  });
  <span class="fn">expect</span>(<span class="var">response</span>.<span class="fn">status</span>()).<span class="fn">toBe</span>(<span class="num">200</span>);
});

<span class="fn">test</span>(<span class="str">'PATCH — update specific fields'</span>, <span class="kw">async</span> ({ <span class="var">request</span> }) => {
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="var">request</span>.<span class="fn">patch</span>(<span class="str">'/users/42'</span>, {
    data: { role: <span class="str">'viewer'</span> },
  });
  <span class="fn">expect</span>(<span class="var">response</span>.<span class="fn">ok</span>()).<span class="fn">toBeTruthy</span>();
});

<span class="fn">test</span>(<span class="str">'DELETE — remove a user'</span>, <span class="kw">async</span> ({ <span class="var">request</span> }) => {
  <span class="kw">const</span> <span class="var">response</span> = <span class="kw">await</span> <span class="var">request</span>.<span class="fn">delete</span>(<span class="str">'/users/42'</span>);
  <span class="fn">expect</span>(<span class="var">response</span>.<span class="fn">status</span>()).<span class="fn">toBe</span>(<span class="num">204</span>);
});</pre>
    </div>
  </div>

  <!-- HTTP METHOD OVERVIEW -->
  <div class="section">
    <div class="section-label">HTTP Methods</div>
    <h2>HTTP Method Reference</h2>
    <p>A quick overview of the five primary HTTP methods you'll use in REST API testing with Playwright.</p>

    <div class="methods-grid">

      <div class="method-card" style="--method-color:#00e5a0" data-method="GET">
        <div class="method-badge">GET</div>
        <h3>Read / Retrieve</h3>
        <p>Fetches a resource or a list of resources. Safe and idempotent — it never changes server state.</p>
        <ul>
          <li>Returns 200 OK on success</li>
          <li>Params go in the URL query string</li>
          <li>No request body</li>
        </ul>
      </div>

      <div class="method-card" style="--method-color:#7c6aff" data-method="POST">
        <div class="method-badge">POST</div>
        <h3>Create Resource</h3>
        <p>Submits data to create a new resource. Not idempotent — calling it twice creates two records.</p>
        <ul>
          <li>Returns 201 Created on success</li>
          <li>Body contains the new resource data</li>
          <li>Location header points to new resource</li>
        </ul>
      </div>

      <div class="method-card" style="--method-color:#ffb347" data-method="PUT">
        <div class="method-badge">PUT</div>
        <h3>Replace Resource</h3>
        <p>Replaces an entire resource with the provided payload. Idempotent — same result every time.</p>
        <ul>
          <li>Returns 200 OK or 204 No Content</li>
          <li>Must send the full resource body</li>
          <li>Creates resource if it doesn't exist</li>
        </ul>
      </div>

      <div class="method-card" style="--method-color:#38bdf8" data-method="PATCH">
        <div class="method-badge">PATCH</div>
        <h3>Partial Update</h3>
        <p>Applies partial modifications to a resource. Only send the fields you want to change.</p>
        <ul>
          <li>Returns 200 OK on success</li>
          <li>Sends only changed fields</li>
          <li>More bandwidth-efficient than PUT</li>
        </ul>
      </div>

      <div class="method-card" style="--method-color:#ff6a6a" data-method="DEL">
        <div class="method-badge">DELETE</div>
        <h3>Remove Resource</h3>
        <p>Deletes the specified resource. Idempotent — deleting something twice is the same as once.</p>
        <ul>
          <li>Returns 204 No Content on success</li>
          <li>Usually no request body needed</li>
          <li>Returns 404 if resource is missing</li>
        </ul>
      </div>

    </div>
  </div>

  <!-- WHY PLAYWRIGHT > SELENIUM -->
  <div class="section">
    <div class="section-label">Comparison</div>
    <h2>Why Playwright over Selenium?</h2>
    <p>
      Both are popular test automation frameworks, but Playwright's architecture is fundamentally more modern.
      Here's a side-by-side breakdown for API testing specifically.
    </p>

    <div class="vs-grid">
      <div class="vs-card">
        <div class="vs-header playwright"><span class="vs-icon">🎭</span> Playwright</div>
        <ul class="vs-list">
          <li data-icon="✅">Built-in APIRequestContext — no extra libraries needed</li>
          <li data-icon="✅">Parallel test execution out of the box</li>
          <li data-icon="✅">Auto-wait for network requests — zero flakiness</li>
          <li data-icon="✅">Native TypeScript support with full typings</li>
          <li data-icon="✅">Intercept &amp; mock network requests natively</li>
          <li data-icon="✅">Share cookies/auth between UI and API tests</li>
          <li data-icon="✅">Fast headless execution, single install</li>
          <li data-icon="✅">Rich HTML reporter built in</li>
        </ul>
      </div>

      <div class="vs-card">
        <div class="vs-header selenium"><span class="vs-icon">🕸️</span> Selenium</div>
        <ul class="vs-list">
          <li data-icon="❌">No built-in API testing — requires RestAssured/Axios</li>
          <li data-icon="❌">Parallel testing needs complex Grid setup</li>
          <li data-icon="❌">Frequent flakiness from timing issues</li>
          <li data-icon="⚠️">TypeScript support requires extra config</li>
          <li data-icon="❌">Network interception not native</li>
          <li data-icon="❌">UI and API tests are completely separate</li>
          <li data-icon="❌">Requires separate browser drivers per browser</li>
          <li data-icon="⚠️">Reporting requires third-party plugins</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- PRO TIPS -->
  <div class="section">
    <div class="section-label">Best Practices</div>
    <h2>Pro Tips</h2>
    <div class="tips-grid">
      <div class="tip">
        <strong>🔐 Auth via Storage State</strong>
        Store a logged-in session with <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">storageState</code> and reuse it across tests to avoid repeated login calls.
      </div>
      <div class="tip">
        <strong>🧹 Cleanup After Tests</strong>
        Use <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">test.afterEach</code> to delete resources you created, keeping test runs idempotent.
      </div>
      <div class="tip">
        <strong>📦 Group with APIRequestContext</strong>
        Create a standalone context with <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">playwright.request.newContext()</code> for isolated API test suites.
      </div>
      <div class="tip">
        <strong>⏱️ Set Timeouts</strong>
        Configure <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">timeout</code> per test or globally to prevent slow APIs from hanging CI pipelines.
      </div>
      <div class="tip">
        <strong>🔁 Retry on Failure</strong>
        Use <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">retries: 2</code> in config for flaky external API environments without cluttering test logic.
      </div>
      <div class="tip">
        <strong>📊 Use the HTML Reporter</strong>
        Run <code style="font-family:'JetBrains Mono',monospace;color:var(--accent)">npx playwright show-report</code> after tests for a visual breakdown of every request and assertion.
      </div>
    </div>
  </div>

</div>

<footer>
  Built with <span>♥</span> using Playwright &nbsp;·&nbsp; <span>playwright.dev</span> &nbsp;·&nbsp; TypeScript
</footer>

</body>
</html>
