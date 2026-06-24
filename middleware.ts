import { NextRequest, NextResponse } from "next/server";

const COOKIE = "pitch_auth";

export async function middleware(req: NextRequest) {
  const password = process.env.PITCH_PASSWORD;
  if (!password) return NextResponse.next();

  if (req.cookies.get(COOKIE)?.value === password) {
    return NextResponse.next();
  }

  if (req.method === "POST") {
    try {
      const form = await req.formData();
      const provided = form.get("password");
      if (typeof provided === "string" && provided === password) {
        const url = new URL(req.nextUrl.pathname + req.nextUrl.search, req.url);
        const res = NextResponse.redirect(url, 303);
        res.cookies.set(COOKIE, password, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        return res;
      }
      return htmlResponse(renderForm("That password is not correct."), 401);
    } catch {
      return htmlResponse(renderForm("Could not read the form submission."), 400);
    }
  }

  return htmlResponse(renderForm(), 401);
}

function htmlResponse(body: string, status: number) {
  return new NextResponse(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function renderForm(error?: string) {
  const errorBlock = error
    ? `<div class="err">${escapeHtml(error)}</div>`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Anthropic submission — protected</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    background: #FAF9F5;
    color: #141413;
    font-family: ui-serif, Georgia, "Times New Roman", serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  main {
    max-width: 380px;
    width: 100%;
  }
  .mark {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6B6862;
  }
  .mark svg { height: 18px; width: auto; }
  h1 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0 0 6px;
  }
  p.lede {
    font-size: 14px;
    color: #4A4842;
    margin: 0 0 22px;
    line-height: 1.5;
  }
  form { display: flex; flex-direction: column; gap: 10px; }
  label {
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6B6862;
  }
  input[type="password"] {
    appearance: none;
    border: 1px solid #E8E5DC;
    background: #FFFFFF;
    color: #141413;
    font: inherit;
    font-size: 16px;
    padding: 12px 14px;
    border-radius: 4px;
    outline: none;
  }
  input[type="password"]:focus {
    border-color: #D97757;
    box-shadow: 0 0 0 3px rgba(217,119,87,0.12);
  }
  button {
    margin-top: 4px;
    background: #141413;
    color: #FAF9F5;
    border: 0;
    padding: 12px 16px;
    border-radius: 4px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
  }
  button:hover { background: #D97757; }
  .err {
    margin-bottom: 14px;
    padding: 10px 12px;
    border: 1px solid #E8C5B5;
    background: #FBEEE7;
    color: #8A3D1F;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 12px;
    border-radius: 4px;
  }
  .foot {
    margin-top: 20px;
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 11px;
    color: #6B6862;
  }
</style>
</head>
<body>
<main>
  <div class="mark">
    <svg viewBox="0 0 92 64" aria-hidden="true">
      <path d="M66.4915 0H52.5029L78.0115 64H92.0001L66.4915 0Z" fill="#141413" />
      <path d="M26.08 0L0.571472 64H14.8343L20.0512 50.56H46.7374L51.9543 64H66.2172L40.7086 0H26.08ZM24.6647 38.6743L33.3943 16.1829L42.1239 38.6743H24.6647Z" fill="#141413" />
    </svg>
    <span>Anthropic submission</span>
  </div>
  <h1>Confidential draft</h1>
  <p class="lede">This memo is shared by invitation only. Enter the password to continue.</p>
  ${errorBlock}
  <form method="POST" autocomplete="off">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required autofocus />
    <button type="submit">Open submission</button>
  </form>
  <p class="foot">Robbie Tilleard · robbietilleard.com</p>
</main>
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const config = {
  matcher: ["/claudeforSMB", "/claudeforSMB/:path*"],
};
