import { epdsInformation } from "./epdsResultInformation.constants";

export default {
  aroundMe: {
    instruction:
      "Trouvez tous les professionnels autour de vous qui pourront vous aider dans votre rôle de parents.",
    noAddressFound: "Aucune adresse n'a été trouvée dans cette zone",
    postalCodeInputPlaceholder: "Rechercher par code postal",
    postalCodeInvalid: "Le code postal que vous avez saisi n'est pas valide",
    postalCodeNotFound: "Le code postal que vous recherchez n'a pas été trouvé",
    relaunchSearch: "Relancer la recherche",
    searchButton: "Rechercher",
    title: "Autour de moi",
  },
  article: {
    didYouKnowTitle: "Le saviez-vous ?",
    firstThreeMonths: {
      buttonLabel: "Faire le test",
      description:
        "Vous venez d'avoir un bébé. Vous souhaitez savoir comment vous vous portez psychologiquement ?",
      title: "Autodépistage dépression post-partum",
    },
    inShortTitle: "En bref :",
  },
  buttons: {
    back: "Retour",
    cancel: "Annuler",
    finish: "Terminer",
    next: "Suivant",
    ok: "Ok",
    pass: "Passer",
    start: "Commencer",
    validate: "Valider",
  },
  calendar: {
    description:
      "Ici vous pouvez suivre tous vos rendez-vous et autres événements prévus. Vous pouvez y ajouter plusieurs informations.",
    listOfEvents: "Liste des événements",
    noChildBirthday: "Aucune date de naissance",
    noEventMessage: "Aucun événement",
  },
  dateFormatLabel: "dd/mm/yyyy",
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
    },
    instruction:
      "Veuillez cocher la réponse qui vous semble décrire le mieux comment vous vous êtes sentie au cours des 7 derniers jours et pas seulement aujourd'hui.",
    previousSurvey: {
      continueButton: "Continuer",
      messsage:
        "Il semble que vous n'ayez pas terminé le précédent questionnaire. Voulez-vous le continuer ou le recommencer ?",
      startOverButton: "Recommencer",
    },
    resultats: {
      call: "Appeler",
      entreDixEtDouze: {
        explication:
          "Il est possible que vous souffriez de problèmes liés à une dépression, mais ce n’est pas certain. N'hésitez pas à transmettre ces résultats ou à parler de votre ressenti actuel avec votre médecin ou le professionnel de santé qui suit votre grossesse. Il pourra poser un diagnostic plus précis. Vous pouvez également en parler à votre conjoint, des amis ou un membre de votre famille.",
        intervalle: "(10, 11, 12)",
        professionalsList: [
          {
            paragraphs: [
              epdsInformation.entretienAupresProfessionnelSante,
              epdsInformation.pmiVeritableAllieParents,
              epdsInformation.reseauPerinatalSante,
            ],
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          {
            paragraphs: [
              epdsInformation.servicesAidesAccompagnementDomicile,
              epdsInformation.laep,
              epdsInformation.associationsLocalesNationalesSoutienParentalite,
            ],
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
          "Un score de 9 ou moins est très rassurant au regard de la dépression. Mais, si vous en ressentez le besoin, vous pouvez consulter votre médecin traitant ou le professionnel qui suit votre grossesse pour faire le point sur votre état émotionnel. Si vous pensez que vous êtes une personne à risque de dépression, n’hésitez pas à refaire régulièrement ce test, en laissant au moins deux semaines entre chaque usage.",
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
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          epdsInformation.sectionRessourcesNumeriquesBienEtMoinsBien,
        ],
        stateOfMind: "Je vais bien",
      },
      plusDeTreize: {
        explication:
          "Votre score laisse penser que vous êtes en train de faire une dépression. Il faut consulter un professionnel de santé qui confirmera ou non, par un diagnostic. Si vous ne l’avez pas déjà fait, nous vous conseillons de consulter votre médecin (généraliste ou spécialiste) ou de contacter un professionnel de santé mentale afin de faire avec lui un bilan approfondi de votre état émotionnel et psychologique. Ce n’est pas une fatalité, la dépression peut être guérie grâce à un soutien de votre famille, de vos amis ou d’un professionnel de santé, ou par une psychothérapie ou d’autres moyens, comme une aide médicamenteuse...",
        intervalle: "(13 ou plus)",
        professionalsList: [
          {
            paragraphs: epdsInformation.professionnelsAccompagnerPasBien,
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
            sectionTitle:
              "Les ressources qui peuvent vous aider les premiers mois de l’enfant",
          },
        ],
        stateOfMind: "Je ne vais pas bien",
      },
    },
    title: "Autodépistage dépression post-partum",
  },
  errorMsg: "Une erreur est survenue, merci de réessayer plus tard",
  invalidDate: "La date saisie n'est pas valide.",
  invalidLink: "Ce lien n'est pas valide.",
  listArticles: {
    articlesToRead: "article(s) à lire",
    filters: "Filtres",
  },
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
          "« Nos 1000 jours », c’est votre compagnon unique des 1000 premiers jours pour prendre soin de vous, votre famille et votre enfant. Tout au long du parcours et au moment où vous en avez besoin, l’application vous guide « pas à pas » pour vous accompagner au quotidien.",
        title: "Bienvenue sur l'application",
      },
      {
        description:
          "Des informations ciblées à chaque étape du parcours, des messages de santé publique actualisés, des contenus centralisés, et des services spécialement dédiés aux parents. Vous disposerez de l’ensemble des clefs pour devenir le parent que vous souhaitez.",
        title: "Trouver l'information",
      },
      {
        description:
          "Pour vous apporter la bonne information au bon moment, vous pouvez nous informer précisément du moment 1000 jours que vous vivez. Les 8 étapes du parcours « Nos 1000 jours » sont l’occasion de répondre précisément à votre besoin.",
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
  },
  timeline: {
    description:
      "Choisissez dans le parcours ci-dessous l’étape qui vous concerne ou vous intéresse. A chaque étape correspond des informations, recommandations et outils spécifiques pour mieux vous guider et vous accompagner.",
    title: "Choisissez l'étape que vous souhaitez approfondir",
  },
  warning: "Attention",
};
