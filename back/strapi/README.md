# 1000jours back Strapi


Backoffice de gestion de contenus

---

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

Pour lancer l'application en mode dev, utiliser :
```bash
yarn develop
```

---

Importer la configuration du backoffice :

```
yarn config:restore
```

---

Importer les données depuis le backoffice de preprod (efface la base actuelle) :

```
yarn seed:import
```

---

Pour exécuter les tests :

```
yarn test
```
