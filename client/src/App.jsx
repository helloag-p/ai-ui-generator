import { useState } from "react";
import axios from "axios";
import Renderer from "./components/Renderer";

function App() {
  const [message, setMessage] = useState("");
  const [layout, setLayout] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [jsonText, setJsonText] = useState("");



  const generateUI = async (reset = false) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/agent`, {
        message,
        previousPlan: reset ? [] : layout
      });

      setLayout(res.data.layout);
      setJsonText(JSON.stringify(res.data.layout, null, 2));
      setExplanation(res.data.explanation);
      setVersions(prev => [...prev, res.data]);

    } catch (err) {
      console.error(err);
      setExplanation("Error generating UI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const rollback = (index) => {
    const version = versions[index];
    setLayout(version.layout);
    setJsonText(JSON.stringify(version.layout, null, 2));
    setExplanation(version.explanation);
    setSelectedVersion(index);
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(layout, null, 2));
  };

  const clearLayout = () => {
    setLayout([]);
    setExplanation("");
  };

  return (
    <div className="h-screen w-screen flex bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white overflow-hidden">

      {/* LEFT PANEL */}
      <div className="w-[24%] m-4 bg-gray-900/80 backdrop-blur-md border border-white/10 hover:border-blue-500/30 transition duration-300 rounded-2xl p-6 flex flex-col space-y-6 shadow-xl">

        <h2 className="text-lg font-semibold tracking-wide text-white/90">
          AI Chat
        </h2>

        <textarea
          className="w-full h-28 bg-gray-800/70 border border-gray-600 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your UI..."
        />

        <div className="flex gap-3">
         <button
  onClick={generateUI}
  disabled={loading}
  className={`flex-1 py-2.5 rounded-xl transition shadow-lg ${
    loading
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
  }`}
>
  {loading ? "Generating..." : "Generate"}
</button>


          <button
            onClick={() => generateUI(true)}
            disabled={loading}
            className="flex-1 bg-white/10 hover:bg-white/20 py-2.5 rounded-xl transition"
          >
            Regenerate
          </button>
        </div>

        {/* Explanation */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">
            Explanation
          </h3>
          <p className="text-sm text-white/70 whitespace-pre-wrap">
            {explanation || "No explanation yet."}
          </p>
        </div>

        {/* Versions */}
        <div>
          <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">
            Versions
          </h3>
          <div className="flex flex-wrap gap-2">
            {versions.map((_, i) => (
              <button
                key={i}
                onClick={() => rollback(i)}
                className={`px-3 py-1.5 rounded-lg text-xs transition ${
  selectedVersion === i
    ? "bg-blue-600 text-white shadow-md"
    : "bg-white/5 hover:bg-white/15"
}`}

              >
                V{i}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* CENTER PANEL */}
      <div className="w-[38%] m-4 bg-gray-900/80 backdrop-blur-md border border-white/10 hover:border-purple-500/30 transition duration-300 rounded-2xl p-6 flex flex-col shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold tracking-wide text-white/90">
            Generated Layout JSON
          </h2>
          

          <div className="flex gap-2 mb-4">
  <button
    onClick={() => navigator.clipboard.writeText(JSON.stringify(layout, null, 2))}
    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition"
  >
    Copy
  </button>

  <button
    onClick={() => {
      setLayout([]);
      setExplanation("");
    }}
    className="text-xs bg-red-600/70 hover:bg-red-600 px-3 py-1 rounded-lg transition"
  >
    Clear
  </button>
</div>
        </div>

        <textarea
  className="flex-1 bg-gray-800/70 border border-white/10 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition shadow-inner resize-none"
  value={jsonText}
  onChange={(e) => {
    const value = e.target.value;
    setJsonText(value);

    try {
      const parsed = JSON.parse(value);
      setLayout(parsed);
    } catch {
      // allow typing invalid JSON temporarily
    }
  }}
/>


      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 m-4 bg-gray-900/80 backdrop-blur-md border border-white/10 hover:border-indigo-500/30 transition duration-300 rounded-2xl p-6 shadow-xl overflow-y-auto">

        <h2 className="text-lg font-semibold tracking-wide text-white/90 mb-6">
          Live Preview
        </h2>

      <div className="bg-white rounded-2xl p-10 min-h-[420px] border border-gray-200 shadow-lg transition-all duration-300">


          {layout.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
  <div className="mb-2 text-4xl">🧠</div>
  Generated UI will appear here...
</div>

          ) : (
          <Renderer layout={layout} />

          )}

        </div>

      </div>

    </div>
  );
}

export default App;
