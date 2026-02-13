export default function Chart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full text-gray-800">
      <h3 className="font-semibold text-lg mb-4">
        Chart (Mocked)
      </h3>

      <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-end p-3 gap-2">
        <div className="w-4 h-10 bg-white/70 rounded-sm"></div>
        <div className="w-4 h-16 bg-white/70 rounded-sm"></div>
        <div className="w-4 h-6 bg-white/70 rounded-sm"></div>
        <div className="w-4 h-20 bg-white/70 rounded-sm"></div>
        <div className="w-4 h-12 bg-white/70 rounded-sm"></div>
      </div>
    </div>
  );
}
