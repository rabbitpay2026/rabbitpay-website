# RabbitPay — What We Built & How Email Works (Full Notes)

A plain-language record of every change made, how the email integration works, and
the exact steps to make it work live on Hostinger.

---

## PART 1 — What we changed on the website

### CTA buttons (two separate journeys)
- **Header "Start Free"** → opens the **Calendly** popup on the same page (no form, no
  redirect, no new tab).
- **Pricing "Start now – zero setup"** → opens **Calendly** (same function as Start Free).
- **Pricing "Talk to sales"** → **smooth-scrolls** down to the demo section
  ("Want to see RabbitPay in action?").
- **Sticky mobile "Start Free"** → opens **Calendly**.

Calendly link is configured via `REACT_APP_CALENDLY_URL` (frontend/.env).

### Hero lead-capture card ("Give me a Demo")
- A small inline card in the hero: **"Want to see RabbitPay in action?"** with just two
  fields — **email** and **mobile number** — and a **"Give me a Demo"** button.
- No name, no company, no message. No popup, no modal.
- The same card also appears in the bottom demo section.
- On submit it sends the details to the backend, which emails them to you.
- After submit it shows **"Thank you! Our team will contact you shortly."**

### The form now tells the truth about email
After submitting, a colored toast appears:
- 🟢 **Green** — email actually sent.
- 🟠 **Amber** — saved but email NOT sent (email not configured).
- 🔴 **Red** — couldn't reach the server.

### Removed
- The old **"Request a Demo" popup/modal** (and the Full Name field) — deleted everywhere.

### Other
- Added a **48px gap** between the hero badges and the lead-capture card.

---

## PART 2 — How the email actually works

The form needs a **server-side helper** to send email, for two reasons:
1. The email service's secret key must stay hidden from visitors.
2. Browsers can't send this kind of email directly.

We use **Resend** (https://resend.com) as the email service. There are **two** helpers,
one for each place the site runs:

| Where the site runs | Server helper | File |
|---|---|---|
| Your computer (local testing) | Python / FastAPI | `backend/server.py` |
| Hostinger (live site) | PHP | `frontend/public/api/leads.php` |

Both do the same job: receive `{ email, phone }` → send an email via Resend → to
`avijeetdey.email@gmail.com`.

### The email you receive
- **From:** RabbitPay `<onboarding@resend.dev>`
- **Subject:** New RabbitPay Demo Request
- **Reply-To:** the visitor's email (hit Reply to reach them)
- **Body:**
  ```
  Email:
  someone@brand.com

  Phone:
  9876543210

  Timestamp:
  2026-07-22 15:42:10 UTC
  ```

---

## PART 3 — What we did on your computer (local testing) ✅ DONE

1. Signed up for **Resend** and created an **API key** (starts with `re_`).
2. Put the key in `backend/.env`:
   ```
   RESEND_API_KEY=re_your_key
   EMAIL_TO=avijeetdey.email@gmail.com
   ```
3. Installed backend dependencies (skipping Emergent-only packages):
   ```
   cd backend
   python -m pip install --user -r requirements-local.txt
   ```
4. Started the backend:
   ```
   python -m uvicorn server:app --port 8001 --reload
   ```
5. Tested — email sent successfully (`"email_sent": true`).

> Local only works while that backend window is running. Real visitors use the LIVE
> site, which is set up in Part 4.

---

## PART 4 — Email integration on Hostinger (LIVE site) — the steps

Your Hostinger plan (Premium Web Hosting) runs **PHP**, not Python — so live email is
handled by the PHP file, which is **already bundled into your build**.

### Step 1 — Build the site
```
cd frontend
yarn build
```
`frontend/build/` now contains the website plus `.htaccess`, `api/leads.php`,
`api/config.php`.

### Step 2 — Upload to Hostinger
1. **Zip the contents of `frontend/build`** (select everything inside `build`, then zip).
   Zipping ensures the hidden `.htaccess` is included.
2. Hostinger → **Websites → rabbitpay.ai → File Manager**.
3. Open **`public_html`** → delete the old files.
4. Upload the zip → **Extract** it inside `public_html`.
5. Confirm these exist: `public_html/.htaccess`, `public_html/api/leads.php`,
   `public_html/api/config.php` (enable "show hidden files" if `.htaccess` is hidden).

### Step 3 — Add your Resend key (on Hostinger)
1. In File Manager, open **`public_html/api/config.php`** → Edit.
2. Replace the placeholder with your real key:
   ```php
   define('RESEND_API_KEY', 're_your_real_key_here');
   ```
3. Save. (The key lives only here on the server, never in git.)

### Step 4 — Test live
Open **https://rabbitpay.ai**, fill the demo form, click **Give me a Demo**.
- 🟢 Green toast → check Gmail (and Spam the first time).
- 🟠/🔴 → see Troubleshooting.

### Step 5 (optional) — Better deliverability
Verify your `rabbitpay.in` domain in Resend, then change the "from" line in
`config.php` to e.g. `RabbitPay <hello@rabbitpay.in>`. Emails then land in the inbox
instead of spam.

---

## PART 5 — Troubleshooting live

| Symptom | Cause | Fix |
|---|---|---|
| Amber toast ("email NOT sent") | Wrong/placeholder key in `config.php` | Re-check Step 3 |
| Red toast / 404 | `.htaccess` or `api/` folder not uploaded | Re-upload; include hidden files (Step 2) |
| Email in Spam | New sender from `onboarding@resend.dev` | Click "Not spam"; or verify domain (Step 5) |

---

## PART 6 — Redeploying after future changes
1. `cd frontend && yarn build`
2. Re-zip `build`, re-upload to `public_html`, extract.
3. Re-paste your Resend key into `api/config.php` (a fresh build resets it to the
   placeholder) — or upload only the files you changed and leave `config.php` alone.

---

## Key files (reference)
- `frontend/src/components/LeadCaptureCard.jsx` — the email + phone card.
- `frontend/src/lib/calendly.js` — opens the Calendly popup.
- `frontend/public/api/leads.php` — LIVE email handler (PHP, Hostinger).
- `frontend/public/api/config.php` — where the Resend key goes (edit on Hostinger).
- `frontend/public/.htaccess` — routes `/api/leads` to the PHP file.
- `backend/server.py` — LOCAL email handler (Python, for testing).
- `backend/.env` — LOCAL Resend key + settings.
