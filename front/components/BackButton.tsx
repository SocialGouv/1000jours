import * as React from "react";

import IconArrowLeft from "../assets/images/icone retour.svg";
import Colors from "../constants/Colors";
import Button from "./form/Button";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => void;
  color?: string;
}

const BackButton: React.FC<Props> = ({
  action,
  color = Colors.secondaryGreen,
}) => {
  return (
    <Button
      title="Retour"
      icon={<IconArrowLeft width={24} />}
      rounded={false}
      disabled={false}
      action={action}
      titleStyle={{ color }}
    />
  );
};

export default BackButton;
