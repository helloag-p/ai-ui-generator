export default function Table() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full text-gray-800">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-sm uppercase text-gray-600">
          <tr>
            <th className="px-6 py-3">Column 1</th>
            <th className="px-6 py-3">Column 2</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          <tr className="border-t hover:bg-gray-50 transition">
            <td className="px-6 py-4">Data 1</td>
            <td className="px-6 py-4">Data 2</td>
          </tr>

          <tr className="border-t hover:bg-gray-50 transition">
            <td className="px-6 py-4">Data 3</td>
            <td className="px-6 py-4">Data 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
