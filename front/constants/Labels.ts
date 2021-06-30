import { IcomoonIcons } from "../components/base/icomoon.component";
import { NUMBER_OF_DAYS_NOTIF_REMINDER } from "./epdsConstants.constants";
import { epdsInformation } from "./epdsResultInformation.constants";

export default {
  aroundMe: {
    addressesListLabelEnd:
      "points d'intérêts qui correspondent à vos critères :",
    addressesListLabelStart: "Il y a",
    chooseFilter:
      "Veuillez choisir un au moins un élément dans le filtre afin de lancer la recherche",
    filter: {
      healthProfessional: "Professionnels de santé",
      steps: "Étapes du parcours 1000 jours",
      structures: "Structures",
      thematics: "Thématiques",
      title: "Filtrer",
    },
    goThere: "M'y rendre",
    instruction: "Renseignez le code postal de votre recherche.",
    noAddressFound: "Aucune adresse n'a été trouvée dans cette zone",
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
    searchButton: "Rechercher",
    title: "Autour de moi",
  },
  article: {
    didYouKnowTitle: "Le saviez-vous ?",
    firstThreeMonths: {
      buttonLabel: "Commencer",
      description:
        "Se poser les bonnes questions pour en parler à un professionnel de santé, c’est l’objectif de cet outil.",
      title: "Et si c'était la dépression post-partum ?",
    },
    inShortTitle: "En bref :",
    learnMoreAboutIt: "En savoir plus à ce sujet :",
  },
  buttons: {
    back: "Retour",
    cancel: "Annuler",
    contact: "Contacter",
    finish: "Terminer",
    next: "Suivant",
    ok: "Ok",
    pass: "Passer",
    start: "Commencer",
    validate: "Valider",
  },
  calendar: {
    description:
      "Grâce à la date de naissance que vous avez saisie, accédez à votre calendrier personnalisé et suivez chaque étape du parcours 1000 jours.",
    listOfEvents: "Liste des événements",
    noChildBirthday: "Aucune date de naissance",
    noEventMessage: "Aucun événement",
    today: "Aujourd'hui",
  },
  dateFormatLabel: "Jour / Mois / Année",
  epdsSurvey: {
    description:
      "Vous venez d'avoir un bébé et nous aimerions savoir comment vous vous sentez.",
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
            "La dépression post-partum touche 1 femme sur 5 en France (ainsi que les hommes).",
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
            "Cochez la réponse qui vous semble le mieux décrire la façon dont vous vous êtes senti(e) durant la semaine passée.",
          title: "Comment",
        },
        {
          boldIndexes: [],
          description:
            "Parce que nous souhaitons que vous puissiez échanger avec votre professionnel de confiance, le score n’est ni indiqué, ni accessible. II est important de le passer en présence d’un professionnel de santé, qui est le seul à pouvoir poser un diagnostic.",
          title: "Informations",
        },
        {
          boldIndexes: [],
          description:
            "Bénéficier de soutien limite les facteurs de stress, tout à fait normal, durant les premiers mois de bébé. Des ressources et solutions existent pour vous accompagner.",
          title: "Recommandations",
        },
      ],
      reminder:
        "Ce questionnaire n'est pas un diagnostic et ne remplace pas un professionnel de la santé.",
      steps: {
        elements: [
          "Passer le test",
          "Accéder aux résultats",
          "Trouver une aide adaptée",
          "Repasser le test",
        ],
        title: "Étapes",
      },
      title: "Dépression post partum, en parler c’est soigner !",
    },
    previousSurvey: {
      continueButton: "Continuer",
      messsage:
        "Il semble que vous n'ayez pas terminé le précédent questionnaire. Voulez-vous le continuer ou le recommencer ?",
      startOverButton: "Recommencer",
    },
    restartSurvey: "Repasser le test",
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
            paragraphs: epdsInformation.professionnelsAccompagnerPasBien,
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
      retakeTestInvitation: `Vous serez invité à repasser le test dans ${NUMBER_OF_DAYS_NOTIF_REMINDER} jours`,
    },
    title: "Et si c'était une dépression post-partum ?",
    titleResults: "Résultat",
  },
  errorMsg: "Une erreur est survenue, merci de réessayer plus tard",
  errorNetworkMsg:
    "Vous êtes très nombreux à vous connecter en ce moment mais nous faisons tout notre possible pour que vous puissiez vous connecter rapidement. Nous vous invitons à vous reconnecter dans quelques minutes.",
  invalidDate: "La date saisie n'est pas valide.",
  invalidLink: "Ce lien n'est pas valide.",
  listArticles: {
    articlesToRead: "article(s) à lire",
    filters: "Filtrer",
  },
  version: "v.",
  menu: {
    conditionsOfUse: "Politiques de confidentialité",
    legalNotice: "Mentions légales",
    myProfil: "Mon profil",
    title: "Menu",
  },
  onboarding: {
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
  profile: {
    childBirthday: {
      firstChild: "Date de naissance de votre enfant",
      lastChild: "Date de naissance de votre enfant le plus jeune",
      planned: "Naissance prévue de votre enfant",
    },
    situations: {
      oneChild: "J'ai un enfant",
      pregnant: "J'attends un enfant",
      pro: "Je suis un professionnel de santé",
      project: "J'ai en projet d'avoir un enfant",
      search: "Je cherche à concevoir un enfant",
      severalChildren: "J'ai plusieurs enfants",
    },
    subTitle: "- Votre profil -",
    title: "A quelle étape êtes-vous ?",
  },
  tabs: {
    aroundMeTitle: "Autour de moi",
    calendarTitle: "Calendrier",
    favoritesTitle: "Favoris",
    homeTitle: "Accueil",
    testEpds: "Post-partum",
  },
  timeline: {
    description:
      "Choisissez dans le parcours ci-dessous l’étape qui vous concerne ou vous intéresse. A chaque étape correspond des informations, recommandations et outils spécifiques pour mieux vous guider et vous accompagner.",
    notification: {
      body: "Vous entrez dans une nouvelle étape du parcours 1000 jours : ",
      redirectTitle: "Modifier ma situation",
      title: "Votre situation a changé ?",
    },
    title: "Choisissez l'étape que vous souhaitez approfondir",
  },
  warning: "Attention",
};
