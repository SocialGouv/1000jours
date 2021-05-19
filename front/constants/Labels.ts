import { epdsContacts } from "./epdsContacts.constants";

export default {
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
              {
                description:
                  "Il permet de vous rassurer sur vos compétences et de réactiver si besoin des aides spécifiques: suivi postnatal, allaitement, soutien à la parentalité, aide à domicile. Cet entretien pris en charge est donc l’occasion d’échanger avec votre professionnel de santé de confiance. ",
                title:
                  "Un entretien auprès du professionnel de santé qui vous suit (référent maternité, médecin traitant, sage-femme, gynécologue, infirmière puéricultrice)",
              },
              {
                description:
                  "centre d’informations, d’accompagnement, et d’orientation pour vous et votre enfant, A l’écoute des parents, les nombreux professionnels de santé pourront vous proposer une prise en charge complète : consulter la cartographie pour prendre rendez-vous avec votre PMI de proximité.",
                title: "La PMI est un véritable allié pour les futurs parents,",
              },
              {
                description:
                  "afin que les femmes enceintes accouchent en toute sécurité et en toute sérénité.  Les professionnels adhérents aux réseaux de périnatalité s’engageant à orienter la femme enceinte vers d’autres professionnels selon l’évolution de sa grossesse, et les nouveau-nés selon leur état de santé. Il est important de préciser que le réseau ne se substitue pas au suivi médical exercé par le praticien ou la sage-femme. Vous pourrez bénéficier d’un suivi dans le cadre du réseau de périnatalité si vous souhaitez, le médecin ou la sage-femme en charge du suivi de votre grossesse, pourra alors vous indiquer la marche à suivre pour ouvrir un dossier périnatal partagé, dont elle sera la détentrice. S vous souhaitez plus d’informations, vous pouvez contacter le réseau périnatal en santé de votre territoire.",
                title:
                  "Le réseau périnatal en santé permet le partage de leurs compétences ",
              },
            ],
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          {
            paragraphs: [
              {
                description:
                  "TISF : le Service d’Aide à domicile (SAAD) propose un accompagnement par un travailleur ou une travailleuse en intervention sociale et familiale (TISF) qui peut intervenir de manière intensive dans les premières semaines en des besoins de la famille. Pour plus d’informations, vous pouvez vous rapprocher de la CAF de votre domicile.\n\nLa PMI peut effectuer des visites à domicile si vous en ressentez le besoin. Au retour à domicile avec votre enfant, la PMI peut vous venir en soutien notamment pour vous aider sur les premiers gestes autour de bébé et plus largement vous aider dans votre nouveau rôle de parents. Appelez votre PMI de rattachement pour prendre rendez-vous.",
                title: "Les services d’aides d’accompagnement à domicile",
              },
              {
                description:
                  "Le Laep est un espace convivial qui accueille, de manière libre et sans inscription, de jeunes enfants âgés de moins de 6 ans accompagnés de leur(s) parent(s) ou d’un adulte référent. Cette structure, adaptée à l’accueil de jeunes enfants, constitue un espace de jeu libre pour les enfants et un lieu de parole pour les parents. Elle est ouverte sur des temps déterminés par des accueillants (professionnels et/ou bénévoles) formés à l’écoute et garants des règles de vie spécifiques à ce lieu. Il peut en exister plusieurs autour de vous, n’hésitez pas à consulter la cartographie",
                title: "Les lieux d’accueil enfant et parents (LAEP)",
              },
              {
                description:
                  "Il existe de nombreuses structures associatives qui ont pour but de venir en aide aux parents et nouveaux parents. Nous avons recensé un certain nombre qui pourront vous être utile. Ces associations proposent souvent des espaces de dialogue pour échanger entre pairs  (consulter la cartographie)",
                title:
                  "Les associations locales et nationales de soutien à la parentalité (café des parents, groupes de paroles, groupes naissances, etc.)",
              },
            ],
            sectionTitle:
              "Les ressources qui peuvent vous aider les premiers mois de l’enfant",
          },
          {
            paragraphs: [
              {
                contacts: epdsContacts.contacts,
                title:
                  "Les sites en ligne d’accompagnement à la parentalité et de santé",
              },
              {
                description:
                  "agirpourbébé.fr, monenfant.fr, mpedia.fr ; ameli.fr, psychom.fr",
                title: "Les lignes téléphoniques d'aide aux parents",
              },
            ],
            sectionTitle:
              "Les ressources numériques ou à distance qui vous apporteront l’information nécessaire",
          },
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
              {
                description:
                  "il permet de vous rassurer sur vos compétences et de réactiver si besoin des aides spécifiques: suivi postnatal, allaitement, soutien à la parentalité, aide à domicile. Cet entretien pris en charge est donc l’occasion d’échanger avec votre professionnel de santé de confiance.",
                title:
                  "Un entretien auprès du professionnel de santé qui vous suit (référent maternité, médecin traitant, sage-femme, gynécologue, infirmière puéricultrice) :",
              },
              {
                description:
                  "centre d’informations, d’accompagnement, et d’orientation pour vous et votre enfant, A l’écoute des parents, les nombreux professionnels de santé pourront vous proposer une prise en charge complète : consulter la cartographie pour prendre rendez-vous avec votre PMI de proximité.",
                title: "La PMI est un véritable allié pour les futurs parents,",
              },
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
          {
            paragraphs: [
              {
                contacts: epdsContacts.contacts,
                title:
                  "Les sites en ligne d’accompagnement à la parentalité et de santé",
              },
              {
                description:
                  "agirpourbébé.fr, monenfant.fr, mpedia.fr ; ameli.fr, psychom.fr",
                title: "Les lignes téléphoniques d'aide aux parents",
              },
            ],
            sectionTitle:
              "Les ressources numériques ou à distance qui vous apporteront l’information nécessaire",
          },
        ],
        stateOfMind: "Je vais bien",
      },
      plusDeTreize: {
        explication:
          "Votre score laisse penser que vous êtes en train de faire une dépression. Il faut consulter un professionnel de santé qui confirmera ou non, par un diagnostic. Si vous ne l’avez pas déjà fait, nous vous conseillons de consulter votre médecin (généraliste ou spécialiste) ou de contacter un professionnel de santé mentale afin de faire avec lui un bilan approfondi de votre état émotionnel et psychologique. Ce n’est pas une fatalité, la dépression peut être guérie grâce à un soutien de votre famille, de vos amis ou d’un professionnel de santé, ou par une psychothérapie ou d’autres moyens, comme une aide médicamenteuse...",
        intervalle: "(13 ou plus)",
        professionalsList: [
          {
            paragraphs: [
              {
                description:
                  "Le sujet étant délicat, vous pouvez recontacter le professionnel de santé impliqué dans votre suivi prénatal. En vous appuyant sur le lien tissé  avec lui  durant les derniers mois, il sera peut être plus simple pour vous de vous confier sur cette dépression que de nombreuses mamans et papas vivent également. Un entretien auprès du professionnel de santé qui vous suit est donc la première étape à franchir (référent à la maternité, médecin traitant, sage-femme, gynécologue, psychologue, infirmière puéricultrice), contactez-le. Une approche globale d’accompagnement vous sera proposée parmi les dispositifs suivants :",
              },
              {
                description:
                  "Devenir parents procure beaucoup de joie mais aussi des difficultés. On peut avoir parfois une baisse de moral, être angoissé(e) : n’hésitez pas à demander de l’aide à vos proches (famille, amis) et aux professionnels de santé. Ces derniers pourront vous indiquer des lieux et des personnes vers qui vous tourner en cas de difficultés. Des groupes de parents et des associations peuvent aussi être des lieux d’échange et de soutien moral.",
                title: "L'aide de votre entourage",
              },
              {
                description:
                  "C’est un traitement à part entière de la dépression, efficace qui consiste à aider le couple, la mère ou le père à reprendre confiance en lui ou en eux, de s’adapter à l’arrivée de bébé et à son rythme de vie, de renforcer leurs compétences de parents tout facilitant la mise en œuvre d’un nouvel équilibre familial.  Un psychologue, un psychothérapeute ou un psychiatre sont les professionnels vers lesquels vous serez orienté. Ses premiers effets (un soulagement lié à une écoute adaptée) peuvent se faire sentir immédiatement, les changements durables interviennent au bout de quelques semaines. Après la guérison d’un épisode dépressif, la psychothérapie sert aussi à prévenir la réapparition des symptômes. (https://solidarites-sante.gouv.fr/IMG/pdf/guide-8.pdf)",
                title: "La psychothérapie",
              },
              {
                description:
                  "L’utilisation d’antidépresseurs peut être discutée selon les cas. Le professionnel de santé vous conseillera sur les options disponibles si vous allaitez encore. L’objectif du traitement par médicaments antidépresseurs est la réduction significative des symptômes dépressifs et de leurs conséquences dans la vie quotidienne. Les médicaments antidépresseurs améliorent les symptômes de la dépression à l’issue d’environ 3 à 4 semaines de traitement continu. Ils aident généralement à restaurer le fonctionnement normal du sommeil, de l’appétit, à retrouver l’initiative, une perception positive de la vie… Ce fonctionnement normal persiste après l’arrêt du traitement.",
                title: "Les aides médicamenteuses",
              },
              {
                description:
                  "Le parent peut y être hospitalisé à temps complet ou juste pour la journée. Dans ces unités, une équipe pluridisciplinaire effectue un travail pour permettre au parent de reprendre confiance en lui, afin de soutenir le lien avec son enfant. Cette hospitalisation vise à développer du lien d’attachement avec le bébé, un besoin qui lui est essentiel.",
                title: "Les unités parents enfants",
              },
              {
                description:
                  "Une aide à domicile permet aux parents de reprendre confiance en eux. Le soutien sur les aspects matériels ne sont donc pas à négliger, comme un soutien pour les tâches ménagères (recours à une aide-ménagère) et les soins au bébé (recours à une technicienne de l’intervention sociale et familiale – TISF), consulter le site la CAF et la cartographie pour identifier les associations de services d’aide et d’accompagnement à domicile (https://www.perinatalite-occitanie.fr/sites/rpo/files/pdf/TROUBLES%20EMOTIONNELS%20ET%20PSYCHIQUES%20DES%20MERES%20EN%20P.pdf)",
                title: "Les visites à domicile",
              },
            ],
            sectionTitle:
              "Les professionnels qui peuvent vous accompagner pour faire le point",
          },
          {
            paragraphs: [
              {
                contacts: epdsContacts.contacts,
                title:
                  "Les sites en ligne d’accompagnement à la parentalité et de santé",
              },
              {
                description:
                  "agirpourbébé.fr, monenfant.fr, mpedia.fr ; ameli.fr, psychom.fr, maman-blues.fr",
                title: "Les lignes téléphoniques d'aide aux parents",
              },
            ],
            sectionTitle:
              "Les ressources numériques ou à distance qui vous apporteront l’information nécessaire",
          },
          {
            paragraphs: [
              {
                description:
                  "TISF : le Service d’Aide à domicile (SAAD) propose un accompagnement par un travailleur ou une travailleuse en intervention sociale et familiale (TISF) qui peut intervenir de manière intensive dans les premières semaines en des besoins de la famille. Pour plus d’informations, vous pouvez vous rapprocher de la CAF de votre domicile.\n\nLa PMI peut effectuer des visites à domicile si vous en ressentez le besoin. Au retour à domicile avec votre enfant, la PMI peut vous venir en soutien notamment pour vous aider sur les premiers gestes autour de bébé et plus largement vous aider dans votre nouveau rôle de parents. Appelez votre PMI de rattachement pour prendre rendez-vous.",
                title: "Les services d’aides d’accompagnement à domicile",
              },
              {
                description:
                  "Le Laep est un espace convivial qui accueille, de manière libre et sans inscription, de jeunes enfants âgés de moins de 6 ans accompagnés de leur(s) parent(s) ou d’un adulte référent. Cette structure, adaptée à l’accueil de jeunes enfants, constitue un espace de jeu libre pour les enfants et un lieu de parole pour les parents. Elle est ouverte sur des temps déterminés par des accueillants (professionnels et/ou bénévoles) formés à l’écoute et garants des règles de vie spécifiques à ce lieu. Il peut en exister plusieurs autour de vous, n’hésitez pas à consulter la cartographie",
                title: "Les lieux d’accueil enfant et parents (LAEP)",
              },
              {
                description:
                  "Il existe de nombreuses structures associatives qui ont pour but de venir en aide aux parents et nouveaux parents. Nous avons recensé un certain nombre qui pourront vous être utile. Ces associations proposent souvent des espaces de dialogue pour échanger entre pairs  (consulter la cartographie)",
                title:
                  "Les associations locales et nationales de soutien à la parentalité (café des parents, groupes de paroles, groupes naissances, etc.)",
              },
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
};
