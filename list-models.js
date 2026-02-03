require('dotenv').config({ path: '.env.local' });
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

async function listModels() {
    console.log("Fetching models...");
    try {
        const list = await openai.models.list();
        console.log("✅ AVAILABLE MODELS:");
        list.data.forEach((model) => {
            console.log(`- ${model.id}`);
        });
    } catch (error) {
        console.error("❌ Error fetching models:", error.message);
    }
}

listModels();
