import { useEffect, useState } from "react";
import axios from "axios";
import ClientInfoCard from "./components/ClientInfoCard";
import DashboardChart from "./components/DashboardChart";
import KpiTable from "./components/KpiTable";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/dashboard`);
        setDashboard(response.data);
      } catch (error) {
        console.error("Falha ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <main className="layout">
      <header className="hero">
        <h1>EnergAI Asset Management</h1>
        <p>Monitorizacao solar/eolica com insights preditivos de IA</p>
      </header>

      {loading ? (
        <div className="panel">A carregar dados...</div>
      ) : (
        <>
          <ClientInfoCard client={dashboard?.client} />
          <DashboardChart data={dashboard?.generation ?? []} />
          <KpiTable kpis={dashboard?.kpis ?? []} />
        </>
      )}
    </main>
  );
}
