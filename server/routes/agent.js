const express = require("express");
const router = express.Router();

const planner = require("../agent/planner");
const generator = require("../agent/generator");
const explainer = require("../agent/explainer");
const validator = require("../agent/validator");
const versionStore = require("../versionStore");

// 🔒 Basic Prompt Injection Guard
const forbiddenPatterns = [
  "ignore previous instructions",
  "system prompt",
  "developer mode",
  "bypass",
  "override rules"
];

function isSuspiciousInput(message) {
  return forbiddenPatterns.some(pattern =>
    message.toLowerCase().includes(pattern)
  );
}

router.post("/", async (req, res) => {
  try {
    const { message, previousPlan } = req.body;

    // 🛡 Injection Protection
    if (isSuspiciousInput(message)) {
      return res.status(400).json({
        error: "Suspicious input detected."
      });
    }

    // 1️⃣ Planner
    const plan = await planner(message, previousPlan);

    // 2️⃣ Generator
    const layout = await generator(plan);

    console.log("Planner Output:", plan);
    console.log("Generator Output:", layout);

    // 3️⃣ Structural Validation
    const isValid = validator(layout);

    if (!isValid.valid) {
      return res.status(400).json({
        error: isValid.error || "Invalid layout structure."
      });
    }

    // 4️⃣ Explainer
    const explanation = await explainer(message, plan, layout);

    // 5️⃣ Version Store
    const versionId = versionStore.addVersion({
      plan,
      layout,
      explanation
    });

    res.json({
      versionId,
      plan,
      layout,
      explanation
    });

  } catch (err) {
    console.error("Agent Error:", err);
    res.status(500).json({
      error: "Agent failed"
    });
  }
});

module.exports = router;
