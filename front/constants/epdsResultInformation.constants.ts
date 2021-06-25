import { IcomoonIcons } from "../components/base/icomoon.component";

const epdsContacts = [
  {
    contactName: "FNEPE",
    openingTime: "Du lundi au samedi 10h-13h et 14h-20h",
    phoneNumber: "0 805 382 300",
    thematic:
      "Ligne dédiée à l'écoute des parents qui éprouvent des difficultés dans leurs relations avec leurs enfants.",
  },
  {
    contactName: "Les Pates au beurre",
    openingTime: "Du lundi au vendredi de 9h à 21h et le samedi de 9h à 12h.",
    phoneNumber: "02 40 16 06 52",
    thematic:
      "Ligne dédiée à l'écoute des parents qui éprouvent des difficultés dans leurs relations avec leurs enfants.",
  },
  {
    contactName: "Enfance & Covid",
    openingTime: "Du lundi au samedi de 10h à 18h",
    phoneNumber: "0 805 827 827",
    thematic: "Grossesse - naissance - parents de bébés",
  },
  {
    contactName: "Enfance et Partage",
    openingTime: "Du lundi à vendredi de 10h à 13h et de 14h à 17h",
    phoneNumber: "0 800 00 3456",
    thematic: "Grossesse - naissance - parents de bébés",
  },
  {
    contactName: "Parentalité Créative",
    openingTime:
      "Du lundi au samedi de 9h à 12h et de 14h à 17h\nNocturne en plus les mercredi et vendredis : de 20h à 22h.",
    phoneNumber: "0 974 763 963",
    thematic: "Inquiétudes et angoisses liées à la famille",
  },
  {
    contactName: "Psychologues Sans Frontières",
    openingTime: "Du lundi au dimanche de 9h à 12h30 et de 13h30 à 17h",
    phoneNumber: "0 805 383 922",
    thematic: "Entretiens  psychologique en français, anglais et arabe.",
  },
  {
    contactName: "E-enfance",
    openingTime: "Du lundi au vendredi de 9h à 20h et le samedi de 9h à 18h",
    phoneNumber: " 0 800 200 000",
    thematic:
      "Numérique: protection de l'enfance sur le numérique et parentalité numérique (cyberharcèlment…)",
  },
  {
    contactName: "Jumeaux et Plus",
    openingTime: "Du lundi au samedi de 9h à 21h",
    phoneNumber: "0 974 763 963",
    thematic: "Naissance et éducation de jumeaux, triplés et plus",
  },
  {
    contactName: "SOS Prema",
    openingTime:
      "lundi: 10h-12h et 14h-16h\nmardi : 10h-12h\nmercredi: 10h-12\njeudi: 14h-16h",
    phoneNumber: "0 800 96 60 60",
    thematic: "Prématurité",
  },
];

const sitesEnLigneBienEtMoinsBien = {
  title: "Les sites en ligne d’accompagnement à la parentalité et de santé",
  urls: [
    "agir-pour-bebe.fr",
    "monenfant.fr",
    "mpedia.fr",
    "ameli.fr",
    "psycom.org",
  ],
};

const sitesEnLignePasBien = {
  title: "Les sites en ligne d’accompagnement à la parentalité et de santé",
  urls: [...sitesEnLigneBienEtMoinsBien.urls, "maman-blues.fr"],
};

