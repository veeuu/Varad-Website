# PixelBloom  Sanity Studio Setup

## How the website and Sanity are connected

```
Owner edits in Sanity Studio
        ↓
Sanity stores content in the cloud
        ↓
React website fetches via Sanity API (src/lib/sanity.js)
        ↓
Vercel detects Sanity webhook → rebuilds site
        ↓
Live site updates (under 60 seconds)
```

---

## Step 1  Create your free Sanity project

1. Go to https://sanity.io and sign up (free)
2. Click "Create new project" → name it **PixelBloom**
3. Choose dataset name: **production**
4. Copy your **Project ID** (looks like `abc12def`)

---

## Step 2  Install and run the Studio

```bash
cd pixelbloom-studio
npm install
```

Open `sanity.config.js` and replace:
```js
projectId: 'YOUR_PROJECT_ID',  // ← paste your Project ID here
```

Then run:
```bash
npm run dev
```

Studio opens at http://localhost:3333  this is the owner's admin panel.

---

## Step 3  Connect the React website

In `pixelbloom-react/`, create a `.env` file:
```
VITE_SANITY_PROJECT_ID=abc12def
VITE_SANITY_DATASET=production
```

Replace `abc12def` with your actual Project ID.

---

## Step 4  Enable CORS for the React app

In Sanity dashboard → **API** → **CORS Origins** → add:
- `http://localhost:5173` (for local dev)
- `https://your-vercel-domain.vercel.app` (for production)

---

## Step 5  Deploy to Vercel (free)

1. Push both `pixelbloom-react/` and `pixelbloom-studio/` to GitHub
2. Go to https://vercel.com → Import the `pixelbloom-react` folder
3. Add environment variables in Vercel dashboard:
   - `VITE_SANITY_PROJECT_ID` = your project ID
   - `VITE_SANITY_DATASET` = production
4. Deploy  site goes live

---

## Step 6  Set up auto-rebuild webhook

So the site rebuilds when the owner publishes content:

1. In Vercel → Project Settings → **Deploy Hooks**
2. Create a hook named "Sanity Publish" → copy the URL
3. In Sanity dashboard → **API** → **Webhooks** → Add webhook:
   - URL: paste the Vercel deploy hook URL
   - Trigger on: **Publish**
4. Done  owner publishes → site rebuilds in ~45 seconds

---

## Step 7  Deploy the Studio (owner's panel)

```bash
cd pixelbloom-studio
npm run deploy
```

Studio goes live at: `https://pixelbloom.sanity.studio`

Give the owner this URL. They log in with their Sanity account.

---

## What the owner can manage

| Section | What they can update |
|---|---|
| Hero | Headline, subtext, stats, floating chips |
| Services | Name, description, tags, accent color |
| Portfolio | Add/remove videos & images per category |
| Testimonials | Add/edit/remove client quotes |

## How preview works

In the Studio, the owner can see a live preview of the website with their unpublished draft content before hitting Publish  using the Sanity Presentation plugin (optional, can be added later).
