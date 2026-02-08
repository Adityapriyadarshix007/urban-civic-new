# Machine Learning Pipeline – Smart Civic Issue Register & Tracker

This directory contains the machine learning and data analytics components
developed for the **Smart Civic Issue Register & Tracker** EPICS Phase-I project.

The purpose of this ML pipeline is to demonstrate how **established machine
learning and geospatial analysis techniques** can be applied to civic complaint
data for prioritization and hotspot identification.

> ⚠️ **Note:**  
> All analysis in this project is performed on **synthetic civic complaint data**
> generated to simulate realistic urban patterns. No real municipal data is used.

---

## Objectives of the ML Pipeline

- Classify civic complaints into **LOW / MEDIUM / HIGH priority**
- Identify **geographic hotspots** using spatial clustering
- Support **visual analytics** for decision-making dashboards
- Demonstrate an end-to-end ML workflow for an academic EPICS project

This is an **engineering demonstration project**, not a research contribution.

---

## Directory Structure
```
ml/
├── data/
│ ├── raw/ # Original synthetic complaint data
│ └── processed/ # Feature-engineered datasets and model outputs
│
├── notebooks/ # Jupyter notebooks (run in order)
│
└── README.md # This file
```

---

## Notebook Execution Order

The notebooks should be run **sequentially**:

| Order | Notebook | Purpose |
|------|---------|---------|
| 00 | `00_generate_synthetic_data.ipynb` | Generate synthetic civic complaint data |
| 01 | `01_data_exploration.ipynb` | Exploratory data analysis and distributions |
| 02 | `02_feature_engineering.ipynb` | Create spatial and risk-based features |
| 03 | `03_priority_model.ipynb` | Priority classification using Decision Tree |
| 04 | `04_hotspot_clustering.ipynb` | Hotspot detection using DBSCAN |
| 05 | `05_results_summary.ipynb` | Consolidated results for reporting |
| 06 | `06_priority_model_experiments.ipynb` | Model comparison experiments |
| 07 | `07_clustering_model_comparison.ipynb` | DBSCAN vs KMeans comparison |
| 08 | `08_anomaly_detection_analysis.ipynb` | Anomaly detection (optional analysis) |

---

## Algorithms Used

- **Decision Tree / Random Forest** – Priority classification
- **DBSCAN** – Spatial hotspot detection
- **Isolation Forest** – Anomaly detection (experimental)

All algorithms are used with **default or minimally tuned parameters** for
interpretability and transparency.

---

## Outputs Generated

- `data/processed/priority_results.csv` – Priority labels for complaints
- `data/processed/hotspot_summary.csv` – Cluster statistics
- Heatmaps, cluster maps, and bar plots generated inside notebooks

These outputs are used for:
- Report figures
- Dashboard visualization
- EPICS viva discussion

---

## Limitations

- Uses synthetic data only
- No live inference or deployment
- No real municipal integration
- Models are not optimized for production

---

## Academic Disclaimer

This ML pipeline is part of an **EPICS Phase-I academic project** developed to
demonstrate analytical techniques under educational constraints. The project
does not claim novelty, deployment readiness, or real-world validation.

---

## Maintained By

EPICS Project Team – School of Computing Science Engineering and AI  
VIT Bhopal University