export const epdsInformation = {
  associationsLocalesNationalesSoutienParentalite: {
    description:
      "Il existe de nombreuses structures associatives qui ont pour but de venir en aide aux parents et nouveaux parents. Nous avons recensé un certain nombre qui pourront vous être utile. Ces associations proposent souvent des espaces de dialogue pour échanger entre pairs  (consulter la cartographie)",
    title:
      "Les associations locales et nationales de soutien à la parentalité (café des parents, groupes de paroles, groupes naissances, etc.)",
  },
  entretienAupresProfessionnelSante: {
    description:
      "il permet de vous rassurer sur vos compétences et de réactiver si besoin des aides spécifiques: suivi postnatal, allaitement, soutien à la parentalité, aide à domicile. Cet entretien pris en charge est donc l’occasion d’échanger avec votre professionnel de santé de confiance.",
    title:
      "Un entretien auprès du professionnel de santé qui vous suit (référent maternité, médecin traitant, sage-femme, gynécologue, infirmière puéricultrice) :",
  },
  laep: {
    description:
      "Le Laep est un espace convivial qui accueille, de manière libre et sans inscription, de jeunes enfants âgés de moins de 6 ans accompagnés de leur(s) parent(s) ou d’un adulte référent. Cette structure, adaptée à l’accueil de jeunes enfants, constitue un espace de jeu libre pour les enfants et un lieu de parole pour les parents. Elle est ouverte sur des temps déterminés par des accueillants (professionnels et/ou bénévoles) formés à l’écoute et garants des règles de vie spécifiques à ce lieu. Il peut en exister plusieurs autour de vous, n’hésitez pas à consulter la cartographie",
    title: "Les lieux d’accueil enfant et parents (LAEP)",
  },
  pmiVeritableAllieParents: {
    description:
      "centre d’informations, d’accompagnement, et d’orientation pour vous et votre enfant, A l’écoute des parents, les nombreux professionnels de santé pourront vous proposer une prise en charge complète : consulter la cartographie pour prendre rendez-vous avec votre PMI de proximité.",
    title: "La PMI est un véritable allié pour les futurs parents,",
  },
  professionnelsAccompagnerPasBien: [
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
        "Le parent peut y être hospitalisé à temps complet ou juste pour la journée. Dans ces unités, une équipe pluridisciplinaire effectue un travail pour permettre au parent de reprendre confiance en lui, afin de soutenir le lien avec son enfant. Cette hospitalisation vise à développer du lien d’attachement avec le bébé, un besoin qui lui est essentiel.",
      title: "Les unités parents enfants",
    },
    {
      description:
        "Une aide à domicile permet aux parents de reprendre confiance en eux. Le soutien sur les aspects matériels ne sont donc pas à négliger, comme un soutien pour les tâches ménagères (recours à une aide-ménagère) et les soins au bébé (recours à une technicienne de l’intervention sociale et familiale – TISF), consulter le site la CAF et la cartographie pour identifier les associations de services d’aide et d’accompagnement à domicile",
      pdfUrl:
        "https://www.perinatalite-occitanie.fr/sites/rpo/files/pdf/TROUBLES%20EMOTIONNELS%20ET%20PSYCHIQUES%20DES%20MERES%20EN%20P.pdf",
      title: "Les visites à domicile",
    },
  ],
  reseauPerinatalSante: {
    description:
      "afin que les femmes enceintes accouchent en toute sécurité et en toute sérénité.  Les professionnels adhérents aux réseaux de périnatalité s’engageant à orienter la femme enceinte vers d’autres professionnels selon l’évolution de sa grossesse, et les nouveau-nés selon leur état de santé. Il est important de préciser que le réseau ne se substitue pas au suivi médical exercé par le praticien ou la sage-femme. Vous pourrez bénéficier d’un suivi dans le cadre du réseau de périnatalité si vous souhaitez, le médecin ou la sage-femme en charge du suivi de votre grossesse, pourra alors vous indiquer la marche à suivre pour ouvrir un dossier périnatal partagé, dont elle sera la détentrice. S vous souhaitez plus d’informations, vous pouvez contacter le réseau périnatal en santé de votre territoire.",
    title:
      "Le réseau périnatal en santé permet le partage de leurs compétences ",
  },
  sectionRessourcesNumeriquesBienEtMoinsBien: {
    paragraphs: [
      {
        contacts: epdsContacts,
        title: "Les lignes téléphoniques d'aide aux parents",
      },
      sitesEnLigneBienEtMoinsBien,
    ],
    sectionIcon: IcomoonIcons.telephone,
    sectionTitle:
      "Les ressources numériques ou à distance qui vous apporteront l’information nécessaire",
  },
  sectionRessourcesNumeriquesPasBien: {
    paragraphs: [
      {
        contacts: epdsContacts,
        title: "Les lignes téléphoniques d'aide aux parents",
      },
      sitesEnLignePasBien,
    ],
    sectionIcon: IcomoonIcons.telephone,
    sectionTitle:
      "Les ressources numériques ou à distance qui vous apporteront l’information nécessaire",
  },
  servicesAidesAccompagnementDomicile: {
    description:
      "TISF : le Service d’Aide à domicile (SAAD) propose un accompagnement par un travailleur ou une travailleuse en intervention sociale et familiale (TISF) qui peut intervenir de manière intensive dans les premières semaines en des besoins de la famille. Pour plus d’informations, vous pouvez vous rapprocher de la CAF de votre domicile.\n\nLa PMI peut effectuer des visites à domicile si vous en ressentez le besoin. Au retour à domicile avec votre enfant, la PMI peut vous venir en soutien notamment pour vous aider sur les premiers gestes autour de bébé et plus largement vous aider dans votre nouveau rôle de parents. Appelez votre PMI de rattachement pour prendre rendez-vous.",
    title: "Les services d’aides d’accompagnement à domicile",
  },
};
