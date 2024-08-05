const express = require('express')
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const PORT = 8000


app.use(express.json());
// 제미나이 설정

const genAI = new GoogleGenerativeAI("AIzaSyBC2B3cxscH9OO6guCY_HegvBrYIYb7ZKw")
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// 라우터
app.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text()
        console.log(text);
    } catch (error) {
        res.status(500).json({ response: '오류'})
    }
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

