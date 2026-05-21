# 🚙 Suivi Garage

App web autonome multi-véhicules — carburant, entretien, pneus, achats.
Pré-configurée pour : **Audi A4** (diesel), **Dacia Logan** (essence), **Yamaha MT-03** (moto).

## Fonctionnalités

- Sélecteur de véhicule en haut de page (chip cliquable)
- Données 100% isolées par véhicule (localStorage)
- Presets d'entretien adaptés : auto-diesel / auto-essence / moto
- Dashboard, alertes, graphiques par véhicule
- Export/Import Excel par véhicule, sauvegarde JSON globale

## Déploiement Cloudflare Pages

Auto-deploy via GitHub : chaque `git push` sur `main` déclenche un rebuild Cloudflare Pages.

URL : https://voiture.majeconcept.com

## Personnaliser un véhicule

Onglet **Réglages** → modifier nom, type (auto/moto), carburant, intervalles d'entretien.
Onglet **Réglages** → bouton "+" en bas → ajouter un véhicule supplémentaire.
