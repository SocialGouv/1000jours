import type { FC } from "react";
import * as React from "react";

import { Loader } from "../../components/baseComponents";

interface Props {
  noLoader?: boolean;
  noLoaderBackdrop?: boolean;
}

export const GraphQLLoader: FC<Props> = ({ noLoader, noLoaderBackdrop }) => {
  const showLoader = !(noLoader !== undefined && noLoader);
  const loaderBackdrop = !(noLoaderBackdrop !== undefined && noLoaderBackdrop);

  return showLoader ? <Loader backdrop={loaderBackdrop} /> : null;
};
