import * as React from "react";

import Colors from "../constants/Colors";
import Labels from "../constants/Labels";
import Button from "./form/Button";
import Icomoon, { IcomoonIcons } from "./Icomoon";

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
      title={Labels.buttons.back}
      icon={
        <Icomoon
          name={IcomoonIcons.retour}
          size={14}
          color={Colors.secondaryGreen}
        />
      }
      rounded={false}
      disabled={false}
      action={action}
      titleStyle={{ color }}
    />
  );
};

export default BackButton;
