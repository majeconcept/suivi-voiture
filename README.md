# 🚗 Suivi Voiture

App web autonome pour suivre carburant, entretien, pneus, achats d'un véhicule diesel.
Page unique HTML — fonctionne hors-ligne, données stockées en local sur l'appareil.

## Caractéristiques

- **Dashboard** : conso moyenne, coût/km, dépense totale, distance.
- **Carburant** : pleins complets vs appoints, calcul auto litres × prix, conso L/100 calculée entre 2 pleins complets.
- **Entretien** : historique + alertes paramétrables (vidange, filtres, distribution, plaquettes, CT…) sur base km/mois, avec barre de progression.
- **Pneus** : été/hiver/4S, prix montage, kilométrage.
- **Achats / accessoires** : suivi libre.
- **Graphiques** : conso au fil du temps, prix gazole, dépenses mensuelles empilées, répartition par catégorie.
- **Export / Import Excel** (.xlsx) avec 5 onglets (Carburant, Entretiens, Pneus, Achats, Récap).
- **Mobile-first** : saisie facile à la pompe depuis le téléphone.
- **Hors-ligne** après le 1er chargement.

## Déploiement sur Cloudflare Pages

### Option 1 — Glisser-déposer (plus rapide)

1. Connecte-toi sur https://dash.cloudflare.com → **Workers & Pages** → **Create application** → onglet **Pages** → **Upload assets**.
2. Donne un nom au projet (ex: `suivi-voiture`).
3. Glisse le fichier `index.html` dans la zone d'upload (ou un zip qui le contient).
4. Clique **Deploy site**. En 30 s tu as une URL `suivi-voiture.pages.dev`.

### Option 2 — Sous-domaine `voiture.majeconcept.com`

1. Une fois le projet déployé, va dans **Custom domains** → **Set up a custom domain**.
2. Tape `voiture.majeconcept.com` (ou le sous-domaine de ton choix).
3. Cloudflare détecte que `majeconcept.com` est déjà sur ta zone et crée le CNAME automatiquement. Active.
4. Quelques secondes plus tard, l'URL répond.

### Mise à jour

Re-glisse le nouveau `index.html` dans **Pages** → ton projet → **Create deployment**. Pas de build, pas de pipeline.

## Données

Les données vivent dans le **localStorage** du navigateur (cet appareil uniquement). Pour synchroniser entre téléphone et ordi, utilise l'export Excel ou la sauvegarde JSON (onglet Réglages).

## Migration depuis l'ancien fichier `Données.xlsx`

Onglet **Réglages** → **Importer Excel** → sélectionne l'ancien fichier. L'app détecte les onglets `Carburant`, `Entretiens`, `Pneus`, `Achats` et reconstruit l'historique. Le km de départ est ajusté automatiquement au minimum trouvé.

## Personnalisation des intervalles d'entretien (diesel par défaut)

Onglet **Entretien** → **⚙️ Régler les intervalles**. Les valeurs par défaut couvrent un diesel courant :

| Entretien | Tous les |
|---|---|
| Vidange + filtre huile | 15 000 km / 12 mois |
| Filtre à air | 40 000 km / 24 mois |
| Filtre à carburant | 40 000 km / 24 mois |
| Filtre habitacle | 20 000 km / 12 mois |
| Liquide de frein | 60 000 km / 24 mois |
| Liquide de refroidissement | 90 000 km / 48 mois |
| Courroie de distribution | 120 000 km / 72 mois |
| Plaquettes avant | 50 000 km |
| Plaquettes arrière | 70 000 km |
| Contrôle technique | 24 mois |

Adapte selon le constructeur de ta nouvelle voiture.
