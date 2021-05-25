import type { FC } from "react";
import * as React from "react";

import htmlFile from "../assets/html/cgu.html";
import { Modal } from "../components";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const ConditionsOfUse: FC<Props> = ({ setIsVisible }) => {
  return <Modal setIsVisible={setIsVisible} htmlFile={htmlFile} />;
};

export default ConditionsOfUse;
