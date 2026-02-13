export default function Table({ rows = 3, columns = 3 }) {
  return (
    <div className="overflow-auto rounded-xl border border-white/10 bg-white text-gray-800">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th
                key={i}
                className="border px-4 py-2 bg-gray-100 text-sm font-semibold"
              >
                Column {i + 1}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: columns }).map((_, c) => (
                <td
                  key={c}
                  className="border px-4 py-2 text-sm"
                >
                  Row {r + 1} Col {c + 1}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
