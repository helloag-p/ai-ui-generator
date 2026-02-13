export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-900 text-white h-full shadow-lg">
      <div className="p-6 font-semibold text-lg border-b border-white/10">
        Sidebar
      </div>

      <nav className="flex flex-col p-4 gap-3 text-sm">
        <a href="#" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
          Dashboard
        </a>
        <a href="#" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
          Projects
        </a>
        <a href="#" className="px-3 py-2 rounded-lg hover:bg-white/10 transition">
          Settings
        </a>
      </nav>
    </aside>
  );
}
