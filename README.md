# AI UI Generator

Deterministic multi-agent system that converts natural-language UI intent into reproducible React layouts, with live preview, versioning, and plain-English explanations.

## What it is

- Converts user prompts into a structured JSON UI plan.
- Composes UI from a fixed component library (whitelist enforced) for deterministic, auditable output.
- Stores versions, supports incremental edits, and explains decisions in plain English.

## Key features

- Planner → Generator → Validator → Explainer multi-agent pipeline
- Deterministic React component composition (no AI-generated CSS)
- Live preview with whitelist enforcement
- In-memory versioning and rollback
- Basic prompt-injection protections and schema checks

## Architecture overview

High-level flow:

User intent → Planner → Generator → Validator → Explainer → Version Store → Renderer

Core pieces:

- Planner: produces a structured JSON plan describing top-level components and their props.
- Generator: deterministically maps plan entries to the allowed component set and props.
- Validator: enforces plan schema, checks for unknown components and basic prompt-injection patterns.
- Explainer: produces plain-English rationale and a human-readable diff vs. previous plan.
- Version Store: in-memory timeline of plans for rollback and audit.
- Renderer: whitelist-enforced React renderer that blocks disallowed component types.

## Agent design & prompts

Each agent uses a concise, constrained prompt template so outputs are auditable and machine-validated.

- Planner
	- Purpose: interpret user intent, select layout structure and components, and preserve/increment from previous plan.
	- Output: JSON array of objects {"type": string, "props": object, "id"?: string}.
	- Prompt pattern:
		- System: "You are a Planner. Return only a JSON array describing the UI plan."
		- User: "Intent: <user text>. Previous plan: <JSON>. Return an updated plan."

- Generator
	- Purpose: deterministically convert the validated plan to a component tree representation.
	- Constraints: use only whitelist components; do not emit CSS, classes, or new component code.
	- Prompt pattern:
		- System: "You are the Generator. Given a validated plan, output a JSON representation of the component tree using only allowed types."
		- User: "Plan: <JSON>."

- Validator
	- Purpose: confirm plan is valid JSON, follows schema, contains only allowed types, and does not contain suspicious instructions.
	- Behavior: return pass/fail + normalized plan or an error reason.

- Explainer
	- Purpose: generate short plain-English bullets describing why components were chosen and what changed.
	- Output: human-readable text only (no JSON).

Example plan:

```json
[ { "type": "Navbar", "props": { "title": "Dashboard" } },
	{ "type": "Card", "props": { "title": "Revenue", "value": "$12k" } } ]
```

## Component system design

- Whitelist components: `Button`, `Card`, `Input`, `Table`, `Modal`, `Sidebar`, `Navbar`, `Chart`.
- Rules:
	- Agents must not generate CSS or arbitrary classnames.
	- No new component definitions or external UI libraries.
	- Renderer will block any component not on the whitelist before rendering.

Renderer enforcement (example):

```js
const COMPONENT_WHITELIST = ["Navbar","Card","Button","Input","Table","Modal","Sidebar","Chart"]
function renderNode(node){
	if (!COMPONENT_WHITELIST.includes(node.type)) throw new Error('Unknown component blocked')
	// map to actual component and render with props
}
```

## Known limitations

- In-memory version store: versions are lost on restart.
- Validation is primarily schema-level; structural-diff enforcement is not implemented.
- Prompt-injection mitigations are pattern-based and not adversarially hardened.
- No streaming LLM responses; agents run as single synchronous requests.
- No production-ready persistence, rate-limiting, or retries.

## What I'd improve with more time

- Add persistent version storage (database or object storage) and data migrations.
- Implement strict JSON Schema validation + structural diff enforcement for safe incremental edits.
- Harden prompt sanitization and validator logic to resist adversarial inputs.
- Add streaming responses and optimistic partial rendering for faster UX.
- Add end-to-end tests for agent output, renderer enforcement, and version rollback.

## Tech stack

- Frontend: React + Vite + Tailwind
- Backend: Node.js + Express
- AI: LLM API (Gemini client in `server/agent`)

## Quick start

1. Install dependencies for server and client:

```bash
cd server
npm install

cd ../client
npm install
```

2. Start the backend (from the `server` folder):

```bash
node index.js
```

3. Start the frontend (from the `client` folder):

```bash
npm run dev
```

4. Open the frontend at http://localhost:5173

Notes:
- Set `GEMINI_API_KEY` in `server/.env` if you want to use the Gemini client.
- Consider adding a `start` script to `server/package.json` for convenience.

## Development notes

- Components used by the generator are in `client/src/components/ui/`.
- The backend agent code is under `server/agent/`.
- Version storage is implemented in `server/versionStore.js` (in-memory).

## Folder structure

Top-level layout (short):

```
AI_UI_generator/
├─ client/                 # Frontend (Vite + React + Tailwind)
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  └─ ui/            # Whitelisted UI components used by generator
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
├─ server/                 # Backend (Express + agents)
│  ├─ agent/               # Planner, Generator, Validator, Explainer
│  ├─ routes/
│  ├─ versionStore.js
│  ├─ index.js
│  └─ package.json
└─ README.md
```

Notes:
- See `client/src/components/ui/` for concrete component implementations.
- See `server/agent/` for agent implementations and prompt usage.

## License

Add your preferred license here.

---

If you'd like, I can also:

- Add a `start` script to `server/package.json` and update docs.
- Expand `client/README.md` with contributor setup and testing notes.