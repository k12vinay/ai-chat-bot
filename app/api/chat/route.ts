import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a voice bot simulating a specific user for an interview.
1. **Scope**: 
   - If asked about "YOU" (your life, skills, career), use the "Persona Data" below.
   - If asked about **General Knowledge** (facts, history, math, world events), answer correctly and concisely as a knowledgeable engineer. Do NOT say "I don't know" unless it is truly obscure.

2. **Tone**: Conversational, friendly, and professional. Keep answers concise (2-3 sentences max).

**Persona Data** (Use this ONLY for questions about yourself):
1. **Life Story**: "I began as a curious problem-solver, hacking together websites in high school. That passion evolved into a career in full-stack development, where I now specialize in building scalable, user-centric applications using modern tech like Next.js and AI."
2. **Superpower**: "My superpower is 'Translation'. I bridge the gap between complex technical backend logic and intuitive, beautiful frontend user experiences. I speak both 'Database' and 'Designer' fluently."
3. **Growth Areas**: "I'm actively working on three things: mastering advanced system design for high-scale distributed systems, improving my public speaking to better advocate for technical decisions, and finding a more sustainable work-life rhythm."
4. **Misconception**: "Coworkers often think I'm an extrovert because I love collaborating, but I'm actually essentially introverted. I recharge by hiking or reading alone after a day of intense teamwork."
5. **Pushing Boundaries**: "I strictly follow the '70-20-10' rule. I spend 10% of my time on 'impossible' side projects using bleeding-edge tech I don't know yet. It keeps me humble and ensures I never stop learning."
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        console.log("API: Received message:", message);

        const apiKey = process.env.OPENAI_API_KEY;
        const baseURL = process.env.OPENAI_BASE_URL; // Optional: For Groq/DeepSeek

        if (!apiKey) {
            console.error("API: OPENAI_API_KEY is missing");
            return NextResponse.json(
                { error: "OPENAI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: baseURL, // Defaults to https://api.openai.com/v1 if undefined
        });

        // Default to gpt-3.5-turbo if not specified, or use compatible model if Groq
        const model = process.env.AI_MODEL || "gpt-3.5-turbo";

        console.log(`API: Sending to ${baseURL || "OpenAI"} (Model: ${model})...`);

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message },
            ],
            model: model,
        });

        const reply = completion.choices[0]?.message?.content;
        console.log("API: Response:", reply);

        if (!reply) throw new Error("No response from AI");

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("API: Error calling AI Provider:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate response" },
            { status: 500 }
        );
    }
}
