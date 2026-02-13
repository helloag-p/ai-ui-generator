export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold tracking-wide">
          App Navbar
        </h1>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="#" className="hover:text-blue-400 transition">About</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}
