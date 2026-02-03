require('dotenv').config({ path: '.env.local' });
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

async function testModels() {
    const candidates = [
        "llama-3.1-8b-instant",
        "llama3-8b-8192",
        "mixtral-8x7b-32768",
        "gemma-7b-it"
    ];

    console.log("Testing models for API Key...");

    for (const modelName of candidates) {
        try {
            process.stdout.write(`Trying ${modelName}... `);
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: "Hi" }],
                model: modelName,
            });
            console.log("✅ SUCCESS!");
            console.log(`\n>>> USE MODEL: "${modelName}" <<<\n`);
            return; // Stop after first success
        } catch (error) {
            console.log(`❌ Failed (${error.message})`);
        }
    }
    console.log("All models failed.");
}

testModels();
