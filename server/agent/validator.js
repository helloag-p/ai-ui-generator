const ALLOWED_COMPONENTS = [
  "Button",
  "Card",
  "Input",
  "Table",
  "Modal",
  "Sidebar",
  "Navbar",
  "Chart"
];

function validate(layout) {
  if (!Array.isArray(layout)) {
    return { valid: false, error: "Layout must be an array" };
  }

  for (const item of layout) {
    if (!ALLOWED_COMPONENTS.includes(item.type)) {
      return {
        valid: false,
        error: `Component ${item.type} is not allowed`
      };
    }
  }

  return { valid: true };
}

module.exports = validate;