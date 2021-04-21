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

Pour builder et publier l'application (changements dans le code natif), utilisez :
```bash
yarn build-prod
```

### 🪄 Automatiquement

Pour builder ou publier l'application automatiquement :
- Aller sur le [GitHub Actions](https://github.com/SocialGouv/1000jours/actions) du projet
- Sélectionner le workflow souhaité dans la colonne de gauche
- Cliquer sur le menu `Run workflow`
- Sélectionner la branche `master`
- Cliquer sur le bouton `Run workflow`
