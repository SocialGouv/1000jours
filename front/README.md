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

Pour lancer l'application, utilisez :
```bash
yarn start
```

Pour lancer la version web, utilisez :
```bash
yarn start:web
```

Pour lancer l'émulateur Android, utilisez :
```bash
yarn android
```

Pour lancer l'émulateur iOS, utilisez :
```bash
yarn ios
```

## 🌓 Génération de la font d'icônes

Pour générer la font d'icônes nous utilisons Icomoon, pour se faire rendez-vous sur le site :
- https://icomoon.io/app/#/select  
- importer les icônes au format svg (./assets/icomoon/svg/)
- sélectionner les icônes précédement importées
- cliquer sur "Generate Font" en bas de la page puis "Download"
- une fois le zip téléchargé, importé dans "./assets/icomoon/" les fichiers icomoon.ttf et selection.json présent dans le zip.
- pour terminer, mettre à jour l'enum "IcomoonIcons" du composant "icomoon.component.tsx"
(N.B : yarn start-clear est nécessaire pour charger les nouvelles icônes dans l'app)


## 🚀 Publication

### ✋ Manuellement

#### En dev (channel staging)

Pour publier l'application (changements dans le bundle JS), utilisez :
```bash
yarn publish-dev
```

Pour builder et publier l'application (changements dans le code natif), utilisez :
```bash
yarn build-dev
```

#### En prod (channel prod)

Pour publier l'application (changements dans le bundle JS), utilisez :
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
