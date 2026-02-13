export default function Card({ title, content }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 transition hover:shadow-2xl hover:-translate-y-1 duration-300">
      <h3 className="font-semibold text-lg mb-3">
        {title || "Card"}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {content || "Card content"}
      </p>
    </div>
  );
}
