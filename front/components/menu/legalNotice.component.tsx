import type { FC } from "react";
import * as React from "react";

import htmlFile from "../../assets/html/mentions_legales.html";
import ModalHtmlContent from "../base/modalHtmlContent.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const LegalNotice: FC<Props> = ({ setIsVisible }) => {
  return <ModalHtmlContent setIsVisible={setIsVisible} htmlFile={htmlFile} />;
};

export default LegalNotice;
