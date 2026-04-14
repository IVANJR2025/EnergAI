export const mockPlant = {
  producer: "Aurora Luso Energy, S.A.",
  installation: "UPP ZP-401 / Vale Verde",
  periodKey: { month: 3, year: 2026 },
  location: "Fronteira Portugal–Espanha (região ibérica)",
  installedPowerKwp: 24500,
  commissioningDate: "2023-03-10",
  coverSolarImage:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
  coverWindImage:
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80"
};

export const mockProduction = {
  activeEnergyKwh: 73933,
  activePowerKwAvg: 130.7,
  consumedEnergyKwh: 275,
  irradianceAvg: 339.7,
  temperatureAvg: 16.3
};

/** @type {{ key: string; value: number; trend: number }[]} */
export const mockKpiKeys = [
  { key: "pro", value: 0.86, trend: 1.8 },
  { key: "pa", value: 1.0, trend: 0.0 },
  { key: "pr", value: 0.86, trend: 1.2 },
  { key: "prt", value: 0.86, trend: 0.9 },
  { key: "ga", value: 1.0, trend: 0.0 },
  { key: "gl", value: 0.0, trend: -0.1 }
];

export const ratioStats = [
  { metric: "PRo", media: 0.86, mediana: 0.86, maximo: 0.89 },
  { metric: "PA", media: 1.0, mediana: 1.0, maximo: 1.0 },
  { metric: "PR", media: 0.86, mediana: 0.87, maximo: 0.91 },
  { metric: "PR'", media: 0.86, mediana: 0.87, maximo: 0.89 },
  { metric: "GA", media: 1.0, mediana: 1.0, maximo: 1.0 },
  { metric: "GL", media: 0.0, mediana: 0.0, maximo: 0.0 }
];

export const alarmRanking = [
  { key: "alarm_1", occurrences: 32409 },
  { key: "alarm_2", occurrences: 157 },
  { key: "alarm_3", occurrences: 137 },
  { key: "alarm_4", occurrences: 137 },
  { key: "alarm_5", occurrences: 135 },
  { key: "alarm_6", occurrences: 130 }
];

export const generationSeries = Array.from({ length: 24 }).map((_, idx) => ({
  timestamp: `2026-03-15T${String(idx).padStart(2, "0")}:00:00Z`,
  active_power_kw: 55 + Math.max(0, Math.sin((idx - 6) / 3) * 130),
  active_energy_kwh: 2900 + idx * 160,
  irradiance_w_m2: Math.max(0, Math.sin((idx - 6) / 3) * 820 + 40)
}));

export const mlDemoSeries = Array.from({ length: 14 }).map((_, idx) => {
  const expected = 4200 + idx * 45;
  const generated = expected * (idx % 4 === 0 ? 0.87 : 0.98);
  return {
    day: `${idx + 1}/03`,
    expected,
    generated,
    deviation: Number((((generated - expected) / expected) * 100).toFixed(2))
  };
});

export const cvExamples = [
  {
    id: "cv_1",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cv_2",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "cv_3",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80"
  }
];
