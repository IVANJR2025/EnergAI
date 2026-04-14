import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

/** @param {{ data: any[]; locale: string; labels: { title: string; power: string; energy: string; irradiance: string } }} props */
export default function DashboardChart({ data, locale, labels }) {
  const chartData = data.map((point) => ({
    timestamp: new Date(point.timestamp).toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit"
    }),
    potenciaKw: point.active_power_kw,
    energiaKwh: point.active_energy_kwh,
    irradiancia: point.irradiance_w_m2
  }));

  return (
    <div className="panel nested-panel">
      <div className="panel-title">{labels.title}</div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="timestamp" stroke="#64748b" />
            <YAxis yAxisId="power" orientation="left" stroke="#2563eb" />
            <YAxis yAxisId="energy" orientation="right" stroke="#16a34a" />
            <YAxis yAxisId="irradiance" hide />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="power"
              type="monotone"
              dataKey="potenciaKw"
              name={labels.power}
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="energy"
              type="monotone"
              dataKey="energiaKwh"
              name={labels.energy}
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="irradiance"
              type="monotone"
              dataKey="irradiancia"
              name={labels.irradiance}
              stroke="#d97706"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
