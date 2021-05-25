import type { FC } from "react";
import * as React from "react";

import htmlFile from "../assets/html/mentions_legales.html";
import { Modal } from "../components";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const LegalNotice: FC<Props> = ({ setIsVisible }) => {
  return <Modal setIsVisible={setIsVisible} htmlFile={htmlFile} />;
};

export default LegalNotice;
