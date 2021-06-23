import type { FC } from "react";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  onboarding: undefined;
  profile: undefined;
  root: undefined;
  notFound: undefined;
  loading: undefined;
  legalNotice: undefined;
  conditionsOfUse: undefined;
};

export type BottomTabParamList = {
  tabHome: undefined;
  tabCalendar: undefined;
  tabFavorites: undefined;
  tabAroundMe: undefined;
};

export type TabHomeParamList = {
  tabHomeScreen: undefined;
  listArticles: { step: Step };
  article: { id: number; step: Step };
  epdsSurvey: undefined;
};

export type TabCalendarParamList = {
  tabCalendarScreen: undefined;
};

export type TabEpdsParamList = {
  tabEpdsScreen: undefined;
};

export type TabFavoritesParamList = {
  tabFavoritesScreen: undefined;
};

export type TabAroundMeParamList = {
  tabAroundMeScreen: undefined;
};

export type UserSituation = {
  id: string;
  label: string;
  isChecked: boolean;
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
};

export type TabItem = {
  name: keyof BottomTabParamList;
  component: FC;
  getIcon: (color: string) => React.ReactNode;
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
  description: string;
  debut: number;
  fin: number;
};
export type AgendaItems<TEvent> = Record<string, TEvent[]>;

export type Thematique = {
  id: number;
  nom: string;
};
export type Visuel = {
  url: string;
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
};

export type ApolloHealthResponse = {
  status: string;
};

export type NotificationStyle = {
  icon: string;
  color: string;
};
