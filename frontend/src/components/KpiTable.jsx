/** @param {{ kpis: { key: string; label: string; value: number; unit: string; trend: number }[]; title: string; thIndicator: string; thValue: string; thTrend: string }} props */
export default function KpiTable({ kpis, title, thIndicator, thValue, thTrend }) {
  return (
    <div className="panel nested-panel">
      <div className="panel-title">{title}</div>
      <table className="kpi-table">
        <thead>
          <tr>
            <th>{thIndicator}</th>
            <th>{thValue}</th>
            <th>{thTrend}</th>
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
