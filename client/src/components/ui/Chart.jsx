export default function Chart({ title }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 text-gray-800 transition hover:shadow-xl">
      
      {/* Title */}
      <h3 className="font-semibold text-lg mb-4">
        {title || "Chart"}
      </h3>

      {/* Mock Bar Chart */}
      <div className="space-y-3">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-blue-500 h-3 rounded-full w-[70%]"></div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-indigo-500 h-3 rounded-full w-[50%]"></div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-purple-500 h-3 rounded-full w-[85%]"></div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-pink-500 h-3 rounded-full w-[60%]"></div>
        </div>
      </div>

    </div>
  );
}
