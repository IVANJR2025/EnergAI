from datetime import date, datetime, timedelta

from app.schemas import AlarmItem, ClientInfo, GenerationPoint, KpiItem


def fetch_client_info() -> ClientInfo:
    return ClientInfo(
        name="SolarWind Industrial Park",
        location="Sines, Portugal",
        installed_power_kwp=24500.0,
        commissioning_date=date(2023, 3, 10),
    )


def fetch_generation_series() -> list[GenerationPoint]:
    now = datetime.utcnow().replace(minute=0, second=0, microsecond=0)
    points: list[GenerationPoint] = []
    base_energy = 10200.0
    for idx in range(12):
        irradiance = 150.0 + idx * 65.0
        power = 2200.0 + idx * 240.0
        energy = base_energy + idx * 210.0
        points.append(
            GenerationPoint(
                timestamp=now - timedelta(hours=11 - idx),
                active_power_kw=round(power, 2),
                active_energy_kwh=round(energy, 2),
                irradiance_w_m2=round(irradiance, 2),
                module_temperature_c=round(24.0 + idx * 0.8, 2),
            )
        )
    return points


def fetch_kpis() -> list[KpiItem]:
    return [
        KpiItem(key="pr", label="Performance Ratio", value=84.6, unit="%", trend=1.2),
        KpiItem(
            key="pr_temp",
            label="PR Corrigida por Temperatura",
            value=87.1,
            unit="%",
            trend=0.6,
        ),
        KpiItem(
            key="plant_availability",
            label="Disponibilidade da Central",
            value=98.9,
            unit="%",
            trend=0.1,
        ),
        KpiItem(
            key="grid_availability",
            label="Disponibilidade da Rede",
            value=97.8,
            unit="%",
            trend=-0.4,
        ),
        KpiItem(
            key="opr",
            label="Taxa de Performance Operacional",
            value=92.4,
            unit="%",
            trend=0.9,
        ),
    ]


def fetch_alarms() -> list[AlarmItem]:
    now = datetime.utcnow().replace(second=0, microsecond=0)
    return [
        AlarmItem(
            id="AL-1092",
            severity="high",
            message="Desvio Real vs Esperado acima de 10%",
            timestamp=now - timedelta(minutes=19),
            source="ml-monitor",
        ),
        AlarmItem(
            id="AL-1091",
            severity="medium",
            message="String 03 com queda de irradiancia efetiva",
            timestamp=now - timedelta(minutes=37),
            source="scada",
        ),
    ]
