const callGemini = require("./geminiClient");

const systemPrompt = `
You are a UI explanation agent.
Explain layout decisions clearly and concisely.
`;

module.exports = async function explainer(message, plan, layout) {

  const userPrompt = `
User request:
${message}

Generated layout:
${JSON.stringify(layout)}

Explain reasoning.
`;

  return await callGemini(systemPrompt, userPrompt);
};