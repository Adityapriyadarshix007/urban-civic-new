<!-- ## Smart Civic Issue Register & Tracker

This repository contains the EPICS Phase-I project for analyzing and visualizing civic complaints using geospatial analytics and machine learning.

### Project Structure
- `ml/` – Machine learning experiments, feature engineering, priority classification, and hotspot detection
- `src/` – Frontend dashboard (React + Firebase)
- `public/` – Static assets and exported ML analytics JSON files used by the dashboard

The ML pipeline uses **synthetic civic complaint data** and applies **established techniques** such as Decision Trees, Random Forests, and DBSCAN for educational demonstration.


Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS



 -->
# Smart Civic Issue Register & Tracker

An EPICS Phase-I engineering project that analyzes and visualizes civic complaints
using geospatial analytics and machine learning, integrated with a modern web
dashboard. The project demonstrates how established ML techniques can be applied
to civic issue management in an educational and engineering context.

---

## 📋 Table of Contents

- Project Overview
- Key Features
- Project Structure
- Machine Learning Pipeline
- Frontend & Visualization
- Getting Started
- Technologies Used
- Contributing
- License
- Team

---

## 🎯 Project Overview

Urban civic bodies receive a large volume of complaints related to waste
management, road conditions, drainage, streetlights, and water supply. Managing
these complaints efficiently is challenging due to high volume, limited
resources, and lack of analytical insight.

This project builds an **analytical pipeline combined with a web dashboard** to:

- Identify priority levels of civic complaints
- Detect geographic hotspots of recurring issues
- Visualize complaint patterns to support decision-making

> ⚠️ **Important:** This project uses **synthetic civic complaint data** generated
> to resemble realistic urban patterns. It is an **engineering demonstration
> project**, not a research or production system.

---

## ✨ Key Features

### Machine Learning

- **Priority Classification**
  - Decision Tree
  - Random Forest
- **Hotspot Detection**
  - DBSCAN clustering
- **Risk-score based prioritization logic**
  - Combines complaint density and status information

### Dashboard

- Interactive visualizations for:
  - Priority distribution
  - Category-wise complaint analysis
  - Geographic hotspot visualization
- Integration with Firebase for data handling

---

## 📁 Project Structure

```
urban-civic-new/
│
├── ml/ # Machine learning pipeline
│ ├── data/
│ │ ├── raw/ # Synthetic complaint data
│ │ └── processed/ # Feature-engineered datasets & model outputs
│ ├── notebooks/ # Jupyter notebooks (run in order)
│ └── README.md # ML pipeline documentation
│
├── src/ # Frontend dashboard (React + Firebase)
│ ├── components/ # Reusable React components
│ ├── pages/ # Page-level components
│ ├── ui/ # UI component library
│ └── firebaseConfig.ts # Firebase configuration
│
├── public/ # Static assets & ML-exported JSON files
│ ├── priority_results.json
│ ├── hotspot_summary.json
│ ├── category_priority_matrix.json
│ └── risk_score_bins.json
│
├── dist/ # Production build output
├── README.md # Project overview (this file)
└── package.json # Node.js dependencies
```

---

## 🤖 Machine Learning Pipeline

The ML pipeline follows a structured sequence:

### 1. Synthetic Data Generation
- Generates realistic civic complaint data reflecting urban patterns
- Avoids use of sensitive or real municipal data

### 2. Feature Engineering
- Spatial density calculations
- Complaint category encoding
- Status indicators (pending, completed, cancelled)
- Temporal features (derived where required)

### 3. Priority Classification
- Labels: **LOW / MEDIUM / HIGH**, derived from a risk score
- Models:
  - Decision Tree
  - Random Forest
- Evaluation using accuracy, precision, and recall

### 4. Hotspot Detection
- Density-based clustering of complaint locations using **DBSCAN**
- Identification of recurring geographic problem areas

### 5. Analytics Export
- Model outputs exported as JSON files
- Stored in the `public/` directory for frontend consumption

> 📝 All models use **well-established algorithms** and emphasize
> **interpretability over novelty**.

---

## 🖥️ Frontend & Visualization

The frontend dashboard is built using **React and Firebase** and consumes
precomputed ML outputs exported as JSON files from the `ml/` pipeline.

### Visual Elements

- **Priority Distribution Charts**  
  Visual breakdown of LOW / MEDIUM / HIGH priority complaints

- **Category vs Priority Heatmaps**  
  Cross-analysis of complaint types and urgency

- **Geographic Hotspot Maps**  
  Spatial visualization of complaint clusters

- **Risk Score Distributions**  
  Statistical overview of complaint severity

These visualizations are designed to clearly justify ML outputs during EPICS
reviews and demonstrations.

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js (v18 or later)
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/urban-civic-new.git
cd urban-civic-new
```
Install dependencies:

```bash
npm install
```

Configure Firebase (if required):

- Update src/firebaseConfig.ts with your Firebase credentials

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to:

```dts
http://localhost:5173
```

Building for Production
```bash
npm run build
```
The optimized production build will be available in the dist/ directory.

---

## 🧪 Running the ML Pipeline

- Navigate to the ml/ directory and follow the instructions in ml/README.md to:

- Generate synthetic data

- Perform feature engineering

- Train priority classification models

- Run hotspot clustering

- Export analytics to JSON for dashboard use

---
<!-- 
## 🛠️ Technologies Used

### Frontend Stack

- React

- TypeScript

- Vite

- Tailwind CSS

- shadcn-ui

- Firebase

### Machine Learning Stack

- Python

- pandas

- NumPy

- scikit-learn

- Matplotlib / Seaborn

- DBSCAN (clustering) -->

## 🛠️ Technologies Used

### Frontend Stack

| Technology | Purpose |
|------------|---------|
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build tool and dev server |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | UI framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | Type-safe JavaScript |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-first CSS |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white) | Component library |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black) | Firestore database & hosting |

### Machine Learning Stack

| Technology | Purpose |
|------------|---------|
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) | Programming language |
| ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white) | Data manipulation |
| ![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white) | Numerical computing |
| ![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white) | ML algorithms |
| ![Matplotlib](https://img.shields.io/badge/Matplotlib-11557c?style=flat) | Data visualization |
| DBSCAN | Clustering algorithm |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions or feedback, please open an issue or contact the project maintainers.

## 👥 Team

EPICS Phase-I Project Team 
EPICS23-669

---

<div align="center">
  Made with ❤️ for EPICS Phase-I

</div>
