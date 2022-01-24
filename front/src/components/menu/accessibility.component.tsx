import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { Paddings } from "../../styles";
import ModalHtmlContent from "../baseComponents/modalHtmlContent.component";
import A from "../html/a.component";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import Li from "../html/li.component";
import P from "../html/p.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const Accessibility: FC<Props> = ({ setIsVisible }) => {
  const content = (
    <View>
      <H1>Accessibilité</H1>

      <H2>Déclaration d’accessibilité</H2>
      <P>
        Le Ministère du travail, de l’emploi et de l’insertion s’engage à rendre
        son service accessible conformément à l’article 47 de la loi n° 2005-102
        du 11 février 2005.
      </P>
      <P>
        À cette fin, il met en œuvre la stratégie et l’action suivante :
        réalisation d’un audit de conformité à l'été de l’année 2021.
      </P>
      <P>
        Cette déclaration d’accessibilité s’applique à l'application "1000
        premiers jours".
      </P>

      <H2>État de conformité</H2>
      <P>
        l'application "1000 premiers jours" n’est pas encore en conformité avec
        le référentiel général d’amélioration de l’accessibilité (RGAA). Le site
        n’a pas encore été audité.
      </P>
      <P>
        Nous tâchons de rendre dès la conception, ce site accessible à toutes et
        à tous.
      </P>

      <H2>Résultat des tests</H2>
      <P>
        L’audit de conformité est en attente de réalisation (été de l’année
        2021).
      </P>

      <H2>Établissement de cette déclaration d’accessibilité</H2>
      <P>Cette déclaration a été établie le 1er juin 2021.</P>

      <H2>Amélioration et contact</H2>
      <P>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter le responsable du site Internet
        index-egapro.travail.gouv.fr pour être orienté vers une alternative
        accessible ou obtenir le contenu sous une autre forme.
      </P>
      <P>E-mail :</P>
      <A url="mailto:contact-nos1000jours@fabrique.social.gouv.fr">
        contact-nos1000jours@fabrique.social.gouv.fr
      </A>
      <P>Nous essayons de répondre le plus rapidement possible.</P>

      <H2>Voies de recours</H2>
      <P>Cette procédure est à utiliser dans le cas suivant.</P>
      <P>
        Vous avez signalé au responsable du site internet un défaut
        d’accessibilité qui vous empêche d’accéder à un contenu ou à un des
        services du portail et vous n’avez pas obtenu de réponse satisfaisante.
      </P>
      <P>Vous pouvez :</P>
      <View style={styles.ul}>
        <Li>Écrire un message au Défenseur des droits</Li>
        <Li>Contacter le délégué du Défenseur des droits dans votre région</Li>
        <Li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
        </Li>
        <View style={styles.ul}>
          <Li>Défenseur des droits</Li>
          <Li>Libre réponse</Li>
          <Li>71120 75342 Paris CEDEX 07</Li>
        </View>
      </View>

      <H2>En savoir plus sur l’accessibilité</H2>
      <P>
        Pour en savoir plus sur la politique d’accessibilité numérique de l’État
        :
      </P>
      <A url="http://references.modernisation.gouv.fr/accessibilite-numerique">
        Référentiel général d'amélioration de l'accessibilité
      </A>
    </View>
  );
  return <ModalHtmlContent setIsVisible={setIsVisible} content={content} />;
};

const styles = StyleSheet.create({
  ul: {
    paddingLeft: Paddings.light,
    paddingTop: Paddings.light,
  },
});

export default Accessibility;
