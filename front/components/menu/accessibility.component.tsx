import type { FC } from "react";
import * as React from "react";

import htmlFile from "../../assets/html/accessibilite.html";
import ModalHtmlContent from "../base/modalHtmlContent.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const Accessibility: FC<Props> = ({ setIsVisible }) => {
  return <ModalHtmlContent setIsVisible={setIsVisible} htmlFile={htmlFile} />;
};

export default Accessibility;
