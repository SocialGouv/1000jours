import type { FC } from "react";
import * as React from "react";

import Colors from "../../constants/Colors";
import Icomoon from "../Icomoon";

interface Props {
  name: string;
}

const StepIcon: FC<Props> = ({ name }) => (
  <Icomoon name={name} color={Colors.primaryYellow} size={45} />
);

export default StepIcon;
