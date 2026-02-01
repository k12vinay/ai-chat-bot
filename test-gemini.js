const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    try {
        // There isn't a direct "listModels" on the client instance in some versions, 
        // but let's try a simple generation with a known older model to verify auth 
        // or try to find a workaround if strictly listing isn't exposed easily in older node SDKs without full google-auth.
        // Actually, let's just try to generate with 'gemini-1.5-flash' and 'gemini-pro' to see which one works.

        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];

        console.log("Testing models...");

        for (const modelName of models) {
            try {
                console.log(`Trying ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`✅ ${modelName} WORKED!`);
                break;
            } catch (error) {
                console.log(`❌ ${modelName} Failed: ${error.message.split('\n')[0]}`);
            }
        }

    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
