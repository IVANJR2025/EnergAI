# EnergAI

**Inteligência para ativos renováveis.** Plataforma de gestão energética que une monitorização, relatórios e uma camada de **IA** (previsão de geração, deteção de desvios e visão computacional) para **maximizar produção**, **reduzir paragens** e **antecipar manutenção** em centrais solares e eólicas — com foco em **Portugal**, **Espanha** e o mercado **europeu**.

---

## Porquê EnergAI?

| Diferencial | Benefício |
|-------------|-----------|
| **Operação + reporting + IA** num fluxo único | Menos ferramentas desintegradas, decisões mais rápidas |
| **Previsão vs. real** com alertas de desvio | Identifica subperformance antes de virar perda de receita |
| **Visão computacional** (demo) | Inspeções térmicas/drone traduzidas em achados e ações de O&M |
| **PT / ES / EN** | Pronto para equipas ibéricas e investidores internacionais |
| **API-first + Docker** | Deploy modular na cloud UE, RGPD e escala sob controlo |

*Valor económico:* cada ponto percentual de produção recuperada ou cada paragem evitada traduz-se diretamente em **MWh vendidos** e **menos custo O&M reativo**. O enquadramento financeiro e o roadmap detalhado estão no documento abaixo.

---

## Documentação de negócio e técnica

**[Plano de negócio, funcionalidades, integrações ML/DL/CV e tutorial (cloud, treino, deploy)](docs/PLANO_DE_NEGOCIO_E_ROADMAP_TECNICO.md)**

Inclui: inventário das funcionalidades atuais, diferenciais para PT/Europa, benefícios financeiros (enquadramento), integrações futuras (XGBoost, séries temporais, YOLO, MLOps) e passos práticos de implementação.

---

## O que já existe neste repositório (MVP)

- **Frontend (React + Vite):** capa com dados de usina, dashboard multi-eixo (kW / kWh / irradiância), KPIs, relatórios mensais, exportação **PDF** e **Excel**, demo ML (esperado vs. gerado), demo de visão computacional, upload de imagens para futuro treino/inferência, **troca de idioma** (PT, ES, EN).
- **Backend (FastAPI):** `GET /api/dashboard`, `POST /api/ml/inference`, `POST /api/cv/diagnostics`, Swagger em `/docs` (dados mock preparados para substituição pela BD).
- **Docker:** imagem leve da API com `requirements-api.txt`.

---

## Início rápido

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-api.txt
uvicorn app.main:app --reload --port 8000
```

Abrir: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

*(Instalação completa com ML pesado: `pip install -r requirements.txt`)*

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir: [http://127.0.0.1:5173](http://127.0.0.1:5173)

### Docker

```bash
cd backend
docker build -t ivanjr2025/energai-api:latest .
docker run --rm -p 8000:8000 ivanjr2025/energai-api:latest
```

---

## Licença e contacto

Defina a licença do projeto aqui. Para parcerias ou pilotos em **PT/UE**, use os contactos da sua organização.

---

*EnergAI — da medição à decisão: previsão, visão e gestão de ativos numa única plataforma.*
