/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactElement } from "react";

export interface DataFetchingType {
  isFetched: boolean;
  loadingOrErrorComponent?: ReactElement;
  response?: any;
}
