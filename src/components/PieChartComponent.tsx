import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Asset, COLORS } from "../services/interfaces";

interface Props {
  data: Asset[] | undefined;
}

// Função para formatar porcentagem
const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

const PieChartComponent = ({ data }: Props) => {
  return (
    <div>
      {/* Gráfico de Pizza */}
      <PieChart width={1000} height={400}>
        <Pie
          data={data}
          dataKey="allocation" // Chave usada para o valor
          nameKey="name" // Nome de cada setor
          cx="50%" // Posição horizontal do gráfico
          cy="50%" // Posição vertical do gráfico
          outerRadius={150} // Raio externo do gráfico
          fill="#8884d8" // Cor de preenchimento padrão
          label={(entry) => `${entry.name}: ${formatPercentage(entry.allocation)}`} // Formata o rótulo
        >
          {data?.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatPercentage(value)} />
        <Legend />
      </PieChart>

      {/* Tabela abaixo do gráfico */}
      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Ativo</th>
              <th style={styles.headerCell}>Retorno Anual Histórico (%)</th>
              <th style={styles.headerCell}>Volatilidade Histórica (%)</th>
              <th style={styles.headerCell}>Retorno Anual Projetado (%)</th>
              <th style={styles.headerCell}>Volatilidade Projetada (%)</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((asset, index) => (
              <tr key={index}>
                <td style={styles.cell}>{asset.name}</td>
                <td style={styles.cell}>{asset.historicalAnnualReturn.toFixed(2)}%</td>
                <td style={styles.cell}>{asset.historicalAnnualVolatility.toFixed(2)}%</td>
                <td style={styles.cell}>{asset.forecastAnnualReturn.toFixed(2)}%</td>
                <td style={styles.cell}>{(asset.forecastAnnualVolatility * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Estilos para a tabela
const styles = {
  headerCell: {
    border: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "RGB(33, 37, 41)",
    fontWeight: "bold",
    textAlign: "center" as const,
  },
  cell: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center" as const,
  },
};

export default PieChartComponent;
