from app.schemas import MlInferenceRequest, MlInferenceResponse


def predict_expected_energy(payload: MlInferenceRequest) -> MlInferenceResponse:
    # Placeholder that mimics a pre-trained XGBoost prediction surface.
    expected_energy = (payload.irradiance_w_m2 * 0.012) - (
        payload.module_temperature_c * 0.07
    )
    expected_energy = max(expected_energy, 0.1)
    deviation = ((payload.actual_energy_kwh - expected_energy) / expected_energy) * 100
    return MlInferenceResponse(
        expected_energy_kwh=round(expected_energy, 3),
        deviation_percent=round(deviation, 2),
        alert=abs(deviation) > 10,
    )
