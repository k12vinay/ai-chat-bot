const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    console.log("Starting test...");
    try {
        // Hardcoded key for testing only
        const apiKey = "AIzaSyDlmmKBIW7-SGUiuOJk8-Acx5IDV5rmWns";
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        console.log("Sending message...");
        const result = await model.generateContent("Hello, are you there?");
        console.log("Response received:");
        console.log(result.response.text());
    } catch (error) {
        console.error("Test Failed:", error);
    }
}

test();
