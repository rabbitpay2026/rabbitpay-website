# Deploy RabbitPay to Hostinger (Premium Web Hosting)

The whole site — frontend **and** the email handler — runs on Hostinger. No Python
server, no Railway. The lead email is sent by a small PHP file bundled into the build.

## How it works

```
Visitor fills form  →  rabbitpay.ai/api/leads  →  api/leads.php  →  Resend  →  📧 your Gmail
```

`.htaccess` routes `/api/leads` to `api/leads.php`, which sends the email via Resend.

---

## Steps

### 1. Build the site (on your computer)
```
cd frontend
yarn build
```
This creates `frontend/build/`, which already contains:
- the website files
- `.htaccess`
- `api/leads.php` and `api/config.php`

### 2. Upload to Hostinger
1. **Zip the CONTENTS of `frontend/build`** (select all files *inside* build, then zip).
   > Zipping is important so the hidden `.htaccess` file is included.
2. Hostinger → **Websites → rabbitpay.ai → File Manager**.
3. Open **`public_html`**. Delete the old site files.
4. Upload your zip into `public_html` and **Extract** it there.
5. Confirm you can see `public_html/.htaccess` and `public_html/api/leads.php`
   (turn on "show hidden files" in File Manager if `.htaccess` is hidden).

### 3. Add your Resend key (one-time, done ON Hostinger)
1. In File Manager, open **`public_html/api/config.php`** → Edit.
2. Replace the placeholder with your real key:
   ```php
   define('RESEND_API_KEY', 're_your_real_key_here');
   ```
3. Save.

> The key is only ever edited here on the server, so it never ends up in git.

### 4. Test
Open **https://rabbitpay.ai**, fill the demo form, click **Give me a Demo**.
- **Green toast** → 🎉 email sent, check your Gmail (and Spam the first time).
- **Amber / red toast** → see Troubleshooting below.

---

## Troubleshooting

- **Amber toast ("email NOT sent")** → the key in `config.php` is wrong/placeholder,
  or the sending address isn't allowed. Double-check step 3.
- **Red toast ("couldn't submit") / 404** → `.htaccess` didn't upload, or the `api`
  folder is missing. Re-check step 2 (hidden files).
- **Email goes to Spam** → normal for the first few from `onboarding@resend.dev`.
  Click "Not spam". Permanent fix: verify your `rabbitpay.in` domain in Resend and
  change `EMAIL_FROM` in `config.php` to e.g. `RabbitPay <hello@rabbitpay.in>`.

---

## Redeploying later
Whenever you change the site: `yarn build` again, re-zip `build`, re-upload.
`config.php` will reset to the placeholder, so **re-paste your key** (step 3) — or
just edit only the files you changed and leave `config.php` alone.
