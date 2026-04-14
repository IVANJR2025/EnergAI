# EnergAI — Plano de negócio e roadmap técnico (Portugal e Europa)

**Versão:** 1.0 · **Público:** investidores, gestores de ativos, equipas de produto e engenharia · **Âmbito:** solar, eólico e híbrido em mercados ibéricos e UE

---

## 1. Resumo executivo

A **EnergAI** é uma plataforma de **gestão de ativos energéticos** que combina monitorização operacional, relatórios regulatórios e de investimento, e uma camada de **inteligência artificial** (machine learning, deep learning e visão computacional) para **prever geração**, **detetar desvios**, **antecipar falhas** e **priorizar manutenção**. O objetivo é reduzir **perdas de receita** por indisponibilidade e subperformance, melhorar **PR/ disponibilidade** e alinhar operações com **contratos, O&M e reporting** típicos em Portugal e na União Europeia.

Este documento descreve as **funcionalidades atuais** do repositório (MVP), as **integrações previstas** com ML/DL/CV, um **guia prático** de implementação (ferramentas, cloud, deploy) e a **lógica de valor** para investidores e operadores — sem substituir estudos financeiros formais; os benefícios económicos são apresentados como **mecanismos e ordens de grandeza ilustrativos**.

---

## 2. Estado atual do produto (MVP no repositório)

### 2.1 Frontend (React + Vite)

