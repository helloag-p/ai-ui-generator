const callGemini = require("./geminiClient");

const systemPrompt = `
You are a deterministic UI planning agent.

You may:
- Modify the existing layout
- Add components
- Remove components
- Update props

Rules:
- Use ONLY these components:
  Button
  Card
  Input
  Table
  Modal
  Sidebar
  Navbar
  Chart

- Preserve existing components unless user explicitly asks to remove them
- Do NOT regenerate entire layout unless explicitly requested
- Output ONLY a JSON array
- No explanation
- No markdown
`;

module.exports = async function planner(message, previousPlan) {

  const userPrompt = `
User request:
${message}

Previous Plan:
${JSON.stringify(previousPlan || [])}

Return format example:

[
  { "type": "Navbar", "props": {} },
  { "type": "Card", "props": { "title": "Revenue" } }
]
`;

  const response = await callGemini(systemPrompt, userPrompt);

  function extractJSONArray(text) {
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error("No JSON array found");
  return match[0];
}

try {
  const cleaned = extractJSONArray(response);
  return JSON.parse(cleaned);
} catch (err) {
  console.error("Raw Planner Output:", response);
  throw new Error("Planner returned invalid JSON");
}
};