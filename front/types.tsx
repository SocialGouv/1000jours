import type { FC } from "react";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RootStackParamList = {
  onboarding: undefined;
  profile: undefined;
  root: undefined;
  notFound: undefined;
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
};

export type TabCalendarParamList = {
  tabCalendarScreen: undefined;
};

export type TabFavoritesParamList = {
  tabFavoritesScreen: undefined;
};

export type TabAroundMeParamList = {
  tabAroundMeScreen: undefined;
};

export type UserSituation = {
  id: number;
  label: string;
  isChecked: boolean;
};

export type UserContext = {
  situations: UserSituation[];
  childBirthday: Date | null;
};

export type TabItem = {
  name: keyof BottomTabParamList;
  component: FC;
  icon: React.ReactNode;
  title: string;
};

export type Step = {
  id: number;
  ordre: number;
  nom: string;
  description: string;
};

export type ThematiqueContainer = {
  thematique: Thematique;
};
export type Thematique = {
  id: number;
  nom: string;
};
export type UploadFile = {
  url: string;
};
export type Visuel = {
  uploadFile: UploadFile;
};
export type Article = {
  id: number;
  titre: string;
  resume: string;
  texte1: string;
  visuel?: Visuel;
  thematiques: ThematiqueContainer[];
};
