import type { FC } from "react";
import * as React from "react";

import { Colors, Sizes } from "../../constants";
import Icomoon from "../base/icomoon.component";

interface Props {
  name: string;
}

const StepIcon: FC<Props> = ({ name }) => (
  <Icomoon name={name} color={Colors.primaryYellow} size={Sizes.xxxxl} />
);

export default StepIcon;
