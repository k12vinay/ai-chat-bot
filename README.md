# AI Voice Twin

A voice-enabled chatbot that mimics your credentials and personality for interview questions.

## Features
- **Voice Interface**: Talk to the bot using your microphone.
- **Real-time Visualization**: Glowing orb animation that reacts to listening/speaking states.
- **AI-Powered**: Uses Google Gemini to generate contextual responses.
- **Customizable Persona**: Easily update the system prompt to reflect your own bio.

## Getting Started

### Prerequisites
- Node.js installed
- A Google Cloud API Key for Gemini (Free tier available at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1.  Clone/Download this repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file in the root directory and add your API Key:
    ```bash
    GOOGLE_API_KEY=your_actual_api_key_here
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
3.  In the **Environment Variables** section during deployment, add:
    - Name: `GOOGLE_API_KEY`
    - Value: `your_gemini_api_key`
4.  Click **Deploy**.
5.  Share the generated URL!
