import type { FC } from "react";
import * as React from "react";

import { Colors, Sizes } from "../../constants";
import Icomoon from "../base/icomoon.component";

interface Props {
  name: string;
}

const StepIconLibrary: FC<Props> = ({ name }) => (
  <Icomoon name={name} color={Colors.primaryBlue} size={Sizes.xxxxl} />
);

export default StepIconLibrary;
