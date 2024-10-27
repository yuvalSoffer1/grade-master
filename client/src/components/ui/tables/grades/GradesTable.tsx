interface IGradesTableProps {
  studentId: string;
  gradeItemNames: Record<string, number>;
}

const GradesTable = ({ data }: { data: IGradesTableProps[] }) => {
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  // Get all unique grade item names from the data
  const gradeItemNames = Object.keys(data[0].gradeItemNames);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student ID</th>
            {gradeItemNames.map((name, index) => (
              <th key={index} className="px-4 py-2 border">
                {name[0].toUpperCase() + name.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-center border">{item.studentId}</td>
              {gradeItemNames.map((name, idx) => (
                <td key={idx} className="px-4 py-2 text-center border">
                  {item.gradeItemNames[name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradesTable;
