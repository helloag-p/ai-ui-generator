export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-200 shadow-md hover:shadow-lg"
    >
      {label}
    </button>
  );
}
