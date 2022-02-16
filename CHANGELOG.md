## [1.93.4](https://github.com/SocialGouv/1000jours/compare/v1.93.3...v1.93.4) (2022-02-16)


### Bug Fixes

* 🐛 fix de la carto avec la geoloc sur iOS ([#1054](https://github.com/SocialGouv/1000jours/issues/1054)) ([b38cd5f](https://github.com/SocialGouv/1000jours/commit/b38cd5ff4a338e64b6697b56c857f3f2c47f764c))

## [1.93.3](https://github.com/SocialGouv/1000jours/compare/v1.93.2...v1.93.3) (2022-02-15)


### Bug Fixes

* **carto:** use another loader for carto ([#1052](https://github.com/SocialGouv/1000jours/issues/1052)) ([fae82ba](https://github.com/SocialGouv/1000jours/commit/fae82ba019e0537e10607d699432a6fd303f7ce8))

## [1.93.2](https://github.com/SocialGouv/1000jours/compare/v1.93.1...v1.93.2) (2022-02-14)


### Bug Fixes

* 🐛 Corrige un freeze lorsque l'app s'ouvre via une notif ([#1048](https://github.com/SocialGouv/1000jours/issues/1048)) ([09d2c4c](https://github.com/SocialGouv/1000jours/commit/09d2c4c90bb1272af725d4835c1db1d8feed3e86))
* **carto:** don't return if not savedCoordinates ([#1047](https://github.com/SocialGouv/1000jours/issues/1047)) ([5fbd604](https://github.com/SocialGouv/1000jours/commit/5fbd60403dc9930152a71dee15eedd70a3e170d6))
* 🐛 Corrige les deeplinks lorsque l'app est déjà ouverte ([#1045](https://github.com/SocialGouv/1000jours/issues/1045)) ([67b2d92](https://github.com/SocialGouv/1000jours/commit/67b2d927de943f43414db20b3db3aa8b5293ff49))

## [1.93.1](https://github.com/SocialGouv/1000jours/compare/v1.93.0...v1.93.1) (2022-02-11)


### Bug Fixes

* **carto:** use timeout function after map update ([#1043](https://github.com/SocialGouv/1000jours/issues/1043)) ([72a2930](https://github.com/SocialGouv/1000jours/commit/72a29303f858cf338d7dea183d1ef18a831661b4))

# [1.93.0](https://github.com/SocialGouv/1000jours/compare/v1.92.0...v1.93.0) (2022-02-10)


### Bug Fixes

* 🐛 Corrige la redirection via les deepLinks ([#1040](https://github.com/SocialGouv/1000jours/issues/1040)) ([89d5521](https://github.com/SocialGouv/1000jours/commit/89d5521c1ce17160710d3c064a729778d81ce54e)), closes [#956](https://github.com/SocialGouv/1000jours/issues/956) [#957](https://github.com/SocialGouv/1000jours/issues/957)
* 🐛 Corrige le problème de freeze du loader (parenthèque) ([#1041](https://github.com/SocialGouv/1000jours/issues/1041)) ([7b1d443](https://github.com/SocialGouv/1000jours/commit/7b1d443970e90e332ede66da84c125a540cd085a)), closes [#1008](https://github.com/SocialGouv/1000jours/issues/1008)


### Features

* **carto:** reuse main carto for events ([#1031](https://github.com/SocialGouv/1000jours/issues/1031)) ([6941779](https://github.com/SocialGouv/1000jours/commit/6941779c83bcdfac758523734c07bf3a0c8fb35f))

# [1.92.0](https://github.com/SocialGouv/1000jours/compare/v1.91.0...v1.92.0) (2022-02-07)


### Bug Fixes

* 🐛 Corrige le crash ios sur la carto ([#1036](https://github.com/SocialGouv/1000jours/issues/1036)) ([8147b2b](https://github.com/SocialGouv/1000jours/commit/8147b2bd5fafbd73259655a01bb89d7bc68f566e))
* **recherche:** reset selectedIndex ([#1028](https://github.com/SocialGouv/1000jours/issues/1028)) ([8ac65dc](https://github.com/SocialGouv/1000jours/commit/8ac65dc57304b9df390a66b09b37080c487cccbc))
* 🐛 Corrige un problème de freeze du loader (Notification) ([#1027](https://github.com/SocialGouv/1000jours/issues/1027)) ([536d23e](https://github.com/SocialGouv/1000jours/commit/536d23eec4da683c7eb5136ac3e939301afdc4b2)), closes [#1008](https://github.com/SocialGouv/1000jours/issues/1008)
* **heap:** fix heap memory error ([#1004](https://github.com/SocialGouv/1000jours/issues/1004)) ([a561d33](https://github.com/SocialGouv/1000jours/commit/a561d33e3f9ac461f4f89bc7611de0fc6b357f95))
* 🐛 Ajoute l'icone pour les notification android ([#1002](https://github.com/SocialGouv/1000jours/issues/1002)) ([9707d5e](https://github.com/SocialGouv/1000jours/commit/9707d5ea79733cbd47f3352c1b984b01bd9f488a)), closes [#967](https://github.com/SocialGouv/1000jours/issues/967)
* **seed:** Corrige l'import des données et ajoute les types de POI ([#994](https://github.com/SocialGouv/1000jours/issues/994)) ([ba69306](https://github.com/SocialGouv/1000jours/commit/ba6930632e5d7bd0c390b328bc8458e7b31fe6ce))
* add assets in src folder ([#981](https://github.com/SocialGouv/1000jours/issues/981)) ([587bb90](https://github.com/SocialGouv/1000jours/commit/587bb906aaf988cec102d1a5d73a53abf56f3024))
* IcomoonFont ([#982](https://github.com/SocialGouv/1000jours/issues/982)) ([55fd282](https://github.com/SocialGouv/1000jours/commit/55fd2823ece19f81ce1a6728c3f9c6540424f214))


### Features

* **carto:** reuse old cartography ([#1035](https://github.com/SocialGouv/1000jours/issues/1035)) ([b2aafde](https://github.com/SocialGouv/1000jours/commit/b2aafde75fb39d7e4d2cc362ba2cd24d8c6ed329))
* **epds:** ajout de la source pour le widget ([#973](https://github.com/SocialGouv/1000jours/issues/973)) ([e0f0a6f](https://github.com/SocialGouv/1000jours/commit/e0f0a6f9067f61590d219cc4c93f266a14f66447))
* **epds:** traduction labels ([#1026](https://github.com/SocialGouv/1000jours/issues/1026)) ([c73ba56](https://github.com/SocialGouv/1000jours/commit/c73ba56d30b457d337ff859425af66aaea71cd7c))
* 🎸 Ajoute le lien vers la parentheque dans le menu ([#1025](https://github.com/SocialGouv/1000jours/issues/1025)) ([4eee69d](https://github.com/SocialGouv/1000jours/commit/4eee69d35679db81f37825a41a03920f0858c8e9)), closes [#959](https://github.com/SocialGouv/1000jours/issues/959)
* **lib:** delete library from main project ([#975](https://github.com/SocialGouv/1000jours/issues/975)) ([9a713d8](https://github.com/SocialGouv/1000jours/commit/9a713d8d64f12817a8eabf1af65375b49a5f0cf5))
* **recherche:** ajout du lien direct articles-types de POI ([#978](https://github.com/SocialGouv/1000jours/issues/978)) ([a483fb8](https://github.com/SocialGouv/1000jours/commit/a483fb84a35bf9bf43138e32c5d1a34f3bfb2825))
* **recherche:** continue Recherche US + refactoring ([#992](https://github.com/SocialGouv/1000jours/issues/992)) ([324617f](https://github.com/SocialGouv/1000jours/commit/324617fd360b78138f6a04099bafaa35ab58714b))
* **recherche:** end Recherche and continue refactoring ([#996](https://github.com/SocialGouv/1000jours/issues/996)) ([8018a0e](https://github.com/SocialGouv/1000jours/commit/8018a0e5f67e9334351f575d5447ce98e1600ebc))
* **recherche:** rearrange screens and refactor ([#1000](https://github.com/SocialGouv/1000jours/issues/1000)) ([edd1698](https://github.com/SocialGouv/1000jours/commit/edd1698a0424c68d3ae99608a4adfa71c7e16793))
* **recherche:** recherche articles ([#807](https://github.com/SocialGouv/1000jours/issues/807)) ([032587b](https://github.com/SocialGouv/1000jours/commit/032587b0c8998f6cac02f22ea9656ca300383b19))
* **recherche:** retours design ([#1021](https://github.com/SocialGouv/1000jours/issues/1021)) ([59e1402](https://github.com/SocialGouv/1000jours/commit/59e140211502f2c0075474c96b4192827d6b0400))
* **share:** use trackerHandler ([#1003](https://github.com/SocialGouv/1000jours/issues/1003)) ([631f1a4](https://github.com/SocialGouv/1000jours/commit/631f1a44d377505fb1b80e5e15dd23deac8ce65a))
* 🎸 Ajoute le partage d'articles et d'événements  ([#995](https://github.com/SocialGouv/1000jours/issues/995)) ([479971d](https://github.com/SocialGouv/1000jours/commit/479971db8275e17f961e46682839b4aaa0a796b8)), closes [#956](https://github.com/SocialGouv/1000jours/issues/956) [#957](https://github.com/SocialGouv/1000jours/issues/957)

# [1.91.0](https://github.com/SocialGouv/1000jours/compare/v1.90.0...v1.91.0) (2022-01-27)


### Bug Fixes

* **seed:** Corrige l'import des données et ajoute les types de POI ([#994](https://github.com/SocialGouv/1000jours/issues/994)) ([f9b398d](https://github.com/SocialGouv/1000jours/commit/f9b398d31bb38408c17051aa328000b82de4adba))


### Features

* **recherche:** ajout du lien direct articles-types de POI ([#978](https://github.com/SocialGouv/1000jours/issues/978)) ([a190b25](https://github.com/SocialGouv/1000jours/commit/a190b25022d239bfcfa43c893387c2d7300e8614))

# [1.90.0](https://github.com/SocialGouv/1000jours/compare/v1.89.0...v1.90.0) (2022-01-20)


### Features

* **epds:** ajout de la source pour le widget ([#973](https://github.com/SocialGouv/1000jours/issues/973)) ([effc19d](https://github.com/SocialGouv/1000jours/commit/effc19d5dfec048c4df782487773bc184805689c))

# [1.89.0](https://github.com/SocialGouv/1000jours/compare/v1.88.1...v1.89.0) (2022-01-07)


### Bug Fixes

* **epds:** change le terme locale en langue ([#961](https://github.com/SocialGouv/1000jours/issues/961)) ([ff59ee5](https://github.com/SocialGouv/1000jours/commit/ff59ee5999e9a443dc309e844eaf6c218044393b))
* 🐛 Corrige l'affichage des modal (devices avec encoche) ([#955](https://github.com/SocialGouv/1000jours/issues/955)) ([5d18cb2](https://github.com/SocialGouv/1000jours/commit/5d18cb28f3c170406848218a6602155ab5d47d91)), closes [#830](https://github.com/SocialGouv/1000jours/issues/830)
* **deps:** update all dependencies ([#888](https://github.com/SocialGouv/1000jours/issues/888)) ([5c5a9bc](https://github.com/SocialGouv/1000jours/commit/5c5a9bc3d8dbb1613d2c71e3fa80aac7c9519688))
* **epds:** choix du mode de contact ([#931](https://github.com/SocialGouv/1000jours/issues/931)) ([e48321f](https://github.com/SocialGouv/1000jours/commit/e48321f7acfd1bf81e1d34ec10c0d2b4c9250674))
* **expo:** fix mobile publish job ([#915](https://github.com/SocialGouv/1000jours/issues/915)) ([3b6be36](https://github.com/SocialGouv/1000jours/commit/3b6be36680a09d6fcd863f1421d192003d6a8bfa))
* **secu:** add network policies ([#920](https://github.com/SocialGouv/1000jours/issues/920)) ([4389d4b](https://github.com/SocialGouv/1000jours/commit/4389d4bc0f2efc7d0dda4263e9abf248ab177f75))
* **strapi:** add node-version in yml file ([#917](https://github.com/SocialGouv/1000jours/issues/917)) ([ebdfd38](https://github.com/SocialGouv/1000jours/commit/ebdfd3872faea1375448d98ac7e91ff5cce031a0))
* 🐛 Corrige l'heure et la redirection des notifications ([#900](https://github.com/SocialGouv/1000jours/issues/900)) ([c6246cb](https://github.com/SocialGouv/1000jours/commit/c6246cb65684f82a2489b643acacdda3e9957118)), closes [#860](https://github.com/SocialGouv/1000jours/issues/860) [#860](https://github.com/SocialGouv/1000jours/issues/860)
* 🐛 Corrige les problèmes de "require cycle" (imports) ([#907](https://github.com/SocialGouv/1000jours/issues/907)) ([ccd3e1c](https://github.com/SocialGouv/1000jours/commit/ccd3e1ca0d54276f90bf90e166bbf0e67b1a6193))


### Features

* **carto:** gestion des étapes dans le filtre ([#909](https://github.com/SocialGouv/1000jours/issues/909)) ([21629ad](https://github.com/SocialGouv/1000jours/commit/21629ad1a4898283ec2ebe1460c7d8ad180c45cb))
* **COU:** update COU file ([#918](https://github.com/SocialGouv/1000jours/issues/918)) ([4d31eac](https://github.com/SocialGouv/1000jours/commit/4d31eac04638ca4d0c15f79e05d397fde543c895))
* **epds:** choix du mode de contact ([#905](https://github.com/SocialGouv/1000jours/issues/905)) ([8c9ce97](https://github.com/SocialGouv/1000jours/commit/8c9ce97c227fecf664d212e4f93139f2ade76ce4))
* **epds:** relance du formulaire "Etre contacté" ([#896](https://github.com/SocialGouv/1000jours/issues/896)) ([4c15b21](https://github.com/SocialGouv/1000jours/commit/4c15b21151e23c7caa672a1ae99cf88d636b2e4f))
* **epds:** traduction EPDS ([#927](https://github.com/SocialGouv/1000jours/issues/927)) ([bdf92c3](https://github.com/SocialGouv/1000jours/commit/bdf92c321f649659c86165430b0350778aab6a7e))
* **evenements:** ajout de la mention 'important', closes [#908](https://github.com/SocialGouv/1000jours/issues/908) ([#928](https://github.com/SocialGouv/1000jours/issues/928)) ([2aa7a37](https://github.com/SocialGouv/1000jours/commit/2aa7a376fedcf0879822d23c443cbf4718c6f5a7))
* 🎸 Ajoute une aide pour le bouton synchroniser (calendar) ([#922](https://github.com/SocialGouv/1000jours/issues/922)) ([a01e069](https://github.com/SocialGouv/1000jours/commit/a01e06993d59d035ba186dba190b1c494ff62c23))
* 🎸 Ajoute une instance sentry pour isoler les logs de prod ([#926](https://github.com/SocialGouv/1000jours/issues/926)) ([f154340](https://github.com/SocialGouv/1000jours/commit/f154340f808f5cde645a6fd18c47930135116f79)), closes [#924](https://github.com/SocialGouv/1000jours/issues/924)
* **parentheque:** trackers sur les télécharg. de docs ([#914](https://github.com/SocialGouv/1000jours/issues/914)) ([056347a](https://github.com/SocialGouv/1000jours/commit/056347a2d94022a5788f012cb69d34cd82a3d126))


### Reverts

* Revert "feat(epds): relance du formulaire "Etre contacté" (#896)" (#925) ([dd21f99](https://github.com/SocialGouv/1000jours/commit/dd21f996f691af6f7f82fde30b91ba42d3e3863d)), closes [#896](https://github.com/SocialGouv/1000jours/issues/896) [#925](https://github.com/SocialGouv/1000jours/issues/925)

## [1.88.1](https://github.com/SocialGouv/1000jours/compare/v1.88.0...v1.88.1) (2022-01-05)


### Bug Fixes

* **epds:** change le terme locale en langue ([#961](https://github.com/SocialGouv/1000jours/issues/961)) ([233c70b](https://github.com/SocialGouv/1000jours/commit/233c70b45f10a04187e749d35ef5de7fe2ebc6e0))

# [1.88.0](https://github.com/SocialGouv/1000jours/compare/v1.87.0...v1.88.0) (2022-01-04)


### Features

* **epds:** traduction EPDS ([#927](https://github.com/SocialGouv/1000jours/issues/927)) ([7b7e3d8](https://github.com/SocialGouv/1000jours/commit/7b7e3d8de8c8c2102c19c2624ae974bac7a98056))

# [1.87.0](https://github.com/SocialGouv/1000jours/compare/v1.86.0...v1.87.0) (2021-12-17)


### Features

* **evenements:** ajout de la mention 'important', closes [#908](https://github.com/SocialGouv/1000jours/issues/908) ([2527e7a](https://github.com/SocialGouv/1000jours/commit/2527e7a21ee9ad167535099f6b36555fb099ed63))

# [1.86.0](https://github.com/SocialGouv/1000jours/compare/v1.85.1...v1.86.0) (2021-12-07)


### Features

* **epds:** ajout de l'id du test ([#886](https://github.com/SocialGouv/1000jours/issues/886)) ([99fff67](https://github.com/SocialGouv/1000jours/commit/99fff677dfaf75c178bd59cc57ff07bbd1d028af))

## [1.85.1](https://github.com/SocialGouv/1000jours/compare/v1.85.0...v1.85.1) (2021-12-01)


### Bug Fixes

* 🐛 Corrige l'heure et la redirection des notifications ([#900](https://github.com/SocialGouv/1000jours/issues/900)) ([7c6ab2a](https://github.com/SocialGouv/1000jours/commit/7c6ab2a796c5109de96f54293cc8ecfd9ff41752)), closes [#860](https://github.com/SocialGouv/1000jours/issues/860) [#860](https://github.com/SocialGouv/1000jours/issues/860)

# [1.85.0](https://github.com/SocialGouv/1000jours/compare/v1.84.2...v1.85.0) (2021-11-26)


### Bug Fixes

* 🐛 Corrige le crash de la carto sur iOS et de la parenthèque ([#889](https://github.com/SocialGouv/1000jours/issues/889)) ([1882441](https://github.com/SocialGouv/1000jours/commit/18824412148d0204666e262f4673661f06b72ce6))
* 🐛 Corrige le crash et le freeze de la carto ([#894](https://github.com/SocialGouv/1000jours/issues/894)) ([0a17386](https://github.com/SocialGouv/1000jours/commit/0a17386948de732b07ac23a7efeb66623f464315))
* **accessibilite:** resultats epds ([#862](https://github.com/SocialGouv/1000jours/issues/862)) ([738e832](https://github.com/SocialGouv/1000jours/commit/738e832867e6b96744cb135853f265a796cc8c8b)), closes [#859](https://github.com/SocialGouv/1000jours/issues/859)
* **back:** fix backend deployment ([#884](https://github.com/SocialGouv/1000jours/issues/884)) ([fb90011](https://github.com/SocialGouv/1000jours/commit/fb90011bf3428b7c15aad0f1c7a69e8e2cac643a))
* **epds:** fix content margins ([#885](https://github.com/SocialGouv/1000jours/issues/885)) ([21138b5](https://github.com/SocialGouv/1000jours/commit/21138b505426f80756601bf59a491eb5f902dbd2))


### Features

* 🎸 Supprime les articles liés via thematique et étape ([#881](https://github.com/SocialGouv/1000jours/issues/881)) ([8c748ba](https://github.com/SocialGouv/1000jours/commit/8c748bab60a7335629da76e4d85ececce251a970)), closes [#861](https://github.com/SocialGouv/1000jours/issues/861)
* **tests:** add mobile tests config ([#871](https://github.com/SocialGouv/1000jours/issues/871)) ([17d5ce8](https://github.com/SocialGouv/1000jours/commit/17d5ce8e9f9e8e4e9aa19549596fac420b8ca319))

## [1.84.2](https://github.com/SocialGouv/1000jours/compare/v1.84.1...v1.84.2) (2021-11-24)


### Bug Fixes

* 🐛 Corrige le crash et le freeze de la carto ([#894](https://github.com/SocialGouv/1000jours/issues/894)) ([0c7c8bf](https://github.com/SocialGouv/1000jours/commit/0c7c8bfd3b5ede515263be8077bee91fb3652cd1))

## [1.84.1](https://github.com/SocialGouv/1000jours/compare/v1.84.0...v1.84.1) (2021-11-22)


### Bug Fixes

* 🐛 Corrige le crash de la carto sur iOS et de la parenthèque ([#889](https://github.com/SocialGouv/1000jours/issues/889)) ([6c78ee1](https://github.com/SocialGouv/1000jours/commit/6c78ee10acced5dd95dfd498e55b80627972e99b))

# [1.84.0](https://github.com/SocialGouv/1000jours/compare/v1.83.6...v1.84.0) (2021-11-15)


### Bug Fixes

* 🐛 Corrige le problème d'actualisation des images ([#858](https://github.com/SocialGouv/1000jours/issues/858)) ([c3530e8](https://github.com/SocialGouv/1000jours/commit/c3530e80855dc840fd047f9ad7e9548122761bf7)), closes [#857](https://github.com/SocialGouv/1000jours/issues/857)
* **accessibilite:** ajout label onboarding ([#856](https://github.com/SocialGouv/1000jours/issues/856)) ([0017810](https://github.com/SocialGouv/1000jours/commit/0017810b89d7a3648fcfe7db0fe52ddabd74318b))
* **accessibilite:** fix lecture iOS ([#853](https://github.com/SocialGouv/1000jours/issues/853)) ([4614fc5](https://github.com/SocialGouv/1000jours/commit/4614fc56c3376963ad10509f06ff1b2221b6ef07))
* **accessibilite:** utilisation flatlist RN + gestion écrans ([#855](https://github.com/SocialGouv/1000jours/issues/855)) ([921f066](https://github.com/SocialGouv/1000jours/commit/921f0664bb2b4fe03ec6a0a7f1dd4b9ad9feaa45))
* 🐛 Corrige la font utilisé sur certains labels ([6614aa4](https://github.com/SocialGouv/1000jours/commit/6614aa4ebc8e94cc4547ccd35c38c66020a475aa))
* 🐛 Corrige les dépendences incompatibles ([#850](https://github.com/SocialGouv/1000jours/issues/850)) ([6d8914b](https://github.com/SocialGouv/1000jours/commit/6d8914b2c81415f2980e28bfa6ce5071df7b588e))
* 🐛 Corrige les imports (Require Cycle) ([#849](https://github.com/SocialGouv/1000jours/issues/849)) ([dcc4bda](https://github.com/SocialGouv/1000jours/commit/dcc4bda83493f17c1ca6b7f13f09182192e6bc52))
* 🐛 Corrige les retours design ([1f707bf](https://github.com/SocialGouv/1000jours/commit/1f707bfe68cc061913b884114cf8891966adf240))
* 🐛 downgrade matomo-tracker-react-native ([#851](https://github.com/SocialGouv/1000jours/issues/851)) ([2a94a31](https://github.com/SocialGouv/1000jours/commit/2a94a3196639a9f2b66afc204feb9d2a67ab1d3d))
* 🐛 Initialise lastSyncDate à null ([#848](https://github.com/SocialGouv/1000jours/issues/848)) ([e8d5f7b](https://github.com/SocialGouv/1000jours/commit/e8d5f7bbc73d6015406526d89e90e690ec47cffd))
* **accessibilite:** icones non accesssibles sur les articles ([#839](https://github.com/SocialGouv/1000jours/issues/839)) ([1c887cf](https://github.com/SocialGouv/1000jours/commit/1c887cf4e173d89d1bed8fdea914939435607313))
* **accessibilite:** tutoriel - retours PO ([#842](https://github.com/SocialGouv/1000jours/issues/842)) ([f084880](https://github.com/SocialGouv/1000jours/commit/f0848804ef6b5a641c02a52668d054d24a8f3e6f))
* **carto:** fix refus géoloc ([add8099](https://github.com/SocialGouv/1000jours/commit/add8099ae805bf8cafdb50298cf9f525ad03056f))
* **carto:** fix snackbar message ([b96ebce](https://github.com/SocialGouv/1000jours/commit/b96ebce43468671b8d7a000d70eb932233ce064c))
* **deps:** update all dependencies ([#733](https://github.com/SocialGouv/1000jours/issues/733)) ([964b625](https://github.com/SocialGouv/1000jours/commit/964b6257d6f710ee0886e4dc9c7db6664f261d57))
* **deps:** update all dependencies ([#831](https://github.com/SocialGouv/1000jours/issues/831)) ([a383b07](https://github.com/SocialGouv/1000jours/commit/a383b079fcef8ce4b54bfffeb36e2bb6f2907ca4))
* **deps:** update all non-major dependencies ([#833](https://github.com/SocialGouv/1000jours/issues/833)) ([e21e975](https://github.com/SocialGouv/1000jours/commit/e21e975e2d45d33ac465c03f93e42fc201385d2c))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v31 ([#838](https://github.com/SocialGouv/1000jours/issues/838)) ([2acbe83](https://github.com/SocialGouv/1000jours/commit/2acbe83b0bc5dc09aefc3c8026c5a282a9f18dc3))
* **epds:** correction texte ([d9ab01a](https://github.com/SocialGouv/1000jours/commit/d9ab01ac863faad50cfd8326425731db3cd04034))
* **epds:** correction texte gras ([3e2b826](https://github.com/SocialGouv/1000jours/commit/3e2b826c55146d525ade83038b802797c26a7412))
* **epds:** fix affichage humeur ([d3c1b06](https://github.com/SocialGouv/1000jours/commit/d3c1b060876d73b173757c85a5cb80d0b1c53321))
* **epds:** fix design ([756a681](https://github.com/SocialGouv/1000jours/commit/756a68149671ed369ab2e7c5140ca6caba6b2c04))
* **epds:** fix largeur écran ([18a9236](https://github.com/SocialGouv/1000jours/commit/18a92362e58c8f3cc03532d2bc5cd7f29bfc5ff8))
* **epds:** fix retours PO ([5fdf2a2](https://github.com/SocialGouv/1000jours/commit/5fdf2a2722bf140dd9519f9ebb1bf8d54b31b831))
* 🐛 PR (Accessibilité) Ecran profil ([437375e](https://github.com/SocialGouv/1000jours/commit/437375e359134c0379f4e3527161acac0d3698ee))
* **epds:** fix taille image ([8af522c](https://github.com/SocialGouv/1000jours/commit/8af522c349023eebd549e8d88fc644c2423318e4))
* 🐛 PR (Accessibilité) Ecran profil ([ee4f8f1](https://github.com/SocialGouv/1000jours/commit/ee4f8f117e9b181c5d3497d980829a74aa9e8cb4))
* **lib:** fix fichier workflow ([#753](https://github.com/SocialGouv/1000jours/issues/753)) ([e4938a2](https://github.com/SocialGouv/1000jours/commit/e4938a21707ec7b2cd869c50a00a7852629e20f6))
* **parentheque:** modification de la phrase d'intro ([a46ecd9](https://github.com/SocialGouv/1000jours/commit/a46ecd9de5ee571a8554be5e238092185a7ae971))


### Features

* **accessibilite:** resultats epds ([#854](https://github.com/SocialGouv/1000jours/issues/854)) ([87d107c](https://github.com/SocialGouv/1000jours/commit/87d107cc0e667a76f0015c7fa8a5c6fd8cbdb005))
* 🎸 ACCESSIBILITE - Ecran 7 : Calendrier  ([#847](https://github.com/SocialGouv/1000jours/issues/847)) ([6869bb6](https://github.com/SocialGouv/1000jours/commit/6869bb69314c0fd7767653e94ff24361276a16b9)), closes [#797](https://github.com/SocialGouv/1000jours/issues/797) [#797](https://github.com/SocialGouv/1000jours/issues/797)
* 🎸 ACCESSIBILITE - Ecran 7 : Calendrier ([#841](https://github.com/SocialGouv/1000jours/issues/841)) ([05886e6](https://github.com/SocialGouv/1000jours/commit/05886e6a8d7f0eb123185a36bfd7f827bbb40836)), closes [#797](https://github.com/SocialGouv/1000jours/issues/797)
* 🎸 ACCESSIBILITE : Politiques de confidentialité ([#846](https://github.com/SocialGouv/1000jours/issues/846)) ([38cf8d8](https://github.com/SocialGouv/1000jours/commit/38cf8d829e6b64151d597a6b2ec4d75b8c477c4c)), closes [#794](https://github.com/SocialGouv/1000jours/issues/794)
* **accessibilite:** Ajout des labels ([425ab12](https://github.com/SocialGouv/1000jours/commit/425ab12c0e73aa3f3a474b08a03991d3a8a7f403))
* **accessibilite:** Ajout modal pour filtreer les articles ([df51ee1](https://github.com/SocialGouv/1000jours/commit/df51ee113e5e3b61c879be9d2986a4b811d709fd))
* **accessibilite:** ajout role boutton sur la liste des arcticles ([5bf618b](https://github.com/SocialGouv/1000jours/commit/5bf618b7cfa900abb83209ecbb18a03caab168bb))
* **accessibilite:** ajout role header dans les articles ([2fc7aae](https://github.com/SocialGouv/1000jours/commit/2fc7aae6ab3b0d1b3dbed9017eb3c5a29e4a8221))
* **accessibilite:** ajout role link dans les articles ([d7bf468](https://github.com/SocialGouv/1000jours/commit/d7bf46827f546d23056df47a6994dddc79e213fc))
* **accessibilite:** Bloquer la taille sur l'accueil pour un zoom 200% ([f218f94](https://github.com/SocialGouv/1000jours/commit/f218f946a2e6b326f88b84f87682a1c877a30c40))
* **accessibilite:** bouton fermer du menu ([c8745b0](https://github.com/SocialGouv/1000jours/commit/c8745b04b3c2d7f50a7820ab34a526525290b156))
* **accessibilite:** citer le nombre d'article à lire + fix UI sur iOS ([a3caf0d](https://github.com/SocialGouv/1000jours/commit/a3caf0dba32718959152fbb44256d235fa2692bd))
* **accessibilite:** couleur jaune ([9bc28a1](https://github.com/SocialGouv/1000jours/commit/9bc28a17bf6ac60e3935db0b865e03f7c23f2566))
* **accessibilite:** Labels & Role sur les boutons du menu ([b9a0f1f](https://github.com/SocialGouv/1000jours/commit/b9a0f1fc2a765dc7028eb13a7130693ae434bb67))
* **accessibilite:** Labels sur les boutons de la timeline ([785960c](https://github.com/SocialGouv/1000jours/commit/785960c1e2f9f13ffce72cfffe84a04e9f9c9ddd))
* **accessibilite:** liste de liens et ajour du rôle  sur les articles ([2d15876](https://github.com/SocialGouv/1000jours/commit/2d158768e4b675c35f40d74b7a9b834fa4356e25))
* **accessibilite:** liste des articles ([#817](https://github.com/SocialGouv/1000jours/issues/817)) ([0a01141](https://github.com/SocialGouv/1000jours/commit/0a01141c559a0ee4dd124af3fc3aca595574d77e))
* **accessibilite:** masquer des éléments sur les articles ([b561034](https://github.com/SocialGouv/1000jours/commit/b56103420b4830455886974a022f4e886baee650))
* **accessibilite:** Modification du menu en modal ([b999884](https://github.com/SocialGouv/1000jours/commit/b9998848ed79aa1975bce6b45886467d84b2b813))
* **accessibilite:** questionnaire ([#843](https://github.com/SocialGouv/1000jours/issues/843)) ([638dea3](https://github.com/SocialGouv/1000jours/commit/638dea3eebe58c51cf5ad249f7a8ea309f86ee1a))
* **accessibilite:** remplacement des couleurs dans les articles ([d4bf50f](https://github.com/SocialGouv/1000jours/commit/d4bf50fc4c6cb56cec5a56e0bbb36daa09013a6b))
* **accessibilite:** Role titre sur l'accueil et le menu ([5ad9a31](https://github.com/SocialGouv/1000jours/commit/5ad9a31c2ab0e8d946ef9eb90cb5b2c7125fa48b))
* **accessibilite:** textes tronqués à 200% ([52a43ad](https://github.com/SocialGouv/1000jours/commit/52a43ad79d41f051f5296959f62efaa3ee301355))
* **accessibilite:** tutoriel - retours design et PO ([#844](https://github.com/SocialGouv/1000jours/issues/844)) ([bb1d41a](https://github.com/SocialGouv/1000jours/commit/bb1d41a35fe944b99e72ab415e4af49be980ae62))
* 🎸 (Accessibilité) Ecran profil ([7dc5994](https://github.com/SocialGouv/1000jours/commit/7dc59943b2922d90dd30a94e4fb90ed5e3a3db3a)), closes [#792](https://github.com/SocialGouv/1000jours/issues/792)
* 🎸 (Accessibilité) Ecran profil  ([#820](https://github.com/SocialGouv/1000jours/issues/820)) ([abd773a](https://github.com/SocialGouv/1000jours/commit/abd773a98438f8445737fac0a8eb17d55bd47a4f)), closes [#792](https://github.com/SocialGouv/1000jours/issues/792)
* **acessibilite:** regrouper les élements dans la timeline ([5e16527](https://github.com/SocialGouv/1000jours/commit/5e1652796f6c95f239210759565e3000236b5c09))
* **onboarding:** PR ([b76a198](https://github.com/SocialGouv/1000jours/commit/b76a198ca07dce621aeec74feff4fbff52922dbf))
* **onboarding:** propriétés accessibilite ([4878701](https://github.com/SocialGouv/1000jours/commit/48787017173a3a041dea3b8e663b97196a2067a7))
* **parenthque:** affichage par ordre ([a9a15e7](https://github.com/SocialGouv/1000jours/commit/a9a15e703efdc94f4840c84ace374e806446675d))
* 🎸 Force l'alignement des textes article (justifié) ([#731](https://github.com/SocialGouv/1000jours/issues/731)) ([22397e4](https://github.com/SocialGouv/1000jours/commit/22397e482f951d5603dbef9ed5e589cc45d53247)), closes [#596](https://github.com/SocialGouv/1000jours/issues/596)
* intégration de la lib métier ([#750](https://github.com/SocialGouv/1000jours/issues/750)) ([a5e8cd1](https://github.com/SocialGouv/1000jours/commit/a5e8cd11c100734333243a629c6b463dc08e970b))


### Reverts

* Revert "Revert "feat(epds): ajout partie colorée Être contacté (#798)" (#811)" ([57d19ac](https://github.com/SocialGouv/1000jours/commit/57d19acedb1491f3dfd29c1a86f8845961ebd627)), closes [#798](https://github.com/SocialGouv/1000jours/issues/798) [#811](https://github.com/SocialGouv/1000jours/issues/811)

## [1.83.6](https://github.com/SocialGouv/1000jours/compare/v1.83.5...v1.83.6) (2021-10-29)


### Bug Fixes

* 🐛 Corrige la duplication de calendrier via la synchro ([#806](https://github.com/SocialGouv/1000jours/issues/806)) ([d2d7bb6](https://github.com/SocialGouv/1000jours/commit/d2d7bb6955d8c42e6b83222674e0fa530cac068c)), closes [#801](https://github.com/SocialGouv/1000jours/issues/801)

## [1.83.5](https://github.com/SocialGouv/1000jours/compare/v1.83.4...v1.83.5) (2021-10-28)


### Bug Fixes

* **epds:** corrections retours PO ([#822](https://github.com/SocialGouv/1000jours/issues/822)) ([f663910](https://github.com/SocialGouv/1000jours/commit/f663910a2421a4ba326095c18c0cb3f0ad2ec5c1))

## [1.83.4](https://github.com/SocialGouv/1000jours/compare/v1.83.3...v1.83.4) (2021-10-26)


### Bug Fixes

* **carto:** fix refus géoloc ([#816](https://github.com/SocialGouv/1000jours/issues/816)) ([9593ac4](https://github.com/SocialGouv/1000jours/commit/9593ac4f7ccd2869176947f9530480546af316c2))

## [1.83.3](https://github.com/SocialGouv/1000jours/compare/v1.83.2...v1.83.3) (2021-10-22)


### Bug Fixes

* **api:** supprime un log de débugging ([#818](https://github.com/SocialGouv/1000jours/issues/818)) ([c635582](https://github.com/SocialGouv/1000jours/commit/c6355823ff33bd078a085d35a8c0297d36120ec8))

## [1.83.2](https://github.com/SocialGouv/1000jours/compare/v1.83.1...v1.83.2) (2021-10-15)


### Bug Fixes

* 🐛 Tri les documents directement via l'api graphql ([#812](https://github.com/SocialGouv/1000jours/issues/812)) ([4a94fbc](https://github.com/SocialGouv/1000jours/commit/4a94fbc018ddcb2f19aadee1c28e5e0dd615d97d))

## [1.83.1](https://github.com/SocialGouv/1000jours/compare/v1.83.0...v1.83.1) (2021-10-15)


### Reverts

* Revert "feat(epds): ajout partie colorée Être contacté (#798)" (#811) ([167bac5](https://github.com/SocialGouv/1000jours/commit/167bac5dfe5141fe89a4955e79a0c5ae235b8c54)), closes [#798](https://github.com/SocialGouv/1000jours/issues/798) [#811](https://github.com/SocialGouv/1000jours/issues/811)

# [1.83.0](https://github.com/SocialGouv/1000jours/compare/v1.82.0...v1.83.0) (2021-10-15)


### Features

* **parentheque:** phrase d'intro et ordre des documents ([#808](https://github.com/SocialGouv/1000jours/issues/808)) ([4005e66](https://github.com/SocialGouv/1000jours/commit/4005e6628fb811eeae8a9d617734cdb54dffe71f))

# [1.82.0](https://github.com/SocialGouv/1000jours/compare/v1.81.1...v1.82.0) (2021-10-15)


### Features

* 🎸 Force l'alignement des textes article (justifié) ([#809](https://github.com/SocialGouv/1000jours/issues/809)) ([9419fd4](https://github.com/SocialGouv/1000jours/commit/9419fd4999e4001b2b6cd26677464e88010a6b98)), closes [#596](https://github.com/SocialGouv/1000jours/issues/596)

## [1.81.1](https://github.com/SocialGouv/1000jours/compare/v1.81.0...v1.81.1) (2021-10-15)


### Bug Fixes

* 🐛 Corrige les retours design sur les événements ([#786](https://github.com/SocialGouv/1000jours/issues/786)) ([f32d0f0](https://github.com/SocialGouv/1000jours/commit/f32d0f0b522f8b0e75c77e332f453bc3da47be88)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)

# [1.81.0](https://github.com/SocialGouv/1000jours/compare/v1.80.0...v1.81.0) (2021-10-15)


### Features

* **documents:** ajout d'un champ de tri ([#803](https://github.com/SocialGouv/1000jours/issues/803)) ([1390167](https://github.com/SocialGouv/1000jours/commit/13901674fc6b6b7e74ab30322a0cfdd444382d5f)), closes [#802](https://github.com/SocialGouv/1000jours/issues/802)

# [1.80.0](https://github.com/SocialGouv/1000jours/compare/v1.79.1...v1.80.0) (2021-10-14)


### Features

* **epds:** ajout partie colorée Être contacté ([#798](https://github.com/SocialGouv/1000jours/issues/798)) ([21a5190](https://github.com/SocialGouv/1000jours/commit/21a51903a3a3cbaa013968a15998fe8a7fb397b2))

## [1.79.1](https://github.com/SocialGouv/1000jours/compare/v1.79.0...v1.79.1) (2021-10-12)


### Bug Fixes

* 🐛 Corrige le crash de la carto sous iOS 15 ([#785](https://github.com/SocialGouv/1000jours/issues/785)) ([f143f3e](https://github.com/SocialGouv/1000jours/commit/f143f3ea70cc42551f5ff03180083d91c86da500))

# [1.79.0](https://github.com/SocialGouv/1000jours/compare/v1.78.1...v1.79.0) (2021-10-11)


### Features

* 🎸 Ajoute les articles liés aux événements (depuis le BO) ([#782](https://github.com/SocialGouv/1000jours/issues/782)) ([5813677](https://github.com/SocialGouv/1000jours/commit/5813677be2e6c5ae8337defe50cf3fb2abbc510d)), closes [#777](https://github.com/SocialGouv/1000jours/issues/777)

## [1.78.1](https://github.com/SocialGouv/1000jours/compare/v1.78.0...v1.78.1) (2021-10-11)


### Bug Fixes

* **articles:** Cache les articles en mode draft ([#779](https://github.com/SocialGouv/1000jours/issues/779)) ([e5c711e](https://github.com/SocialGouv/1000jours/commit/e5c711e36a891b1e5494523120ec14a0e54e90d8))

# [1.78.0](https://github.com/SocialGouv/1000jours/compare/v1.77.0...v1.78.0) (2021-10-11)


### Features

* **epds:** mail patient ([#760](https://github.com/SocialGouv/1000jours/issues/760)) ([487468a](https://github.com/SocialGouv/1000jours/commit/487468a0a207a9562eaa5b70f0216e799cb423aa)), closes [#752](https://github.com/SocialGouv/1000jours/issues/752) [#751](https://github.com/SocialGouv/1000jours/issues/751)

# [1.77.0](https://github.com/SocialGouv/1000jours/compare/v1.76.0...v1.77.0) (2021-10-08)


### Features

* **parentheque:** affichage s'il existe des documents ([#754](https://github.com/SocialGouv/1000jours/issues/754)) ([2984861](https://github.com/SocialGouv/1000jours/commit/2984861ba554a8e44d12ce8c4161135fe8b4d953)), closes [#750](https://github.com/SocialGouv/1000jours/issues/750) [#753](https://github.com/SocialGouv/1000jours/issues/753)

# [1.76.0](https://github.com/SocialGouv/1000jours/compare/v1.75.1...v1.76.0) (2021-10-08)


### Features

* parenthèque ([#677](https://github.com/SocialGouv/1000jours/issues/677)) ([bf1f367](https://github.com/SocialGouv/1000jours/commit/bf1f367515dce2b240b78490a362dd982429df69))

## [1.75.1](https://github.com/SocialGouv/1000jours/compare/v1.75.0...v1.75.1) (2021-10-08)


### Reverts

* Revert "feat: intégration de la  lib métier (#761)" (#766) ([32a23a1](https://github.com/SocialGouv/1000jours/commit/32a23a18e6c40519f1e69295648343d31a9c2c25)), closes [#761](https://github.com/SocialGouv/1000jours/issues/761) [#766](https://github.com/SocialGouv/1000jours/issues/766)

# [1.75.0](https://github.com/SocialGouv/1000jours/compare/v1.74.5...v1.75.0) (2021-10-07)


### Features

* intégration de la  lib métier ([#761](https://github.com/SocialGouv/1000jours/issues/761)) ([582fb64](https://github.com/SocialGouv/1000jours/commit/582fb64a44315775e7acfd4dd29bec4de356b253))

## [1.74.5](https://github.com/SocialGouv/1000jours/compare/v1.74.4...v1.74.5) (2021-10-06)


### Bug Fixes

* Prod CI setup ([#755](https://github.com/SocialGouv/1000jours/issues/755)) ([1fa12d4](https://github.com/SocialGouv/1000jours/commit/1fa12d4a6d532a75db5fc6dc7f05af177aa61500))

## [1.74.5-alpha.2](https://github.com/SocialGouv/1000jours/compare/v1.74.5-alpha.1...v1.74.5-alpha.2) (2021-10-06)


### Bug Fixes

* Upgrade kosko-charts. ([2e0089a](https://github.com/SocialGouv/1000jours/commit/2e0089ad6118f162a16f08432ce67937cb350757))

## [1.74.5-alpha.1](https://github.com/SocialGouv/1000jours/compare/v1.74.4...v1.74.5-alpha.1) (2021-10-06)


### Bug Fixes

* Bump version. ([70ce442](https://github.com/SocialGouv/1000jours/commit/70ce442c84d7a9999e6a66555ac625b8cb40e42f))
* Prod CI setup ([7d17160](https://github.com/SocialGouv/1000jours/commit/7d17160ccde638e64f2cc8addc1586777e68a7fd))

## [1.74.4](https://github.com/SocialGouv/1000jours/compare/v1.74.3...v1.74.4) (2021-10-06)


### Bug Fixes

* Use SOCIALGOUV_KUBE_CONFIG_PROD to create PV/PVC ([51da81a](https://github.com/SocialGouv/1000jours/commit/51da81a340b948b0963f929859277c43bd2bfd2e))

## [1.74.3](https://github.com/SocialGouv/1000jours/compare/v1.74.2...v1.74.3) (2021-10-06)


### Bug Fixes

* Production deployment job needs ([8e32dba](https://github.com/SocialGouv/1000jours/commit/8e32dbabb60c2b992986f994327f76a6b3612861))

## [1.74.2](https://github.com/SocialGouv/1000jours/compare/v1.74.1...v1.74.2) (2021-10-06)


### Bug Fixes

* Override production deployment namespace ([470c52d](https://github.com/SocialGouv/1000jours/commit/470c52d3dbe892f8b07dc0e25e629e5810e88988))

## [1.74.1](https://github.com/SocialGouv/1000jours/compare/v1.74.0...v1.74.1) (2021-10-06)


### Bug Fixes

* Use KUBECONFIG in production workflow ([b9358e2](https://github.com/SocialGouv/1000jours/commit/b9358e2350ddf769d12bf8d89aa294096b97141e))

# [1.74.0](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0) (2021-10-06)


### Bug Fixes

* 🐛 Corrige l'alignement de la puce devant les liens ([#745](https://github.com/SocialGouv/1000jours/issues/745)) ([eeea9b5](https://github.com/SocialGouv/1000jours/commit/eeea9b5b67c78f1ec42fd8982a5156840da3fcaf)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* bump version ([24ff136](https://github.com/SocialGouv/1000jours/commit/24ff136bc379dfceae543c6f93a29adfc4a63a3c))
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** augmentation nombre tentatives pour récupérer la géoloc ([#741](https://github.com/SocialGouv/1000jours/issues/741)) ([990914e](https://github.com/SocialGouv/1000jours/commit/990914e9919d48c4b5ea98f2b12264fa20f92a47))
* **carto:** correction du picker pour le nombre d'enfants ([#740](https://github.com/SocialGouv/1000jours/issues/740)) ([c1ac08d](https://github.com/SocialGouv/1000jours/commit/c1ac08d169562da9097ad19d80c18dd301758be1))
* 🐛 Corrige le problème de lag sur android (scroll articles) ([#730](https://github.com/SocialGouv/1000jours/issues/730)) ([2fbb787](https://github.com/SocialGouv/1000jours/commit/2fbb7870bf6338265cc77548ceb574cc0ae412e0)), closes [#612](https://github.com/SocialGouv/1000jours/issues/612)
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* **deps:** update all dependencies ([#711](https://github.com/SocialGouv/1000jours/issues/711)) ([c86f0de](https://github.com/SocialGouv/1000jours/commit/c86f0de6041561ae40857c5792f7230f06b11b10))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction condition affichage texte d'invitation ([#737](https://github.com/SocialGouv/1000jours/issues/737)) ([9f21d8e](https://github.com/SocialGouv/1000jours/commit/9f21d8e5c3a365be3e4269de177b4db7f8e52351))
* **epds:** réajout de la variable RESULT_BECONTACTED_VALUE ([#736](https://github.com/SocialGouv/1000jours/issues/736)) ([b0f5711](https://github.com/SocialGouv/1000jours/commit/b0f571145c67a68bbe022896ca82ca94cd4cf175))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* Add puppeteer dependencies to run html-pdf-node module ([#734](https://github.com/SocialGouv/1000jours/issues/734)) ([fc09e3b](https://github.com/SocialGouv/1000jours/commit/fc09e3be7eaf881a7f74b15bfd019c8653751c90))
* **epds:** correction useState résultats ([#721](https://github.com/SocialGouv/1000jours/issues/721)) ([56b32dc](https://github.com/SocialGouv/1000jours/commit/56b32dce9bf5302700671dfe2a3cc6728b5a75d2))
* **evenements:** Corrige la configuration des liens vers les articles, documents, etc. ([#735](https://github.com/SocialGouv/1000jours/issues/735)) ([c02e5b6](https://github.com/SocialGouv/1000jours/commit/c02e5b67debf6a0abb58031e3b0778bf4b471051))
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* Fix workflows concurrency ([#724](https://github.com/SocialGouv/1000jours/issues/724)) ([a64bd07](https://github.com/SocialGouv/1000jours/commit/a64bd076f8aa17f0a7d22ace0ff80d048505f84c))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* Use SocialGouv autodevops actions. ([#683](https://github.com/SocialGouv/1000jours/issues/683)) ([be598e5](https://github.com/SocialGouv/1000jours/commit/be598e58a8cac487cbcf52a08ccd8cf94c736e79))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **carto:** gestion zoom + refacto ([#718](https://github.com/SocialGouv/1000jours/issues/718)) ([655ee0b](https://github.com/SocialGouv/1000jours/commit/655ee0b344fa7b4851eb0bc60a0cab138dc0d8f8))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **email pdf:** création du pdf ([#723](https://github.com/SocialGouv/1000jours/issues/723)) ([d39ecc5](https://github.com/SocialGouv/1000jours/commit/d39ecc58310de94d055719f0082959127442bc48))
* **epds:** email patient ([#715](https://github.com/SocialGouv/1000jours/issues/715)) ([fb263da](https://github.com/SocialGouv/1000jours/commit/fb263da60b8fe73e537709455617d8c09f043e83))
* **epds:** modification textes smiley + résultats ([#722](https://github.com/SocialGouv/1000jours/issues/722)) ([04703bc](https://github.com/SocialGouv/1000jours/commit/04703bc6d38e8bd3419282d3e120cbcf5cfcb05a))
* 🎸 Ajoute une puce et aligne à gauche les liens article ([#713](https://github.com/SocialGouv/1000jours/issues/713)) ([0197b48](https://github.com/SocialGouv/1000jours/commit/0197b48a8082e8f4c3f6844cf32e501223f73523)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* **evenements:** Ajoute les liens vers articles, documents et types de POIs ([#712](https://github.com/SocialGouv/1000jours/issues/712)) ([ca1c6c8](https://github.com/SocialGouv/1000jours/commit/ca1c6c8d08d0fae6d677319d5c0edbc6458cc8b5))
* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* Revert "fix: 🐛 Corrige la variable API_URL de prod" ([b4d5c16](https://github.com/SocialGouv/1000jours/commit/b4d5c16b7668b464cb2a779fdbb8ae50521af90d))
* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0) (2021-10-06)


### Bug Fixes

* 🐛 Corrige l'alignement de la puce devant les liens ([#745](https://github.com/SocialGouv/1000jours/issues/745)) ([eeea9b5](https://github.com/SocialGouv/1000jours/commit/eeea9b5b67c78f1ec42fd8982a5156840da3fcaf)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* bump version ([24ff136](https://github.com/SocialGouv/1000jours/commit/24ff136bc379dfceae543c6f93a29adfc4a63a3c))
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** augmentation nombre tentatives pour récupérer la géoloc ([#741](https://github.com/SocialGouv/1000jours/issues/741)) ([990914e](https://github.com/SocialGouv/1000jours/commit/990914e9919d48c4b5ea98f2b12264fa20f92a47))
* **carto:** correction du picker pour le nombre d'enfants ([#740](https://github.com/SocialGouv/1000jours/issues/740)) ([c1ac08d](https://github.com/SocialGouv/1000jours/commit/c1ac08d169562da9097ad19d80c18dd301758be1))
* 🐛 Corrige le problème de lag sur android (scroll articles) ([#730](https://github.com/SocialGouv/1000jours/issues/730)) ([2fbb787](https://github.com/SocialGouv/1000jours/commit/2fbb7870bf6338265cc77548ceb574cc0ae412e0)), closes [#612](https://github.com/SocialGouv/1000jours/issues/612)
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* **deps:** update all dependencies ([#711](https://github.com/SocialGouv/1000jours/issues/711)) ([c86f0de](https://github.com/SocialGouv/1000jours/commit/c86f0de6041561ae40857c5792f7230f06b11b10))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction condition affichage texte d'invitation ([#737](https://github.com/SocialGouv/1000jours/issues/737)) ([9f21d8e](https://github.com/SocialGouv/1000jours/commit/9f21d8e5c3a365be3e4269de177b4db7f8e52351))
* **epds:** réajout de la variable RESULT_BECONTACTED_VALUE ([#736](https://github.com/SocialGouv/1000jours/issues/736)) ([b0f5711](https://github.com/SocialGouv/1000jours/commit/b0f571145c67a68bbe022896ca82ca94cd4cf175))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* Add puppeteer dependencies to run html-pdf-node module ([#734](https://github.com/SocialGouv/1000jours/issues/734)) ([fc09e3b](https://github.com/SocialGouv/1000jours/commit/fc09e3be7eaf881a7f74b15bfd019c8653751c90))
* **epds:** correction useState résultats ([#721](https://github.com/SocialGouv/1000jours/issues/721)) ([56b32dc](https://github.com/SocialGouv/1000jours/commit/56b32dce9bf5302700671dfe2a3cc6728b5a75d2))
* **evenements:** Corrige la configuration des liens vers les articles, documents, etc. ([#735](https://github.com/SocialGouv/1000jours/issues/735)) ([c02e5b6](https://github.com/SocialGouv/1000jours/commit/c02e5b67debf6a0abb58031e3b0778bf4b471051))
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* Fix workflows concurrency ([#724](https://github.com/SocialGouv/1000jours/issues/724)) ([a64bd07](https://github.com/SocialGouv/1000jours/commit/a64bd076f8aa17f0a7d22ace0ff80d048505f84c))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* Use SocialGouv autodevops actions. ([#683](https://github.com/SocialGouv/1000jours/issues/683)) ([be598e5](https://github.com/SocialGouv/1000jours/commit/be598e58a8cac487cbcf52a08ccd8cf94c736e79))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **carto:** gestion zoom + refacto ([#718](https://github.com/SocialGouv/1000jours/issues/718)) ([655ee0b](https://github.com/SocialGouv/1000jours/commit/655ee0b344fa7b4851eb0bc60a0cab138dc0d8f8))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **email pdf:** création du pdf ([#723](https://github.com/SocialGouv/1000jours/issues/723)) ([d39ecc5](https://github.com/SocialGouv/1000jours/commit/d39ecc58310de94d055719f0082959127442bc48))
* **epds:** email patient ([#715](https://github.com/SocialGouv/1000jours/issues/715)) ([fb263da](https://github.com/SocialGouv/1000jours/commit/fb263da60b8fe73e537709455617d8c09f043e83))
* **epds:** modification textes smiley + résultats ([#722](https://github.com/SocialGouv/1000jours/issues/722)) ([04703bc](https://github.com/SocialGouv/1000jours/commit/04703bc6d38e8bd3419282d3e120cbcf5cfcb05a))
* 🎸 Ajoute une puce et aligne à gauche les liens article ([#713](https://github.com/SocialGouv/1000jours/issues/713)) ([0197b48](https://github.com/SocialGouv/1000jours/commit/0197b48a8082e8f4c3f6844cf32e501223f73523)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* **evenements:** Ajoute les liens vers articles, documents et types de POIs ([#712](https://github.com/SocialGouv/1000jours/issues/712)) ([ca1c6c8](https://github.com/SocialGouv/1000jours/commit/ca1c6c8d08d0fae6d677319d5c0edbc6458cc8b5))
* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* Revert "fix: 🐛 Corrige la variable API_URL de prod" ([b4d5c16](https://github.com/SocialGouv/1000jours/commit/b4d5c16b7668b464cb2a779fdbb8ae50521af90d))
* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0) (2021-10-06)


### Bug Fixes

* 🐛 Corrige l'alignement de la puce devant les liens ([#745](https://github.com/SocialGouv/1000jours/issues/745)) ([eeea9b5](https://github.com/SocialGouv/1000jours/commit/eeea9b5b67c78f1ec42fd8982a5156840da3fcaf)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* bump version ([24ff136](https://github.com/SocialGouv/1000jours/commit/24ff136bc379dfceae543c6f93a29adfc4a63a3c))
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** augmentation nombre tentatives pour récupérer la géoloc ([#741](https://github.com/SocialGouv/1000jours/issues/741)) ([990914e](https://github.com/SocialGouv/1000jours/commit/990914e9919d48c4b5ea98f2b12264fa20f92a47))
* **carto:** correction du picker pour le nombre d'enfants ([#740](https://github.com/SocialGouv/1000jours/issues/740)) ([c1ac08d](https://github.com/SocialGouv/1000jours/commit/c1ac08d169562da9097ad19d80c18dd301758be1))
* 🐛 Corrige le problème de lag sur android (scroll articles) ([#730](https://github.com/SocialGouv/1000jours/issues/730)) ([2fbb787](https://github.com/SocialGouv/1000jours/commit/2fbb7870bf6338265cc77548ceb574cc0ae412e0)), closes [#612](https://github.com/SocialGouv/1000jours/issues/612)
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* **deps:** update all dependencies ([#711](https://github.com/SocialGouv/1000jours/issues/711)) ([c86f0de](https://github.com/SocialGouv/1000jours/commit/c86f0de6041561ae40857c5792f7230f06b11b10))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction condition affichage texte d'invitation ([#737](https://github.com/SocialGouv/1000jours/issues/737)) ([9f21d8e](https://github.com/SocialGouv/1000jours/commit/9f21d8e5c3a365be3e4269de177b4db7f8e52351))
* **epds:** réajout de la variable RESULT_BECONTACTED_VALUE ([#736](https://github.com/SocialGouv/1000jours/issues/736)) ([b0f5711](https://github.com/SocialGouv/1000jours/commit/b0f571145c67a68bbe022896ca82ca94cd4cf175))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* Add puppeteer dependencies to run html-pdf-node module ([#734](https://github.com/SocialGouv/1000jours/issues/734)) ([fc09e3b](https://github.com/SocialGouv/1000jours/commit/fc09e3be7eaf881a7f74b15bfd019c8653751c90))
* **epds:** correction useState résultats ([#721](https://github.com/SocialGouv/1000jours/issues/721)) ([56b32dc](https://github.com/SocialGouv/1000jours/commit/56b32dce9bf5302700671dfe2a3cc6728b5a75d2))
* **evenements:** Corrige la configuration des liens vers les articles, documents, etc. ([#735](https://github.com/SocialGouv/1000jours/issues/735)) ([c02e5b6](https://github.com/SocialGouv/1000jours/commit/c02e5b67debf6a0abb58031e3b0778bf4b471051))
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* Fix workflows concurrency ([#724](https://github.com/SocialGouv/1000jours/issues/724)) ([a64bd07](https://github.com/SocialGouv/1000jours/commit/a64bd076f8aa17f0a7d22ace0ff80d048505f84c))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* Use SocialGouv autodevops actions. ([#683](https://github.com/SocialGouv/1000jours/issues/683)) ([be598e5](https://github.com/SocialGouv/1000jours/commit/be598e58a8cac487cbcf52a08ccd8cf94c736e79))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **carto:** gestion zoom + refacto ([#718](https://github.com/SocialGouv/1000jours/issues/718)) ([655ee0b](https://github.com/SocialGouv/1000jours/commit/655ee0b344fa7b4851eb0bc60a0cab138dc0d8f8))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **email pdf:** création du pdf ([#723](https://github.com/SocialGouv/1000jours/issues/723)) ([d39ecc5](https://github.com/SocialGouv/1000jours/commit/d39ecc58310de94d055719f0082959127442bc48))
* **epds:** email patient ([#715](https://github.com/SocialGouv/1000jours/issues/715)) ([fb263da](https://github.com/SocialGouv/1000jours/commit/fb263da60b8fe73e537709455617d8c09f043e83))
* **epds:** modification textes smiley + résultats ([#722](https://github.com/SocialGouv/1000jours/issues/722)) ([04703bc](https://github.com/SocialGouv/1000jours/commit/04703bc6d38e8bd3419282d3e120cbcf5cfcb05a))
* 🎸 Ajoute une puce et aligne à gauche les liens article ([#713](https://github.com/SocialGouv/1000jours/issues/713)) ([0197b48](https://github.com/SocialGouv/1000jours/commit/0197b48a8082e8f4c3f6844cf32e501223f73523)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* **evenements:** Ajoute les liens vers articles, documents et types de POIs ([#712](https://github.com/SocialGouv/1000jours/issues/712)) ([ca1c6c8](https://github.com/SocialGouv/1000jours/commit/ca1c6c8d08d0fae6d677319d5c0edbc6458cc8b5))
* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* Revert "fix: 🐛 Corrige la variable API_URL de prod" ([b4d5c16](https://github.com/SocialGouv/1000jours/commit/b4d5c16b7668b464cb2a779fdbb8ae50521af90d))
* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0) (2021-10-06)


### Bug Fixes

* 🐛 Corrige l'alignement de la puce devant les liens ([#745](https://github.com/SocialGouv/1000jours/issues/745)) ([eeea9b5](https://github.com/SocialGouv/1000jours/commit/eeea9b5b67c78f1ec42fd8982a5156840da3fcaf)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** augmentation nombre tentatives pour récupérer la géoloc ([#741](https://github.com/SocialGouv/1000jours/issues/741)) ([990914e](https://github.com/SocialGouv/1000jours/commit/990914e9919d48c4b5ea98f2b12264fa20f92a47))
* **carto:** correction du picker pour le nombre d'enfants ([#740](https://github.com/SocialGouv/1000jours/issues/740)) ([c1ac08d](https://github.com/SocialGouv/1000jours/commit/c1ac08d169562da9097ad19d80c18dd301758be1))
* 🐛 Corrige le problème de lag sur android (scroll articles) ([#730](https://github.com/SocialGouv/1000jours/issues/730)) ([2fbb787](https://github.com/SocialGouv/1000jours/commit/2fbb7870bf6338265cc77548ceb574cc0ae412e0)), closes [#612](https://github.com/SocialGouv/1000jours/issues/612)
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* **deps:** update all dependencies ([#711](https://github.com/SocialGouv/1000jours/issues/711)) ([c86f0de](https://github.com/SocialGouv/1000jours/commit/c86f0de6041561ae40857c5792f7230f06b11b10))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction condition affichage texte d'invitation ([#737](https://github.com/SocialGouv/1000jours/issues/737)) ([9f21d8e](https://github.com/SocialGouv/1000jours/commit/9f21d8e5c3a365be3e4269de177b4db7f8e52351))
* **epds:** réajout de la variable RESULT_BECONTACTED_VALUE ([#736](https://github.com/SocialGouv/1000jours/issues/736)) ([b0f5711](https://github.com/SocialGouv/1000jours/commit/b0f571145c67a68bbe022896ca82ca94cd4cf175))
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* Add puppeteer dependencies to run html-pdf-node module ([#734](https://github.com/SocialGouv/1000jours/issues/734)) ([fc09e3b](https://github.com/SocialGouv/1000jours/commit/fc09e3be7eaf881a7f74b15bfd019c8653751c90))
* **epds:** correction useState résultats ([#721](https://github.com/SocialGouv/1000jours/issues/721)) ([56b32dc](https://github.com/SocialGouv/1000jours/commit/56b32dce9bf5302700671dfe2a3cc6728b5a75d2))
* **evenements:** Corrige la configuration des liens vers les articles, documents, etc. ([#735](https://github.com/SocialGouv/1000jours/issues/735)) ([c02e5b6](https://github.com/SocialGouv/1000jours/commit/c02e5b67debf6a0abb58031e3b0778bf4b471051))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* Fix workflows concurrency ([#724](https://github.com/SocialGouv/1000jours/issues/724)) ([a64bd07](https://github.com/SocialGouv/1000jours/commit/a64bd076f8aa17f0a7d22ace0ff80d048505f84c))
* Use SocialGouv autodevops actions. ([#683](https://github.com/SocialGouv/1000jours/issues/683)) ([be598e5](https://github.com/SocialGouv/1000jours/commit/be598e58a8cac487cbcf52a08ccd8cf94c736e79))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **carto:** gestion zoom + refacto ([#718](https://github.com/SocialGouv/1000jours/issues/718)) ([655ee0b](https://github.com/SocialGouv/1000jours/commit/655ee0b344fa7b4851eb0bc60a0cab138dc0d8f8))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **email pdf:** création du pdf ([#723](https://github.com/SocialGouv/1000jours/issues/723)) ([d39ecc5](https://github.com/SocialGouv/1000jours/commit/d39ecc58310de94d055719f0082959127442bc48))
* **epds:** email patient ([#715](https://github.com/SocialGouv/1000jours/issues/715)) ([fb263da](https://github.com/SocialGouv/1000jours/commit/fb263da60b8fe73e537709455617d8c09f043e83))
* **epds:** modification textes smiley + résultats ([#722](https://github.com/SocialGouv/1000jours/issues/722)) ([04703bc](https://github.com/SocialGouv/1000jours/commit/04703bc6d38e8bd3419282d3e120cbcf5cfcb05a))
* 🎸 Ajoute une puce et aligne à gauche les liens article ([#713](https://github.com/SocialGouv/1000jours/issues/713)) ([0197b48](https://github.com/SocialGouv/1000jours/commit/0197b48a8082e8f4c3f6844cf32e501223f73523)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* **evenements:** Ajoute les liens vers articles, documents et types de POIs ([#712](https://github.com/SocialGouv/1000jours/issues/712)) ([ca1c6c8](https://github.com/SocialGouv/1000jours/commit/ca1c6c8d08d0fae6d677319d5c0edbc6458cc8b5))
* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* Revert "fix: 🐛 Corrige la variable API_URL de prod" ([b4d5c16](https://github.com/SocialGouv/1000jours/commit/b4d5c16b7668b464cb2a779fdbb8ae50521af90d))
* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0) (2021-10-06)


### Bug Fixes

* 🐛 Corrige l'alignement de la puce devant les liens ([#745](https://github.com/SocialGouv/1000jours/issues/745)) ([eeea9b5](https://github.com/SocialGouv/1000jours/commit/eeea9b5b67c78f1ec42fd8982a5156840da3fcaf)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** augmentation nombre tentatives pour récupérer la géoloc ([#741](https://github.com/SocialGouv/1000jours/issues/741)) ([990914e](https://github.com/SocialGouv/1000jours/commit/990914e9919d48c4b5ea98f2b12264fa20f92a47))
* **carto:** correction du picker pour le nombre d'enfants ([#740](https://github.com/SocialGouv/1000jours/issues/740)) ([c1ac08d](https://github.com/SocialGouv/1000jours/commit/c1ac08d169562da9097ad19d80c18dd301758be1))
* 🐛 Corrige le problème de lag sur android (scroll articles) ([#730](https://github.com/SocialGouv/1000jours/issues/730)) ([2fbb787](https://github.com/SocialGouv/1000jours/commit/2fbb7870bf6338265cc77548ceb574cc0ae412e0)), closes [#612](https://github.com/SocialGouv/1000jours/issues/612)
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* **deps:** update all dependencies ([#711](https://github.com/SocialGouv/1000jours/issues/711)) ([c86f0de](https://github.com/SocialGouv/1000jours/commit/c86f0de6041561ae40857c5792f7230f06b11b10))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction condition affichage texte d'invitation ([#737](https://github.com/SocialGouv/1000jours/issues/737)) ([9f21d8e](https://github.com/SocialGouv/1000jours/commit/9f21d8e5c3a365be3e4269de177b4db7f8e52351))
* **epds:** réajout de la variable RESULT_BECONTACTED_VALUE ([#736](https://github.com/SocialGouv/1000jours/issues/736)) ([b0f5711](https://github.com/SocialGouv/1000jours/commit/b0f571145c67a68bbe022896ca82ca94cd4cf175))
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* Add puppeteer dependencies to run html-pdf-node module ([#734](https://github.com/SocialGouv/1000jours/issues/734)) ([fc09e3b](https://github.com/SocialGouv/1000jours/commit/fc09e3be7eaf881a7f74b15bfd019c8653751c90))
* **epds:** correction useState résultats ([#721](https://github.com/SocialGouv/1000jours/issues/721)) ([56b32dc](https://github.com/SocialGouv/1000jours/commit/56b32dce9bf5302700671dfe2a3cc6728b5a75d2))
* **evenements:** Corrige la configuration des liens vers les articles, documents, etc. ([#735](https://github.com/SocialGouv/1000jours/issues/735)) ([c02e5b6](https://github.com/SocialGouv/1000jours/commit/c02e5b67debf6a0abb58031e3b0778bf4b471051))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* Fix workflows concurrency ([#724](https://github.com/SocialGouv/1000jours/issues/724)) ([a64bd07](https://github.com/SocialGouv/1000jours/commit/a64bd076f8aa17f0a7d22ace0ff80d048505f84c))
* Use SocialGouv autodevops actions. ([#683](https://github.com/SocialGouv/1000jours/issues/683)) ([be598e5](https://github.com/SocialGouv/1000jours/commit/be598e58a8cac487cbcf52a08ccd8cf94c736e79))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **carto:** gestion zoom + refacto ([#718](https://github.com/SocialGouv/1000jours/issues/718)) ([655ee0b](https://github.com/SocialGouv/1000jours/commit/655ee0b344fa7b4851eb0bc60a0cab138dc0d8f8))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **email pdf:** création du pdf ([#723](https://github.com/SocialGouv/1000jours/issues/723)) ([d39ecc5](https://github.com/SocialGouv/1000jours/commit/d39ecc58310de94d055719f0082959127442bc48))
* **epds:** email patient ([#715](https://github.com/SocialGouv/1000jours/issues/715)) ([fb263da](https://github.com/SocialGouv/1000jours/commit/fb263da60b8fe73e537709455617d8c09f043e83))
* **epds:** modification textes smiley + résultats ([#722](https://github.com/SocialGouv/1000jours/issues/722)) ([04703bc](https://github.com/SocialGouv/1000jours/commit/04703bc6d38e8bd3419282d3e120cbcf5cfcb05a))
* 🎸 Ajoute une puce et aligne à gauche les liens article ([#713](https://github.com/SocialGouv/1000jours/issues/713)) ([0197b48](https://github.com/SocialGouv/1000jours/commit/0197b48a8082e8f4c3f6844cf32e501223f73523)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* **evenements:** Ajoute les liens vers articles, documents et types de POIs ([#712](https://github.com/SocialGouv/1000jours/issues/712)) ([ca1c6c8](https://github.com/SocialGouv/1000jours/commit/ca1c6c8d08d0fae6d677319d5c0edbc6458cc8b5))
* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* Revert "fix: 🐛 Corrige la variable API_URL de prod" ([b4d5c16](https://github.com/SocialGouv/1000jours/commit/b4d5c16b7668b464cb2a779fdbb8ae50521af90d))
* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0) (2021-10-06)


### Bug Fixes

* 🐛 Corrige l'alignement de la puce devant les liens ([#745](https://github.com/SocialGouv/1000jours/issues/745)) ([eeea9b5](https://github.com/SocialGouv/1000jours/commit/eeea9b5b67c78f1ec42fd8982a5156840da3fcaf)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** augmentation nombre tentatives pour récupérer la géoloc ([#741](https://github.com/SocialGouv/1000jours/issues/741)) ([990914e](https://github.com/SocialGouv/1000jours/commit/990914e9919d48c4b5ea98f2b12264fa20f92a47))
* **carto:** correction du picker pour le nombre d'enfants ([#740](https://github.com/SocialGouv/1000jours/issues/740)) ([c1ac08d](https://github.com/SocialGouv/1000jours/commit/c1ac08d169562da9097ad19d80c18dd301758be1))
* 🐛 Corrige le problème de lag sur android (scroll articles) ([#730](https://github.com/SocialGouv/1000jours/issues/730)) ([2fbb787](https://github.com/SocialGouv/1000jours/commit/2fbb7870bf6338265cc77548ceb574cc0ae412e0)), closes [#612](https://github.com/SocialGouv/1000jours/issues/612)
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* **deps:** update all dependencies ([#711](https://github.com/SocialGouv/1000jours/issues/711)) ([c86f0de](https://github.com/SocialGouv/1000jours/commit/c86f0de6041561ae40857c5792f7230f06b11b10))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction condition affichage texte d'invitation ([#737](https://github.com/SocialGouv/1000jours/issues/737)) ([9f21d8e](https://github.com/SocialGouv/1000jours/commit/9f21d8e5c3a365be3e4269de177b4db7f8e52351))
* **epds:** réajout de la variable RESULT_BECONTACTED_VALUE ([#736](https://github.com/SocialGouv/1000jours/issues/736)) ([b0f5711](https://github.com/SocialGouv/1000jours/commit/b0f571145c67a68bbe022896ca82ca94cd4cf175))
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* Add puppeteer dependencies to run html-pdf-node module ([#734](https://github.com/SocialGouv/1000jours/issues/734)) ([fc09e3b](https://github.com/SocialGouv/1000jours/commit/fc09e3be7eaf881a7f74b15bfd019c8653751c90))
* **epds:** correction useState résultats ([#721](https://github.com/SocialGouv/1000jours/issues/721)) ([56b32dc](https://github.com/SocialGouv/1000jours/commit/56b32dce9bf5302700671dfe2a3cc6728b5a75d2))
* **evenements:** Corrige la configuration des liens vers les articles, documents, etc. ([#735](https://github.com/SocialGouv/1000jours/issues/735)) ([c02e5b6](https://github.com/SocialGouv/1000jours/commit/c02e5b67debf6a0abb58031e3b0778bf4b471051))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* Fix workflows concurrency ([#724](https://github.com/SocialGouv/1000jours/issues/724)) ([a64bd07](https://github.com/SocialGouv/1000jours/commit/a64bd076f8aa17f0a7d22ace0ff80d048505f84c))
* Use SocialGouv autodevops actions. ([#683](https://github.com/SocialGouv/1000jours/issues/683)) ([be598e5](https://github.com/SocialGouv/1000jours/commit/be598e58a8cac487cbcf52a08ccd8cf94c736e79))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **carto:** gestion zoom + refacto ([#718](https://github.com/SocialGouv/1000jours/issues/718)) ([655ee0b](https://github.com/SocialGouv/1000jours/commit/655ee0b344fa7b4851eb0bc60a0cab138dc0d8f8))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **email pdf:** création du pdf ([#723](https://github.com/SocialGouv/1000jours/issues/723)) ([d39ecc5](https://github.com/SocialGouv/1000jours/commit/d39ecc58310de94d055719f0082959127442bc48))
* **epds:** email patient ([#715](https://github.com/SocialGouv/1000jours/issues/715)) ([fb263da](https://github.com/SocialGouv/1000jours/commit/fb263da60b8fe73e537709455617d8c09f043e83))
* **epds:** modification textes smiley + résultats ([#722](https://github.com/SocialGouv/1000jours/issues/722)) ([04703bc](https://github.com/SocialGouv/1000jours/commit/04703bc6d38e8bd3419282d3e120cbcf5cfcb05a))
* 🎸 Ajoute une puce et aligne à gauche les liens article ([#713](https://github.com/SocialGouv/1000jours/issues/713)) ([0197b48](https://github.com/SocialGouv/1000jours/commit/0197b48a8082e8f4c3f6844cf32e501223f73523)), closes [#705](https://github.com/SocialGouv/1000jours/issues/705)
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* **evenements:** Ajoute les liens vers articles, documents et types de POIs ([#712](https://github.com/SocialGouv/1000jours/issues/712)) ([ca1c6c8](https://github.com/SocialGouv/1000jours/commit/ca1c6c8d08d0fae6d677319d5c0edbc6458cc8b5))
* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* Revert "fix: 🐛 Corrige la variable API_URL de prod" ([b4d5c16](https://github.com/SocialGouv/1000jours/commit/b4d5c16b7668b464cb2a779fdbb8ae50521af90d))
* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0-alpha.1](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0-alpha.1) (2021-09-23)


### Bug Fixes

* 🐛 Corrige les retours design sur les événements ([#706](https://github.com/SocialGouv/1000jours/issues/706)) ([5346a09](https://github.com/SocialGouv/1000jours/commit/5346a09e14d24c1b4abe50787da76324a97efa95)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524) [#35](https://github.com/SocialGouv/1000jours/issues/35)
* Use SocialGouv autodevops actions. ([a3816e6](https://github.com/SocialGouv/1000jours/commit/a3816e684eec7a0c7ea0789a42a16a69eee48ed0)), closes [#652](https://github.com/SocialGouv/1000jours/issues/652) [#609](https://github.com/SocialGouv/1000jours/issues/609) [#623](https://github.com/SocialGouv/1000jours/issues/623) [#606](https://github.com/SocialGouv/1000jours/issues/606) [#604](https://github.com/SocialGouv/1000jours/issues/604) [#590](https://github.com/SocialGouv/1000jours/issues/590) [#597](https://github.com/SocialGouv/1000jours/issues/597) [#607](https://github.com/SocialGouv/1000jours/issues/607) [#622](https://github.com/SocialGouv/1000jours/issues/622) [#659](https://github.com/SocialGouv/1000jours/issues/659) [#634](https://github.com/SocialGouv/1000jours/issues/634) [#635](https://github.com/SocialGouv/1000jours/issues/635) [#643](https://github.com/SocialGouv/1000jours/issues/643) [#640](https://github.com/SocialGouv/1000jours/issues/640) [#656](https://github.com/SocialGouv/1000jours/issues/656) [#518](https://github.com/SocialGouv/1000jours/issues/518) [#589](https://github.com/SocialGouv/1000jours/issues/589) [#586](https://github.com/SocialGouv/1000jours/issues/586) [#588](https://github.com/SocialGouv/1000jours/issues/588) [#583](https://github.com/SocialGouv/1000jours/issues/583) [#653](https://github.com/SocialGouv/1000jours/issues/653) [#600](https://github.com/SocialGouv/1000jours/issues/600) [#658](https://github.com/SocialGouv/1000jours/issues/658) [#524](https://github.com/SocialGouv/1000jours/issues/524) [#620](https://github.com/SocialGouv/1000jours/issues/620) [#347](https://github.com/SocialGouv/1000jours/issues/347) [#37](https://github.com/SocialGouv/1000jours/issues/37) [#603](https://github.com/SocialGouv/1000jours/issues/603) [#35](https://github.com/SocialGouv/1000jours/issues/35) [#591](https://github.com/SocialGouv/1000jours/issues/591) [#629](https://github.com/SocialGouv/1000jours/issues/629) [#37](https://github.com/SocialGouv/1000jours/issues/37) [#670](https://github.com/SocialGouv/1000jours/issues/670) [#671](https://github.com/SocialGouv/1000jours/issues/671) [#652](https://github.com/SocialGouv/1000jours/issues/652) [#609](https://github.com/SocialGouv/1000jours/issues/609) [#623](https://github.com/SocialGouv/1000jours/issues/623) [#606](https://github.com/SocialGouv/1000jours/issues/606) [#604](https://github.com/SocialGouv/1000jours/issues/604) [#590](https://github.com/SocialGouv/1000jours/issues/590) [#597](https://github.com/SocialGouv/1000jours/issues/597) [#607](https://github.com/SocialGouv/1000jours/issues/607) [#622](https://github.com/SocialGouv/1000jours/issues/622) [#659](https://github.com/SocialGouv/1000jours/issues/659) [#634](https://github.com/SocialGouv/1000jours/issues/634) [#635](https://github.com/SocialGouv/1000jours/issues/635) [#643](https://github.com/SocialGouv/1000jours/issues/643) [#640](https://github.com/SocialGouv/1000jours/issues/640) [#656](https://github.com/SocialGouv/1000jours/issues/656) [#518](https://github.com/SocialGouv/1000jours/issues/518) [#589](https://github.com/SocialGouv/1000jours/issues/589) [#586](https://github.com/SocialGouv/1000jours/issues/586) [#588](https://github.com/SocialGouv/1000jours/issues/588) [#583](https://github.com/SocialGouv/1000jours/issues/583) [#653](https://github.com/SocialGouv/1000jours/issues/653) [#600](https://github.com/SocialGouv/1000jours/issues/600) [#658](https://github.com/SocialGouv/1000jours/issues/658) [#524](https://github.com/SocialGouv/1000jours/issues/524) [#620](https://github.com/SocialGouv/1000jours/issues/620) [#347](https://github.com/SocialGouv/1000jours/issues/347) [#37](https://github.com/SocialGouv/1000jours/issues/37) [#603](https://github.com/SocialGouv/1000jours/issues/603) [#35](https://github.com/SocialGouv/1000jours/issues/35) [#591](https://github.com/SocialGouv/1000jours/issues/591) [#629](https://github.com/SocialGouv/1000jours/issues/629) [#652](https://github.com/SocialGouv/1000jours/issues/652) [#609](https://github.com/SocialGouv/1000jours/issues/609) [#623](https://github.com/SocialGouv/1000jours/issues/623) [#606](https://github.com/SocialGouv/1000jours/issues/606) [#604](https://github.com/SocialGouv/1000jours/issues/604) [#590](https://github.com/SocialGouv/1000jours/issues/590) [#597](https://github.com/SocialGouv/1000jours/issues/597) [#607](https://github.com/SocialGouv/1000jours/issues/607) [#622](https://github.com/SocialGouv/1000jours/issues/622) [#659](https://github.com/SocialGouv/1000jours/issues/659) [#676](https://github.com/SocialGouv/1000jours/issues/676) [#634](https://github.com/SocialGouv/1000jours/issues/634) [#635](https://github.com/SocialGouv/1000jours/issues/635) [#643](https://github.com/SocialGouv/1000jours/issues/643) [#640](https://github.com/SocialGouv/1000jours/issues/640) [#674](https://github.com/SocialGouv/1000jours/issues/674) [#583](https://github.com/SocialGouv/1000jours/issues/583) [#656](https://github.com/SocialGouv/1000jours/issues/656) [#518](https://github.com/SocialGouv/1000jours/issues/518) [#589](https://github.com/SocialGouv/1000jours/issues/589) [#586](https://github.com/SocialGouv/1000jours/issues/586) [#588](https://github.com/SocialGouv/1000jours/issues/588) [#679](https://github.com/SocialGouv/1000jours/issues/679) [#653](https://github.com/SocialGouv/1000jours/issues/653) [#658](https://github.com/SocialGouv/1000jours/issues/658) [#626](https://github.com/SocialGouv/1000jours/issues/626) [#524](https://github.com/SocialGouv/1000jours/issues/524) [#620](https://github.com/SocialGouv/1000jours/issues/620) [#347](https://github.com/SocialGouv/1000jours/issues/347) [#37](https://github.com/SocialGouv/1000jours/issues/37) [#600](https://github.com/SocialGouv/1000jours/issues/600) [#603](https://github.com/SocialGouv/1000jours/issues/603) [#35](https://github.com/SocialGouv/1000jours/issues/35) [#591](https://github.com/SocialGouv/1000jours/issues/591) [#629](https://github.com/SocialGouv/1000jours/issues/629)
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** ajout de la route pour les suggestions ([#678](https://github.com/SocialGouv/1000jours/issues/678)) ([db5da7b](https://github.com/SocialGouv/1000jours/commit/db5da7bb99ff6b6dfd571e804e781ec09e244dc3))
* **carto:** correction sur la récupération de la localisation ([#675](https://github.com/SocialGouv/1000jours/issues/675)) ([2c6d8d1](https://github.com/SocialGouv/1000jours/commit/2c6d8d1e85da3797f0355c34479591bc48d6ff46))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **carto:** suppression loader après filtre sur iOS + incrément version ([#698](https://github.com/SocialGouv/1000jours/issues/698)) ([4fa2f02](https://github.com/SocialGouv/1000jours/commit/4fa2f02327cb2807e3c1796f7bf5aef208d456d9))
* **deps:** update all dependencies ([#691](https://github.com/SocialGouv/1000jours/issues/691)) ([9cb38bf](https://github.com/SocialGouv/1000jours/commit/9cb38bf3fe6c4a6823d257890592e6dc5db8d6ac))
* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🐛 Corrige la variable API_URL de prod ([cebf1be](https://github.com/SocialGouv/1000jours/commit/cebf1bef1609e8b123c7737f6d565403a1c43545))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **site pro:** ajout du mail du patient en copie ([#687](https://github.com/SocialGouv/1000jours/issues/687)) ([a2ef2f0](https://github.com/SocialGouv/1000jours/commit/a2ef2f0a30f5f4e1fe998a584aee8b2ec8c307ff))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))


### Features

* **partage epds:** Ajout d'un email pour un second pro ([#707](https://github.com/SocialGouv/1000jours/issues/707)) ([ff939d4](https://github.com/SocialGouv/1000jours/commit/ff939d414ffdc19ffd09a7e0724460e550ceddea))
* 🎸 Ajoute "Laisser un avis" dans le menu ([#708](https://github.com/SocialGouv/1000jours/issues/708)) ([0b56372](https://github.com/SocialGouv/1000jours/commit/0b56372ea05d4ec4cfa19f03e5732f3d4240c93d)), closes [#488](https://github.com/SocialGouv/1000jours/issues/488)
* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **epds:** modification textes modale Être contacté ([#699](https://github.com/SocialGouv/1000jours/issues/699)) ([e501d50](https://github.com/SocialGouv/1000jours/commit/e501d507aa121c171a6986eb41151a3f65b01dab))
* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))
* parenthèque ([#677](https://github.com/SocialGouv/1000jours/issues/677)) ([bce73e0](https://github.com/SocialGouv/1000jours/commit/bce73e0fac4e6ff9e7a65f6549d8d6578e485c10))
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **epds:** agrandissement bouton Être contacté + trackers ([#688](https://github.com/SocialGouv/1000jours/issues/688)) ([105140b](https://github.com/SocialGouv/1000jours/commit/105140b378a888159912a1ffc7d2071379ee0e9d))
* **epds:** réaffichage smiley pour les résultats ([#685](https://github.com/SocialGouv/1000jours/issues/685)) ([2caa6a5](https://github.com/SocialGouv/1000jours/commit/2caa6a52bceb9db2e5ac6acfb63d9e7fd0ac0dfe))
* 🎸 Ajoute le nouveau logo de l'application ([#686](https://github.com/SocialGouv/1000jours/issues/686)) ([032afdf](https://github.com/SocialGouv/1000jours/commit/032afdf835b30b3739faabfd95257fe3089d3d00)), closes [#559](https://github.com/SocialGouv/1000jours/issues/559)
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))


### Reverts

* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

# [1.74.0-alpha.11](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.10...v1.74.0-alpha.11) (2021-09-22)


### Bug Fixes

* Workflows concurrency ([6cef4b2](https://github.com/SocialGouv/1000jours/commit/6cef4b2b46fd486b8c8baa7e0d3f4b714112c3de))

# [1.74.0-alpha.10](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.9...v1.74.0-alpha.10) (2021-09-22)


### Bug Fixes

* Run expo workflows on push and tags ([26bfb81](https://github.com/SocialGouv/1000jours/commit/26bfb812e48983f471bc1e26a1b60b01967c9a04))

# [1.74.0-alpha.9](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.8...v1.74.0-alpha.9) (2021-09-20)


### Bug Fixes

* Add socialgouv-deactivate workflow ([2039b36](https://github.com/SocialGouv/1000jours/commit/2039b36b0654d396a3d3b49c26363d57be1473ed))

# [1.74.0-alpha.8](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.7...v1.74.0-alpha.8) (2021-09-20)


### Bug Fixes

* Add environment to k8s-namespace ([b727c2d](https://github.com/SocialGouv/1000jours/commit/b727c2d320e435b61880b0baf5384e742e52fb2b))

# [1.74.0-alpha.7](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.6...v1.74.0-alpha.7) (2021-09-20)


### Bug Fixes

* Fix typo ([cbdc471](https://github.com/SocialGouv/1000jours/commit/cbdc4710a261240c969eed4d00cdb3621a3b3934))

# [1.74.0-alpha.6](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.5...v1.74.0-alpha.6) (2021-09-20)


### Bug Fixes

* Build API_URL thanks to socialgouv/k8s-namespace action ([7645dd9](https://github.com/SocialGouv/1000jours/commit/7645dd9dd2b10915d87b88e16af8008a0963ec69))

# [1.74.0-alpha.5](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.4...v1.74.0-alpha.5) (2021-09-15)


### Bug Fixes

* Remove extra API_URL slash ([991a0fb](https://github.com/SocialGouv/1000jours/commit/991a0fb691cc766eba578d29cd2c00c4ba8a8298))

# [1.74.0-alpha.4](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.3...v1.74.0-alpha.4) (2021-09-14)


### Bug Fixes

* Update API_URL. ([848d3e7](https://github.com/SocialGouv/1000jours/commit/848d3e7279ae053d889bdfdedae174afedc858f7))

# [1.74.0-alpha.3](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.2...v1.74.0-alpha.3) (2021-09-14)


### Bug Fixes

* Update .k8s tests. ([8089abe](https://github.com/SocialGouv/1000jours/commit/8089abe5cc2af93403f2b5c86a4b07112c54e977))

# [1.74.0-alpha.2](https://github.com/SocialGouv/1000jours/compare/v1.74.0-alpha.1...v1.74.0-alpha.2) (2021-09-14)


### Bug Fixes

* Set PG server hostname suffix. ([61d5241](https://github.com/SocialGouv/1000jours/commit/61d524103480f94a46e6868517ed46e75c019a60))

# [1.74.0-alpha.1](https://github.com/SocialGouv/1000jours/compare/v1.73.1...v1.74.0-alpha.1) (2021-09-14)


### Bug Fixes

* 🐛 Corrige la synchro des events sur Android ([#662](https://github.com/SocialGouv/1000jours/issues/662)) ([b19f29a](https://github.com/SocialGouv/1000jours/commit/b19f29a668a76e1b58daff50d93a4aa87c5c5e14)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* downgrade dependencies version ([#670](https://github.com/SocialGouv/1000jours/issues/670)) ([e5c675f](https://github.com/SocialGouv/1000jours/commit/e5c675f1251b4ba425be8d847c6cec9237c2b5d9))
* pro email required ([#671](https://github.com/SocialGouv/1000jours/issues/671)) ([e627475](https://github.com/SocialGouv/1000jours/commit/e6274754209ddf047a18e69aa2fad9ffe571294a))
* Restore database on review branches. ([00e234f](https://github.com/SocialGouv/1000jours/commit/00e234fcf3fdfa4c9e9739c51d54db9b63f8e0e5))
* Update changelog. ([5f0e453](https://github.com/SocialGouv/1000jours/commit/5f0e453bd3f8352b330792500f02f637e89f75c0))
* Use SocialGouv autodevops actions. ([21454f9](https://github.com/SocialGouv/1000jours/commit/21454f940688f0f17fe4aa99214a9381fa4eb024)), closes [#652](https://github.com/SocialGouv/1000jours/issues/652) [#609](https://github.com/SocialGouv/1000jours/issues/609) [#623](https://github.com/SocialGouv/1000jours/issues/623) [#606](https://github.com/SocialGouv/1000jours/issues/606) [#604](https://github.com/SocialGouv/1000jours/issues/604) [#590](https://github.com/SocialGouv/1000jours/issues/590) [#597](https://github.com/SocialGouv/1000jours/issues/597) [#607](https://github.com/SocialGouv/1000jours/issues/607) [#622](https://github.com/SocialGouv/1000jours/issues/622) [#659](https://github.com/SocialGouv/1000jours/issues/659) [#634](https://github.com/SocialGouv/1000jours/issues/634) [#635](https://github.com/SocialGouv/1000jours/issues/635) [#643](https://github.com/SocialGouv/1000jours/issues/643) [#640](https://github.com/SocialGouv/1000jours/issues/640) [#656](https://github.com/SocialGouv/1000jours/issues/656) [#518](https://github.com/SocialGouv/1000jours/issues/518) [#589](https://github.com/SocialGouv/1000jours/issues/589) [#586](https://github.com/SocialGouv/1000jours/issues/586) [#588](https://github.com/SocialGouv/1000jours/issues/588) [#583](https://github.com/SocialGouv/1000jours/issues/583) [#653](https://github.com/SocialGouv/1000jours/issues/653) [#600](https://github.com/SocialGouv/1000jours/issues/600) [#658](https://github.com/SocialGouv/1000jours/issues/658) [#524](https://github.com/SocialGouv/1000jours/issues/524) [#620](https://github.com/SocialGouv/1000jours/issues/620) [#347](https://github.com/SocialGouv/1000jours/issues/347) [#37](https://github.com/SocialGouv/1000jours/issues/37) [#603](https://github.com/SocialGouv/1000jours/issues/603) [#35](https://github.com/SocialGouv/1000jours/issues/35) [#591](https://github.com/SocialGouv/1000jours/issues/591) [#629](https://github.com/SocialGouv/1000jours/issues/629)
* **carto:** add accuracy param ([#652](https://github.com/SocialGouv/1000jours/issues/652)) ([764f278](https://github.com/SocialGouv/1000jours/commit/764f278fa1f104db56592bb3b20d272435c127de))
* **carto:** fix lenteur carto ([#609](https://github.com/SocialGouv/1000jours/issues/609)) ([d3c48b7](https://github.com/SocialGouv/1000jours/commit/d3c48b7a5a626ace9eb9c4beec8d7ae61ea16b73))
* **carto:** fix loader ([#623](https://github.com/SocialGouv/1000jours/issues/623)) ([941fd63](https://github.com/SocialGouv/1000jours/commit/941fd638de6f2c6210ff970a73fc64dc3a892457))
* **ci:** dont set duration to 1 day on restore db ([#606](https://github.com/SocialGouv/1000jours/issues/606)) ([3689625](https://github.com/SocialGouv/1000jours/commit/36896251c6f7fff74c8dd1fb167eaabfde6d5004))
* **ci:** longer lifetime for develop branch ([#604](https://github.com/SocialGouv/1000jours/issues/604)) ([494d490](https://github.com/SocialGouv/1000jours/commit/494d49079b6f918a352102389a9293384b9add2d))
* **deps:** update all dependencies ([#590](https://github.com/SocialGouv/1000jours/issues/590)) ([85c4f0e](https://github.com/SocialGouv/1000jours/commit/85c4f0e7b47ffce4dacd3b9c3258a5ade7abadfc))
* **deps:** update all dependencies ([#597](https://github.com/SocialGouv/1000jours/issues/597)) ([863f799](https://github.com/SocialGouv/1000jours/commit/863f799ae722cb0b9b717d185b0f3117e60e2f19))
* **deps:** update all dependencies ([#607](https://github.com/SocialGouv/1000jours/issues/607)) ([8650bc9](https://github.com/SocialGouv/1000jours/commit/8650bc97bd296b3998bf346e5d373ced80d56eeb))
* **deps:** update all dependencies ([#622](https://github.com/SocialGouv/1000jours/issues/622)) ([ae951f4](https://github.com/SocialGouv/1000jours/commit/ae951f41ad5a7e5876b648f687c6e8be97d42a9d))
* **deps:** update all dependencies ([#659](https://github.com/SocialGouv/1000jours/issues/659)) ([5273473](https://github.com/SocialGouv/1000jours/commit/527347313911d19c27a2ba025e30d50673d16325))
* **deps:** update all dependencies ([#676](https://github.com/SocialGouv/1000jours/issues/676)) ([609cef7](https://github.com/SocialGouv/1000jours/commit/609cef7e1dfad0d6ca71fadb77c3e3db544b9e9b))
* **deps:** update all non-major dependencies ([#634](https://github.com/SocialGouv/1000jours/issues/634)) ([5ea9edb](https://github.com/SocialGouv/1000jours/commit/5ea9edb0c988d3b0a9d7947e6344226161062cf6))
* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v29 ([#635](https://github.com/SocialGouv/1000jours/issues/635)) ([260eb67](https://github.com/SocialGouv/1000jours/commit/260eb67cb90bf713f88b8d7ce34d35f65a3355c2))
* **deps:** update dependency @react-navigation/bottom-tabs to v6 ([#643](https://github.com/SocialGouv/1000jours/issues/643)) ([e79f853](https://github.com/SocialGouv/1000jours/commit/e79f853a04b5568c80dd7250cecaff0707bd12d0))
* **deps:** update dependency sentry-expo to v4 ([#640](https://github.com/SocialGouv/1000jours/issues/640)) ([b1219f4](https://github.com/SocialGouv/1000jours/commit/b1219f4effd5b91e274d457ac3aec99f64a0758c))
* **epds:** correction des noms des contacts + agrandissement zone cliquable de la modale ([#674](https://github.com/SocialGouv/1000jours/issues/674)) ([71d32d1](https://github.com/SocialGouv/1000jours/commit/71d32d111e61955b29cc11a7ba81f3b11c9aaa1c))
* **labels:** correction erreurs texte ([#583](https://github.com/SocialGouv/1000jours/issues/583)) ([2a7be97](https://github.com/SocialGouv/1000jours/commit/2a7be97ca6502cf2d87def54fc64a432a3411b8f))
* **partage des resultats:** amélioration de l'affichage des résultats ([#656](https://github.com/SocialGouv/1000jours/issues/656)) ([d08e350](https://github.com/SocialGouv/1000jours/commit/d08e3502ca4273b66aae09c3fbed8e3a12609f94))
* 🐛 Corrige l'initialisation de Matomo ([#582](https://github.com/SocialGouv/1000jours/issues/582)) ([ec9d389](https://github.com/SocialGouv/1000jours/commit/ec9d389d30c62e3db1dc90d6e91dc7e4d6e01d5c)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* 🐛 Corrige l'url de l'api sur develop ([#589](https://github.com/SocialGouv/1000jours/issues/589)) ([32e0c56](https://github.com/SocialGouv/1000jours/commit/32e0c56916c04b94bbff325331472a27923a7e5f))
* snaps ([#586](https://github.com/SocialGouv/1000jours/issues/586)) ([#588](https://github.com/SocialGouv/1000jours/issues/588)) ([e24857d](https://github.com/SocialGouv/1000jours/commit/e24857d7e930959fda7a902996fc009c08de6d8c))


### Features

* 🎸 Ajoute des stats sur Matomo ([#681](https://github.com/SocialGouv/1000jours/issues/681)) ([75bc5b6](https://github.com/SocialGouv/1000jours/commit/75bc5b6026e60e0a9041137ee98158a1503584c1)), closes [#679](https://github.com/SocialGouv/1000jours/issues/679)
* **carto:** ajout écran prochain filtre ([#653](https://github.com/SocialGouv/1000jours/issues/653)) ([5792699](https://github.com/SocialGouv/1000jours/commit/57926996a97d439eab185dc7f3e005c29574fdea))
* **carto:** nouveau filtre - retouche design ([#658](https://github.com/SocialGouv/1000jours/issues/658)) ([7ccf599](https://github.com/SocialGouv/1000jours/commit/7ccf59900caf9e35a65d7dce6eddb4a8d5a29865))
* **parentheque:** Ajoute le modèle de documents dans le backoffice ([#628](https://github.com/SocialGouv/1000jours/issues/628)) ([6895b4f](https://github.com/SocialGouv/1000jours/commit/6895b4f957acc58cdb65bf22b03c39a81afe2ab5)), closes [#626](https://github.com/SocialGouv/1000jours/issues/626)
* 🎸 Ajoute la fiche événement enrichie ([#646](https://github.com/SocialGouv/1000jours/issues/646)) ([ee54317](https://github.com/SocialGouv/1000jours/commit/ee5431774111b4064a0b7069110d6904c51ff183)), closes [#524](https://github.com/SocialGouv/1000jours/issues/524)
* **carto:** use nos1000jours-lib for carto ([#620](https://github.com/SocialGouv/1000jours/issues/620)) ([27487f3](https://github.com/SocialGouv/1000jours/commit/27487f39183ac8e27efedb68b67bfe350a949ca9))
* 🎸 Ajoute la page "accessibilité" ([#598](https://github.com/SocialGouv/1000jours/issues/598)) ([df7e74c](https://github.com/SocialGouv/1000jours/commit/df7e74cbd581f1015a468756f40fd25d013bae50)), closes [#347](https://github.com/SocialGouv/1000jours/issues/347)
* 🎸 Ajoute la synchronisation des evenements ([#605](https://github.com/SocialGouv/1000jours/issues/605)) ([908c164](https://github.com/SocialGouv/1000jours/commit/908c164c0e66ac64996e215951a3b30395dec049)), closes [#37](https://github.com/SocialGouv/1000jours/issues/37)
* **carto:** différence des pins entre pros et structures ([#600](https://github.com/SocialGouv/1000jours/issues/600)) ([8821560](https://github.com/SocialGouv/1000jours/commit/882156061b2d7c9a08d950b885b3591029f3b37c))
* **result:** Add source for epds result ([#603](https://github.com/SocialGouv/1000jours/issues/603)) ([463142c](https://github.com/SocialGouv/1000jours/commit/463142cec48e19089795db27b635a7c3c00170fd))
* 🎸 Ajoute les tags (thematique, etapes) sur les events ([#594](https://github.com/SocialGouv/1000jours/issues/594)) ([16c0606](https://github.com/SocialGouv/1000jours/commit/16c0606489da48447e1cdf951512252eaadef013)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* copy preprod DB on develop branch ([#591](https://github.com/SocialGouv/1000jours/issues/591)) ([c23c014](https://github.com/SocialGouv/1000jours/commit/c23c0144da1a541b5ce597e56e21837b6e2aed49))


### Reverts

* **deps:** update all dependencies (patch) ([#629](https://github.com/SocialGouv/1000jours/issues/629)) ([915165e](https://github.com/SocialGouv/1000jours/commit/915165e15acbe5b22c9ba5937fa190f46325538e))

## [1.73.1](https://github.com/SocialGouv/1000jours/compare/v1.73.0...v1.73.1) (2021-07-29)


### Bug Fixes

* 🐛 Corrige les problèmes d'affichage sur tablette ([#566](https://github.com/SocialGouv/1000jours/issues/566)) ([ec37497](https://github.com/SocialGouv/1000jours/commit/ec37497e59e6b6277624e921857a1fb03d5e12cb))

# [1.73.0](https://github.com/SocialGouv/1000jours/compare/v1.72.1...v1.73.0) (2021-07-28)


### Features

* 🎸 Change le numéro de version : 1.0.22 ([#564](https://github.com/SocialGouv/1000jours/issues/564)) ([dcb3488](https://github.com/SocialGouv/1000jours/commit/dcb3488d6b5b0800db9732426d065683b75a8e9c))

## [1.72.1](https://github.com/SocialGouv/1000jours/compare/v1.72.0...v1.72.1) (2021-07-28)


### Bug Fixes

* 🐛 Améliore l'UX/UI (buttons, checkbox) ([#563](https://github.com/SocialGouv/1000jours/issues/563)) ([afd4f5e](https://github.com/SocialGouv/1000jours/commit/afd4f5e90e44d2c02027823b55dd1f25ed5a2b05)), closes [#560](https://github.com/SocialGouv/1000jours/issues/560)
* 🐛 Corrige le report des erreurs sur Sentry ([#562](https://github.com/SocialGouv/1000jours/issues/562)) ([31bb5b8](https://github.com/SocialGouv/1000jours/commit/31bb5b8521a6ff9abfc8014e96aa4fff771a44e9))

# [1.72.0](https://github.com/SocialGouv/1000jours/compare/v1.71.1...v1.72.0) (2021-07-26)


### Bug Fixes

* 🐛 Ajoute une description pour le GPS (App refused on iOS) ([#556](https://github.com/SocialGouv/1000jours/issues/556)) ([1c0fb9f](https://github.com/SocialGouv/1000jours/commit/1c0fb9fe4c981b330a8f2306056640b6993a1ef7))


### Features

* 🎸 Ajoute Matomo pour la PREPROD (APP_ID : 46) ([#557](https://github.com/SocialGouv/1000jours/issues/557)) ([7703fea](https://github.com/SocialGouv/1000jours/commit/7703feac62c70ac46b672aa7108107cc0581ad68))

## [1.71.1](https://github.com/SocialGouv/1000jours/compare/v1.71.0...v1.71.1) (2021-07-23)


### Bug Fixes

* 🐛 Corrige le formulaire "Etre contacté" (EPDS) ([#552](https://github.com/SocialGouv/1000jours/issues/552)) ([f285dfe](https://github.com/SocialGouv/1000jours/commit/f285dfe7232a564e8886643280b47d50af81ceb0))
* 🐛 Corrige le nombre d'envoie des stats pour Matomo ([#551](https://github.com/SocialGouv/1000jours/issues/551)) ([b102d48](https://github.com/SocialGouv/1000jours/commit/b102d48a3194221645afeb11dce5c9e03acd920e))

# [1.71.0](https://github.com/SocialGouv/1000jours/compare/v1.70.1...v1.71.0) (2021-07-23)


### Bug Fixes

* **epds:** Rend tous les champs du formulaire de contact optionnels sauf l'email ([#550](https://github.com/SocialGouv/1000jours/issues/550)) ([0d3b5a8](https://github.com/SocialGouv/1000jours/commit/0d3b5a85e26c6ed709cb95a0fd2a3646064fc1c4))


### Features

* 🎸 Change le numéro de version : 1.0.19 ([#549](https://github.com/SocialGouv/1000jours/issues/549)) ([20c2a41](https://github.com/SocialGouv/1000jours/commit/20c2a417b2f156e5de55e903fd70f8baa07795df))

## [1.70.1](https://github.com/SocialGouv/1000jours/compare/v1.70.0...v1.70.1) (2021-07-22)


### Bug Fixes

* 🐛 Corrige l'envoie de la stat "Ouverture de l'app" ([#548](https://github.com/SocialGouv/1000jours/issues/548)) ([b99b7cb](https://github.com/SocialGouv/1000jours/commit/b99b7cb372f170252e92a0ed08ff10f7012577d3)), closes [#518](https://github.com/SocialGouv/1000jours/issues/518)
* 🐛 Corrige le loader sur la carto (access GPS : refused) ([#547](https://github.com/SocialGouv/1000jours/issues/547)) ([38fa92a](https://github.com/SocialGouv/1000jours/commit/38fa92a1fe4308d5a93beb79d03089a5a16d2226)), closes [#544](https://github.com/SocialGouv/1000jours/issues/544)

# [1.70.0](https://github.com/SocialGouv/1000jours/compare/v1.69.0...v1.70.0) (2021-07-21)


### Bug Fixes

* 🐛 Ajoute la permission d'utiliser le GPS (Android) ([#541](https://github.com/SocialGouv/1000jours/issues/541)) ([acf9a96](https://github.com/SocialGouv/1000jours/commit/acf9a96ad4321a8a7962dd5393ceb2c16fde11c9))
* 🐛 Corrige le loader sur la carto (access GPS : refused) ([#540](https://github.com/SocialGouv/1000jours/issues/540)) ([e7b5fb3](https://github.com/SocialGouv/1000jours/commit/e7b5fb3585ee75c9b471aa313cf4908e62dc721c))
* 🐛 Corrige le loader sur la carto (access GPS : refused) ([#544](https://github.com/SocialGouv/1000jours/issues/544)) ([3c55e0c](https://github.com/SocialGouv/1000jours/commit/3c55e0ce345575e64fde126fe239abcc9d3e685b)), closes [#540](https://github.com/SocialGouv/1000jours/issues/540)


### Features

* 🎸 Ajoute des stats dans Matomo ([#542](https://github.com/SocialGouv/1000jours/issues/542)) ([4f77e8c](https://github.com/SocialGouv/1000jours/commit/4f77e8c1bd385de7d974102c76a847e6153534ff)), closes [#517](https://github.com/SocialGouv/1000jours/issues/517) [#518](https://github.com/SocialGouv/1000jours/issues/518) [#523](https://github.com/SocialGouv/1000jours/issues/523)
* 🎸 Ajoutes les stats des filtres dans Matomo ([#545](https://github.com/SocialGouv/1000jours/issues/545)) ([01db241](https://github.com/SocialGouv/1000jours/commit/01db24136144950209efbddaff712bce5f3e9dc7)), closes [#519](https://github.com/SocialGouv/1000jours/issues/519)

# [1.69.0](https://github.com/SocialGouv/1000jours/compare/v1.68.1...v1.69.0) (2021-07-19)


### Bug Fixes

* **epds:** Empêche les injections HTML l'email de contact ([#538](https://github.com/SocialGouv/1000jours/issues/538)) ([a3e2aad](https://github.com/SocialGouv/1000jours/commit/a3e2aadc36eeb0e75584d86e434c97bf64000bd6))
* 🐛 Corrige l'envoie des scores du test epds ([#536](https://github.com/SocialGouv/1000jours/issues/536)) ([e4b2e87](https://github.com/SocialGouv/1000jours/commit/e4b2e87da75c995c87996981549306b84b708f0a))


### Features

* 🎸 Change la gestion du cache au niveau des requêtes ([#537](https://github.com/SocialGouv/1000jours/issues/537)) ([dd17bd3](https://github.com/SocialGouv/1000jours/commit/dd17bd3b72c37628da4787a605fd5ae4cb8e4568))

## [1.68.1](https://github.com/SocialGouv/1000jours/compare/v1.68.0...v1.68.1) (2021-07-19)


### Bug Fixes

* **deps:** update all dependencies ([#533](https://github.com/SocialGouv/1000jours/issues/533)) ([d8f77f5](https://github.com/SocialGouv/1000jours/commit/d8f77f5399ae81c56d53b28298d75eeecf573978))

# [1.68.0](https://github.com/SocialGouv/1000jours/compare/v1.67.2...v1.68.0) (2021-07-19)


### Bug Fixes

* **epds:** Corrige le code HTML du mail de suivi ([#534](https://github.com/SocialGouv/1000jours/issues/534)) ([a086a54](https://github.com/SocialGouv/1000jours/commit/a086a545d4e3dc86c2d96a51401d0dcdfa2ea179))
* 🐛 Ajoute le cache au niveau de la request apollo ([#535](https://github.com/SocialGouv/1000jours/issues/535)) ([e46049e](https://github.com/SocialGouv/1000jours/commit/e46049e55736eebd8f7057b4718feda375c8375d))


### Features

* 🎸 Ajoute les notifications des événements ([#532](https://github.com/SocialGouv/1000jours/issues/532)) ([3e9a338](https://github.com/SocialGouv/1000jours/commit/3e9a338a695f62fa8dcea7e1518fea80ac7a5368)), closes [#33](https://github.com/SocialGouv/1000jours/issues/33)

## [1.67.2](https://github.com/SocialGouv/1000jours/compare/v1.67.1...v1.67.2) (2021-07-16)


### Bug Fixes

* **deps:** update dependency @socialgouv/kosko-charts to v8 ([#459](https://github.com/SocialGouv/1000jours/issues/459)) ([7040f0e](https://github.com/SocialGouv/1000jours/commit/7040f0ef373b97370aa25b74db215a0f49e62815))
* **epds:** Corrige les variables d'environnement du mailing ([#529](https://github.com/SocialGouv/1000jours/issues/529)) ([760e495](https://github.com/SocialGouv/1000jours/commit/760e49586a436b5579099374ed252d1ad0b2302e))

## [1.67.1](https://github.com/SocialGouv/1000jours/compare/v1.67.0...v1.67.1) (2021-07-16)


### Bug Fixes

* **epds:** Corrige l'envoie des scores au backend, refs [#512](https://github.com/SocialGouv/1000jours/issues/512) ([#528](https://github.com/SocialGouv/1000jours/issues/528)) ([2a33965](https://github.com/SocialGouv/1000jours/commit/2a339659ad3280fab11bf41ab12d13cb975c8ae8))

# [1.67.0](https://github.com/SocialGouv/1000jours/compare/v1.66.0...v1.67.0) (2021-07-16)


### Features

* **epds:** Envoie les scores de toutes les réponses au backend ([#522](https://github.com/SocialGouv/1000jours/issues/522)) ([bfef984](https://github.com/SocialGouv/1000jours/commit/bfef984ee81f5eebbfbba41e9c7c62007ecc36fa))

# [1.66.0](https://github.com/SocialGouv/1000jours/compare/v1.65.0...v1.66.0) (2021-07-16)


### Bug Fixes

* **carto:** activation geoloc + affichage filtre si plus de 20 POI ([#527](https://github.com/SocialGouv/1000jours/issues/527)) ([5a14340](https://github.com/SocialGouv/1000jours/commit/5a14340a45f932458e5cebd66067e04bc79006d6))
* **epds:** Ajoute les variables d'environnement du mailing pour prod et preprod ([#521](https://github.com/SocialGouv/1000jours/issues/521)) ([abd6b34](https://github.com/SocialGouv/1000jours/commit/abd6b3418af921a4bdd36ee4b936033c112ee0fd))


### Features

* **calendrier:** Restreint les événements à une seule thématique ([#516](https://github.com/SocialGouv/1000jours/issues/516)) ([eacdc14](https://github.com/SocialGouv/1000jours/commit/eacdc14d58e01c7fbf06f2828b468b83ed3a0c23))
* **epds:** ajout du bouton Être contacté après l'EPDS ([#526](https://github.com/SocialGouv/1000jours/issues/526)) ([b9e49f2](https://github.com/SocialGouv/1000jours/commit/b9e49f2bd8df32c9c79edf032af38f3996ff43f6))

# [1.65.0](https://github.com/SocialGouv/1000jours/compare/v1.64.0...v1.65.0) (2021-07-15)


### Bug Fixes

* Update deployment requests and limits. ([1c2c1e9](https://github.com/SocialGouv/1000jours/commit/1c2c1e9d1ef0cca4c23bef591d97dcfc634bc913))


### Features

* **epds:** Envoie un email si le parent souhaite être contacté suite au test, refs [#511](https://github.com/SocialGouv/1000jours/issues/511) ([#514](https://github.com/SocialGouv/1000jours/issues/514)) ([7339cd5](https://github.com/SocialGouv/1000jours/commit/7339cd5cae900f3233d9d01faa7bc5ecc8cf3300))

# [1.64.0](https://github.com/SocialGouv/1000jours/compare/v1.63.0...v1.64.0) (2021-07-13)


### Features

* **carto:** diminution du volet lorsqu'on est en haut du scroll ([#510](https://github.com/SocialGouv/1000jours/issues/510)) ([98a8ed9](https://github.com/SocialGouv/1000jours/commit/98a8ed9540af4b19d1d4a3d4fe60b9bfd23fbb1b))

# [1.63.0](https://github.com/SocialGouv/1000jours/compare/v1.62.1...v1.63.0) (2021-07-13)


### Bug Fixes

* **carto:** Corrige le type de retour de la requête de comptage de POIs ([#509](https://github.com/SocialGouv/1000jours/issues/509)) ([7982960](https://github.com/SocialGouv/1000jours/commit/7982960d17832b27e509d3ccb6608dc442ed5da6))


### Features

* **carto:** annulation du filtre si moins de 20 POI avec le filtre ([#507](https://github.com/SocialGouv/1000jours/issues/507)) ([8a1a54d](https://github.com/SocialGouv/1000jours/commit/8a1a54d4458fc83cacdb725797f1cac3cba52462))

## [1.62.1](https://github.com/SocialGouv/1000jours/compare/v1.62.0...v1.62.1) (2021-07-13)


### Bug Fixes

* 🐛 Refresh la page Calendrier lorsqu'elle est affichée ([#503](https://github.com/SocialGouv/1000jours/issues/503)) ([a146d3f](https://github.com/SocialGouv/1000jours/commit/a146d3fa5dc9000e609355b285db28e939fa160a))
* **k8s:** scale down min and max strapi replica ([d01c847](https://github.com/SocialGouv/1000jours/commit/d01c8477847db3041d7368c31f7a7bdc0b939f11))
* **k8s:** scale down min and max strapi-cache replica ([e323b05](https://github.com/SocialGouv/1000jours/commit/e323b05fb522a15408e418c349a4ef17d0578545))

# [1.62.0](https://github.com/SocialGouv/1000jours/compare/v1.61.2...v1.62.0) (2021-07-12)


### Features

* **carto:** Ajoute une requête de comptage de POIs ([#506](https://github.com/SocialGouv/1000jours/issues/506)) ([8c1de64](https://github.com/SocialGouv/1000jours/commit/8c1de6456582c2a16017b7d918daa19244af26e9))

## [1.61.2](https://github.com/SocialGouv/1000jours/compare/v1.61.1...v1.61.2) (2021-07-12)


### Bug Fixes

* **deps:** update all dependencies ([#501](https://github.com/SocialGouv/1000jours/issues/501)) ([51d9116](https://github.com/SocialGouv/1000jours/commit/51d9116652b1940b03a963288a45443777b0c79f))

## [1.61.1](https://github.com/SocialGouv/1000jours/compare/v1.61.0...v1.61.1) (2021-07-09)


### Bug Fixes

* 🐛 Supprime la date de naissance suivant le profil ([#500](https://github.com/SocialGouv/1000jours/issues/500)) ([6b49091](https://github.com/SocialGouv/1000jours/commit/6b49091269206647f745c52fabfb791bf97f2cde))

# [1.61.0](https://github.com/SocialGouv/1000jours/compare/v1.60.1...v1.61.0) (2021-07-08)


### Features

* 🎸 Ajoute un bouton pour maj son profil (calendrier) ([#498](https://github.com/SocialGouv/1000jours/issues/498)) ([abb62f0](https://github.com/SocialGouv/1000jours/commit/abb62f0a017734c499ff8efdb01dee8a3e89cc72)), closes [#341](https://github.com/SocialGouv/1000jours/issues/341)
* **carto:** ajout géolocalisation ([#499](https://github.com/SocialGouv/1000jours/issues/499)) ([1d873d1](https://github.com/SocialGouv/1000jours/commit/1d873d186dc6233017a0d39e1c2bf099f7de44f0))

## [1.60.1](https://github.com/SocialGouv/1000jours/compare/v1.60.0...v1.60.1) (2021-07-08)


### Bug Fixes

* 🐛 Corrige le trackerEvent Matomo sur le profil ([#497](https://github.com/SocialGouv/1000jours/issues/497)) ([1fae339](https://github.com/SocialGouv/1000jours/commit/1fae339a8cff6b097c621d18e8ff384a24466e91)), closes [#484](https://github.com/SocialGouv/1000jours/issues/484)

# [1.60.0](https://github.com/SocialGouv/1000jours/compare/v1.59.1...v1.60.0) (2021-07-07)


### Features

* 🎸 Ajoute "Nous écrire" dans le menu ([#496](https://github.com/SocialGouv/1000jours/issues/496)) ([5a8d7a9](https://github.com/SocialGouv/1000jours/commit/5a8d7a9550d340e5c7e7166c846fb3a61a737dc8)), closes [#345](https://github.com/SocialGouv/1000jours/issues/345)
* 🎸 Ajoute le choix du profil dans Matomo ([#495](https://github.com/SocialGouv/1000jours/issues/495)) ([f80a613](https://github.com/SocialGouv/1000jours/commit/f80a61355faddd9ea9f90e985587d448508ed898)), closes [#484](https://github.com/SocialGouv/1000jours/issues/484)

## [1.59.1](https://github.com/SocialGouv/1000jours/compare/v1.59.0...v1.59.1) (2021-07-07)


### Bug Fixes

* 🐛 Corrige le calcul de l'étape courante ([#491](https://github.com/SocialGouv/1000jours/issues/491)) ([343f2a6](https://github.com/SocialGouv/1000jours/commit/343f2a65c1041d3d042aaf4d5aa7e88e120e37cf)), closes [#482](https://github.com/SocialGouv/1000jours/issues/482)

# [1.59.0](https://github.com/SocialGouv/1000jours/compare/v1.58.0...v1.59.0) (2021-07-07)


### Bug Fixes

* **carto:** retours PO et design ([#492](https://github.com/SocialGouv/1000jours/issues/492)) ([ef54da6](https://github.com/SocialGouv/1000jours/commit/ef54da676a15aa97b35d38353031e69dd4a97a23))


### Features

* **articles:** Ajoute l'ordre aux articles pour les trier ([#485](https://github.com/SocialGouv/1000jours/issues/485)) ([9f86627](https://github.com/SocialGouv/1000jours/commit/9f866273d95ffa6c3007ca99d266e47c1c39cc52))
* **carto:** déplacement carte sur POI via liste ([#489](https://github.com/SocialGouv/1000jours/issues/489)) ([e27ff38](https://github.com/SocialGouv/1000jours/commit/e27ff3880e93a6afd198328466692e392c3d13b1))
* **carto:** différenciation marqueurs sélectionnés/désélectionnés ([#483](https://github.com/SocialGouv/1000jours/issues/483)) ([d46ab62](https://github.com/SocialGouv/1000jours/commit/d46ab622a4fe16836739e37d4dcdcc9df3fa7a8f))

# [1.58.0](https://github.com/SocialGouv/1000jours/compare/v1.57.2...v1.58.0) (2021-07-05)


### Features

* **backoffice:** Ajoute un plugin d'export de contenu ([#477](https://github.com/SocialGouv/1000jours/issues/477)) ([b79df9d](https://github.com/SocialGouv/1000jours/commit/b79df9d6af8617f539c9a9869fd0f077d9962804))
* **carto:** centrage de la carte sur le marqueur pour iOS ([#478](https://github.com/SocialGouv/1000jours/issues/478)) ([4b06162](https://github.com/SocialGouv/1000jours/commit/4b0616265f86a37660a13394283a56cc362d9d34))

## [1.57.2](https://github.com/SocialGouv/1000jours/compare/v1.57.1...v1.57.2) (2021-07-05)


### Bug Fixes

* **carto:** cacher le volet lorsqu'aucune adresse n'a été trouvée ([#476](https://github.com/SocialGouv/1000jours/issues/476)) ([3222394](https://github.com/SocialGouv/1000jours/commit/32223946bb49273282c29cd63f5e00245fe501b7))

## [1.57.1](https://github.com/SocialGouv/1000jours/compare/v1.57.0...v1.57.1) (2021-07-04)


### Bug Fixes

* 🐛 Corrige la mise à jour du profil ([#472](https://github.com/SocialGouv/1000jours/issues/472)) ([c6ffcce](https://github.com/SocialGouv/1000jours/commit/c6ffcce17232b53a7d76e13572bfc9e9fa09175a)), closes [#419](https://github.com/SocialGouv/1000jours/issues/419)

# [1.57.0](https://github.com/SocialGouv/1000jours/compare/v1.56.1...v1.57.0) (2021-07-02)


### Features

* **carto:** affichage cartouche et volet ([#470](https://github.com/SocialGouv/1000jours/issues/470)) ([fe2964c](https://github.com/SocialGouv/1000jours/commit/fe2964c07e4c49e77502591b1ca2da9e8964798c))

## [1.56.1](https://github.com/SocialGouv/1000jours/compare/v1.56.0...v1.56.1) (2021-07-02)


### Bug Fixes

* **carto:** correction des interactions dans la liste pour Android ([#468](https://github.com/SocialGouv/1000jours/issues/468)) ([a801ea3](https://github.com/SocialGouv/1000jours/commit/a801ea3f4594ee7c294db028249e9a25c7519988))

# [1.56.0](https://github.com/SocialGouv/1000jours/compare/v1.55.2...v1.56.0) (2021-07-01)


### Features

* **epds:** ajout tracker Matomo ([#465](https://github.com/SocialGouv/1000jours/issues/465)) ([fbd5ca6](https://github.com/SocialGouv/1000jours/commit/fbd5ca66ddf9e4d56263c133f7030df0be81c042))

## [1.55.2](https://github.com/SocialGouv/1000jours/compare/v1.55.1...v1.55.2) (2021-07-01)


### Bug Fixes

* **epds:** ajout d'un client spécifique pour le noCache ([#464](https://github.com/SocialGouv/1000jours/issues/464)) ([979913d](https://github.com/SocialGouv/1000jours/commit/979913d59f86a4a7540dcdad7769fdfd55990bd9))

## [1.55.1](https://github.com/SocialGouv/1000jours/compare/v1.55.0...v1.55.1) (2021-07-01)


### Bug Fixes

* **carto:** loader caché si CP invalide ([#462](https://github.com/SocialGouv/1000jours/issues/462)) ([7f45f9b](https://github.com/SocialGouv/1000jours/commit/7f45f9b65367d2fb668c8efaef93351d975c4b4c))
* **strapi:** Désactive le tracking de données ([#463](https://github.com/SocialGouv/1000jours/issues/463)) ([43eb9e7](https://github.com/SocialGouv/1000jours/commit/43eb9e702aa653b93d6c548cb856094e802f8ce1))

# [1.55.0](https://github.com/SocialGouv/1000jours/compare/v1.54.3...v1.55.0) (2021-06-30)


### Features

* **api:** ingress rate-limit ([#451](https://github.com/SocialGouv/1000jours/issues/451)) ([1fb9765](https://github.com/SocialGouv/1000jours/commit/1fb976540f37f136110f42c2e93993d67a8842ae))

## [1.54.3](https://github.com/SocialGouv/1000jours/compare/v1.54.2...v1.54.3) (2021-06-30)


### Bug Fixes

* **k8s:** allow strapi to go up to 1 CPU ([5c4ff71](https://github.com/SocialGouv/1000jours/commit/5c4ff7196995d7747045b6675e0654629fc7079d))

## [1.54.2](https://github.com/SocialGouv/1000jours/compare/v1.54.1...v1.54.2) (2021-06-30)


### Bug Fixes

* **k8s:** remove pvc on strapi-cache ([#450](https://github.com/SocialGouv/1000jours/issues/450)) ([91416d7](https://github.com/SocialGouv/1000jours/commit/91416d7519b45269bb6e41d5875a918a966c0c72))

## [1.54.1](https://github.com/SocialGouv/1000jours/compare/v1.54.0...v1.54.1) (2021-06-30)


### Bug Fixes

* **k8s:** add hpa in preprod and prod env ([#447](https://github.com/SocialGouv/1000jours/issues/447)) ([a5c5ce9](https://github.com/SocialGouv/1000jours/commit/a5c5ce9e48b971285663b8ed16d7359bb0a5543b))
* **k8s:** change nginx cache folder ([#449](https://github.com/SocialGouv/1000jours/issues/449)) ([57281c8](https://github.com/SocialGouv/1000jours/commit/57281c84998b40fe73bb899ad3b2d20bc8a2ab85))

# [1.54.0](https://github.com/SocialGouv/1000jours/compare/v1.53.2...v1.54.0) (2021-06-30)


### Features

* **cache:** Ajoute un proxy cache pour l'API et les images ([#433](https://github.com/SocialGouv/1000jours/issues/433)) ([a1323dd](https://github.com/SocialGouv/1000jours/commit/a1323ddb5d7060172a0767a9bd737aad3cab8849))

## [1.53.2](https://github.com/SocialGouv/1000jours/compare/v1.53.1...v1.53.2) (2021-06-30)


### Bug Fixes

* 🐛 Corrige un crash lors d'un rapport d'erreur ([#445](https://github.com/SocialGouv/1000jours/issues/445)) ([cea1a21](https://github.com/SocialGouv/1000jours/commit/cea1a21c9502d3db6b1e79fca29f029db061a502))

## [1.53.1](https://github.com/SocialGouv/1000jours/compare/v1.53.0...v1.53.1) (2021-06-30)


### Bug Fixes

* **epds:** corrections bugs d'affichage ([#444](https://github.com/SocialGouv/1000jours/issues/444)) ([39cc6e3](https://github.com/SocialGouv/1000jours/commit/39cc6e3b366690e9ef66c1da31683f25d140ddb6))

# [1.53.0](https://github.com/SocialGouv/1000jours/compare/v1.52.4...v1.53.0) (2021-06-30)


### Bug Fixes

* **epds:** modifications du texte de l'onboarding et des résultats ([#442](https://github.com/SocialGouv/1000jours/issues/442)) ([99fd110](https://github.com/SocialGouv/1000jours/commit/99fd1109b9a6f304ce0f1f30288e6d83ed7b5145))
* 🐛 Corrige des ajustements graphique ([#439](https://github.com/SocialGouv/1000jours/issues/439)) ([06709b1](https://github.com/SocialGouv/1000jours/commit/06709b1943b7e90cbe31d44d45ec1e0d1b21d409))


### Features

* 🎸 Ajoute le numéro de version de l'app dans le menu ([#441](https://github.com/SocialGouv/1000jours/issues/441)) ([8a2894d](https://github.com/SocialGouv/1000jours/commit/8a2894d44a077deda292cf3ea3e5f5047c0d901c))
* 🎸 Corrige le profil (checkbox non sauvegardé) ([#440](https://github.com/SocialGouv/1000jours/issues/440)) ([1578b6f](https://github.com/SocialGouv/1000jours/commit/1578b6fe094f47adc84657c6db09f1a0c651e8e8)), closes [#419](https://github.com/SocialGouv/1000jours/issues/419)

## [1.52.4](https://github.com/SocialGouv/1000jours/compare/v1.52.3...v1.52.4) (2021-06-30)


### Bug Fixes

* **articles:** Corrige les urls des images dans le corps des textes ([#436](https://github.com/SocialGouv/1000jours/issues/436)) ([dc6af16](https://github.com/SocialGouv/1000jours/commit/dc6af16920f79fbf75da10f957b1f8fabf59ef34))

## [1.52.3](https://github.com/SocialGouv/1000jours/compare/v1.52.2...v1.52.3) (2021-06-29)


### Bug Fixes

* 🐛 Corrige l'optimisation des images des articles ([#434](https://github.com/SocialGouv/1000jours/issues/434)) ([b9b4af5](https://github.com/SocialGouv/1000jours/commit/b9b4af5300b64d2ebd453f3176af07e639217b57))
* **articles:** Corrige les urls des formats d'image ([#431](https://github.com/SocialGouv/1000jours/issues/431)) ([6e8fada](https://github.com/SocialGouv/1000jours/commit/6e8fada95399731dc6c2d8a528bceb9060ec2e5b))
* **epds:** modification des textes du questionnaire ([#432](https://github.com/SocialGouv/1000jours/issues/432)) ([665c1e0](https://github.com/SocialGouv/1000jours/commit/665c1e0b1a5789e99f5a2d521dbc6a3053464000))

## [1.52.2](https://github.com/SocialGouv/1000jours/compare/v1.52.1...v1.52.2) (2021-06-29)


### Bug Fixes

* **epds:** score et intro commentés dans les résultats ([#428](https://github.com/SocialGouv/1000jours/issues/428)) ([02131bb](https://github.com/SocialGouv/1000jours/commit/02131bb6bd3ad4978413ffdc00917f9456277eb1))

## [1.52.1](https://github.com/SocialGouv/1000jours/compare/v1.52.0...v1.52.1) (2021-06-29)


### Bug Fixes

* 🐛 Ajoute la permission de recevoir les notifications ([#424](https://github.com/SocialGouv/1000jours/issues/424)) ([3ae4157](https://github.com/SocialGouv/1000jours/commit/3ae415755066b7f3a84ccc2ac0aad1da7a7a0780))

# [1.52.0](https://github.com/SocialGouv/1000jours/compare/v1.51.1...v1.52.0) (2021-06-29)


### Features

* **carto:** enregistrement de la dernière Region ([#423](https://github.com/SocialGouv/1000jours/issues/423)) ([f384ab6](https://github.com/SocialGouv/1000jours/commit/f384ab6273396a2e6a4c3d87cf09cb8c7044d283))

## [1.51.1](https://github.com/SocialGouv/1000jours/compare/v1.51.0...v1.51.1) (2021-06-29)


### Bug Fixes

* 🐛 Corrige les retours designs (socle) ([#422](https://github.com/SocialGouv/1000jours/issues/422)) ([9d1a635](https://github.com/SocialGouv/1000jours/commit/9d1a635e83590f3ce8c57e849a5675072cf74944))

# [1.51.0](https://github.com/SocialGouv/1000jours/compare/v1.50.1...v1.51.0) (2021-06-29)


### Bug Fixes

* **carto:** refactos sur le tri et corrections sur le filtre et l'affichage EPDS ([#420](https://github.com/SocialGouv/1000jours/issues/420)) ([7028e7c](https://github.com/SocialGouv/1000jours/commit/7028e7cccdedca204f6a35a1f7a4e34c094b9864))


### Features

* **carto:** ajout du loader lors de la recherche par CP ([#421](https://github.com/SocialGouv/1000jours/issues/421)) ([d138509](https://github.com/SocialGouv/1000jours/commit/d138509780a744506a0e98b2747ece9adbab5653))

## [1.50.1](https://github.com/SocialGouv/1000jours/compare/v1.50.0...v1.50.1) (2021-06-29)


### Bug Fixes

* **articles:** Initialise les champs textes vides par défaut ([#418](https://github.com/SocialGouv/1000jours/issues/418)) ([51e6fbc](https://github.com/SocialGouv/1000jours/commit/51e6fbc54a8f733235ea9b90e0f887d722066834))

# [1.50.0](https://github.com/SocialGouv/1000jours/compare/v1.49.0...v1.50.0) (2021-06-29)


### Features

* **k8s:** Ajoute la variable SENTRY_DSN dans l'environnement ([#417](https://github.com/SocialGouv/1000jours/issues/417)) ([e6712c1](https://github.com/SocialGouv/1000jours/commit/e6712c1269ab47c1efa4fccd65f1efcb71ca7270)), closes [#23](https://github.com/SocialGouv/1000jours/issues/23)

# [1.49.0](https://github.com/SocialGouv/1000jours/compare/v1.48.1...v1.49.0) (2021-06-29)


### Bug Fixes

* **carto:** correction des bugs sur la carto ([#414](https://github.com/SocialGouv/1000jours/issues/414)) ([478d0f5](https://github.com/SocialGouv/1000jours/commit/478d0f51f2c010f7150267f4bdc549a71426fa3a))


### Features

* **carto:** ajout du loader sur la carto ([#413](https://github.com/SocialGouv/1000jours/issues/413)) ([d57931e](https://github.com/SocialGouv/1000jours/commit/d57931ef6eee271371a6285e621e33ffb6dc7ca9))

## [1.48.1](https://github.com/SocialGouv/1000jours/compare/v1.48.0...v1.48.1) (2021-06-28)


### Bug Fixes

* **carto:** Corrige les POIs dupliqués s'il y a plusieurs étapes dans les filtres ([#411](https://github.com/SocialGouv/1000jours/issues/411)) ([90d9079](https://github.com/SocialGouv/1000jours/commit/90d907951743aec3f79d4f23b82f357e5a241492))

# [1.48.0](https://github.com/SocialGouv/1000jours/compare/v1.47.0...v1.48.0) (2021-06-28)


### Features

* **carto:** ajout des étapes dans le filtre + branchement avec l'étape en cours ([#408](https://github.com/SocialGouv/1000jours/issues/408)) ([5f21807](https://github.com/SocialGouv/1000jours/commit/5f21807fbeef558e9e960d318270644e45f9a8b8))

# [1.47.0](https://github.com/SocialGouv/1000jours/compare/v1.46.9...v1.47.0) (2021-06-28)


### Bug Fixes

* 🐛 Corrige un problème d'affichage (EPDS sur petit écran) ([#407](https://github.com/SocialGouv/1000jours/issues/407)) ([37a9aa8](https://github.com/SocialGouv/1000jours/commit/37a9aa84513d11c1ff2fa3c686f0e1eec50add8e))


### Features

* 🎸 Ajoute un loader lors des appels WS ([#409](https://github.com/SocialGouv/1000jours/issues/409)) ([637d946](https://github.com/SocialGouv/1000jours/commit/637d94675cd7d08f2daa56738f21401d29e3d459))

## [1.46.9](https://github.com/SocialGouv/1000jours/compare/v1.46.8...v1.46.9) (2021-06-28)


### Bug Fixes

* 🐛 Corrige des retours design et accessibilité ([#406](https://github.com/SocialGouv/1000jours/issues/406)) ([583ab19](https://github.com/SocialGouv/1000jours/commit/583ab192f949b3535a4a184df4c998fd1c61a832)), closes [#367](https://github.com/SocialGouv/1000jours/issues/367) [#325](https://github.com/SocialGouv/1000jours/issues/325) [#312](https://github.com/SocialGouv/1000jours/issues/312) [#313](https://github.com/SocialGouv/1000jours/issues/313) [#314](https://github.com/SocialGouv/1000jours/issues/314) [#282](https://github.com/SocialGouv/1000jours/issues/282)

## [1.46.8](https://github.com/SocialGouv/1000jours/compare/v1.46.7...v1.46.8) (2021-06-28)


### Bug Fixes

* **epds:** restart survey fix + design review ([#405](https://github.com/SocialGouv/1000jours/issues/405)) ([8f5c79d](https://github.com/SocialGouv/1000jours/commit/8f5c79d68e9a9e01aafc852606ab8ebbe5a3d81e))

## [1.46.7](https://github.com/SocialGouv/1000jours/compare/v1.46.6...v1.46.7) (2021-06-28)


### Bug Fixes

* **carto:** filtre obligatoire + pagination locale ([#404](https://github.com/SocialGouv/1000jours/issues/404)) ([5731d39](https://github.com/SocialGouv/1000jours/commit/5731d39b194f64914a6791b407558ff8bdcac3ad))

## [1.46.6](https://github.com/SocialGouv/1000jours/compare/v1.46.5...v1.46.6) (2021-06-28)


### Bug Fixes

* 🐛 Modifie certains textes (Nos 1000 jours + calendrier) ([#400](https://github.com/SocialGouv/1000jours/issues/400)) ([dec79c2](https://github.com/SocialGouv/1000jours/commit/dec79c24c64a8e493b574a9218cf9b1453ce9415)), closes [#342](https://github.com/SocialGouv/1000jours/issues/342)

## [1.46.5](https://github.com/SocialGouv/1000jours/compare/v1.46.4...v1.46.5) (2021-06-27)


### Bug Fixes

* **deps:** update all dependencies ([#402](https://github.com/SocialGouv/1000jours/issues/402)) ([f577b8d](https://github.com/SocialGouv/1000jours/commit/f577b8de9cdf0dc74ebb74398af10055d12d9968))

## [1.46.4](https://github.com/SocialGouv/1000jours/compare/v1.46.3...v1.46.4) (2021-06-27)


### Bug Fixes

* **k8s:** use shared azure volume ([#370](https://github.com/SocialGouv/1000jours/issues/370)) ([e58181b](https://github.com/SocialGouv/1000jours/commit/e58181bc4f726bad826b2d3d2ee4f4a43e50006e))

## [1.46.3](https://github.com/SocialGouv/1000jours/compare/v1.46.2...v1.46.3) (2021-06-25)


### Bug Fixes

* **labels:** modifications labels epds et carto ([#398](https://github.com/SocialGouv/1000jours/issues/398)) ([d05a419](https://github.com/SocialGouv/1000jours/commit/d05a419d2a8d2f9fc3977da04ec73f9b741d920c))

## [1.46.2](https://github.com/SocialGouv/1000jours/compare/v1.46.1...v1.46.2) (2021-06-25)


### Bug Fixes

* **android:** ajout l'apiKey pour Google Maps ([#390](https://github.com/SocialGouv/1000jours/issues/390)) ([5529599](https://github.com/SocialGouv/1000jours/commit/55295993656eaf0ba30bf2d3b2269290742a9881))
* 🐛 Supprime la page LoadingScreen du StackNavigatior ([#386](https://github.com/SocialGouv/1000jours/issues/386)) ([e7b7377](https://github.com/SocialGouv/1000jours/commit/e7b7377156356379748c2173f36749c9ad86fdcb))
* **carto:** corrections de bugs sur la carto et l'EPDS ([#387](https://github.com/SocialGouv/1000jours/issues/387)) ([c320da1](https://github.com/SocialGouv/1000jours/commit/c320da173ff1eb12328ef72114e2d7e9aea4191f))

## [1.46.1](https://github.com/SocialGouv/1000jours/compare/v1.46.0...v1.46.1) (2021-06-24)


### Bug Fixes

* 🐛 Remplace les messages d'erreurs par un composant ([#382](https://github.com/SocialGouv/1000jours/issues/382)) ([54c4d01](https://github.com/SocialGouv/1000jours/commit/54c4d014048baa7ad2e285ee2cc4ef7b8c9a65bb))
* **epds:** review design ([#385](https://github.com/SocialGouv/1000jours/issues/385)) ([30278e7](https://github.com/SocialGouv/1000jours/commit/30278e71e677ecd3acacd603e470c09f40d43a0c))

# [1.46.0](https://github.com/SocialGouv/1000jours/compare/v1.45.2...v1.46.0) (2021-06-24)


### Features

* **carto:** Ajoute le filtre de POIs par étapes dans l'API ([#381](https://github.com/SocialGouv/1000jours/issues/381)) ([a383a2b](https://github.com/SocialGouv/1000jours/commit/a383a2b0e8371785d487388566d10962047205b6))

## [1.45.2](https://github.com/SocialGouv/1000jours/compare/v1.45.1...v1.45.2) (2021-06-24)


### Bug Fixes

* **carto:** Traite les fichiers .txt comme des csv ([#373](https://github.com/SocialGouv/1000jours/issues/373)) ([03d6bb3](https://github.com/SocialGouv/1000jours/commit/03d6bb36a17f39d41b84e8a3e4eb10bd58c54562))

## [1.45.1](https://github.com/SocialGouv/1000jours/compare/v1.45.0...v1.45.1) (2021-06-24)


### Bug Fixes

* **k8s:** Augmente la limite de taille des fichiers téléchargés vers le backoffice ([#372](https://github.com/SocialGouv/1000jours/issues/372)) ([479983d](https://github.com/SocialGouv/1000jours/commit/479983d4dd7f5329de526f1e3d53db0c19292be6))

# [1.45.0](https://github.com/SocialGouv/1000jours/compare/v1.44.0...v1.45.0) (2021-06-24)


### Features

* **carto:** filtre pour les POI ([#369](https://github.com/SocialGouv/1000jours/issues/369)) ([c21aebc](https://github.com/SocialGouv/1000jours/commit/c21aebc035390f6148ae56f40ac1bdf88d0267dd))

# [1.44.0](https://github.com/SocialGouv/1000jours/compare/v1.43.0...v1.44.0) (2021-06-23)


### Features

* **carto:** Supprime les POIs lorsqu'on supprime les sources et améliore les performances du geocoding ([#346](https://github.com/SocialGouv/1000jours/issues/346)) ([06ba1eb](https://github.com/SocialGouv/1000jours/commit/06ba1eb2b64bbf9a21440d618ddab58831263900))

# [1.43.0](https://github.com/SocialGouv/1000jours/compare/v1.42.1...v1.43.0) (2021-06-23)


### Features

* 🎸 Ajoute les notifications changement d'étapes ([#358](https://github.com/SocialGouv/1000jours/issues/358)) ([a3b53e4](https://github.com/SocialGouv/1000jours/commit/a3b53e43686972aa886fc484f75b0363160c4b11)), closes [#309](https://github.com/SocialGouv/1000jours/issues/309)

## [1.42.1](https://github.com/SocialGouv/1000jours/compare/v1.42.0...v1.42.1) (2021-06-23)


### Bug Fixes

* 🐛 Corrige la condition sur CLEAR_STORAGE (var Env) ([#362](https://github.com/SocialGouv/1000jours/issues/362)) ([fd0daa9](https://github.com/SocialGouv/1000jours/commit/fd0daa9bf662e2d8158ac66bf19341b874d0afcb))
* 🐛 Corrige le document des cgu ([#359](https://github.com/SocialGouv/1000jours/issues/359)) ([f907a4c](https://github.com/SocialGouv/1000jours/commit/f907a4c1fb537bc3da534ecc892ebe24d597da10)), closes [#235](https://github.com/SocialGouv/1000jours/issues/235)
* 🐛 Corrige un problème d'import (require cycle) ([#360](https://github.com/SocialGouv/1000jours/issues/360)) ([4bb7905](https://github.com/SocialGouv/1000jours/commit/4bb7905904b5fb90e4fdfb3e52ec9728052a0951))

# [1.42.0](https://github.com/SocialGouv/1000jours/compare/v1.41.2...v1.42.0) (2021-06-22)


### Bug Fixes

* **epds:** review design ([#357](https://github.com/SocialGouv/1000jours/issues/357)) ([21fd16b](https://github.com/SocialGouv/1000jours/commit/21fd16b79cf722401a2790f0eba0bbff7480f0d7))


### Features

* **carto:** Ajoute les paramètres de recherche de POI par types et thématiques ([#355](https://github.com/SocialGouv/1000jours/issues/355)) ([d31eff6](https://github.com/SocialGouv/1000jours/commit/d31eff6bab499563dd9efe85ce30e4de013c0df2)), closes [#354](https://github.com/SocialGouv/1000jours/issues/354)

## [1.41.2](https://github.com/SocialGouv/1000jours/compare/v1.41.1...v1.41.2) (2021-06-21)


### Bug Fixes

* **deps:** update all dependencies ([#352](https://github.com/SocialGouv/1000jours/issues/352)) ([2b7d6dc](https://github.com/SocialGouv/1000jours/commit/2b7d6dc7a02863f2f97b1fd8ac2fc39efafb34ed))

## [1.41.1](https://github.com/SocialGouv/1000jours/compare/v1.41.0...v1.41.1) (2021-06-21)


### Bug Fixes

* **epds:** fix double titles and margins ([#353](https://github.com/SocialGouv/1000jours/issues/353)) ([ea2c98d](https://github.com/SocialGouv/1000jours/commit/ea2c98ddbe10565222d0d13c2fbbb229b718a25c))

# [1.41.0](https://github.com/SocialGouv/1000jours/compare/v1.40.3...v1.41.0) (2021-06-18)


### Features

* **epds:** onboarding screen ([#350](https://github.com/SocialGouv/1000jours/issues/350)) ([fe3da66](https://github.com/SocialGouv/1000jours/commit/fe3da6647aef9a9b35d26fa9a604b89561c14bab))
* **epds:** restart button ([#351](https://github.com/SocialGouv/1000jours/issues/351)) ([dc12eaa](https://github.com/SocialGouv/1000jours/commit/dc12eaac9d3f9a7be84d246606e63e1362a49911))

## [1.40.3](https://github.com/SocialGouv/1000jours/compare/v1.40.2...v1.40.3) (2021-06-18)


### Bug Fixes

* **epds:** design + tech review ([#348](https://github.com/SocialGouv/1000jours/issues/348)) ([8733234](https://github.com/SocialGouv/1000jours/commit/8733234f5fc89bf022b57ba8a91bde6d1bf79956))

## [1.40.2](https://github.com/SocialGouv/1000jours/compare/v1.40.1...v1.40.2) (2021-06-17)


### Bug Fixes

* **epds:** fix bouton Accueil ([#334](https://github.com/SocialGouv/1000jours/issues/334)) ([7c155b3](https://github.com/SocialGouv/1000jours/commit/7c155b35960823cbea6ca1236cba0aff202f1c5e))

## [1.40.1](https://github.com/SocialGouv/1000jours/compare/v1.40.0...v1.40.1) (2021-06-17)


### Bug Fixes

* **epds:** review design ([#332](https://github.com/SocialGouv/1000jours/issues/332)) ([7ba6274](https://github.com/SocialGouv/1000jours/commit/7ba6274db1c0d54b3c5c81232d692c811efd6f2f))

# [1.40.0](https://github.com/SocialGouv/1000jours/compare/v1.39.1...v1.40.0) (2021-06-16)


### Bug Fixes

* **carto:** rename customSnackbar file ([fc0d269](https://github.com/SocialGouv/1000jours/commit/fc0d26962d6f861e4a387a573ff3ad812d5c009f))
* **carto:** review design ([#327](https://github.com/SocialGouv/1000jours/issues/327)) ([0d51357](https://github.com/SocialGouv/1000jours/commit/0d51357d5d6f71cdd5477b5191b17938f9c53294))
* **deps:** update all dependencies ([#301](https://github.com/SocialGouv/1000jours/issues/301)) ([72dbbae](https://github.com/SocialGouv/1000jours/commit/72dbbaee790df22197ecb060ac4cebe2286e0f31))
* **deps:** update dependency socialgouv/gitlab-ci-yml to v23 ([#318](https://github.com/SocialGouv/1000jours/issues/318)) ([8d601c9](https://github.com/SocialGouv/1000jours/commit/8d601c92d236e99e737422849f5abe3aff42debc))


### Features

* 🎸 Ajoute un titre au dessus des liens (article) ([#316](https://github.com/SocialGouv/1000jours/issues/316)) ([b8c7ffe](https://github.com/SocialGouv/1000jours/commit/b8c7ffe6c0170d7d7982611108cb6f750e521408)), closes [#294](https://github.com/SocialGouv/1000jours/issues/294)

## [1.39.1](https://github.com/SocialGouv/1000jours/compare/v1.39.0...v1.39.1) (2021-06-15)


### Bug Fixes

* **epds:** fix décoche case questionnaire ([#311](https://github.com/SocialGouv/1000jours/issues/311)) ([af5c64e](https://github.com/SocialGouv/1000jours/commit/af5c64ed46915c8f1dc6b29b1002dce34264d449))

# [1.39.0](https://github.com/SocialGouv/1000jours/compare/v1.38.3...v1.39.0) (2021-06-14)


### Features

* **carto:** Ajoute des descriptions pour les types de POIs et les sources de données ([#305](https://github.com/SocialGouv/1000jours/issues/305)) ([14e2246](https://github.com/SocialGouv/1000jours/commit/14e2246ac60ff2b51ffd1cf36be7161cd548c102))

## [1.38.3](https://github.com/SocialGouv/1000jours/compare/v1.38.2...v1.38.3) (2021-06-14)


### Bug Fixes

* **carto:** correction affichage type ([#306](https://github.com/SocialGouv/1000jours/issues/306)) ([f0ee742](https://github.com/SocialGouv/1000jours/commit/f0ee7426a8ceca70ffa7bb58681d2923d9121f4a))

## [1.38.2](https://github.com/SocialGouv/1000jours/compare/v1.38.1...v1.38.2) (2021-06-14)


### Bug Fixes

* **carto:** recherche par CP automatique ([#304](https://github.com/SocialGouv/1000jours/issues/304)) ([29ea646](https://github.com/SocialGouv/1000jours/commit/29ea646b3f6b06f0274887aa18f067d23a586725))

## [1.38.1](https://github.com/SocialGouv/1000jours/compare/v1.38.0...v1.38.1) (2021-06-14)


### Bug Fixes

* **carto:** Corrige la requête pour les points à l'ouest du méridien de Greenwitch ([#302](https://github.com/SocialGouv/1000jours/issues/302)) ([50fdefb](https://github.com/SocialGouv/1000jours/commit/50fdefbb4c78e786ae34983af85f952dc87a7409))

# [1.38.0](https://github.com/SocialGouv/1000jours/compare/v1.37.0...v1.38.0) (2021-06-11)


### Features

* 🎸 Ajoute les animations (Menu, card article, article) ([#299](https://github.com/SocialGouv/1000jours/issues/299)) ([9d0a908](https://github.com/SocialGouv/1000jours/commit/9d0a90874215a98572a264e50b6b0d002224a8ba)), closes [#283](https://github.com/SocialGouv/1000jours/issues/283)

# [1.37.0](https://github.com/SocialGouv/1000jours/compare/v1.36.3...v1.37.0) (2021-06-11)


### Features

* **carto:** Ajoute l'import de données sources dans le backoffice ([#261](https://github.com/SocialGouv/1000jours/issues/261)) ([84aa87e](https://github.com/SocialGouv/1000jours/commit/84aa87efa8199eef9684ef1a59aa96c579895b80))

## [1.36.3](https://github.com/SocialGouv/1000jours/compare/v1.36.2...v1.36.3) (2021-06-11)


### Bug Fixes

* Ci ([#297](https://github.com/SocialGouv/1000jours/issues/297)) ([210c528](https://github.com/SocialGouv/1000jours/commit/210c5287aa3b3c81e1cd7d42e7d748f0a21914ca))

## [1.36.2](https://github.com/SocialGouv/1000jours/compare/v1.36.1...v1.36.2) (2021-06-10)


### Bug Fixes

* 🐛 Corrige la version des packages incompatible (expo) ([#284](https://github.com/SocialGouv/1000jours/issues/284)) ([f741b4d](https://github.com/SocialGouv/1000jours/commit/f741b4de106d48bca750cc5d9b0163f09da90e01))

## [1.36.1](https://github.com/SocialGouv/1000jours/compare/v1.36.0...v1.36.1) (2021-06-10)


### Bug Fixes

* 🐛 Corrige l'affichage des vidéos dans la fiche article ([#276](https://github.com/SocialGouv/1000jours/issues/276)) ([be7bdbc](https://github.com/SocialGouv/1000jours/commit/be7bdbc882d8a187f63af719611cab1d81fa7734)), closes [#275](https://github.com/SocialGouv/1000jours/issues/275)

# [1.36.0](https://github.com/SocialGouv/1000jours/compare/v1.35.2...v1.36.0) (2021-06-08)


### Features

* 🎸 Ajoute le nouveau logo ([#269](https://github.com/SocialGouv/1000jours/issues/269)) ([d9e5a99](https://github.com/SocialGouv/1000jours/commit/d9e5a991c70aadfe31d8f62005e85e73b4c98383))

## [1.35.2](https://github.com/SocialGouv/1000jours/compare/v1.35.1...v1.35.2) (2021-06-07)


### Bug Fixes

* corrige les workflows de prod ([#250](https://github.com/SocialGouv/1000jours/issues/250)) ([2a57635](https://github.com/SocialGouv/1000jours/commit/2a576359658ad9432875ab2fb7a0378e96bd4def))

## [1.35.1](https://github.com/SocialGouv/1000jours/compare/v1.35.0...v1.35.1) (2021-06-07)


### Bug Fixes

* 🐛 Corrige les retours design sur la liste articles ([#268](https://github.com/SocialGouv/1000jours/issues/268)) ([b8d16fa](https://github.com/SocialGouv/1000jours/commit/b8d16fa2df66f5753b3390e399f3ee980f427afc)), closes [#26](https://github.com/SocialGouv/1000jours/issues/26) [#226](https://github.com/SocialGouv/1000jours/issues/226)

# [1.35.0](https://github.com/SocialGouv/1000jours/compare/v1.34.0...v1.35.0) (2021-06-07)


### Features

* **epds:** liens PDF + refacto ([#267](https://github.com/SocialGouv/1000jours/issues/267)) ([622f046](https://github.com/SocialGouv/1000jours/commit/622f0464673a2f0a3a9dec8c6397b49052b4b028))

# [1.34.0](https://github.com/SocialGouv/1000jours/compare/v1.33.0...v1.34.0) (2021-06-04)


### Features

* 🎸 Ajoute le calendrier en mode liste par défaut ([#253](https://github.com/SocialGouv/1000jours/issues/253)) ([305a27c](https://github.com/SocialGouv/1000jours/commit/305a27ce0c73b642dc9b53593e1fbb5d30fb75b5)), closes [#245](https://github.com/SocialGouv/1000jours/issues/245)
* met à jour les icones de la tabbar ([#252](https://github.com/SocialGouv/1000jours/issues/252)) ([d58b7a3](https://github.com/SocialGouv/1000jours/commit/d58b7a39ce8606905bec38ab07b2389e7658634e))

# [1.33.0](https://github.com/SocialGouv/1000jours/compare/v1.32.1...v1.33.0) (2021-05-31)


### Features

* **carto:** Ajoute le géocoding des adresses de points d'intérêt ([#243](https://github.com/SocialGouv/1000jours/issues/243)) refs [#219](https://github.com/SocialGouv/1000jours/issues/219) ([e19233e](https://github.com/SocialGouv/1000jours/commit/e19233eda47e968997f9e407c4a1d2b12e57c926))

## [1.32.1](https://github.com/SocialGouv/1000jours/compare/v1.32.0...v1.32.1) (2021-05-31)


### Bug Fixes

* **carto:** Corrige les liens de base de données vers les POIs ([#242](https://github.com/SocialGouv/1000jours/issues/242)) ([0199e44](https://github.com/SocialGouv/1000jours/commit/0199e44a146e8d363b3887d3e66d404b0c6ceda4))

# [1.32.0](https://github.com/SocialGouv/1000jours/compare/v1.31.0...v1.32.0) (2021-05-31)


### Features

* **carto:** Ajoute les POIs dans le backoffice ([#241](https://github.com/SocialGouv/1000jours/issues/241)) refs [#219](https://github.com/SocialGouv/1000jours/issues/219) ([f03ce7b](https://github.com/SocialGouv/1000jours/commit/f03ce7b8cb09f4c748fa109b79b71fb1d8c2d4e4))

# [1.31.0](https://github.com/SocialGouv/1000jours/compare/v1.30.1...v1.31.0) (2021-05-27)


### Bug Fixes

* **ci:** upgrade deps ([#234](https://github.com/SocialGouv/1000jours/issues/234)) ([bca8edc](https://github.com/SocialGouv/1000jours/commit/bca8edca3fc79caaa8eef2e75d77642a6900499d))


### Features

* 🎸 Affiche ma situation sur la timeline ([#231](https://github.com/SocialGouv/1000jours/issues/231)) ([e9363ea](https://github.com/SocialGouv/1000jours/commit/e9363ea9c38cf48e21fb6acc6012a84261e9b9f1)), closes [#30](https://github.com/SocialGouv/1000jours/issues/30) [#30](https://github.com/SocialGouv/1000jours/issues/30)

## [1.30.1](https://github.com/SocialGouv/1000jours/compare/v1.30.0...v1.30.1) (2021-05-26)


### Bug Fixes

* 🐛 Corrige l'affichage des filtres ([#232](https://github.com/SocialGouv/1000jours/issues/232)) ([b6b39f8](https://github.com/SocialGouv/1000jours/commit/b6b39f83eee52f8dcfcbf2e2c03256341cc4a18c))

# [1.30.0](https://github.com/SocialGouv/1000jours/compare/v1.29.0...v1.30.0) (2021-05-25)


### Features

* 🎸 Ajoute le menu ainsi que les CGU et Mentions Légales ([#226](https://github.com/SocialGouv/1000jours/issues/226)) ([ab7e0ae](https://github.com/SocialGouv/1000jours/commit/ab7e0ae45a4ddb00d1abe86362a349aba678c7ca)), closes [#214](https://github.com/SocialGouv/1000jours/issues/214) [#29](https://github.com/SocialGouv/1000jours/issues/29)

# [1.29.0](https://github.com/SocialGouv/1000jours/compare/v1.28.0...v1.29.0) (2021-05-25)


### Features

* **carto:** afficher carte et recherche CP ([#227](https://github.com/SocialGouv/1000jours/issues/227)) ([4a9d5db](https://github.com/SocialGouv/1000jours/commit/4a9d5db6c0b84b582a6db3df3881acfb421fd497))
* **matomo:** ajoute le tracking avec Matomo ([#225](https://github.com/SocialGouv/1000jours/issues/225)) ([9590b9f](https://github.com/SocialGouv/1000jours/commit/9590b9f0693c5090972d5582462f621b0f04c7e1))

# [1.28.0](https://github.com/SocialGouv/1000jours/compare/v1.27.1...v1.28.0) (2021-05-20)


### Features

* **evenements:** ajout des thématiques dans le backoffice ([#224](https://github.com/SocialGouv/1000jours/issues/224)) ([d3943ee](https://github.com/SocialGouv/1000jours/commit/d3943eead69948c5a3a2ce9358338e6f92a627f7))

## [1.27.1](https://github.com/SocialGouv/1000jours/compare/v1.27.0...v1.27.1) (2021-05-20)


### Bug Fixes

* 🐛 Corrige l'erreur avec la description de l'étape à null ([#222](https://github.com/SocialGouv/1000jours/issues/222)) ([0c66b3f](https://github.com/SocialGouv/1000jours/commit/0c66b3f93d9d08ea429c3e284c2f1dfc1b0dfdab))

# [1.27.0](https://github.com/SocialGouv/1000jours/compare/v1.26.1...v1.27.0) (2021-05-20)


### Features

* **dpp:** ajout resultats epds + refacto ([#221](https://github.com/SocialGouv/1000jours/issues/221)) ([7017766](https://github.com/SocialGouv/1000jours/commit/7017766ab669a54fae8971f1db9f97b35c41a7cf))

## [1.26.1](https://github.com/SocialGouv/1000jours/compare/v1.26.0...v1.26.1) (2021-05-19)


### Bug Fixes

* **articles:** fix condition description ([#217](https://github.com/SocialGouv/1000jours/issues/217)) ([828d91b](https://github.com/SocialGouv/1000jours/commit/828d91b3743d568db747daeff45ed35c00ab7515))

# [1.26.0](https://github.com/SocialGouv/1000jours/compare/v1.25.0...v1.26.0) (2021-05-19)


### Features

* 🎸 Ajoute les filtres articles (thematiques) ([#215](https://github.com/SocialGouv/1000jours/issues/215)) ([b20a331](https://github.com/SocialGouv/1000jours/commit/b20a331e238ac8153ef882d69dba1b78ecf2f78a)), closes [#27](https://github.com/SocialGouv/1000jours/issues/27)

# [1.25.0](https://github.com/SocialGouv/1000jours/compare/v1.24.0...v1.25.0) (2021-05-18)


### Features

* **deploiement:** met à jour l'icone de l'application et le numéro de version ([44eaeb9](https://github.com/SocialGouv/1000jours/commit/44eaeb94966aa814f403bbaf100c35053965d882))

# [1.24.0](https://github.com/SocialGouv/1000jours/compare/v1.23.4...v1.24.0) (2021-05-17)


### Features

* 🎸 Permet d'afficher les événements sous forme de liste ([#209](https://github.com/SocialGouv/1000jours/issues/209)) ([c6fb1ac](https://github.com/SocialGouv/1000jours/commit/c6fb1ac398784dd9be7b5e36e9e4ab56e3438cce))

## [1.23.4](https://github.com/SocialGouv/1000jours/compare/v1.23.3...v1.23.4) (2021-05-12)


### Bug Fixes

* 🐛 Corrige les retours design sur la page "Profile" ([#204](https://github.com/SocialGouv/1000jours/issues/204)) ([f5ccfea](https://github.com/SocialGouv/1000jours/commit/f5ccfeaab1cb3f258eded979591a6417a1a8128e)), closes [#10](https://github.com/SocialGouv/1000jours/issues/10)

## [1.23.3](https://github.com/SocialGouv/1000jours/compare/v1.23.2...v1.23.3) (2021-05-11)


### Bug Fixes

* 🐛 Corrige les retours design liés aux articles ([#203](https://github.com/SocialGouv/1000jours/issues/203)) ([10c7eb0](https://github.com/SocialGouv/1000jours/commit/10c7eb092763a2a3bd6864185b4e3deecb292f16)), closes [#26](https://github.com/SocialGouv/1000jours/issues/26) [#28](https://github.com/SocialGouv/1000jours/issues/28) [#102](https://github.com/SocialGouv/1000jours/issues/102)

## [1.23.2](https://github.com/SocialGouv/1000jours/compare/v1.23.1...v1.23.2) (2021-05-11)


### Bug Fixes

* **cycles:** fix circular dependencies ([#199](https://github.com/SocialGouv/1000jours/issues/199)) ([5aeb742](https://github.com/SocialGouv/1000jours/commit/5aeb74286bc2def321ba91fd40e5e406b9f757e6))

## [1.23.1](https://github.com/SocialGouv/1000jours/compare/v1.23.0...v1.23.1) (2021-05-11)


### Bug Fixes

* 🐛 Corrige les retours design sur l'Onboarding ([#200](https://github.com/SocialGouv/1000jours/issues/200)) ([cb5206a](https://github.com/SocialGouv/1000jours/commit/cb5206a3c5c4ba4d0aa31a6525fda39a2b19cc2c)), closes [#7](https://github.com/SocialGouv/1000jours/issues/7)

# [1.23.0](https://github.com/SocialGouv/1000jours/compare/v1.22.0...v1.23.0) (2021-05-10)


### Features

* 🎸 Ajoute la nouvelle version du datePicker ([#195](https://github.com/SocialGouv/1000jours/issues/195)) ([79c8ee2](https://github.com/SocialGouv/1000jours/commit/79c8ee293da528be927f2daf1550d950b70bc7d0)), closes [#159](https://github.com/SocialGouv/1000jours/issues/159)

# [1.22.0](https://github.com/SocialGouv/1000jours/compare/v1.21.0...v1.22.0) (2021-05-07)


### Features

* **logo:** met à jour le logo de l'application partout ([#196](https://github.com/SocialGouv/1000jours/issues/196)) ([a30dc2d](https://github.com/SocialGouv/1000jours/commit/a30dc2d03d78d2ed0c9bb86c62d7132011f289d9))

# [1.21.0](https://github.com/SocialGouv/1000jours/compare/v1.20.0...v1.21.0) (2021-05-06)


### Features

* **dpp:** correction labels doublon ([#193](https://github.com/SocialGouv/1000jours/issues/193)) ([ec73511](https://github.com/SocialGouv/1000jours/commit/ec73511cfd44700657f9f81c8db04d45ae876381))

# [1.20.0](https://github.com/SocialGouv/1000jours/compare/v1.19.0...v1.20.0) (2021-05-05)


### Bug Fixes

* **api:** corrige l'erreur des articles en cas de visuel absent ([#190](https://github.com/SocialGouv/1000jours/issues/190)) ([d1d11d3](https://github.com/SocialGouv/1000jours/commit/d1d11d33100718e6337fa79cd98d5fad1789a2a8))
* 🐛 Ajoute "date-fns" ([#188](https://github.com/SocialGouv/1000jours/issues/188)) ([1edc008](https://github.com/SocialGouv/1000jours/commit/1edc008ddd6d6d7878d38db16003ae9a53a72c60))


### Features

* 🎸 Affiche les événements en fonction de la date saisie ([#187](https://github.com/SocialGouv/1000jours/issues/187)) ([539e3c3](https://github.com/SocialGouv/1000jours/commit/539e3c3d7ce7b02aee3facb3e6286072f6ae8078)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)
* **back:** ajout d'un script pour importer des données ([#176](https://github.com/SocialGouv/1000jours/issues/176)) ([703f3f3](https://github.com/SocialGouv/1000jours/commit/703f3f381813f1672734818dc61e1ec285fec2e4))

# [1.19.0](https://github.com/SocialGouv/1000jours/compare/v1.18.1...v1.19.0) (2021-04-30)


### Features

* **dpp:** Ajout des questions dans le back + refacto front ([#169](https://github.com/SocialGouv/1000jours/issues/169)) ([ee1d9a8](https://github.com/SocialGouv/1000jours/commit/ee1d9a805ccd999e7222fe309c995adc30bdec23))

## [1.18.1](https://github.com/SocialGouv/1000jours/compare/v1.18.0...v1.18.1) (2021-04-29)


### Bug Fixes

* **articles:** corrige le remplacement des URLs des articles dans les étapes pour l'API GraphQL ([#174](https://github.com/SocialGouv/1000jours/issues/174)) ([4856ed6](https://github.com/SocialGouv/1000jours/commit/4856ed65b9fbf9dc323077c3a40b79d498a03cc4))

# [1.18.0](https://github.com/SocialGouv/1000jours/compare/v1.17.5...v1.18.0) (2021-04-29)


### Features

* **graphql:** active l'interface GraphQL en production ([#173](https://github.com/SocialGouv/1000jours/issues/173)) ([755f81e](https://github.com/SocialGouv/1000jours/commit/755f81e63310717ae6eafe7d4d89cf67e53a40c9))

## [1.17.5](https://github.com/SocialGouv/1000jours/compare/v1.17.4...v1.17.5) (2021-04-29)


### Bug Fixes

* 🐛 Corrige l'affichage des textes en Bold sur Android ([#171](https://github.com/SocialGouv/1000jours/issues/171)) ([c2416d1](https://github.com/SocialGouv/1000jours/commit/c2416d14cfeeba62299c9ad8c65ba06034a0fa6f))

## [1.17.4](https://github.com/SocialGouv/1000jours/compare/v1.17.3...v1.17.4) (2021-04-29)


### Bug Fixes

* 🐛 Corrige l'affichage des textes en Bold sur Android ([#170](https://github.com/SocialGouv/1000jours/issues/170)) ([d0e6fe5](https://github.com/SocialGouv/1000jours/commit/d0e6fe5c6865c0a1b690dc41ecaca7aca49e7d9a))

## [1.17.3](https://github.com/SocialGouv/1000jours/compare/v1.17.2...v1.17.3) (2021-04-28)


### Bug Fixes

* **articles:** corrige le remplacement des URLs dans l'API ([#168](https://github.com/SocialGouv/1000jours/issues/168)) ([26139f8](https://github.com/SocialGouv/1000jours/commit/26139f88c3b8f35af2fe4503d66abcb09a78ec64))

## [1.17.2](https://github.com/SocialGouv/1000jours/compare/v1.17.1...v1.17.2) (2021-04-28)


### Bug Fixes

* 🐛 Corrige l'affichage des images (Liste Article, Article) ([#167](https://github.com/SocialGouv/1000jours/issues/167)) ([406f005](https://github.com/SocialGouv/1000jours/commit/406f00505feb139e842dc279457f202fce756971))

## [1.17.1](https://github.com/SocialGouv/1000jours/compare/v1.17.0...v1.17.1) (2021-04-28)


### Bug Fixes

* **article:** complète les urls en liens absolus ([#164](https://github.com/SocialGouv/1000jours/issues/164)) ([98a82a7](https://github.com/SocialGouv/1000jours/commit/98a82a7b0e919e88b271152cbc21b1f73dd9b23c))

# [1.17.0](https://github.com/SocialGouv/1000jours/compare/v1.16.0...v1.17.0) (2021-04-27)


### Bug Fixes

* 🐛 Corrige les retours design sur la tabBar  ([#166](https://github.com/SocialGouv/1000jours/issues/166)) ([654a65b](https://github.com/SocialGouv/1000jours/commit/654a65ba6bc03cb2624dd3f4e9c8ea2a0f8d7c6f)), closes [#10](https://github.com/SocialGouv/1000jours/issues/10) [#28](https://github.com/SocialGouv/1000jours/issues/28) [#102](https://github.com/SocialGouv/1000jours/issues/102) [#133](https://github.com/SocialGouv/1000jours/issues/133) [#36](https://github.com/SocialGouv/1000jours/issues/36)


### Features

* 🎸 je consulte les articles liés à une étape ([#165](https://github.com/SocialGouv/1000jours/issues/165)) ([64b198b](https://github.com/SocialGouv/1000jours/commit/64b198bb895fa5debfd3da0efed8a96e691dec60)), closes [#26](https://github.com/SocialGouv/1000jours/issues/26)

# [1.16.0](https://github.com/SocialGouv/1000jours/compare/v1.15.1...v1.16.0) (2021-04-27)


### Features

* **dpp:** add epds survey on app ([#162](https://github.com/SocialGouv/1000jours/issues/162)) ([384583f](https://github.com/SocialGouv/1000jours/commit/384583fb92c76166be3fa7d66b178a5383357b7a))

## [1.15.1](https://github.com/SocialGouv/1000jours/compare/v1.15.0...v1.15.1) (2021-04-23)


### Bug Fixes

* 🐛 Corrige les retours design (Profile and Article) ([#160](https://github.com/SocialGouv/1000jours/issues/160)) ([e144278](https://github.com/SocialGouv/1000jours/commit/e144278d337f528f17df0d3f115a4f70d66fc999)), closes [#10](https://github.com/SocialGouv/1000jours/issues/10) [#28](https://github.com/SocialGouv/1000jours/issues/28) [#102](https://github.com/SocialGouv/1000jours/issues/102) [#133](https://github.com/SocialGouv/1000jours/issues/133)

# [1.15.0](https://github.com/SocialGouv/1000jours/compare/v1.14.1...v1.15.0) (2021-04-23)


### Features

* 🎸 je consulte les articles liés à une étape ([#158](https://github.com/SocialGouv/1000jours/issues/158)) ([405ac73](https://github.com/SocialGouv/1000jours/commit/405ac73fb7d8c927c0edfa9ce897e1b73b634bca)), closes [#26](https://github.com/SocialGouv/1000jours/issues/26)

## [1.14.1](https://github.com/SocialGouv/1000jours/compare/v1.14.0...v1.14.1) (2021-04-22)


### Bug Fixes

* **gitlab:** update to SocialGouv/gitlab-ci-yml@v21.0.2 ([#155](https://github.com/SocialGouv/1000jours/issues/155)) ([7970649](https://github.com/SocialGouv/1000jours/commit/79706495f34b48c611331322bd9179a166404d55))

# [1.14.0](https://github.com/SocialGouv/1000jours/compare/v1.13.7...v1.14.0) (2021-04-22)


### Bug Fixes

* 🐛 Corrige la position du numéro de l'étape (Timeline) ([#153](https://github.com/SocialGouv/1000jours/issues/153)) ([bc43f48](https://github.com/SocialGouv/1000jours/commit/bc43f48d8a12fa2b6e403f94432a9d7302cefc0f)), closes [#108](https://github.com/SocialGouv/1000jours/issues/108)
* 🐛 Corrige la saisie de date compliqué sous iOS ([#152](https://github.com/SocialGouv/1000jours/issues/152)) ([b04c46c](https://github.com/SocialGouv/1000jours/commit/b04c46cc24e39f36f3f97120176cd447351d0d22)), closes [#150](https://github.com/SocialGouv/1000jours/issues/150)
* 🐛 corrige le design de la page Onboarding ([#151](https://github.com/SocialGouv/1000jours/issues/151)) ([4065d07](https://github.com/SocialGouv/1000jours/commit/4065d07572057163269509018a85ee975b4aded4)), closes [#7](https://github.com/SocialGouv/1000jours/issues/7)
* **deps:** update all dependencies ([#64](https://github.com/SocialGouv/1000jours/issues/64)) ([c34b573](https://github.com/SocialGouv/1000jours/commit/c34b573d41b62f6095a4ed3fa17fde66b823f5d6))


### Features

* **ci:** ajoute les workflows de build et publish pour la production ([#145](https://github.com/SocialGouv/1000jours/issues/145)) ([92c5f7e](https://github.com/SocialGouv/1000jours/commit/92c5f7e19ea5277baf5466caff536bc9f7f50a10))
* **dpp:** ajout de la bannière d'accès au questionnaire ([#149](https://github.com/SocialGouv/1000jours/issues/149)) ([695f3b9](https://github.com/SocialGouv/1000jours/commit/695f3b94f090d9877c4e58be45808afc4ea8b1f3))


### Reverts

* Revert "fix(deps): update all dependencies (patch)" (#156) ([46cd862](https://github.com/SocialGouv/1000jours/commit/46cd862ceec1bf69e7e0cb1473cb75a98796ed31)), closes [#156](https://github.com/SocialGouv/1000jours/issues/156)

## [1.13.7](https://github.com/SocialGouv/1000jours/compare/v1.13.6...v1.13.7) (2021-04-19)


### Bug Fixes

* 🐛 Corrige les textes sur la page Onboarding ([#148](https://github.com/SocialGouv/1000jours/issues/148)) ([3cd56b3](https://github.com/SocialGouv/1000jours/commit/3cd56b3b15eaa233c9477863b73ac92aaba0d639))

## [1.13.6](https://github.com/SocialGouv/1000jours/compare/v1.13.5...v1.13.6) (2021-04-19)


### Bug Fixes

* 🐛 Corrige les problèmes de font (Article) et lien invalide ([#147](https://github.com/SocialGouv/1000jours/issues/147)) ([6d3458b](https://github.com/SocialGouv/1000jours/commit/6d3458ba9a167c346040ea7d649e1d72377e0039)), closes [#141](https://github.com/SocialGouv/1000jours/issues/141)

## [1.13.5](https://github.com/SocialGouv/1000jours/compare/v1.13.4...v1.13.5) (2021-04-16)


### Bug Fixes

* **ci:** corrige la publication sur Expo Go depuis la pipeline ([#143](https://github.com/SocialGouv/1000jours/issues/143)) ([ef58218](https://github.com/SocialGouv/1000jours/commit/ef582185437fa1c2bef4f42d210dfc71e6ab6bb9))

## [1.13.4](https://github.com/SocialGouv/1000jours/compare/v1.13.3...v1.13.4) (2021-04-15)


### Bug Fixes

* **articles:** enlève les caractères inutiles en début et fin de textes ([#140](https://github.com/SocialGouv/1000jours/issues/140)) ([d71ae4c](https://github.com/SocialGouv/1000jours/commit/d71ae4c0e8cd1bb0c87639de8c696a4f29a3b325))

## [1.13.3](https://github.com/SocialGouv/1000jours/compare/v1.13.2...v1.13.3) (2021-04-15)


### Bug Fixes

* 🐛 Corrige les marges et les alignements (Article) ([#139](https://github.com/SocialGouv/1000jours/issues/139)) ([3474dd9](https://github.com/SocialGouv/1000jours/commit/3474dd9e970aa94c7e555bcec992273be139db31)), closes [#133](https://github.com/SocialGouv/1000jours/issues/133)

## [1.13.2](https://github.com/SocialGouv/1000jours/compare/v1.13.1...v1.13.2) (2021-04-15)


### Bug Fixes

* 🐛 Corrige l'alignement des icones "En Bref" (Article) ([#136](https://github.com/SocialGouv/1000jours/issues/136)) ([2cdbf03](https://github.com/SocialGouv/1000jours/commit/2cdbf03b4ec2e8411b117205dfb7f96da3d1f2a7))

## [1.13.1](https://github.com/SocialGouv/1000jours/compare/v1.13.0...v1.13.1) (2021-04-15)


### Bug Fixes

* 🐛 Ajoute une marge sur les sous titres d'article ([#134](https://github.com/SocialGouv/1000jours/issues/134)) ([a30c718](https://github.com/SocialGouv/1000jours/commit/a30c718fe40abc029540b28c8abcbb696769aba1)), closes [#133](https://github.com/SocialGouv/1000jours/issues/133)

# [1.13.0](https://github.com/SocialGouv/1000jours/compare/v1.12.1...v1.13.0) (2021-04-14)


### Features

* 🎸 Ajoute texteTitre1 et texteTitre2 (article) ([#127](https://github.com/SocialGouv/1000jours/issues/127)) ([5c97599](https://github.com/SocialGouv/1000jours/commit/5c9759954fc122e7a752d995d107f6c9d2cb4982)), closes [#102](https://github.com/SocialGouv/1000jours/issues/102)

## [1.12.1](https://github.com/SocialGouv/1000jours/compare/v1.12.0...v1.12.1) (2021-04-14)


### Bug Fixes

* **api:** corrige les permissions de vue anonyme des événements ([#128](https://github.com/SocialGouv/1000jours/issues/128)) ([665bb95](https://github.com/SocialGouv/1000jours/commit/665bb950f594afd01a9d6a4ac44de86a0dad0d4d))

# [1.12.0](https://github.com/SocialGouv/1000jours/compare/v1.11.0...v1.12.0) (2021-04-13)


### Features

* 🎸 Je peux utiliser une font d'icones (Icomoon) ([#125](https://github.com/SocialGouv/1000jours/issues/125)) ([340f673](https://github.com/SocialGouv/1000jours/commit/340f67378299548225ce77d8bb20cab44576b6d3)), closes [#124](https://github.com/SocialGouv/1000jours/issues/124) [#126](https://github.com/SocialGouv/1000jours/issues/126)

# [1.11.0](https://github.com/SocialGouv/1000jours/compare/v1.10.3...v1.11.0) (2021-04-13)


### Features

* **articles:** ajout des titres de paragraphes dans le backoffice ([#123](https://github.com/SocialGouv/1000jours/issues/123)) ([7eca059](https://github.com/SocialGouv/1000jours/commit/7eca05919de752d43f91850e74ff14a0a9aae6bd))

## [1.10.3](https://github.com/SocialGouv/1000jours/compare/v1.10.2...v1.10.3) (2021-04-12)


### Bug Fixes

* **api:** corrige l'url des appels vers strapi ([#122](https://github.com/SocialGouv/1000jours/issues/122)) ([5be148c](https://github.com/SocialGouv/1000jours/commit/5be148c76c2715bbc87ae7d5ee5103ad45fc9f7c))

## [1.10.2](https://github.com/SocialGouv/1000jours/compare/v1.10.1...v1.10.2) (2021-04-12)


### Bug Fixes

* 🐛 Corrige les retours UI (Onboarding et Profil) ([#121](https://github.com/SocialGouv/1000jours/issues/121)) ([77c0406](https://github.com/SocialGouv/1000jours/commit/77c04062de1e696a16672507109322ab06ef75ce)), closes [#7](https://github.com/SocialGouv/1000jours/issues/7) [#10](https://github.com/SocialGouv/1000jours/issues/10)

## [1.10.1](https://github.com/SocialGouv/1000jours/compare/v1.10.0...v1.10.1) (2021-04-09)


### Bug Fixes

* **expo:** corrige l'erreur Expo de la pipeline GitHub Actions ([#114](https://github.com/SocialGouv/1000jours/issues/114)) ([9f89be2](https://github.com/SocialGouv/1000jours/commit/9f89be2e7cfee6f87d1a2600a284db482a4ed545))

# [1.10.0](https://github.com/SocialGouv/1000jours/compare/v1.9.0...v1.10.0) (2021-04-09)


### Features

* 🎸 je consulte le détail d'un article (v2) ([#111](https://github.com/SocialGouv/1000jours/issues/111)) ([d19cb66](https://github.com/SocialGouv/1000jours/commit/d19cb6616894326ba71732b92e573d635847663d)), closes [#108](https://github.com/SocialGouv/1000jours/issues/108) [#108](https://github.com/SocialGouv/1000jours/issues/108) [#102](https://github.com/SocialGouv/1000jours/issues/102)

# [1.9.0](https://github.com/SocialGouv/1000jours/compare/v1.8.0...v1.9.0) (2021-04-08)


### Bug Fixes

* **strapi:** nodeSelector ([#113](https://github.com/SocialGouv/1000jours/issues/113)) ([33fd2b3](https://github.com/SocialGouv/1000jours/commit/33fd2b3fb1de65586df22b7070982124e5211f88))


### Features

* **evenements:** permet de gérer les événements dans le backoffice ([#103](https://github.com/SocialGouv/1000jours/issues/103)) ([14acc49](https://github.com/SocialGouv/1000jours/commit/14acc4953056357f140e4cf221a88fc08a203942)), closes [#35](https://github.com/SocialGouv/1000jours/issues/35)

# [1.8.0](https://github.com/SocialGouv/1000jours/compare/v1.7.1...v1.8.0) (2021-04-08)


### Bug Fixes

* no azure file, no expo ([#110](https://github.com/SocialGouv/1000jours/issues/110)) ([bc32f6f](https://github.com/SocialGouv/1000jours/commit/bc32f6f4d0e899d6ea066bd3727986f7105e873e))


### Features

* 🎸 Ajoute la font correspondante aux maquettes ([#107](https://github.com/SocialGouv/1000jours/issues/107)) ([0c1b708](https://github.com/SocialGouv/1000jours/commit/0c1b708ac36519bf1d90963bce24285bd4b90137)), closes [#106](https://github.com/SocialGouv/1000jours/issues/106)
* 🎸 Je peux voir le numéro des étapes (timeline) ([#109](https://github.com/SocialGouv/1000jours/issues/109)) ([f00a044](https://github.com/SocialGouv/1000jours/commit/f00a044c0bfa2a852f21f1a4884c0ac0fd5ca625)), closes [#108](https://github.com/SocialGouv/1000jours/issues/108) [#108](https://github.com/SocialGouv/1000jours/issues/108)

## [1.7.1](https://github.com/SocialGouv/1000jours/compare/v1.7.0...v1.7.1) (2021-04-06)


### Bug Fixes

* azureFile again ([#104](https://github.com/SocialGouv/1000jours/issues/104)) ([019cfad](https://github.com/SocialGouv/1000jours/commit/019cfadda9cc7b60c372532e1fe77907fc1451fc))

# [1.7.0](https://github.com/SocialGouv/1000jours/compare/v1.6.0...v1.7.0) (2021-04-06)


### Bug Fixes

* **deps:** update dependency @ckeditor/ckeditor5-build-classic to v27 ([#93](https://github.com/SocialGouv/1000jours/issues/93)) ([4f51ff8](https://github.com/SocialGouv/1000jours/commit/4f51ff8a2cbdae237100773013f0d04282fddbfe))


### Features

* **calendrier:** ajoute le setup du calendrier ([#105](https://github.com/SocialGouv/1000jours/issues/105)) ([cea356d](https://github.com/SocialGouv/1000jours/commit/cea356d9f719b36b0c90fffd524985b6cf79d7dc))

# [1.6.0](https://github.com/SocialGouv/1000jours/compare/v1.5.3...v1.6.0) (2021-04-06)


### Features

* ajoute du stockage local ([#97](https://github.com/SocialGouv/1000jours/issues/97)) ([1a8b9e8](https://github.com/SocialGouv/1000jours/commit/1a8b9e86f74e02484bc34fcbcbf02579b0d8aeeb))

## [1.5.3](https://github.com/SocialGouv/1000jours/compare/v1.5.2...v1.5.3) (2021-04-06)


### Bug Fixes

* **k8s:** force recreate strapi deployment ([#101](https://github.com/SocialGouv/1000jours/issues/101)) ([9c66acc](https://github.com/SocialGouv/1000jours/commit/9c66accabe27a392fe92065c4a7b87325a2d9cf6))

## [1.5.2](https://github.com/SocialGouv/1000jours/compare/v1.5.1...v1.5.2) (2021-04-04)


### Bug Fixes

* **ci:** corrige expo login dans github actions ([#98](https://github.com/SocialGouv/1000jours/issues/98)) ([f7871d5](https://github.com/SocialGouv/1000jours/commit/f7871d58f70d924995561c8612f154c60616417c))
* 🐛 Corrige l'affichage de la date de naissance ([#94](https://github.com/SocialGouv/1000jours/issues/94)) ([88dd735](https://github.com/SocialGouv/1000jours/commit/88dd735ffb8543932320815fa2b7e2f82dffd948))

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