| Área | Funcionalidade |
|------|----------------|
| **Internacionalização** | Português, espanhol e inglês; troca de idioma em tempo real. |
| **Capa / identidade** | Dados fictícios de cliente e usina; imagens solares e eólicas; referência visual PT/ES. |
| **Painel (dashboard)** | Gráfico multi-eixo: potência ativa (kW), energia ativa (kWh), irradiância (W/m²). |
| **KPIs** | Indicadores operacionais (PRo, PA, PR, PR', GA, GL) em formato tabular. |
| **Relatórios** | Secção alinhada a relatório mensal tipo operação: produção, rácios, ranking de alarmes. |
| **Exportação** | PDF (captura da área de relatório) e Excel (produção, KPIs, alarmes, série demo ML). |
| **Demo ML** | Comparação energia **esperada vs. gerada** e destaque de desvios (regra de alerta > 10%). |
| **Demo visão computacional** | Cartões com exemplos de achados e ações de manutenção (dados de demonstração). |
| **Upload CV** | Seleção de ficheiros de imagem para futura ligação a pipeline de inferência. |

**Nota:** O frontend pode operar em modo demonstração com dados mock; a ligação completa à base de dados e aos modelos em produção é a próxima fase de integração.

### 2.2 Backend (FastAPI)

| Endpoint | Função |
|----------|--------|
| `GET /health` | Verificação de disponibilidade do serviço. |
| `GET /api/dashboard` | Resposta tipada: cliente, série de geração, KPIs, alarmes (hoje com dados mock). |
| `POST /api/ml/inference` | Entrada: irradiância, temperatura do módulo, energia real; saída: energia esperada, desvio %, flag de alerta (lógica placeholder, preparada para XGBoost). |
| `POST /api/cv/diagnostics` | Upload de imagem; resposta com labels e log de manutenção preditiva (placeholder, preparado para OpenCV/YOLO). |

Documentação interativa: **Swagger/OpenAPI** em `/docs`.

### 2.3 Infraestrutura e empacotamento

| Item | Descrição |
|------|-----------|
| **Docker** | Imagem leve com `requirements-api.txt` (API sem PyTorch pesado no container base). |
| **Dependências ML (opcional)** | `requirements-ml.txt`: XGBoost, OpenCV, PyTorch para desenvolvimento ou imagem dedicada. |

---

## 3. Diferenciais competitivos (Portugal e Europa)

1. **Um só painel** para operação, reporting a investidores e sinais de IA — reduz ferramentas desintegradas (SCADA + Excel + BI + scripts).
2. **Previsão e desvio** ligados a **ações**: alertas por limiar (ex.: real vs. esperado), evolução natural para **calendário de manutenção** e integração O&M.
3. **Visão computacional** para **inspeção drone/térmica**: hotspots, sombreamento, conectores, anomalias em ativos eólicos — documentação de achados alinhada a auditorias e garantias.
4. **Conformidade e mercado UE**: desenho preparado para dados na UE, minimização de dados em imagens, trilhos de auditoria (a implementar: RBAC, logs, retenção).
5. **Multilingue** (PT/ES/EN): adequado a **Iberia**, fundos internacionais e equipas O&M transfronteiriças.
6. **Deploy modular**: API stateless em contentor, front estático, modelos versionados — adequado a **cloud soberana** ou híbrido.

---

## 4. Benefícios operacionais e financeiros (enquadramento)

A gestão de uma **usina de investimento** (PPA, mercado orgânico, CfD ou regime equivalente) monetiza cada MWh. Perdas típicas que a plataforma ajuda a atacar:

| Mecanismo | Descrição | Impacto típico (ordem de grandeza) |
|-----------|-----------|-------------------------------------|
| **Indisponibilidade** | Paragens não planeadas, falhas de inversor/rede. | Horas de perda × preço energia; contratos com penalisations. |
| **Subperformance** | Sujidade, degradação, sombreamento, curtailment mal explicado. | Queda de PR de 1–3 pontos percentuais traduz-se em **perda anual proporcional** à produção base. |
| **Manutenção reativa** | Intervenções tardias aumentam duração de paragem e custo. | **CAPEX/OPEX** de deslocações de emergência vs. janelas planeadas. |
| **Garantias e disputas** | Falta de trilho de dados e de laudos técnicos. | Risco legal e perda de claims em garantia de equipamento. |

**Ilustração conceitual (não é promessa de resultados):**  
Se uma central de **10 GWh/ano** perder **2%** de produção por subperformance evitável e o preço médio ponderado for da ordem de **50–80 €/MWh**, o valor anual em jogo situa-se na ordem dos **10–16 k€/ano** só nessa fatia — antes de contar indisponibilidades maiores ou penalidades contratuais. Modelos de ML/DL que **antecipam** estas perdas deslocam parte do problema para **manutenção preditiva** e **limpeza/lubrificação otimizada**, com **ROI** dependente do custo marginal da energia perdida e do custo da intervenção.

---

## 5. Integrações futuras: ML, DL e visão computacional

### 5.1 Previsão de geração e deteção de desvios (ML)

- **Modelos candidatos:** gradient boosting (XGBoost, LightGBM), redes para séries temporais (LSTM, Temporal Fusion Transformer), ou modelos híbridos físico-estatísticos (clear-sky + residual ML).
- **Features:** irradiância (GHI/DNI), temperatura, vento, estado de equipamento, histórico de alarmes, calendarização de O&M.
- **Outputs:** energia esperada por hora/dia; intervalos de confiança; **desvio normalizado**; explicabilidade (SHAP) para confiança do operador.

### 5.2 Deep learning e visão computacional (DL/CV)

- **Deteção de anomalias:** segmentação e classificação em imagens RGB e térmicas (painéis, strings, trackers).
- **Casos de uso:** hotspots, células quebradas, sombreamento, vegetação; para eólica: **pás, relâmpagos, erosão**, usando inspeção por drone ou câmaras fixas.
- **Arquiteturas:** YOLOv8/v11, RT-DETR, Segment Anything (SAM) em pipeline auxiliar, modelos térmicos calibrados.

### 5.3 Orquestração e MLOps

- **Versionamento de dados e modelos:** DVC ou feature store leve; **MLflow** ou **Weights & Biases** para experimentos.
- **Inferência:** serviço dedicado (ex.: `energai-ml`) com GPU opcional; fila para jobs pesados (Celery + Redis/RabbitMQ).
- **Observabilidade:** métricas de deriva (data drift), retreino agendado, testes de regressão em conjunto de validação.

---

## 6. Tutorial: como implementar as próximas funcionalidades

### 6.1 Ferramentas de treino (local e equipa)

| Ferramenta | Uso |
|------------|-----|
| **Python 3.11+** | Linguagem base alinhada ao backend. |
| **Jupyter / VS Code** | Exploração e notebooks reprodutíveis. |
| **scikit-learn / XGBoost / PyTorch** | ML clássico e DL. |
| **OpenCV, Albumentations** | Pré-processamento de imagens. |
| **Docker** | Reprodutibilidade do ambiente de treino e inferência. |

**Passos sugeridos:**

1. Exportar da BD séries horárias (potência, irradiância, alarmes) com **IDs de ativo** e **qualidade de dados**.
2. Definir **baseline** (persistência, média móvel, modelo físico simples).
3. Treinar modelo de previsão; guardar artefacto (`model.pkl` / ONNX) e **metadados** (versão, data, métricas).
4. Substituir `predict_expected_energy` em `ml_inference.py` por carregamento do modelo e validação de entrada.
5. Expor métricas em `/api/ml/inference` ou endpoint dedicado `/api/ml/metrics`.

Para CV:

1. Anotar conjunto mínimo (LabelImg, CVAT ou Roboflow); formato YOLO ou COCO.
2. Treinar com Ultralytics YOLO ou PyTorch; exportar para ONNX para inferência CPU/GPU.
3. Implementar `run_visual_diagnostics` com pipeline: redimensionar → inferir → NMS → mapear para texto de manutenção (template ou LLM controlado).
4. Guardar resultados na BD (path da imagem, bounding boxes, severidade, timestamp).

### 6.2 Cloud (Portugal e UE)

| Opção | Notas |
|-------|--------|
| **Azure (regiões UE)** | Integração com AD, boa adoção enterprise em PT. |
| **AWS (Frankfurt, Paris)** | Ecossistema MLOps maduro. |
| **GCP (região europeia)** | BigQuery + Vertex para dados e modelos. |
| **OVH / Scaleway / europeias** | Soberania de dados e RGPD para clientes sensíveis. |

**Boas práticas RGPD:** dados na UE, contratos de tratamento, minimização (recortar metadados EXIF em imagens se não necessários), política de retenção.

### 6.3 Deploy

| Camada | Abordagem |
|--------|-----------|
| **API** | Contentor `energai-api` atrás de reverse proxy (Traefik, NGINX); HTTPS com Let's Encrypt. |
| **Frontend** | Build estático (`npm run build`) servido por CDN, **Azure Static Web Apps**, **S3+CloudFront**, ou **NGINX**. |
| **BD** | PostgreSQL ou TimescaleDB para séries temporais; backups geo-redundantes. |
| **ML pesado** | Serviço separado com GPU (AKS node pool, EC2 g5, Vertex); autoscaling por fila. |
| **CI/CD** | GitHub Actions: lint, testes, build imagem, scan de vulnerabilidades, deploy em staging. |

**Variáveis de ambiente (exemplo):** `DATABASE_URL`, `MODEL_PATH`, `S3_BUCKET_ARTIFACTS`, `JWT_SECRET` (quando OAuth2 estiver ativo).

---

## 7. Roadmap sugerido (12–18 meses)

1. **Fase A — Dados:** conector BD real; ETL; painel com dados live; autenticação OAuth2/JWT.
2. **Fase B — ML produção:** modelo de previsão versionado; alertas por desvio; relatórios automáticos com “insights de IA”.
3. **Fase C — CV:** pipeline de upload → inferência → armazenamento de laudos; integração com ordens de trabalho O&M.
4. **Fase D — Escala:** multi-tenant, SLAs, integração com mercado ibérico (dados OMIE/ESIOS onde aplicável), relatórios CSRD/ESG simplificados para investidores.

---

## 8. Riscos e mitigação

| Risco | Mitigação |
|-------|-----------|
| Qualidade de dados SCADA | Validação, gaps, flags de confiança nos relatórios. |
| Deriva de modelo | Monitorização, retreino periódico, A/B de modelos. |
| Expectativas financeiras irreais | Pilotos com KPIs acordados; baseline explícito. |
| RGPD / imagens | Consentimento, anonimização, retenção definida. |

---

## 9. Conclusão

A EnergAI posiciona-se como **plataforma de asset intelligence** para renováveis na Europa: MVP já demonstra **reporting**, **exportação**, **demo de ML e CV** e **arquitetura API-first** pronta para produção. A evolução para modelos treinados na cloud, MLOps e integração total com a BD transforma o produto num **ativo digital** que suporta decisões de **investimento e operação** com maior previsibilidade de cash-flows e menor risco operacional.

---

## 10. Referências do repositório

- Código backend: `backend/app/`
- Código frontend: `frontend/src/`
- Docker: `backend/Dockerfile`, `backend/requirements-api.txt`
- Documentação API: `http://localhost:8000/docs` (em execução local)

---

*Documento gerado para apoio a pitch, propostas técnicas e alinhamento de roadmap. Valores financeiros ilustrativos não constituem garantia de performance.*

---

**PDF:** versão exportada em [PLANO_DE_NEGOCIO_E_ROADMAP_TECNICO.pdf](PLANO_DE_NEGOCIO_E_ROADMAP_TECNICO.pdf). Para regenerar: `pip install fpdf2 markdown` e `python docs/md_to_pdf.py docs/PLANO_DE_NEGOCIO_E_ROADMAP_TECNICO.md`.
