from datetime import date, datetime

from pydantic import BaseModel, Field


class GenerationPoint(BaseModel):
    timestamp: datetime
    active_power_kw: float
    active_energy_kwh: float
    irradiance_w_m2: float
    module_temperature_c: float


class AlarmItem(BaseModel):
    id: str
    severity: str
    message: str
    timestamp: datetime
    source: str


class KpiItem(BaseModel):
    key: str
    label: str
    value: float
    unit: str
    trend: float = Field(description="Change percentage versus previous period")


class ClientInfo(BaseModel):
    name: str
    location: str
    installed_power_kwp: float
    commissioning_date: date


class DashboardResponse(BaseModel):
    client: ClientInfo
    generation: list[GenerationPoint]
    kpis: list[KpiItem]
    alarms: list[AlarmItem]


class MlInferenceRequest(BaseModel):
    irradiance_w_m2: float
    module_temperature_c: float
    actual_energy_kwh: float


class MlInferenceResponse(BaseModel):
    expected_energy_kwh: float
    deviation_percent: float
    alert: bool


class CvDiagnosticResponse(BaseModel):
    image_name: str
    labels: list[str]
    predictive_maintenance_log: list[str]
