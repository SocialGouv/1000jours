import type { ReactElement } from "react";
import * as React from "react";

import { Colors } from "../../styles";
import { Icomoon, IcomoonIcons } from "../baseComponents";

const getFavoriteIcon = (
  isFavorite: boolean,
  iconSize: number
): ReactElement => {
  return (
    <Icomoon
      name={isFavorite ? IcomoonIcons.favorisChecked : IcomoonIcons.favoris}
      size={iconSize}
      color={Colors.primaryBlue}
    />
  );
};

export { getFavoriteIcon };
