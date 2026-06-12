# My Essays Blog

A minimal blog built with [Eleventy](https://www.11ty.dev/), automatically
built and published to GitHub Pages.

## One-time setup

### 1. Push this to a new GitHub repo

- Create a new **public** repository on GitHub (e.g. `essays-blog`).
- Push all these files to it (instructions below if you're not sure how).

### 2. Update the CNAME file

Open `CNAME` in this folder and replace `blog.yourdomain.com` with your
actual subdomain, e.g. `essays.example.com`. Commit and push the change.

### 3. Turn on GitHub Pages

- In your GitHub repo, go to **Settings → Pages**.
- Under "Build and deployment", set **Source** to **GitHub Actions**.
  (You don't need to pick a branch — the included workflow handles building.)

### 4. Point your subdomain at GitHub Pages

In your domain registrar's DNS settings, add a **CNAME record**:

| Type  | Name (host)            | Value                  |
|-------|------------------------|------------------------|
| CNAME | `essays` (or whatever) | `yourusername.github.io` |

(Replace `essays` with whatever subdomain you chose, and `yourusername`
with your GitHub username.)

DNS changes can take anywhere from a few minutes to a few hours to take effect.

### 5. Wait for the first deploy

After pushing, go to the **Actions** tab in your repo. You should see a
workflow running. Once it finishes (green checkmark), your site is live at
your subdomain.

---

## Adding a new essay

1. Create a new file in `posts/`, e.g. `posts/my-new-essay.md`.
2. Start it with this front matter block:

   ```
   ---
   layout: post.njk
   title: My New Essay
   date: 2026-06-15
   summary: One sentence describing what this is about.
   ---
   ```

3. Write your essay in Markdown below the `---` block.
4. Commit and push. The site rebuilds and republishes automatically within
   a minute or two.

## Running locally (optional)

If you ever want to preview changes before pushing:

```bash
npm install
npm run serve
```

This starts a local server (usually at `http://localhost:8080`) that
live-reloads as you edit.
