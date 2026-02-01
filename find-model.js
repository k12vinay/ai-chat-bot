const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testModels() {
    const apiKey = "AIzaSyDlmmKBIW7-SGUiuOJk8-Acx5IDV5rmWns";
    const genAI = new GoogleGenerativeAI(apiKey);

    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-1.0-pro",
        "gemini-pro"
    ];

    console.log("Testing models for API Key...");

    for (const modelName of candidates) {
        try {
            process.stdout.write(`Trying ${modelName}... `);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            await result.response;
            console.log("✅ SUCCESS!");
            console.log(`\n>>> USE MODEL: "${modelName}" <<<\n`);
            return; // Stop after first success
        } catch (error) {
            console.log(`❌ Failed (${error.message.split('[')[1]?.split(']')[0] || 'Error'})`);
        }
    }
    console.log("All models failed.");
}

testModels();
