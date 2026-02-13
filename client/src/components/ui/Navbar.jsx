export default function Navbar() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-6 py-4 shadow-lg flex flex-wrap justify-between items-center gap-4">

      <h1 className="text-xl font-semibold tracking-wide whitespace-nowrap">
        App Navbar
      </h1>

      <div className="flex flex-wrap gap-6 text-sm opacity-90">
        <span className="hover:opacity-100 cursor-pointer whitespace-nowrap">
          Home
        </span>
        <span className="hover:opacity-100 cursor-pointer whitespace-nowrap">
          About
        </span>
        <span className="hover:opacity-100 cursor-pointer whitespace-nowrap">
          Contact
        </span>
      </div>
    </div>
  );
}
