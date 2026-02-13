export default function Modal({ title }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-gray-800">
        <h2 className="text-lg font-semibold mb-2">
          {title || "Modal"}
        </h2>

        <p className="text-sm text-gray-600">
          Modal content
        </p>

        <div className="mt-4 text-right">
          <button className="px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
