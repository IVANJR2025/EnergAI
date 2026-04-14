from app.schemas import CvDiagnosticResponse


def run_visual_diagnostics(image_name: str) -> CvDiagnosticResponse:
    # Placeholder for OpenCV + PyTorch/YOLO processing pipeline.
    return CvDiagnosticResponse(
        image_name=image_name,
        labels=["hotspot", "possible_shading"],
        predictive_maintenance_log=[
            "Inspecionar string S-04 nas proximas 48 horas",
            "Agendar limpeza do bloco B em 3 dias",
        ],
    )
