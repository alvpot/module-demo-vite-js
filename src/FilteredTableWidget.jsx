const data = [
  { id: 1, date: "2022-05-01", amount: 100 },
  { id: 2, date: "2022-05-02", amount: 200 },
  { id: 3, date: "2022-05-10", amount: 300 },
]

const cellClass = "text-center border-b border-neutral-400 p-4";

export default function(React) {
  return function(props) {
    const visibleData = props.date ? data.filter(d => d.date === props.date) : data;

    return (
      <div>
        FilteredTableWidget
        <table className="border-collapse table-auto w-full">
          <thead>
            <tr>
              <th className={cellClass}>Date</th>
              <th className={cellClass}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map(d => (
              <tr key={d.id}>
                <td className={cellClass}>{d.date}</td>
                <td className={cellClass}>{d.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
