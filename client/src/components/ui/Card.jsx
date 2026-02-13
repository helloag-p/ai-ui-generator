export default function Card({ title, content }) {
  return (
    <div className="p-6 border rounded-xl shadow bg-white">
      <h3 className="font-bold text-lg mb-2">
        {title || "Card"}
      </h3>
      <p className="text-gray-600">
        {content || "Card content"}
      </p>
    </div>
  );
}