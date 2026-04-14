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
4. `pip install -r requirements.txt` (API + ML/CV pesado; ver abaixo)

Para **só a API** (mais rapido, igual ao Docker): `pip install -r requirements-api.txt`
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

## Docker (imagem leve)

A imagem usa apenas `backend/requirements-api.txt` (FastAPI + Uvicorn). Para treino/inferencia com XGBoost, OpenCV e PyTorch, instale localmente `requirements-ml.txt` ou crie uma imagem dedicada.

```bash
cd backend
docker build -t ivanjr2025/energai-api:latest .
docker run --rm -p 8000:8000 ivanjr2025/energai-api:latest
```
