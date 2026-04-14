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

export default function DashboardChart({ data }) {
  const chartData = data.map((point) => ({
    timestamp: new Date(point.timestamp).toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    potenciaKw: point.active_power_kw,
    energiaKwh: point.active_energy_kwh,
    irradiancia: point.irradiance_w_m2
  }));

  return (
    <div className="panel">
      <div className="panel-title">Geracao em Tempo Real</div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" />
            <XAxis dataKey="timestamp" stroke="#9ca3af" />
            <YAxis yAxisId="power" orientation="left" stroke="#3b82f6" />
            <YAxis yAxisId="energy" orientation="right" stroke="#22c55e" />
            <YAxis yAxisId="irradiance" hide />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="power"
              type="monotone"
              dataKey="potenciaKw"
              name="Potencia Ativa (kW)"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="energy"
              type="monotone"
              dataKey="energiaKwh"
              name="Energia Ativa (kWh)"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="irradiance"
              type="monotone"
              dataKey="irradiancia"
              name="Irradiancia (W/m2)"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
