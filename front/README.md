# Application mobile (front-end)

## 🔨 Tester en local

D'abord, installer les dépendances :
```bash
yarn
```

Puis, créer le fichier `.env`:
```bash
cp .env.example .env
```

Pour lancer l'application, utiliser :
```bash
yarn start
```

Pour lancer la version web, utiliser :
```bash
yarn start:web
```

Pour lancer l'émulateur Android, utiliser :
```bash
yarn android
```

Pour lancer l'émulateur iOS, utiliser :
```bash
yarn ios
```

## 🌓 Font d'icônes (Icomoon)

Pour générer la font d'icônes nous utilisons Icomoon, pour ce faire rendez-vous sur le site :
- https://icomoon.io/app/#/select
- Importer les icônes au format svg (./assets/icomoon/svg/)
- Sélectionner les icônes précédement importées
- Cliquer sur "Generate Font" en bas de la page puis "Download"
- Une fois le zip téléchargé, importer les fichiers "icomoon.ttf" et "selection.json" présents dans le zip dans "./assets/icomoon/".
- Pour terminer, mettre à jour l'enum "IcomoonIcons" du composant "icomoon.component.tsx"
(N.B : `yarn start-clear` est nécessaire pour charger les nouvelles icônes dans l'app)


## 🚀 Publication

### ✋ Manuellement

#### En dev (channel staging)

Pour publier l'application (changements dans le bundle JS), utiliser :
```bash
yarn publish-dev
```

Pour builder et publier l'application (changements dans le code natif), utiliser :
```bash
yarn build-dev
```

#### En prod (channel prod)

Pour publier l'application (changements dans le bundle JS), utiliser :
```bash
yarn publish-prod
```

### 🪄 Automatiquement

Pour builder ou publier l'application automatiquement :
- Aller sur le [GitHub Actions](https://github.com/SocialGouv/1000jours/actions) du projet
- Sélectionner le workflow souhaité dans la colonne de gauche
- Cliquer sur le menu `Run workflow`
- Sélectionner la branche `master`
- Cliquer sur le bouton `Run workflow`

plop
