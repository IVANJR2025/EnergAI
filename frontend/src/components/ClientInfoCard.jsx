export default function ClientInfoCard({ client }) {
  if (!client) return null;

  return (
    <div className="panel">
      <div className="panel-title">Dados do Cliente</div>
      <div className="client-grid">
        <div>
          <span>Nome</span>
          <strong>{client.name}</strong>
        </div>
        <div>
          <span>Localizacao</span>
          <strong>{client.location}</strong>
        </div>
        <div>
          <span>Potencia Instalada</span>
          <strong>{client.installed_power_kwp} kWp</strong>
        </div>
        <div>
          <span>Comissionamento</span>
          <strong>{new Date(client.commissioning_date).toLocaleDateString("pt-PT")}</strong>
        </div>
      </div>
    </div>
  );
}
