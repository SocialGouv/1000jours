import type { FC } from "react";
import * as React from "react";

import htmlFile from "../../assets/html/cgu.html";
import ModalHtmlContent from "../base/modalHtmlContent.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const ConditionsOfUse: FC<Props> = ({ setIsVisible }) => {
  return <ModalHtmlContent setIsVisible={setIsVisible} htmlFile={htmlFile} />;
};

export default ConditionsOfUse;
