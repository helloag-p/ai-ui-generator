AI UI Generator – Deterministic Multi-Agent System

Ryze AI Full-Stack Assignment – [Your Name]

🧠 Overview

This project implements a deterministic AI-powered UI generation system inspired by Claude Code-style orchestration.

The system converts natural language UI intent into:

Structured UI layout plans

Deterministic React component compositions

Live-rendered previews

Versioned UI states

Plain-English explanations of decisions

The architecture prioritizes correctness, reproducibility, and debuggability over visual polish.

🎯 Core Design Principles

Deterministic Component System

Explicit Multi-Agent Orchestration

Iterative Edit Awareness

Safety & Validation Controls

Explainability

🏗️ Architecture Overview
User Intent
    ↓
Planner Agent
    ↓
Generator Agent
    ↓
Validator
    ↓
Explainer Agent
    ↓
Version Store
    ↓
React Renderer (Whitelist Enforced)

🧠 Multi-Agent Design

The system intentionally separates responsibilities into explicit agent steps.

1️⃣ Planner

Purpose:
Interprets user intent and selects layout structure.

Responsibilities:

Understand natural language request

Decide which components to use

Preserve previous layout for incremental edits

Output structured JSON plan

Example output:

[
  { "type": "Navbar", "props": {} },
  { "type": "Card", "props": { "title": "Card 1" } }
]

2️⃣ Generator

Purpose:
Converts structured plan into deterministic UI layout.

Constraints:

Must use fixed component library

Cannot create new components

Cannot generate CSS

Only sets props and composes components

3️⃣ Explainer

Purpose:
Explains why the UI was structured in a certain way.

Produces plain-English reasoning referencing:

Layout decisions

Component selections

Incremental changes

🔒 Deterministic Component System

All UIs are built using a fixed component library:

Button

Card

Input

Table

Modal

Sidebar

Navbar

Chart (mocked)

Strict Rules

No inline styles

No AI-generated CSS

No arbitrary Tailwind classes from AI

No external UI libraries

No dynamic component creation

Enforcement

Renderer implements explicit whitelist enforcement:

const COMPONENT_WHITELIST = [...]


Any unknown component type is blocked before rendering.

This guarantees visual consistency and reproducibility.

🔁 Iterative Editing

The system supports incremental modifications.

Example:

"Make this more minimal and add a settings modal."

The planner receives the previous layout and modifies it rather than regenerating from scratch.

Version history is preserved and rollback is supported.

🛡️ Safety & Validation

The system includes lightweight but real protections:

✅ Component Whitelist Enforcement

Prevents unknown components from rendering.

✅ Layout Structure Validation

Ensures AI output matches expected schema before rendering.

✅ Prompt Injection Guard

Basic filtering of suspicious patterns like:

"ignore previous instructions"

"system prompt"

"bypass rules"

✅ Error Handling

Graceful failure for:

Invalid AI output

Schema mismatch

Suspicious user input

🖥️ Application UI

The interface includes:

Left Panel: User chat / intent input

Center Panel: Generated JSON (editable)

Right Panel: Live preview

Explanation section

Version history with rollback

Generate / Modify / Regenerate actions

🧰 Tech Stack

Frontend:

React (Vite)

TailwindCSS

Backend:

Node.js

Express

AI:

LLM API (Gemini)

Storage:

In-memory version store

📦 Setup Instructions
1️⃣ Clone Repository
git clone <repo-url>
cd project

2️⃣ Backend Setup
cd server
npm install


Create .env:

GEMINI_API_KEY=your_key_here


Run:

node index.js

3️⃣ Frontend Setup
cd client
npm install
npm run dev


Open:

http://localhost:5173

🔄 Example Workflow

User types:
"Create a dashboard with navbar and 3 cards"

Planner selects:

Navbar

Card x3

Generator creates deterministic layout

Explainer describes decision

UI renders live

User modifies:
"Add a settings modal"

Planner updates previous plan

New version stored

User can rollback

⚖ Engineering Tradeoffs
Why Multi-Agent Instead of Single Call?

Explicit reasoning stages

Easier debugging

Deterministic enforcement

Clear separation of concerns

Why In-Memory Storage?

Simplicity for assignment

Focus on orchestration rather than infrastructure

🚧 Known Limitations

No structural diff enforcement

Basic prompt injection filtering only

No streaming AI responses

No persistence beyond server restart

No schema-level deep validation

🔮 What I Would Improve With More Time

Formal JSON schema validation

Structural diff-based edit enforcement

Streaming response support

Replayable generation logs

Component-level schema enforcement

Structured AST validation

Rate-limit aware retry system

Persistent version storage