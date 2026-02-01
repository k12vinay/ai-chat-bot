# Deployment Guide (Get your URL)

Since we are running locally, we need to push this to the cloud to get a shareable URL.

## Option 1: Vercel (Easiest)
1.  **Sign Up**: Go to [vercel.com](https://vercel.com) and sign up (GitHub login is best).
2.  **Install CLI**: Run this in your terminal:
    ```bash
    npm i -g vercel
    ```
3.  **Deploy**: Run this command inside the project folder:
    ```bash
    vercel
    ```
4.  **Follow Prompts**:
    -   Set up and deploy? **Y**
    -   Which scope? (Select your name)
    -   Link to existing project? **N**
    -   Project Name? (Press Enter)
    -   Directory? (Press Enter)
    -   **Environment Variables**:
        -   It will ask to import env vars. Select **N** (we will add them in dashboard) OR manually add `OPENAI_API_KEY` when prompted.
        -   *Better way*: Go to the Dashboard URL it gives you -> Settings -> Environment Variables -> Add `OPENAI_API_KEY` (and `OPENAI_BASE_URL` if using Groq).

## Option 2: Netlify Drop (No Command Line)
1.  Run `npm run build` in your terminal.
2.  Go to the `out` folder (if you export) or `next` folder. *Note: Next.js implies Vercel is best.*

## CRITICAL: Environment Variables
For the bot to work on the live URL, you MUST add your API Keys in the hosting dashboard.
-   Key: `OPENAI_API_KEY`
-   Value: `gsk_...` (Your Groq Key)
-   Key: `OPENAI_BASE_URL`
-   Value: `https://api.groq.com/openai/v1`
-   Key: `AI_MODEL`
-   Value: `llama-3.1-8b-instant`
