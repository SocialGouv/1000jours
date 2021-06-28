import type { FC } from "react";
import * as React from "react";

import { Colors, Sizes } from "../../constants";
import Icomoon from "../base/icomoon.component";

interface Props {
  name: string;
  active: boolean;
}

const StepIcon: FC<Props> = ({ name, active }) => (
  <Icomoon
    name={name}
    color={active ? Colors.white : Colors.primaryYellow}
    size={Sizes.xxxxl}
  />
);

export default StepIcon;
