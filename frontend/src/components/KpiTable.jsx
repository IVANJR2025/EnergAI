export default function KpiTable({ kpis }) {
  return (
    <div className="panel">
      <div className="panel-title">KPIs Operacionais</div>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>Indicador</th>
            <th>Valor</th>
            <th>Tendencia</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((kpi) => (
            <tr key={kpi.key}>
              <td>{kpi.label}</td>
              <td>
                {kpi.value}
                {kpi.unit}
              </td>
              <td className={kpi.trend >= 0 ? "trend-up" : "trend-down"}>
                {kpi.trend >= 0 ? "+" : ""}
                {kpi.trend}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
