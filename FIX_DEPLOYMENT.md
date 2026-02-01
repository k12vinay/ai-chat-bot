# How to Fix "OPENAI_API_KEY is not set" on Vercel

The error happens because **Git does not upload your `.env.local` file** (for security). Vercel doesn't know your API key yet.

## Steps to Fix

1.  Go to your **Vercel Dashboard** (https://vercel.com/dashboard).
2.  Click on your **Voice Bot Project**.
3.  Go to the **Settings** tab (top menu).
4.  Click **Environment Variables** (left sidebar).
5.  Add the following keys (copy from your local `.env.local`):

    | Key | Value |
    | :--- | :--- |
    | `OPENAI_API_KEY` | `gsk_...` (Your actual Groq key) |
    | `OPENAI_BASE_URL` | `https://api.groq.com/openai/v1` |
    | `AI_MODEL` | `llama-3.1-8b-instant` |

6.  **IMPORTANT**: After adding them, you must **Redeploy**.
    -   Go to **Deployments** tab.
    -   Click the **three dots** (...) next to the latest deployment.
    -   Click **Redeploy**.

7.  Once the new build finishes, the link will work!
