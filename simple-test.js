require('dotenv').config({ path: '.env.local' });
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

async function test() {
    console.log("Starting test...");
    const modelName = process.env.AI_MODEL || "llama-3.1-8b-instant";

    try {
        console.log(`Sending message using model: ${modelName}...`);
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello, are you there?" }],
            model: modelName,
        });

        console.log("Response received:");
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Test Failed:", error.message);
    }
}

test();
