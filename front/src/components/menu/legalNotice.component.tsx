/* eslint-disable react/no-unescaped-entities */
import type { FC } from "react";
import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";

import { Styles } from "../../styles";
import A from "../html/a.component";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import P from "../html/p.component";

const LegalNotice: FC = () => {
  return (
    <ScrollView
      style={Styles.modalFullScreen.mainContainer}
      contentContainerStyle={Styles.modalFullScreen.scrollviewContent}
    >
      <H1>Mentions légales</H1>

      <H2>Éditeur</H2>
      <P>
        Cette application est éditée par la Direction générale de la Cohésion
        sociale au sein de la Fabrique numérique des ministères sociaux :
      </P>
      <P>18 place des 5-Martyrs-du-Lycée-Buffon, 75014 Paris</P>

      <H2>Directeur de la publication</H2>
      <P>
        Monsieur Jean-Benoît DUJOL, Directeur général de la cohésion sociale.
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
      <A url="https://accessibilite.numerique.gouv.fr/">
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
    </ScrollView>
  );
};

export default LegalNotice;
