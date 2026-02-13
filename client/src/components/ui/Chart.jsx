export default function Card({ title, content }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 text-gray-800 transition hover:shadow-xl">
      <h3 className="font-semibold text-lg mb-2">
        {title || "Card"}
      </h3>
      <p className="text-gray-600">
        {content || "Card content"}
      </p>
    </div>
  );
}
