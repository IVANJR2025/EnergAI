import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import DashboardChart from "./components/DashboardChart";
import KpiTable from "./components/KpiTable";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import {
  alarmRanking,
  cvExamples,
  generationSeries,
  mlDemoSeries,
  mockKpiKeys,
  mockPlant,
  mockProduction,
  ratioStats
} from "./mockData";
import { TAB_KEYS, t, tabLabel } from "./i18n";

/** @typedef {import('./i18n').Lang} Lang */

const LOCALE = { pt: "pt-PT", es: "es-ES", en: "en-GB" };

export default function App() {
  /** @type {[Lang, import('react').Dispatch<import('react').SetStateAction<Lang>>]} */
  const [lang, setLang] = useState(/** @type {Lang} */ ("pt"));
  const reportRef = useRef(null);
  /** @type {[string, import('react').Dispatch<import('react').SetStateAction<string>>]} */
  const [activeTab, setActiveTab] = useState("cover");
  const [uploads, setUploads] = useState([]);

  const locale = LOCALE[lang] ?? LOCALE.pt;

  const periodLabel = useMemo(() => {
    const { month, year } = mockPlant.periodKey;
    const d = new Date(year, month - 1, 1);
    return d.toLocaleString(locale, { month: "long", year: "numeric" });
  }, [locale]);

  const client = useMemo(
    () => ({
      name: mockPlant.producer,
      location: mockPlant.location,
      installed_power_kwp: mockPlant.installedPowerKwp,
      commissioning_date: mockPlant.commissioningDate
    }),
    []
  );

  const kpiRows = useMemo(
    () =>
      mockKpiKeys.map((row) => ({
        ...row,
        label: t(lang, /** @type {any} */ (`kpi_${row.key}`)),
        unit: ""
      })),
    [lang]
  );

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const productionSheet = XLSX.utils.json_to_sheet([mockProduction]);
    const kpiSheet = XLSX.utils.json_to_sheet(
      kpiRows.map((r) => ({ indicador: r.label, valor: r.value, tendencia_pct: r.trend }))
    );
    const alarmsSheet = XLSX.utils.json_to_sheet(
      alarmRanking.map((a) => ({
        alarme: t(lang, /** @type {any} */ (a.key)),
        ocorrencias: a.occurrences
      }))
    );
    const mlSheet = XLSX.utils.json_to_sheet(mlDemoSeries);
    XLSX.utils.book_append_sheet(wb, productionSheet, "Producao");
    XLSX.utils.book_append_sheet(wb, kpiSheet, "KPIs");
    XLSX.utils.book_append_sheet(wb, alarmsSheet, "Alarmes");
    XLSX.utils.book_append_sheet(wb, mlSheet, "Demo_ML");
    XLSX.writeFile(wb, `relatorio_${mockPlant.installation.replace(/\W+/g, "_")}.xlsx`);
  };

  const exportPdf = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = 190;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, width, height);
    pdf.save(`relatorio_${mockPlant.installation.replace(/\W+/g, "_")}.pdf`);
  };

  const handleUpload = (event) => {
    const files = Array.from(event.target.files ?? []);
    setUploads(files);
  };

  const chartLabels = {
    title: t(lang, "chartRealtime"),
    power: t(lang, "chartPower"),
    energy: t(lang, "chartEnergy"),
    irradiance: t(lang, "chartIrradiance")
  };

  return (
    <main className="layout">
      <header className="hero">
        <div className="hero-top">
          <div className="hero-text">
            <h1>{t(lang, "heroTitle")}</h1>
            <p>{t(lang, "heroSubtitle")}</p>
          </div>
          <div className="hero-locale">
            <div className="flags-row" aria-label={t(lang, "altFlags")}>
              <img
                className="flag-img"
                src="https://flagcdn.com/w80/pt.png"
                width={40}
                height={27}
                alt="Portugal"
              />
              <img
                className="flag-img"
                src="https://flagcdn.com/w80/es.png"
                width={40}
                height={27}
                alt="España"
              />
            </div>
            <div className="lang-buttons" role="group" aria-label="Language">
              <button
                type="button"
                className={`lang-btn ${lang === "pt" ? "active" : ""}`}
                onClick={() => setLang("pt")}
              >
                {t(lang, "langPt")}
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === "es" ? "active" : ""}`}
                onClick={() => setLang("es")}
              >
                {t(lang, "langEs")}
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                {t(lang, "langEn")}
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="tabs">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className={`tab-btn ${key === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {tabLabel(lang, key)}
          </button>
        ))}
      </section>

      <section ref={reportRef} className="panel report-shell">
        {activeTab === "cover" && (
          <div className="cover-stack">
            <div className="cover-flags-note muted">{t(lang, "altFlags")}</div>
            <div className="cover-mosaic">
              <figure className="cover-figure">
                <img
                  src={mockPlant.coverSolarImage}
                  alt={t(lang, "altSolar")}
                  className="cover-image"
                />
                <figcaption className="muted">{t(lang, "altSolar")}</figcaption>
              </figure>
              <figure className="cover-figure">
                <img
                  src={mockPlant.coverWindImage}
                  alt={t(lang, "altWind")}
                  className="cover-image"
                />
                <figcaption className="muted">{t(lang, "altWind")}</figcaption>
              </figure>
            </div>
            <div className="cover-body">
              <h2>{t(lang, "coverTitle")}</h2>
              <p className="muted">{t(lang, "coverIntro")}</p>
              <div className="data-grid">
                <div>
                  <span>{t(lang, "labelProducer")}</span>
                  <strong>{client.name}</strong>
                </div>
                <div>
                  <span>{t(lang, "labelPlant")}</span>
                  <strong>{mockPlant.installation}</strong>
                </div>
                <div>
                  <span>{t(lang, "labelPeriod")}</span>
                  <strong>{periodLabel}</strong>
                </div>
                <div>
                  <span>{t(lang, "labelLocation")}</span>
                  <strong>{client.location}</strong>
                </div>
                <div>
                  <span>{t(lang, "labelPower")}</span>
                  <strong>{client.installed_power_kwp} kWp</strong>
                </div>
                <div>
                  <span>{t(lang, "labelCommissioning")}</span>
                  <strong>{client.commissioning_date}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dashboard" && (
          <>
            <DashboardChart data={generationSeries} locale={locale} labels={chartLabels} />
            <KpiTable
              kpis={kpiRows}
              title={t(lang, "kpiTitle")}
              thIndicator={t(lang, "thIndicator")}
              thValue={t(lang, "thValue")}
              thTrend={t(lang, "thTrend")}
            />
          </>
        )}

        {activeTab === "reports" && (
          <div className="stack">
            <div className="actions">
              <button type="button" onClick={exportPdf}>
                {t(lang, "downloadPdf")}
              </button>
              <button type="button" onClick={exportExcel}>
                {t(lang, "downloadExcel")}
              </button>
            </div>
            <h3>{t(lang, "prodTitle")}</h3>
            <table className="kpi-table">
              <tbody>
                <tr>
                  <td>{t(lang, "prodActiveOut")}</td>
                  <td>{mockProduction.activeEnergyKwh} kWh</td>
                </tr>
                <tr>
                  <td>{t(lang, "prodPowerAvg")}</td>
                  <td>{mockProduction.activePowerKwAvg} kW</td>
                </tr>
                <tr>
                  <td>{t(lang, "prodActiveIn")}</td>
                  <td>{mockProduction.consumedEnergyKwh} kWh</td>
                </tr>
                <tr>
                  <td>{t(lang, "prodIrr")}</td>
                  <td>{mockProduction.irradianceAvg} W/m²</td>
                </tr>
                <tr>
                  <td>{t(lang, "prodTemp")}</td>
                  <td>{mockProduction.temperatureAvg} °C</td>
                </tr>
              </tbody>
            </table>

            <h3>{t(lang, "ratiosTitle")}</h3>
            <table className="kpi-table">
              <thead>
                <tr>
                  <th>{t(lang, "thMetric")}</th>
                  <th>{t(lang, "thMean")}</th>
                  <th>{t(lang, "thMedian")}</th>
                  <th>{t(lang, "thMax")}</th>
                </tr>
              </thead>
              <tbody>
                {ratioStats.map((item) => (
                  <tr key={item.metric}>
                    <td>{item.metric}</td>
                    <td>{item.media}</td>
                    <td>{item.mediana}</td>
                    <td>{item.maximo}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>{t(lang, "alarmsTitle")}</h3>
            <table className="kpi-table">
              <thead>
                <tr>
                  <th>{t(lang, "thAlarm")}</th>
                  <th>{t(lang, "thCount")}</th>
                </tr>
              </thead>
              <tbody>
                {alarmRanking.map((item) => (
                  <tr key={item.key}>
                    <td>{t(lang, /** @type {any} */ (item.key))}</td>
                    <td>{item.occurrences}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "ml" && (
          <div className="stack">
            <h3>{t(lang, "mlTitle")}</h3>
            <p className="muted">{t(lang, "mlHint")}</p>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height={340}>
                <LineChart data={mlDemoSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    stroke="#16a34a"
                    name={t(lang, "mlExpected")}
                  />
                  <Line
                    type="monotone"
                    dataKey="generated"
                    stroke="#2563eb"
                    name={t(lang, "mlGenerated")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <table className="kpi-table">
              <thead>
                <tr>
                  <th>{t(lang, "thDay")}</th>
                  <th>{t(lang, "thExpected")}</th>
                  <th>{t(lang, "thGenerated")}</th>
                  <th>{t(lang, "thDev")}</th>
                  <th>{t(lang, "thStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {mlDemoSeries.map((row) => (
                  <tr key={row.day}>
                    <td>{row.day}</td>
                    <td>{row.expected.toFixed(1)}</td>
                    <td>{row.generated.toFixed(1)}</td>
                    <td className={Math.abs(row.deviation) > 10 ? "trend-down" : "trend-up"}>
                      {row.deviation}%
                    </td>
                    <td>
                      {Math.abs(row.deviation) > 10
                        ? t(lang, "statusAlert")
                        : t(lang, "statusOk")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "cv" && (
          <div className="cv-grid">
            {cvExamples.map((item) => (
              <article key={item.id} className="cv-card">
                <img src={item.image} alt={t(lang, /** @type {any} */ (`${item.id}_title`))} />
                <h4>{t(lang, /** @type {any} */ (`${item.id}_title`))}</h4>
                <p>
                  <strong>{t(lang, "cvFinding")}:</strong>{" "}
                  {t(lang, /** @type {any} */ (`${item.id}_finding`))}
                </p>
                <p>
                  <strong>{t(lang, "cvAction")}:</strong>{" "}
                  {t(lang, /** @type {any} */ (`${item.id}_action`))}
                </p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "upload" && (
          <div className="stack">
            <h3>{t(lang, "uploadTitle")}</h3>
            <p className="muted">{t(lang, "uploadHint")}</p>
            <label className="upload-box">
              <input type="file" accept="image/*" multiple onChange={handleUpload} />
              <span>{t(lang, "uploadPrompt")}</span>
            </label>
            <ul className="file-list">
              {uploads.length === 0 ? (
                <li>{t(lang, "uploadEmpty")}</li>
              ) : (
                uploads.map((file) => <li key={`${file.name}-${file.size}`}>{file.name}</li>)
              )}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
