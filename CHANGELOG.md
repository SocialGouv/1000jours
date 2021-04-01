## [1.5.1](https://github.com/SocialGouv/1000jours/compare/v1.5.0...v1.5.1) (2021-04-01)


### Bug Fixes

* **hasura:** fix migrations ([#89](https://github.com/SocialGouv/1000jours/issues/89)) ([93d712e](https://github.com/SocialGouv/1000jours/commit/93d712eee06b33bc6e6a73dcb41580dd83d28492))

# [1.5.0](https://github.com/SocialGouv/1000jours/compare/v1.4.3...v1.5.0) (2021-03-31)


### Bug Fixes

* **android:** correction de problèmes d'affichage sur Android ([#80](https://github.com/SocialGouv/1000jours/issues/80)) ([5a4c17e](https://github.com/SocialGouv/1000jours/commit/5a4c17e9bd2ef2c7c2f1d9d1c12a4613911d52f7))
* **api:** ajoute la variable d'environnement de non-authentification pour le déploiement ([#75](https://github.com/SocialGouv/1000jours/issues/75)) ([c4e5cea](https://github.com/SocialGouv/1000jours/commit/c4e5cead7bf2361903e8a7f199a30fee44b3b0b2))
* **backoffice:** corrige l'affichage des champs textes HTML ([#78](https://github.com/SocialGouv/1000jours/issues/78)) ([2d1a40a](https://github.com/SocialGouv/1000jours/commit/2d1a40abd5722301f8f07b6528fd80e761cda3f5))
* **k8s:** another PVC fix ([#84](https://github.com/SocialGouv/1000jours/issues/84)) ([d9e240a](https://github.com/SocialGouv/1000jours/commit/d9e240a66903285cb6f28bc5c1f566d677466bfd))
* **k8s:** fix PVC issue with kube 1.19 ([#79](https://github.com/SocialGouv/1000jours/issues/79)) ([cab3556](https://github.com/SocialGouv/1000jours/commit/cab3556f61a5d0763556a6998ddfee25053aa27b))


### Features

* 🎸 je consulte le détail d'un article (v1) ([#77](https://github.com/SocialGouv/1000jours/issues/77)) ([1372e19](https://github.com/SocialGouv/1000jours/commit/1372e19f095221f4ef982b637ef7383839de6c46)), closes [#28](https://github.com/SocialGouv/1000jours/issues/28)

## [1.4.3](https://github.com/SocialGouv/1000jours/compare/v1.4.2...v1.4.3) (2021-03-25)


### Bug Fixes

* **api:** permet aux clients non-authentifiés de faire des requêtes ([#74](https://github.com/SocialGouv/1000jours/issues/74)) ([5f6c41a](https://github.com/SocialGouv/1000jours/commit/5f6c41aa9ea4943094538edeb4f6d4ec68e9525c))

## [1.4.2](https://github.com/SocialGouv/1000jours/compare/v1.4.1...v1.4.2) (2021-03-24)


### Bug Fixes

* **ci:** better DNS prefixes ([#73](https://github.com/SocialGouv/1000jours/issues/73)) ([de5155f](https://github.com/SocialGouv/1000jours/commit/de5155f8f2ccbef4b1b3e8559481d80b7998487d))

## [1.4.1](https://github.com/SocialGouv/1000jours/compare/v1.4.0...v1.4.1) (2021-03-24)


### Bug Fixes

* Ci3 ([#70](https://github.com/SocialGouv/1000jours/issues/70)) ([3f665ff](https://github.com/SocialGouv/1000jours/commit/3f665ff0df881efd688f1323fba246ae0d0d00d5))

# [1.4.0](https://github.com/SocialGouv/1000jours/compare/v1.3.0...v1.4.0) (2021-03-23)


### Features

* 🎸 je consulte le détail d'un article ([#72](https://github.com/SocialGouv/1000jours/issues/72)) ([5b3a330](https://github.com/SocialGouv/1000jours/commit/5b3a330257f80f51e5392dbf7acbfd2b1dcaa804)), closes [#28](https://github.com/SocialGouv/1000jours/issues/28)

# [1.3.0](https://github.com/SocialGouv/1000jours/compare/v1.2.0...v1.3.0) (2021-03-23)


### Bug Fixes

* **build:** corrige le build du backoffice ([#55](https://github.com/SocialGouv/1000jours/issues/55)) ([1e5a75c](https://github.com/SocialGouv/1000jours/commit/1e5a75c9b32434286cb8d4db04f657376958880e))
* **ci:** fix hasura prod sealed-secret ([#44](https://github.com/SocialGouv/1000jours/issues/44)) ([a5d9de2](https://github.com/SocialGouv/1000jours/commit/a5d9de29d01f178bcc8c82b811784011051293a3))


### Features

* 🎸 Ajoute le header et la tabbar de l'application ([#69](https://github.com/SocialGouv/1000jours/issues/69)) ([63a1502](https://github.com/SocialGouv/1000jours/commit/63a15025fe0dfe78811f2cc3c08a3b8f9dbc6587)), closes [#36](https://github.com/SocialGouv/1000jours/issues/36) [#38](https://github.com/SocialGouv/1000jours/issues/38)
* **etape:** retourne l'étape courante en fonction des informations fournies, ref [#30](https://github.com/SocialGouv/1000jours/issues/30) ([#45](https://github.com/SocialGouv/1000jours/issues/45)) ([9b35724](https://github.com/SocialGouv/1000jours/commit/9b3572464c40c09d43cfd821a108651fd7938e77))
* **profile:** 🎸 Affiche la date de naissance  ([#60](https://github.com/SocialGouv/1000jours/issues/60)) ([3f097da](https://github.com/SocialGouv/1000jours/commit/3f097da9573d6cb22b529af506ae0faadb26dda2)), closes [#56](https://github.com/SocialGouv/1000jours/issues/56) [#57](https://github.com/SocialGouv/1000jours/issues/57) [#10](https://github.com/SocialGouv/1000jours/issues/10)

# [1.2.0](https://github.com/SocialGouv/1000jours/compare/v1.1.0...v1.2.0) (2021-03-10)


### Features

* déploiement kubernetes ([#42](https://github.com/SocialGouv/1000jours/issues/42)) ([4bb8e4b](https://github.com/SocialGouv/1000jours/commit/4bb8e4b124ed2c648aa74b4df84292e5989fdb3b))

# [1.1.0](https://github.com/SocialGouv/1000jours/compare/v1.0.1...v1.1.0) (2021-03-09)


### Features

* 🎸 onboarding/profile ([#25](https://github.com/SocialGouv/1000jours/issues/25)) ([c710669](https://github.com/SocialGouv/1000jours/commit/c7106699f02fa5a1da5f0b48c620aad1c164b343)), closes [#7](https://github.com/SocialGouv/1000jours/issues/7) [#10](https://github.com/SocialGouv/1000jours/issues/10)

## [1.0.1](https://github.com/SocialGouv/1000jours/compare/v1.0.0...v1.0.1) (2021-03-05)


### Bug Fixes

* **deps:** update expo monorepo ([#20](https://github.com/SocialGouv/1000jours/issues/20)) ([3cefb8b](https://github.com/SocialGouv/1000jours/commit/3cefb8b42bf6c1b91869a94c80dcaf5a8befb44f))
* **deps:** update react monorepo to v17 ([#21](https://github.com/SocialGouv/1000jours/issues/21)) ([f893edb](https://github.com/SocialGouv/1000jours/commit/f893edb65d36f92ebad97d72167f5d626d3d5f03))

# 1.0.0 (2021-03-03)


### Features

* add k8s ([#17](https://github.com/SocialGouv/1000jours/issues/17)) ([b747294](https://github.com/SocialGouv/1000jours/commit/b7472943c061753e708f2b9108313a6e60acce74))
* **parcours:** 🎸 ajoute le parcours 1000j ([#8](https://github.com/SocialGouv/1000jours/issues/8)) ([c1b88a5](https://github.com/SocialGouv/1000jours/commit/c1b88a552edba767110c647a105138e80cdbcc54)), closes [#1](https://github.com/SocialGouv/1000jours/issues/1)
