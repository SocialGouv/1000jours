export type RootStackParamList = {
  onboarding: undefined;
  profile: undefined;
  root: undefined;
  notFound: undefined;
};

export type BottomTabParamList = {
  tabOne: undefined;
  tabTwo: undefined;
};

export type TabOneParamList = {
  tabOneScreen: undefined;
};

export type TabTwoParamList = {
  tabTwoScreen: undefined;
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
