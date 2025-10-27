# Projet Fédérateur Big Data & IA

## Description
Ce projet est réalisé dans le cadre du 3ème année Big Data et Intelligence Artificielle.  
Il combine un backend en Python pour le traitement des données et un frontend pour l’interface utilisateur.

## Structure du projet

Projet_Fed_BDIA/
│
├── backend/
│ ├── app.py # Script principal du backend
│ ├── requirements.txt # Dépendances Python
│ └── venv/ # Environnement virtuel (à ignorer dans Git)
│
├── frontend/
│ ├── package.json
│ ├── src/
│ │ ├── components/
│ │ └── pages/
│ └── .gitignore
│
├── .gitignore
└── README.md


## Installation

### Backend
cd backend
python -m venv venv
source venv/bin/activate   # sur Linux/Mac
venv\Scripts\activate      # sur Windows
pip install -r requirements.txt

### Frontend
cd frontend
npm install
npm start

## Utilisation
1. Lancer le backend (python app.py)
2. Lancer le frontend (npm start)
3. Accéder à l’interface sur http://localhost:3000

## Contribution
Faire un fork du projet
Créer une branche pour vos modifications
Faire un pull request
