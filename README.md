# Harshit Rajput · PM Portfolio

A pop-style portfolio built with Next.js. It's made to show three things: **PM fundamentals**, **AI-native building** and **street-smart numbers**.

## Edit content
- **`content/data.ts`**: homepage content (hero, proof points, selected work, more work, side product, side quests, journey).
- **`content/cases.ts`**: case-study pages (`caseMeta` for the header and facts, `caseBodies` for the sections).
- **`public/Harshit-Rajput-Resume.pdf`**: the resume linked from the site. Replace the file to update it.

## Run locally
```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy on Vercel
1. Go to vercel.com → **Add New Project** → import this GitHub repo.
2. Keep the framework preset on **Next.js** and click **Deploy**. No env vars are needed.
