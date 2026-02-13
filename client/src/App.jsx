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


  const generateUI = async (reset = false) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/agent`, {
        message,
        previousPlan: reset ? [] : layout
      });

      setLayout(res.data.layout);
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
                className={`px-3 py-1 rounded-lg text-xs ${
  selectedVersion === i
    ? "bg-blue-600"
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
          className="flex-1 bg-gray-800/70 border border-white/10 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition shadow-inner"
          value={JSON.stringify(layout, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setLayout(parsed);
            } catch {
              // Ignore invalid JSON while typing
            }
          }}
        />

      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 m-4 bg-gray-900/80 backdrop-blur-md border border-white/10 hover:border-indigo-500/30 transition duration-300 rounded-2xl p-6 shadow-xl overflow-y-auto">

        <h2 className="text-lg font-semibold tracking-wide text-white/90 mb-6">
          Live Preview
        </h2>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900 rounded-xl p-8 min-h-[420px] border border-white/10 shadow-inner">

          {layout.length === 0 ? (
            <div className="text-white/30 text-sm text-center mt-20">
              Generated UI will appear here...
            </div>
          ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Renderer layout={layout} />
</div>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;
