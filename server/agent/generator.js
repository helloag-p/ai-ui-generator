const callGemini = require("./geminiClient");

const systemPrompt = `
You are a deterministic UI generator.

Rules:
- Use ONLY provided components
- Do NOT add explanations
- Return ONLY a JSON array
- No markdown
- No backticks
`;

module.exports = async function generator(plan) {

  const userPrompt = `
Plan:
${JSON.stringify(plan)}

Return ONLY a JSON array.
`;

  const response = await callGemini(systemPrompt, userPrompt);

  function extractJSONArray(text) {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error("Raw Gemini Output:", text);
      throw new Error("No JSON array found");
    }
    return match[0];
  }

  try {
    const extracted = extractJSONArray(response);
    return JSON.parse(extracted);
  } catch (err) {
    console.error("Raw Gemini Output:", response);
    throw new Error("Generator returned invalid JSON");
  }
};