# AI Voice Twin

A voice-enabled chatbot that mimics your credentials and personality for interview questions.

**[🎙️ Live Demo](https://ai-chatbot-gamma-sepia.vercel.app/)**

## Features
- **Voice Interface**: Talk to the bot using your microphone.
- **Real-time Visualization**: Glowing orb animation that reacts to listening/speaking states.
- **AI-Powered**: Uses **Groq (Llama 3)** for ultra-fast, conversational responses.
- **Customizable Persona**: Easily update the system prompt to reflect your own bio.

## Getting Started

### Prerequisites
- Node.js installed
- A **Groq API Key** (Free tier available at [console.groq.com](https://console.groq.com/keys))

### Installation

1.  Clone/Download this repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the root directory and add your Groq Configuration:
    ```bash
    # Groq API Configuration
    OPENAI_API_KEY=gsk_your_groq_key_here
    OPENAI_BASE_URL=https://api.groq.com/openai/v1
    AI_MODEL=llama-3.1-8b-instant
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in Chrome (recommended for Web Speech API support).

## Customization

To make the bot answer as **YOU**, open `app/api/chat/route.ts` and edit the `systemPrompt` variable. 
Replace the placeholder text with your real life story, superpower, etc.

## Deployment (Vercel)

1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and import the project.
3.  In the **Environment Variables** section during deployment, you MUST add:
    - `OPENAI_API_KEY`: Your Groq Key (`gsk_...`)
    - `OPENAI_BASE_URL`: `https://api.groq.com/openai/v1`
    - `AI_MODEL`: `llama-3.1-8b-instant`
4.  Click **Deploy**.
5.  Share the generated URL!
