const Table = ({ data }: any) => {
  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header: any, index: number) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: any, index: number) => (
          <tr key={index}>
            {row.map((cell: any, idx: number) => (
              <td key={idx}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
