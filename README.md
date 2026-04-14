# EnergAI - MVP Fase 2

Plataforma inteligente de gestao de energia com ML e visao computacional.

Base inicial de uma plataforma de gestao de energia solar/eolica com:

- Dashboard principal com grafico de 3 eixos (potencia, energia e irradiancia)
- Tabela dinamica de KPIs
- Dados de cliente industrial
- Backend FastAPI preparado para integracao com ML (XGBoost) e visao computacional (OpenCV/PyTorch)

## Estrutura

- `backend/`: API FastAPI e servicos de dados/IA
- `frontend/`: Aplicacao React (Vite) com interface industrial

## Como executar

### Backend

1. `cd backend`
2. `python -m venv .venv`
3. `.venv\\Scripts\\activate`
4. `pip install -r requirements.txt`
5. `uvicorn app.main:app --reload --port 8000`

Swagger: `http://127.0.0.1:8000/docs`

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Aplicacao: `http://127.0.0.1:5173`

## Endpoints MVP

- `GET /api/dashboard`
- `POST /api/ml/inference`
- `POST /api/cv/diagnostics`
