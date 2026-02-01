const https = require('https');

const apiKey = "AIzaSyDlmmKBIW7-SGUiuOJk8-Acx5IDV5rmWns";
const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

console.log("Fetching models...");

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("✅ AVAILABLE MODELS:");
                json.models.forEach(m => console.log(`- ${m.name}`));
            } else {
                console.log("❌ ERROR RESPONSE:", data);
            }
        } catch (e) {
            console.log("❌ PARSE ERROR:", e.message);
            console.log("RAW:", data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
