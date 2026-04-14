from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import DashboardResponse, MlInferenceRequest, MlInferenceResponse
from app.services.cv_diagnostics import run_visual_diagnostics
from app.services.data_access import (
    fetch_alarms,
    fetch_client_info,
    fetch_generation_series,
    fetch_kpis,
)
from app.services.ml_inference import predict_expected_energy

app = FastAPI(
    title="EnergAI Asset Management API",
    description="MVP backend para monitorizacao solar/eolica com extensao de IA.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/dashboard", response_model=DashboardResponse)
def get_dashboard() -> DashboardResponse:
    return DashboardResponse(
        client=fetch_client_info(),
        generation=fetch_generation_series(),
        kpis=fetch_kpis(),
        alarms=fetch_alarms(),
    )


@app.post("/api/ml/inference", response_model=MlInferenceResponse)
def ml_inference(payload: MlInferenceRequest) -> MlInferenceResponse:
    return predict_expected_energy(payload)


@app.post("/api/cv/diagnostics")
async def cv_diagnostics(file: UploadFile = File(...)) -> dict:
    output = run_visual_diagnostics(file.filename)
    return output.model_dump()
