import type { ReactElement } from "react";
import * as React from "react";

import FavoriteIcon from "../../assets/images/favori.svg";
import FavoriteCheckedIcon from "../../assets/images/favori_coche.svg";

const getFavoriteIcon = (
  isFavorite: boolean,
  iconSize: number
): ReactElement => {
  return isFavorite ? (
    <FavoriteCheckedIcon height={iconSize} width={iconSize} />
  ) : (
    <FavoriteIcon height={iconSize} width={iconSize} />
  );
};

export { getFavoriteIcon };
