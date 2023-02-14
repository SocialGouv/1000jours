import { IcomoonIcons } from "../components/baseComponents/icomoon.component";
import { NUMBER_OF_DAYS_NOTIF_REMINDER } from "./epdsConstants.constants";
import { epdsInformation } from "./epdsResultInformation.constants";
import { landingPageUrl } from "./links.constants";
import { MIN_SECONDS } from "./notification.constants";

export default {
  accessibility: {
    accordions: {
      close: "Cacher le contenu",
      open: "Afficher le contenu",
    },
    array: "Tableau",
    articleCard: {
      description: "Description",
      title: "Titre de l'article",
    },
    articleGoToTop: "Retour au début de l'article",
    articleToRead: "article à lire",
    articlesFilters: {
      activeFilter: "filtre actif",
      availableArticles: "articles disponibles",
    },
    beContacted: {
      less: "enlever",
      more: "ajouter",
      sendingInProgress: "Envoi en cours",
    },
    cartographyFilters: {
      validateButtonHint: "Sélectionner au moins un filtre pour valider",
    },
    close: "Fermer",
    closeMenu: "Fermer le menu",
    eventCard: {
      description: "Description",
      title: "Titre de l'événement",
    },
    favorites: {
      add: "Ajouter dans vos favoris",
      remove: "Retirer de vos favoris",
    },
    illustrationProfile: "Illustration profil",
    listen: "Écouter",
    logoApp: "Logo de l'application",
    logoRepubliqueFr: "Logo de la République française",
    mood: {
      goToNextMonth: "Allez au mois suivant.",
      goToPreviousMonth: "Allez au mois précédent.",
    },
    options: "Options",
    step: "étape",
    stop: "Arrêter",
    subSubtitle: "Sous sous-titre",
    subtitle: "Sous-titre",
    survey: {
      onTotalQuestion: "sur",
      question: "Question",
    },
    tapForMoreInfo: "Appuyer deux fois pour avoir plus d'informations",
    title: "Titre",
    updateDate: "Modifier la date",
    version: "version.",
  },
  appName: "1000 premiers jours",
  appVersion: {
    doUpdate: "Mettre à jour",
    newVersionAvailable: "Une nouvelle version de l'application est disponible",
    update: "Mise à jour",
  },
  aroundMe: {
    addressesListLabelEnd:
      "points d'intérêts qui correspondent à vos critères :",
    addressesListLabelStart: "Il y a",
    chooseFilter:
      "Veuillez choisir au moins un élément dans le filtre afin de lancer la recherche",
    displayListButton: "Afficher en liste",
    displayMapButton: "Afficher sur la carte",
    filter: {
      healthProfessional: "Professionnels de santé",
      steps: "Étapes du parcours 1000 jours",
      structures: "Structures",
      thematics: "Thématiques",
      title: "Filtrer",
    },
    geolocationRetrievingError:
      "Erreur lors de la récupération de la géolocalisation",
    goThere: "M'y rendre",
    instruction: "Renseignez le code postal de votre recherche.",
    noAddressFound: "Aucune adresse n'a été trouvée dans cette zone",
    pleaseAllowGeolocation:
      "Veuillez autoriser la géolocalisation dans les paramètres de votre téléphone",
    poiType: {
      bibliothequePublique: "Bibliothèque publique",
      caf: "CAF",
      cpam: "CPAM",
      infirmier: "Infirmier",
      mairie: "Mairie",
      maisonDeNaissance: "Maison de naissance",
      maternite: "Maternité",
      medecin: "Médecin",
      mediatheque: "Médiathèque",
      pediatre: "Pédiatre",
      planningFamilial: "Planning familial",
      pmi: "PMI",
      saad: "SAAD",
      sageFemme: "Sage-femme",
    },
    postalCodeInputPlaceholder: "Écrivez ici le code postal",
    postalCodeInvalid: "Le code postal que vous avez saisi n'est pas valide",
    postalCodeNotFound: "Le code postal que vous recherchez n'a pas été trouvé",
    relaunchSearch: "Relancer la recherche",
    searchButton: "Valider",
    searchGeolocInstruction:
      "Afin de vous apporter une aide personnalisée, veuillez renseigner votre localisation :",
    searchPostalCodeInstruction: "Ou renseignez votre code postal :",
    searchWasNotSuccessful:
      "La recherche n'a pas aboutie, veuillez réessayer plus tard",
    submitNewFilter: {
      aboutYou: {
        numberOfChildren: "Nombre d'enfants",
        postalCode: "Votre code postal",
        postalCodePlaceholder: "Écrivez ici le code postal",
        title: "Parlez-nous de vous :",
      },
      instructions: [
        {
          instruction:
            "Quel(s) type(s) de lieu(x) aimeriez-vous voir sur la carte ? (mairie, Pôle Emploi, pédiatre, etc.)",
          placeholder: "Écrivez  ici le(s) lieu(x)",
        },
        {
          instruction:
            "Vous pouvez nous transmettre des suggestions d'amélioration pour la carte:",
          placeholder: "Écrivez ici vos idées d'amélioration",
        },
      ],
      title: "Proposer un lieu",
    },
    title: "Autour de moi",
    useMyGeolocation: "Utiliser ma géolocalisation",
  },
  article: {
    articleNotFound: "Article introuvable",
    didYouKnowTitle: "Le saviez-vous ?",
    favorite: {
      addToFavorites: "Ajouter",
      confirmDeleteMessage:
        "Êtes-vous sûr de vouloir supprimer cet article de vos favoris ?",
      deleteFromFavorites: "Supprimer",
      description:
        "Retrouvez ici les articles que vous avez ajouté en favoris.",
      empty: "Aucun article en favoris",
      title: "Favoris",
    },
    firstThreeMonths: {
      buttonLabel: "Commencer",
      description:
        "Se poser les bonnes questions pour en parler à un professionnel de santé, c’est l’objectif de cet outil.",
      title: "Et si c'était la dépression post-partum ?",
    },
    inShortTitle: "En bref :",
    learnMoreAboutIt: "En savoir plus à ce sujet :",
    notification: {
      articlesToRead: {
        bodyPart1: "Il vous reste",
        bodyPart2: "article(s) à lire concernant votre étape",
        redirectTitle: "Consulter",
        title: "Article(s) non lu(s)",
      },
      congrats: {
        body: "Vous avez lu tous les articles présents actuellement à l’étape suite et fin de grossesse ! Vous faites parti de nos grand(e)s lecteur(rices). \n\nNous en ajoutons régulièrement, vous pouvez aussi lire des articles dans d’autres étapes.",
        redirectTitle: "Fermer",
        title: "Félicitations !",
      },
    },
    readArticle: "Article lu",
    selectVoice: "Choisissez une voix",
    thematic: "Thématique",
    usefulTitle: "Cet article vous a été utile ?",
  },
  articleList: {
    articlesAlreadyRead: "article(s) déjà lu(s)",
    articlesToRead: "article(s) à lire",
    filterByFavorites: "Afficher seulement mes favoris",
    filters: "Filtrer",
    resetFilters: "Réinitialiser",
  },
  articleSwipe: {
    content: "Slidez entre les articles pour lire sur les différents sujets.",
  },
  birthdate: "Date de naissance",
  buttons: {
    back: "Retour",
    cancel: "Annuler",
    close: "Fermer",
    contact: "Contacter",
    finish: "Terminer",
    next: "Suivant",
    no: "Non",
    ok: "Ok",
    pass: "Passer",
    previous: "Précédent",
    settings: "Paramètres",
    share: "Partager",
    start: "Commencer",
    validate: "Valider",
    yes: "Oui",
  },
  calendar: {
    description:
      "Grâce à la date de naissance que vous avez saisie, accédez à votre calendrier personnalisé et suivez chaque étape du parcours 1000 jours.",
    importantEvent: "Événement essentiel",
    lastSyncDate: "Dernière synchro :",
    listOfEvents: "Liste des événements",
    noChildBirthday: "Aucune date de naissance",
    noEventMessage: "Aucun événement",
    notification: {
      redirectTitle: "Consulter",
      title: "Événement",
      titleReminder: "Événement à venir",
    },
    pleaseAllowAccessCalendar:
      "Veuillez autoriser l'accès au calendrier dans les paramètres de votre téléphone",
    synchronise: "Synchroniser avec mon calendrier",
    synchronization: "Synchronisation",
    synchronizationHelper:
      "Ce bouton permet de synchroniser votre calendrier personnel avec celui de l’application. Ainsi, les événements affichés ici le seront aussi sur votre calendrier.",
    today: "Aujourd'hui",
    usefulEvent: "Cette information vous a été utile ?",
  },
  dateFormatLabel: "Jour / Mois / Année",
  epdsSurvey: {
    beContacted: {
      beContactedSent: "Votre demande de contact a bien été envoyée",
      button: "Être contacté(e)",
      byEmail: "Par email",
      bySms: "Par SMS",
      formForEmailSend:
        "Vous devriez recevoir un email d’Elise dans les 48h. \nPensez bien à vérifier dans vos spams.",
      formForSmsSend:
        "Vous devriez recevoir un SMS d’Elise dans les 48h en fonction des disponibilités sélectionnées.",
      formSend: "Votre demande de contact a bien été prise en compte. ",
      hours: {
        evening: "L'après-midi",
        eveningDetails: "14h - 17h30",
        morning: "En matinée",
        morningDetails: "9h - 12h",
        noon: "Le midi",
        noonDetails: "12h - 14h",
      },
      introduction:
        "Se rendre disponible en tant que parent n'est pas toujours simple. Nous vous proposons de choisir le créneau et le type de prise de contact qui vous conviennent.",
      invalidEmail: "L'email n'est pas valide",
      invalidPhoneNumber: "Le numéro de téléphone n'est pas valide",
      mailsCanBeReceivedInSpams:
        "(*) Les mails peuvent se glisser dans vos spams ou être considérés comme indésirables. Pensez à vérifier votre boîte.",
      myAvailabilities: "Selon mes disponibilités, par :",
      myAvailabilitiesHours:
        "Quelles sont vos disponibilités pour être contacté(e) ? (du lundi au vendredi)",
      numberOfChildren: "Nombre d'enfant(s) :",
      reminderBeContacted:
        "Vous avez répondu au questionnaire sur la dépression post-partum. Pour vous accompagner sur cette période, vous pouvez être contaté(e) par notre partenaire, Élise.",
      requestSent: "Demande envoyée",
      requiredField: "*Champ obligatoire",
      selectDate: "Sélectionner la date",
      title: "Être contacté(e)",
      wayToBeContacted: "Par quel moyen préférez-vous être contacté(e) ?",
      yourEmail: "Votre email",
      yourEmailPlaceholder: "Écrivez ici l’adresse mail",
      yourFirstname: "Votre prénom",
      yourFirstnamePlaceholder: "Écrivez ici votre prénom",
      yourPhoneNumber: "Votre numéro de téléphone",
      yourPhoneNumberPlaceholder: "Écrivez ici le numéro pour vous contacter",
    },
    description:
      "Vous venez d'avoir un bébé et nous aimerions savoir comment vous vous sentez.",
    epdsPresentation: {
      button: "Ouvrir le questionnaire",
      description:
        "Nous vous proposons d'accéder à notre outils vous permettant de vous questionner sur votre état mental.",
      tools:
        "Cet outil est reconnu dans le monde professionnel. Il est déjà présent sur de nombreux sites.",
    },
    genderEntry: {
      choices: {
        female: "Féminin",
        male: "Masculin",
        noInformation: "Je ne souhaite pas renseigner cette information",
        nonBinary: "Non-binaire",
      },
      instruction: "Veuillez renseigner votre genre",
      titleInformation: "Informations",
    },
    instruction:
      "Veuillez cocher la réponse qui vous semble décrire le mieux comment vous vous êtes senti(e) au cours des 7 derniers jours et pas seulement aujourd'hui.",
    mailContact: "1000joursblues@fabrique.social.gouv.fr",
    mailSubject: "1000 premiers jours",
    notification: {
      body: `${NUMBER_OF_DAYS_NOTIF_REMINDER} jours se sont écoulés depuis la dernière fois que vous avez passé le test EPDS. Vous pouvez maintenant le repasser si vous le souhaitez`,
      redirectTitle: "Passer le test",
      title: "Rappel EPDS",
    },
    onboarding: {
      paragraphs: [
        {
          boldIndexes: [],
          description:
            "Chaque année, en France, la dépression post partum concerne 100 000 femmes et 75 000 hommes.",
          title: "Constat",
        },
        {
          boldIndexes: [],
          description:
            "Se poser les bonnes questions en se basant sur des questions spécifiques pour détecter les risques qu’une dépression post partum soit présente.",
          title: "Objectif",
        },
        {
          boldIndexes: [],
          description:
            "Essayez de répondre à ces questions simples sur la façon dont vous vous êtes senti(e) durant la semaine passée.",
          title: "Comment",
        },
        {
          boldIndexes: [],
          description:
            "Il existe des questionnaires de dépistage d’utilisation simple. N’hésitez pas à en parler à votre sage-femme ou votre médecin, ils pourront faire le point avec vous.  Si vous souhaitez utiliser le questionnaire (EPDS), il est important qu’il se fasse en présence d’un professionnel de santé, qui est le seul à pouvoir poser un diagnostic.",
          title: "Informations",
        },
        {
          boldIndexes: [],
          description:
            "Bénéficier de soutien limite les facteurs de stress durant les premiers mois de bébé, douter, se sentir un peu seule, se sentir débordée est tout à fait commun. Oser en parler, c’est déjà prendre soin de soi et de son enfant. Des ressources et solutions existent pour vous accompagner.",
          title: "Recommandations",
        },
      ],
      reminder:
        "Ce questionnaire n'est pas un diagnostic et ne remplace pas un professionnel de la santé.",
      steps: {
        elements: [
          "Se questionner",
          "Accéder aux ressources",
          "Trouver une aide adaptée",
          "Se questionner de nouveau",
        ],
        title: "Étapes",
      },
      title: "Dépression post partum, en parler c’est se soigner !",
    },
    previousSurvey: {
      continueButton: "Continuer",
      messsage:
        "Il semble que vous n'ayez pas terminé le précédent questionnaire. Voulez-vous le continuer ou le recommencer ?",
      startOverButton: "Recommencer",
    },
    restartSurvey: "Se questionner de nouveau",
    resultats: {
      call: "Appeler",
      entreDixEtDouze: {
        contacterNotrePartenaire:
          "Contacter notre partenaire composé par des volontaires ayant connu la difficulté maternelle, elles mettent leur expérience personnelle au service du collectif.",
        explication:
          "Il est possible que vous souffriez de problèmes liés à une dépression, mais ce n’est pas certain. N'hésitez pas à transmettre ces résultats ou à parler de votre ressenti actuel avec votre médecin ou le professionnel de santé qui suit votre grossesse. Il pourra poser un diagnostic plus précis. Vous pouvez également en parler à votre conjoint, des amis ou un membre de votre famille.",
        intervalle: "(10, 11, 12)",
        oserEnParler:
          "Oser en parler, c'est déjà prendre soin de soi et de son enfant !",
        professionalsList: [
          {
            paragraphs: [
              epdsInformation.entretienAupresProfessionnelSante,
              epdsInformation.pmiVeritableAllieParents,
              epdsInformation.reseauPerinatalSante,
            ],
            sectionIcon: IcomoonIcons.proSante,
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          {
            paragraphs: [
              epdsInformation.servicesAidesAccompagnementDomicile,
              epdsInformation.laep,
              epdsInformation.associationsLocalesNationalesSoutienParentalite,
            ],
            sectionIcon: IcomoonIcons.entourage,
            sectionTitle:
              "Les ressources qui peuvent vous aider les premiers mois de l’enfant",
          },
          epdsInformation.sectionRessourcesNumeriquesBienEtMoinsBien,
        ],
        stateOfMind: "Je vais moins bien",
      },
      introduction: "Vous avez obtenu le score suivant : ",
      moinsDeNeuf: {
        explication:
          "Votre résultat est très rassurant au regard de la dépression. Mais, si vous en ressentez le besoin, vous pouvez consulter votre médecin traitant ou le professionnel qui suit votre grossesse pour faire le point sur votre état émotionnel. Si vous pensez que vous êtes une personne à risque de dépression, n’hésitez pas à refaire régulièrement ce test, en laissant au moins deux semaines entre chaque usage.",
        intervalle: "(9 ou moins)",
        professionalsList: [
          {
            paragraphs: [
              epdsInformation.entretienAupresProfessionnelSante,
              epdsInformation.pmiVeritableAllieParents,
              {
                title: "Les autres professionnels qui peuvent vous aider",
              },
              {
                title:
                  "Votre entourage peut se mobiliser pour vous aider : sagefemme, psychologue, infirmière puéricultrice",
              },
            ],
            sectionIcon: IcomoonIcons.proSante,
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          epdsInformation.sectionRessourcesNumeriquesBienEtMoinsBien,
        ],
        stateOfMind: "Je vais bien",
      },
      plusDeTreize: {
        contacterNotrePartenaire:
          "Contacter notre partenaire composé par des volontaires ayant connu la difficulté maternelle, elles mettent leur expérience personnelle au service du collectif.",
        explication:
          "Votre score laisse penser que vous êtes en train de faire une dépression. Il faut consulter un professionnel de santé qui confirmera ou non, par un diagnostic. Si vous ne l’avez pas déjà fait, nous vous conseillons de consulter votre médecin (généraliste ou spécialiste) ou de contacter un professionnel de santé mentale afin de faire avec lui un bilan approfondi de votre état émotionnel et psychologique. Ce n’est pas une fatalité, la dépression peut être guérie grâce à un soutien de votre famille, de vos amis ou d’un professionnel de santé, ou par une psychothérapie ou d’autres moyens, comme une aide médicamenteuse...",
        intervalle: "(13 ou plus)",
        oserEnParler:
          "Oser en parler, c'est déjà prendre soin de soi et de son enfant !",
        professionalsList: [
          {
            paragraphs: [
              epdsInformation.entretienAupresProfessionnelSante,
              epdsInformation.pmiVeritableAllieParents,
              {
                title: "Les autres professionnels qui peuvent vous aider",
              },
              {
                title:
                  "Votre entourage peut se mobiliser pour vous aider : sagefemme, psychologue, infirmière puéricultrice",
              },
            ],
            sectionIcon: IcomoonIcons.proSante,
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          epdsInformation.sectionRessourcesNumeriquesPasBien,
          {
            paragraphs: [
              epdsInformation.servicesAidesAccompagnementDomicile,
              epdsInformation.laep,
              epdsInformation.associationsLocalesNationalesSoutienParentalite,
            ],
            sectionIcon: IcomoonIcons.entourage,
            sectionTitle:
              "Les ressources qui peuvent vous aider les premiers mois de l’enfant",
          },
        ],
        stateOfMind: "Je ne vais pas bien",
      },
      retakeTestInvitation: `Nous vous invitons à vous questionner de nouveau dans les ${NUMBER_OF_DAYS_NOTIF_REMINDER} jours.`,
    },
    title: "Et si c'était une dépression post-partum ?",
    titleResults: "Résultat",
    usefulResource: "Ces ressources sont-elles utiles ?",
  },
  epdsSurveyLight: {
    oserEnParler:
      "Oser en parler, c'est déjà prendre soin de soi et de son enfant !",
    professionalsList: [
      {
        paragraphs: [
          {
            description:
              "N’hésitez pas à parler à vos proches, amis et famille, de vos sentiments et de vos craintes.",
            title: "Votre entourage peut se mobiliser pour vous aider :",
          },
          epdsInformation.entretienAupresProfessionnelSante,
          {
            description:
              "Centre d’informations, d’accompagnement, et d’orientation pour vous et votre enfant, à l’écoute des parents, les nombreux professionnels de santé pourront vous proposer une prise en charge complète.",
            title: "La PMI est un véritable allié pour les (futurs) parents :",
          },
          epdsInformation.reseauPerinatalSante,
          {
            description:
              "C’est un traitement à part entière de la dépression, efficace qui consiste à aider le couple, la mère ou le père à reprendre confiance en lui ou en eux, de s’adapter à l’arrivée de bébé et à son rythme de vie, de renforcer leurs compétences de parents tout facilitant la mise en œuvre d’un nouvel équilibre familial.  Un psychologue, un psychothérapeute ou un psychiatre sont les professionnels vers lesquels vous serez orienté. Ses premiers effets (un soulagement lié à une écoute adaptée) peuvent se faire sentir immédiatement, les changements durables interviennent au bout de quelques semaines. Après la guérison d’un épisode dépressif, la psychothérapie sert aussi à prévenir la réapparition des symptômes",
            pdfUrl: "https://solidarites-sante.gouv.fr/IMG/pdf/guide-8.pdf",
            title: "La psychothérapie",
          },
          {
            description:
              "L’utilisation d’antidépresseurs peut être discutée selon les cas. Le professionnel de santé vous conseillera sur les options disponibles si vous allaitez encore. L’objectif du traitement par médicaments antidépresseurs est la réduction significative des symptômes dépressifs et de leurs conséquences dans la vie quotidienne. Les médicaments antidépresseurs améliorent les symptômes de la dépression à l’issue d’environ 3 à 4 semaines de traitement continu. Ils aident généralement à restaurer le fonctionnement normal du sommeil, de l’appétit, à retrouver l’initiative, une perception positive de la vie… Ce fonctionnement normal persiste après l’arrêt du traitement.",
            title: "Les aides médicamenteuses",
          },
          {
            description:
              "Une aide à domicile permet aux parents de reprendre confiance en eux. Le soutien sur les aspects matériels ne sont donc pas à négliger, comme un soutien pour les tâches ménagères (recours à une aide-ménagère) et les soins au bébé (recours à une technicienne de l’intervention sociale et familiale – TISF), consulter le site de la CAF pour identifier les associations de services d’aide et d’accompagnement à domicile",
            pdfUrl:
              "https://www.perinatalite-occitanie.fr/sites/rpo/files/pdf/TROUBLES%20EMOTIONNELS%20ET%20PSYCHIQUES%20DES%20MERES%20EN%20P.pdf",
            title: "Les visites à domicile",
          },
          {
            description:
              "Le parent peut y être hospitalisé à temps complet ou juste pour la journée. Dans ces unités, une équipe pluridisciplinaire effectue un travail pour permettre au parent de reprendre confiance en lui, afin de soutenir le lien avec son enfant. Cette hospitalisation vise à développer du lien d’attachement avec le bébé, un besoin qui lui est essentiel.",
            title: "Les unités parents enfants",
          },
        ],
        sectionIcon: IcomoonIcons.proSante,
        sectionTitle: "Les professionnels de santé",
      },
      epdsInformation.sectionRessourcesNumeriquesPasBien,
      {
        paragraphs: [
          {
            description:
              "Devenir parents procure beaucoup de joie mais aussi des difficultés. N’hésitez pas à demander de l’aide à vos proches. Ils pourront vous accompagner vers des ressources dont vous avez besoin.",
            title: "L'aide de votre entourage :",
          },
          epdsInformation.servicesAidesAccompagnementDomicile,
          epdsInformation.laep,
          epdsInformation.associationsLocalesNationalesSoutienParentalite,
        ],
        sectionIcon: IcomoonIcons.entourage,
        sectionTitle: "Les ressources des premiers mois",
      },
      {
        paragraphs: [
          {
            description:
              "Si vous souhaitez disposer d’informations complémentaires sur ce sujet, contactez notre partenaire Maman Blues, une association de bénévoles qui met au service des parents, son expertise accumulée depuis plusieurs années sur la dépression post partum. Les conseils de l’association ne remplaceront jamais le conseil d’un professionnel de santé. Pour être accompagné, il est donc indispensable de prendre rendez-vous avec lui dans les meilleurs délais.",
            title: "Contacter",
          },
        ],
        sectionIcon: IcomoonIcons.telephone,
        sectionTitle: "Contacter",
      },
    ],
    stateOfMind: {
      entreDixEtQuartorze: "Je vais moins bien",
      moinsDeNeuf: "Je vais bien",
      plusDeQuinze: "Je ne vais pas bien",
    },
    textesExplication: {
      contactParElise:
        "Vous pouvez être contacté(e) par Élise, notre partenaire (association composée par des volontaires ayant connu la difficulté maternelle), afin de",
      contactParEliseBold: " trouver une aide adaptée autour de vous.",
      moinsDeNeuf:
        "Les changements importants liés à l’arrivée d’un bébé sont des facteurs de stress dont certains signes évocateurs sont normaux durant cette période. Parlez de vos difficultés des premiers mois est essentiel pour que le professionnel de santé qui vous suit puisse à tout moment vous accompagner. Des aides et un accompagnement peuvent être mis en place pour vous aider durant cette période qui nécessite du soutien. En parler avec un professionnel de santé et votre entourage, c’est se soigner. Parce que vous n’êtes pas seul(e) et qu’en parler a permis à de nombreux parents d’aller mieux.",
      plusDeNeuf:
        "Les changements importants liés à l’arrivée d’un bébé sont des facteurs de stress dont certains signes peuvent évoquer ceux de la dépression post partum. Vous exprimez des signes évocateurs de la dépression post partum, il est donc nécessaire de",
      plusDeNeufBold:
        " consulter le professionnel de santé qui vous suit pour échanger.",
    },
    titleLight: "Et si c'était une dépression post-partum ? Les ressources",
  },
  errorMsg: "Une erreur est survenue, merci de réessayer plus tard",
  errorNetworkMsg:
    "Vous êtes très nombreux à vous connecter en ce moment mais nous faisons tout notre possible pour que vous puissiez vous connecter rapidement. Nous vous invitons à vous reconnecter dans quelques minutes.",
  event: {
    matchingArticles: "Articles correspondants à l’événement",
    seeOnTheMap: "Voir sur la carte",
    title: "Événement",
  },
  infosDev: {
    env: "Environnement",
    notifications: "Notifications",
    resetStorageData: "Effacer les données",
    resetStorageDataAlertMsg:
      "Relancez l'app pour appliquer les modifications.",
    scheduledNotifications: "Notifications programmées",
    showStorageData: "Voir les données",
    testNotification: "Tester une notification",
    testNotificationInfo: `(se déclenche au bout de ${MIN_SECONDS}s)`,
    title: "Infos Dev.",
  },
  invalidDate: "La date saisie n'est pas valide.",
  invalidLink: "Ce lien n'est pas valide.",
  mandatoryField: "Ce champ est obligatoire",
  menu: {
    accessibility: "Accessibilité",
    addReview: "Laisser un avis",
    conditionsOfUse: "Politiques de confidentialité",
    contactUs: "Nous écrire",
    information: "Informations",
    legalNotice: "Mentions légales",
    moodboard: "Suivi d'humeur",
    myFavorites: "Mes favoris",
    myProfil: "Mon profil",
    notificationsCenter: "Centre de notifications",
    parentheque: "Parenthèque",
    recommendApp: "Recommander l'application",
    title: "Menu",
    tndSurvey: "Repérage TND",
  },
  moodboard: {
    completeMoodboard:
      "Complétez votre suivi d'humeur en cliquant sur le calendrier ci-dessous.",
    description:
      "Le suivi d'humeur est un outil d'accompagnement pour évaluer régulièrement votre humeur et au besoin, d'effectuer le questionnaire de la dépression post-partum.",
    howDoYouFeelToday: "Comment vous sentez vous aujourd'hui ?",
    mood: {
      bad: "Mal",
      good: "Bien",
      medium: "Moyen",
      veryGood: "Très bien",
    },
    moodToDate: "Comment vous sentiez-vous le",
    notification: {
      body: "Comment vous sentez vous ?",
      redirectTitle: "Répondre",
      title: "Suivi d'Humeur",
    },
    title: "Suivi d'Humeur",
  },
  noData: "Aucunes données",
  notification: {
    essentialEvents: "Que les événements essentiels",
    favorites: {
      body: "Vous avez placé des articles dans vos favoris, n'hésitez pas à les consulter.",
      redirectTitle: "Consulter",
      title: "Vos favoris",
    },
    frequency: {
      onceADay: "1 fois par jour",
      question: "À quelle fréquence ?",
      twiceAWeek: "2 fois par semaine",
    },
    inAppReview: {
      body: "Votre avis est important pour nous ! N'hésitez pas à noter l'application et à nous laisser votre avis.",
      redirectTitle: "Laisser un avis",
      title: "Votre avis",
    },
    openSettings:
      "Vos paramètres de notification sont désactivés pour cette application. Merci de vous rendre dans les réglages de votre téléphone afin de modifier ces paramètres.",
    openTheApp: "Ouverture de l'app",
    title: "Notifications",
  },
  notificationsCenter: {
    article: {
      decription:
        "Vous précisant qu’il y a tel article non lu sur votre étape.",
      title: "Notifications des articles non lus",
    },
    description:
      "Ici vous pouvez paramétrer les notifications que vous souhaitez recevoir en les activant/désactivant :",
    event: {
      decription: "Vous rappelant les événements à venir.",
      title: "Notifications des événements",
    },
    moodboard: {
      description: "Vous invitant à venir renseigner votre état émotionnel.",
      title: "Notifications du suivi d'humeur",
    },
    title: "Paramètres de notifications",
  },
  onboarding: {
    screenNumber: "Écran n°",
    slidesText: [
      {
        description:
          "« 1000 premiers jours », c’est votre compagnon unique des 1000 premiers jours pour prendre soin de vous, votre famille et votre enfant. Tout au long du parcours et au moment où vous en avez besoin, l’application vous guide « pas à pas » pour vous accompagner au quotidien.",
        title: "Bienvenue sur l'application",
      },
      {
        description:
          "Des informations ciblées à chaque étape du parcours, des messages de santé publique actualisés, des contenus centralisés, et des services spécialement dédiés aux parents. Vous disposerez de l’ensemble des clefs pour devenir le parent que vous souhaitez.",
        title: "Trouver l'information",
      },
      {
        description:
          "Pour vous apporter la bonne information au bon moment, vous pouvez nous informer précisément du moment 1000 jours que vous vivez. Les 8 étapes du parcours « 1000 premiers jours » sont l’occasion de répondre précisément à votre besoin.",
        title: "Connaître les différentes étapes",
      },
    ],
  },
  parentheque: {
    description:
      "Retrouvez ici les documents et vidéos utiles pour l'ensemble des 1000 premiers jours.",
    documentSection: "Documents",
    download: "Télécharger",
    sectionTitle: "Parenthèque",
    video: "Voir la vidéo",
    videoSection: "Vidéos",
  },
  profile: {
    childBirthday: {
      firstChild: "Date de naissance de votre enfant",
      lastChild: "Date de naissance de votre enfant le plus jeune",
      planned: "Naissance prévue de votre enfant",
    },
    childTooOld:
      "Selon la date que vous avez renseignée, l'enfant est âgé de deux ans ou plus",
    dateCannotBeInTheFuture:
      "La date que vous avez renseignée ne peut pas être dans le futur",
    dateCannotBeInThePast:
      "La date que vous avez renseignée ne peut pas être dans le passé",
    dateIsRequired: "Date manquante",
    dateTooFarInFuture:
      "La date que vous avez renseignée est trop éloignée dans le futur",
    gender: {
      empty: "Non renseigné",
      label: "Genre",
      man: "Homme",
      other: "Autre",
      select: "Sélectionnez votre genre",
      woman: "Femme",
    },
    situations: {
      notConcerned: "Je ne suis plus concerné(e) par l'application",
      oneChild: "J'ai un enfant",
      pregnant: "J'attends un enfant",
      pro: "Je suis un professionnel de santé",
      project: "J'ai en projet d'avoir un enfant",
      search: "Je cherche à concevoir un enfant",
      severalChildren: "J'ai plusieurs enfants",
    },
    subTitle: "- Votre profil -",
    title: "À quelle étape êtes-vous ?",
    update: "Modifier ma situation",
    updateModal: {
      content1:
        "D'après la date de naissance que vous avez saisie, vous êtes à l'étape ",
      content2: "Votre situation a-t-elle changé ?",
      title: "Votre situation a-t-elle changée ?",
    },
  },
  search: {
    aroundMe: "Autour de moi",
    articles: "Articles",
    cantLaunchAroundMeSearch:
      "Votre recherche ne peut pas vous apporter d'aide personnalisée, veuillez saisir un autre mot-clé",
    findAdaptedResponses:
      "Trouvez des réponses à vos questions, vos problèmes, et sollicitez de l'aide auprès de professionnels adaptés autour de chez vous.",
    loading: "Chargement...",
    noArticleFound: "Aucun résultat ne correspond à votre recherche",
    title: "Que recherchez-vous ?",
    validButton: "Rechercher",
    writeKeyword:
      "Veuillez saisir votre mot-clé dans la barre de recherche pour afficher les résultats.",
    writeKeywordPlaceholder: "Saisissez ici votre mot-clé",
    yourSearch: "Votre recherche :",
  },
  share: {
    app: {
      message: `Bonjour, je te recommande l’application gratuite et totalement anonyme “1000 premiers jours”, qui est super pour suivre les étapes du projet de parentalité jusqu'aux 2 ans de l'enfant :\n\n${landingPageUrl}\n\nBonne découverte et à bientôt !`,
      title: "1000 premiers jours",
    },
    article: {
      messageEnd: "vous a été partagé.",
      messageStart: "L'article",
    },
    event: {
      messageEnd: "vous a été partagé.",
      messageStart: "L'événement",
    },
  },
  tabs: {
    calendarTitle: "Calendrier",
    favoritesTitle: "Favoris",
    helpTitle: "Recherche",
    homeTitle: "Accueil",
    testEpds: "Post-partum",
  },
  timeline: {
    description:
      "Choisissez dans le parcours ci-dessous l’étape qui vous concerne ou vous intéresse. A chaque étape correspond des informations, recommandations et outils spécifiques pour mieux vous guider et vous accompagner.",
    library: {
      nom: "Parenthèque",
    },
    notification: {
      body: "Vous entrez dans une nouvelle étape du parcours 1000 jours : ",
      redirectTitle: "Modifier ma situation",
      title: "Votre situation a changé ?",
    },
    title: "Choisissez l'étape que vous souhaitez approfondir",
  },
  tndSurvey: {
    onboarding: {
      description:
        "Détecter les signes d’un développement inhabituel chez les enfants de moins de 7 ans",
      reminder:
        "Ce questionnaire n'est pas un diagnostic et ne remplace pas un professionnel de la santé.",
      steps: {
        elements: ["Se questionner", "Trouver une\naide adaptée"],
        title: "Étapes :",
      },
      title: "Repérage des troubles du neuro-développement (TND)",
    },
    surveyContent: {
      instruction:
        'Veuillez répondre aux différentes questions en cochant "Oui" ou "Non".',
      selectAnotherTest: "Choisir un autre test",
      title:
        "Détecter les signes d’un développement inhabituel chez les enfants de moins de 7 ans",
    },
    testSelection: {
      instruction:
        "Veuillez sélectionner un test de repérage selon l'âge de votre enfant.",
      question: "Quel test de repérage souhaitez-vous passer ?",
      title:
        "Détecter les signes d’un développement inhabituel chez les enfants de moins de 7 ans",
    },
  },
  toAccessClickHere: "Pour y accéder, vous pouvez cliquer ici : ",
  version: "v.",
  warning: "Attention",
};
