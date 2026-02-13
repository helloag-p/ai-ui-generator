export default function Navbar() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-6 py-4 shadow-lg flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">
        App Navbar
      </h1>

      <div className="space-x-6 text-sm opacity-90">
        <span className="hover:opacity-100 cursor-pointer">Home</span>
        <span className="hover:opacity-100 cursor-pointer">About</span>
        <span className="hover:opacity-100 cursor-pointer">Contact</span>
      </div>
    </div>
  );
}
