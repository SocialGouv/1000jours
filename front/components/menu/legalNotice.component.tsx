import type { FC } from "react";
import * as React from "react";
import { View } from "react-native";

import ModalHtmlContent from "../base/modalHtmlContent.component";
import A from "../html/a.component";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import P from "../html/p.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const LegalNotice: FC<Props> = ({ setIsVisible }) => {
  const content = (
    <View>
      <H1>Mentions légales</H1>

      <H2>Éditeur</H2>
      <P>
        Ce site est édité par la Direction générale de la Cohésion sociale : 18
        place des 5-Martyrs-du-Lycée-Buffon 75014 Paris.
      </P>

      <H2>Directeur de la publication</H2>
      <P>
        Madame Virginie LASSERRE, Directrice générale de la cohésion sociale.
      </P>

      <H2>Hébergement du site</H2>
      <P>
        Ce site est hébergé par : Microsoft Azure 39 quai du président Roosevelt
        92130 Issy les Moulineaux.
      </P>

      <H2>Accessibilité</H2>
      <P>
        La conformité aux normes d’accessibilité numérique est un objectif
        ultérieur mais nous tâchons de rendre ce site accessible à toutes et à
        tous.
      </P>

      <H2>Signaler un dysfonctionnement</H2>
      <P>
        Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à
        un contenu ou une fonctionnalité du site, merci de nous en faire part.
        Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en
        droit de faire parvenir vos doléances ou une demande de saisine au
        Défenseur des droits.
      </P>

      <H2>En savoir plus</H2>
      <P>
        Pour en savoir plus sur la politique d’accessibilité numérique de l’État
        :
      </P>
      <A url="http://references.modernisation.gouv.fr/accessibilite-numerique">
        Référentiel général d'amélioration de l'accessibilité
      </A>

      <H2>Sécurité</H2>
      <P>
        Le site est protégé par un certificat électronique, matérialisé pour la
        grande majorité des navigateurs par un cadenas. Cette protection
        participe à la confidentialité des échanges. En aucun cas les services
        associés à la plateforme ne seront à l’origine d’envoi de courriels pour
        demander la saisie d’informations personnelles.
      </P>
    </View>
  );
  return <ModalHtmlContent setIsVisible={setIsVisible} content={content} />;
};

export default LegalNotice;
