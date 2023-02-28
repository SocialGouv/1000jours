import type { StackNavigationProp } from "@react-navigation/stack";
import type { PoiType } from "@socialgouv/nos1000jours-lib";
import type { FC, ReactNode } from "react";
import type React from "react";
import type { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import type { LatLng } from "react-native-maps";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  onboarding: undefined;
  profile: undefined;
  moodboard: undefined;
  root: undefined;
  notFound: undefined;
  loading: undefined;
  legalNotice: undefined;
  conditionsOfUse: undefined;
  accessibility: undefined;
  infosDev: undefined;
  notificationsCenter: undefined;
  tndSurvey: undefined;
};

export type BottomTabParamList = {
  tabHome: undefined;
  tabCalendar: undefined;
  tabEpds: undefined;
  tabSearch: undefined;
};

export type TabHomeParamList = {
  tabHomeScreen: undefined;
  articleFavorites: undefined;
  articleList: { step: Step };
  articleSwipe: undefined;
  parentheque: { documents?: Document[] };
  article: { id: number; step?: Step };
  epdsSurvey: undefined;
  notificationsCenter: undefined;
};

export type TabCalendarParamList = {
  tabCalendarScreen: undefined;
  eventDetails: { eventId: string };
  article: { id: number; step?: Step };
  aroundMeScreen: undefined;
};

export type TabEpdsParamList = {
  tabEpdsScreen: undefined;
};

export type TabAroundMeParamList = {
  tabAroundMe: undefined;
};

export type TabSearchParamList = {
  tabSearchScreen: undefined;
  aroundMeMapAndList: {
    coordinates: LatLng;
    displayUserLocation: boolean;
  };
};

export type ArticleSwipeRouteParamList = {
  params: {
    id: number;
    step?: Step;
    articles: Article[];
  };
};

export type UserSituation = {
  id: string;
  label: string;
  isChecked: boolean;
  childBirthdayRequired: boolean;
  childBirthdayLabel: string;
};

export type UserContext = {
  situations: UserSituation[];
  childBirthday: Date | null;
};

export type UserInfos = {
  projet?: boolean;
  conception?: boolean;
  grossesse?: boolean;
  enfant?: boolean;
  enfants?: boolean;
  date?: string | null;
  nonConcerne?: boolean;
};

export type TabItem = {
  name: keyof BottomTabParamList;
  component: FC;
  getIcon: (color: string, focused: boolean) => ReactNode;
  title: string;
};

export type Step = {
  id: number;
  ordre: number;
  nom: string;
  description: string | null;
  active: boolean | null;
  debut: number;
  fin: number;
};

export type Event = {
  id: number;
  date?: string;
  nom: string;
  description?: string;
  debut: number;
  fin: number;
  important?: boolean;
  thematique?: Thematique;
  etapes?: Step[];
  articles?: Article[];
  isClosestEvent?: boolean;
  typesPoi?: PoiType[];
};
export type AgendaItems<TEvent> = Record<string, TEvent[]>;

export type Thematique = {
  id: number;
  nom: string;
};
export type Visuel = {
  id: string;
  hash: string;
  url: string;
  height: number;
  width: number;
};

export type Article = {
  id: number;
  titre: string;
  resume: string;
  texteTitre1: string;
  texte1: string;
  texteTitre2: string;
  texte2: string;
  leSaviezVous: string;
  enbrefTexte1: string;
  enbrefTexte2: string;
  enbrefTexte3: string;
  enbrefIcone1: string;
  enbrefIcone2: string;
  enbrefIcone3: string;
  lienTitre1: string;
  lienTitre2: string;
  lienTitre3: string;
  lienTitre4: string;
  lienUrl1: string;
  lienUrl2: string;
  lienUrl3: string;
  lienUrl4: string;
  visuel?: Visuel;
  thematiques: Thematique[];
  hide?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  cartographie_pois_types?: PoiType[];
};

export type ArticleInShortItem = {
  icon: string;
  text: string;
};

export type ArticleFilter = {
  thematique: Thematique;
  nbArticles: number;
  active: boolean;
};

export type ArticleLink = {
  label: string;
  url: string;
};

export type MenuItem = {
  icon: string;
  title: string;
  onPress: () => void;
  subItems?: MenuSubItem[];
};

export type MenuSubItem = {
  title: string;
  onPress: () => void;
};

export type ApolloHealthResponse = {
  status: string;
};

export type NotificationStyle = {
  icon: string;
  color: string;
};

export type Tag = {
  name: string;
  color: string;
  bgColor: string;
};

export type Document = {
  id: number;
  nom: string;
  description: string;
  ordre: number;
  url: string;
  thematique: Thematique;
  etapes?: Step[];
  fichier?: {
    url: string;
  };
};

export type Video = {
  id: number;
  nom: string;
  description?: string;
  ordre: number;
  url: string;
  miniature?: Visuel;
  thematique?: Thematique;
  etapes?: Step[];
};

export type TableData = {
  head: string[];
  data: ReactNode[][] | string[][];
  caption: string;
};

export type ProfileGender = {
  id: string;
  label: string;
};

export type RootNavigationParams = {
  screen?: string;
  params?: RootNavigationParams;
};

export type ArticleListHeaderParams = {
  title: string;
  description?: string;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setTrackerAction: React.Dispatch<React.SetStateAction<string>>;
  navigation: StackNavigationProp<TabHomeParamList>;
};

export type Config = {
  lastAppVersionNumber: string | null;
};

export type MarkedDatesType = Record<string, MarkingProps>;
