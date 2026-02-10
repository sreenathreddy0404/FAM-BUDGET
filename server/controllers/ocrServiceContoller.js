const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use the latest 2026 stable model for efficiency
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const extractDetails = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    let allowedCategories;
    try {
      allowedCategories = JSON.parse(req.body.ALLOWED_CATEGORIES);
    } catch {
      return res.status(400).json({ error: "Invalid categories list" });
    }

    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        amount: { type: "number" },
        date: { type: "string" },
        category: { type: "string", enum: allowedCategories },
      },
      required: ["name", "amount", "date", "category"],
    };

    const imagePart = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

     const prompt = `
      Extract name, amount, and date from the receipt.
      Use YYYY-MM-DD format.
      Choose category strictly from:
      ${allowedCategories.join(", ")}
      If date missing, use today's date.
      `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }, imagePart] }],
      generationConfig: {
        // MUST include both here to ensure the API respects JSON mode
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    //SAFE PARSING: Remove potential Markdown backticks
    let rawResponse = result.response.text();
    const cleanJson = rawResponse.replace(/^```json|```$/g, "").trim();
    
    const data = JSON.parse(cleanJson);

    res.json({ success: true, data });
  } catch (err) {
    console.error("OCR Error:", err);
    res.status(500).json({ error: "Failed to parse receipt" });
  }
};

module.exports = { extractDetails };