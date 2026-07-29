# Tarrant Engineering website

Static Next.js website for Tarrant Engineering, ready for GitHub Pages.

## Before the first deployment

1. Create a GitHub repository and upload every file and folder in this package.
2. In the repository, open **Settings → Secrets and variables → Actions**.
3. Create a repository secret named `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and enter the Web3Forms access key.
4. Open **Settings → Pages** and select **GitHub Actions** as the publishing source.
5. Push or merge the files into the `main` branch. The included workflow will build and publish the website.

## Connect `tarranteng.co.uk`

After the first GitHub Pages deployment succeeds:

1. Open **Settings → Pages** in the repository.
2. Enter `tarranteng.co.uk` under **Custom domain** and save it.
3. In Squarespace DNS, remove any conflicting parking or website records for the root domain.
4. Add these four `A` records with host/name `@`:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

5. Add a `CNAME` record with host/name `www` and value `YOUR-GITHUB-USERNAME.github.io`.
6. When GitHub makes the option available, enable **Enforce HTTPS**.

Replace `YOUR-GITHUB-USERNAME` with the GitHub account or organisation that owns the repository. DNS changes can take up to 24 hours to propagate.

## Local preview

Install Node.js 22, then run:

```bash
npm ci
npm run dev
```

The quote form uses Web3Forms. For a local form test, copy `.env.example` to `.env.local` and enter the access key there. Never commit `.env.local`.

## Updating the website

Edit files under `app/` and images under `public/`, then push the changes to `main`. GitHub Actions will publish the new version automatically.
