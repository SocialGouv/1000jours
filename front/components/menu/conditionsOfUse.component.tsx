import type { FC } from "react";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { FontWeight, Margins, Paddings } from "../../constants";
import { SecondaryText } from "..";
import ModalHtmlContent from "../base/modalHtmlContent.component";
import A from "../html/a.component";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import H3 from "../html/h3.component";
import H4 from "../html/h4.component";
import Li from "../html/li.component";
import P from "../html/p.component";
import Table from "../html/table.component";

interface Props {
  setIsVisible: (showMenu: boolean) => void;
}

const ConditionsOfUse: FC<Props> = ({ setIsVisible }) => {
  const tableRetentionPeriod = {
    caption: "Durée de conservation",
    data: [
      [
        "Données relatives aux parents",
        "Jusqu’à la suppression de l’application ou jusqu’à 3 ans après le téléchargement de l’application",
      ],
      [
        "Données relatives au PDS",
        "Jusqu’à la suppression de l’application ou jusqu’à 3 ans après le téléchargement de l’application",
      ],
      [
        "Données relatives à l’enfant",
        "Jusqu’à la suppression de l’application ou jusqu’à 3 ans après le téléchargement de l’application",
      ],
      [
        "Données relatives au formulaire et à l’envoi de la bébé box",
        "Jusqu’à 1 an après l’envoi de la box",
      ],
      [
        "Données d’hébergeur",
        "1 an, conformément au décret n°2021-1363 du 20 octobre 2021",
      ],
    ],
    head: ["Types de données", "Durée de conservation"],
  };

  const tableSubcontractors = {
    caption: "Sous-Traitants",
    data: [
      [
        "Microsoft Azure",
        "France",
        "Hébergement",
        <A
          url="https://privacy.microsoft.com/fr-fr/privacystatement"
          style={{ margin: Margins.smaller }}
        >
          Déclaration de confidentialité Microsoft
        </A>,
      ],
    ],
    head: [
      "Partenaire",
      "Pays destinataire",
      "Traitement réalisé",
      "Garanties",
    ],
  };

  const content = (
    <View>
      <H1>Politique de confidentialité de 1000 premiers jours</H1>

      <H2>Traitement des données à caractère personnel</H2>
      <P>
        La présente application « 1000 premiers jours» est développée au sein de
        la Fabrique numérique des ministères sociaux.
      </P>
      <P>
        Le responsable de traitement des données à caractère personnel
        collectées par l’application « 1000 premiers jours » est la Direction
        générale de la Cohésion sociale, représentée par Madame Virginie
        Lasserre, Directrice générale.
      </P>

      <H2>Finalités</H2>
      <P>
        L’application « 1000 premiers jours » est un outil qui participe du
        parcours 1000 jours de soutien à la parentalité. Elle peut traiter des
        données à caractère personnelles pour les finalités suivantes :
      </P>
      <View style={styles.ul}>
        <Li>
          Visualiser dans le territoire de vie du parent, les services, les
          interlocuteurs et les structures pouvant aider les parents ;
        </Li>
        <Li>
          Informer les parents et les futurs parents selon leur parcours
          parental et l’âge de l’enfant ;
        </Li>
        <Li>
          Permettre une évaluation de l’état de la mère après son accouchement.
        </Li>
      </View>

      <H2>Données à caractère personnel traitées</H2>
      <P>
        L’application peut traiter les données à caractère personnel suivantes :
      </P>
      <View style={styles.ul}>
        <Li>Données relatives aux parents (prénom, code postal) ;</Li>
        <Li>
          Données relatives au PDS (autodiagnostic pour la dépression post
          partum sous la forme d’un questionnaire et d’un nombre indiquant
          l’état de santé de la maman)
        </Li>
        <Li>Données relatives à l’enfant (prénom et date de naissance) ;</Li>
        <Li>
          Données relatives au formulaire et à l’envoi de la bébé box (nom,
          prénom, adresse, déclaration de naissance via un fichier CAF)
        </Li>
        <Li>Données d’hébergeur/de connexion ;</Li>
      </View>

      <H2>Bases juridiques des traitements de données</H2>
      <P>
        Les données traitées par l’application ont plusieurs fondements
        juridiques :
      </P>
      <View style={styles.ul}>
        <Li>
          L’obligation légale à laquelle est soumise le responsable de
          traitements au sens de l’article 6-c du RGPD ;
        </Li>
        <Li>
          L’exécution d’une mission d’intérêt public ou relevant de l’exercice
          de l’autorité publique dont est investi le responsable de traitement
          au sens de l’article 6-e du RPGD ;
        </Li>
        <Li>
          Des motifs d’intérêt public dans le domaine de la santé publique au
          sens de l’article 9 paragraphe 2-i du RGPD.
        </Li>
      </View>

      <H3>Ces fondements sont précisés ci-dessous :</H3>

      <H4>a) Données relatives aux parents</H4>
      <P>
        Ce traitement est nécessaire à l’exécution d’une mission d’intérêt
        public ou relevant de l’exercice de l’autorité publique dont est investi
        le responsable de traitement au sens de l’article 6-e du règlement (UE)
        2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à
        la protection des personnes physiques à l’égard du traitement des
        données à caractère personnel et à la libre circulation de ces données.
      </P>
      <P>Cette mission d’intérêt public est notamment posée par :</P>
      <View style={styles.ul}>
        <Li>
          L’article 5 de l’arrêté du 25 janvier 2010 portant organisation de la
          direction générale de la cohésion sociale ;
        </Li>
        <Li>
          Le parcours 1000 jours issu du rapport de la commission « Les 1000
          premiers jours » présentés au ministre des solidarités et de la santé
          et de la déclaration du secrétaire d’État en charge de l’Enfance et
          des Familles ;
        </Li>
        <Li>
          Le plan Priorité prévention de la stratégie nationale de santé 2018.
        </Li>
      </View>

      <H4>b) Données relatives au PDS</H4>
      <P>
        Ce traitement est nécessaire pour des motifs d’intérêts publics dans le
        domaine de la santé publique au sens de l’article 9 paragraphe 2-i du
        règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril
        2016 relatif à la protection des personnes physiques à l’égard du
        traitement des données à caractère personnel et à la libre circulation
        de ces données.
      </P>
      <P>
        Ces motifs d’intérêts publics dans le domaine de la santé figurent
        notamment dans :
      </P>
      <View style={styles.ul}>
        <Li>
          L’article 5 de l’arrêté du 25 janvier 2010 portant organisation de la
          direction générale de la cohésion sociale ;
        </Li>
        <Li>
          Le parcours 1000 jours issu du rapport de la commission « Les 1000
          premiers jours » présentés au ministre des solidarités et de la santé
          et de la déclaration du secrétaire d’État en charge de l’Enfance et
          des Familles ;
        </Li>
        <Li>
          Le plan Priorité prévention de la stratégie nationale de santé 2018.
        </Li>
      </View>

      <H4>c) Données relatives à l’enfant</H4>
      <P>
        Ce traitement est nécessaire à l’exécution d’une mission d’intérêt
        public ou relevant de l’exercice de l’autorité publique dont est investi
        le responsable de traitement au sens de l’article 6-e du règlement (UE)
        2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à
        la protection des personnes physiques à l’égard du traitement des
        données à caractère personnel et à la libre circulation de ces données.
      </P>
      <P>Cette mission d’intérêt public est notamment posée par :</P>
      <View style={styles.ul}>
        <Li>
          L’article 5 de l’arrêté du 25 janvier 2010 portant organisation de la
          direction générale de la cohésion sociale ;
        </Li>
        <Li>
          Le parcours 1000 jours issu du rapport de la commission « Les 1000
          premiers jours » présentés au ministre des solidarités et de la santé
          et de la déclaration du secrétaire d’État en charge de l’Enfance et
          des Familles ;
        </Li>
        <Li>
          Le plan Priorité prévention de la stratégie nationale de santé 2018.
        </Li>
      </View>

      <H4>d) Données relatives au formulaire et à l’envoi de la bébé box</H4>
      <P>
        Ce traitement est nécessaire à l’exécution d’une mission d’intérêt
        public ou relevant de l’exercice de l’autorité publique dont est investi
        le responsable de traitement au sens de l’article 6-e du règlement (UE)
        2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à
        la protection des personnes physiques à l’égard du traitement des
        données à caractère personnel et à la libre circulation de ces données.
      </P>
      <P>Cette mission d’intérêt public est notamment posée par :</P>
      <View style={styles.ul}>
        <Li>
          L’article 5 de l’arrêté du 25 janvier 2010 portant organisation de la
          direction générale de la cohésion sociale ;
        </Li>
        <Li>
          Le parcours 1000 jours issu du rapport de la commission « Les 1000
          premiers jours » présentés au ministre des solidarités et de la santé
          et de la déclaration du secrétaire d’État en charge de l’Enfance et
          des Familles ;
        </Li>
        <Li>
          Le plan Priorité prévention de la stratégie nationale de santé 2018.
        </Li>
      </View>

      <H4>e) Données d’hébergeur ou de connexion</H4>
      <P>
        Ce traitement est nécessaire au respect d'une obligation légale à
        laquelle le responsable de traitement est soumis au sens de l'article
        6-c du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27
        avril 2016 relatif à la protection des personnes physiques à l'égard du
        traitement des données à caractère personnel et à la libre circulation
        de ces données.
      </P>
      <P>
        L'obligation légale est posée par la loi LCEN n° 2004-575 du 21 juin
        2004 pour la confiance dans l'économie numérique et par l'article 1
        du décret n°2021-1363 du 20 octobre 2021.
      </P>

      <H4>f) Cookies</H4>
      <P>
        En application de l’article 5(3) de la directive 2002/58/CE modifiée
        concernant le traitement des données à caractère personnel et la
        protection de la vie privée dans le secteur des communications
        électroniques, transposée à l’article 82 de la loi n°78-17 du 6 janvier
        1978 relative à l’informatique, aux fichiers et aux libertés, les
        traceurs ou cookies suivent deux régimes distincts.
      </P>
      <P>
        Les cookies strictement nécessaires au service, ceux de publicité non
        personnalisée ou ayant pour finalité exclusive de faciliter la
        communication par voie électronique sont dispensés de consentement
        préalable au titre de l’article 82 de la loi n°78-17 du 6 janvier 1978.
      </P>
      <P>
        Ce consentement de la personne concernée pour une ou plusieurs finalités
        spécifiques constitue une base légale au sens du RGPD et doit être
        entendu au sens de l'article 6-a du Règlement (UE) 2016/679 du Parlement
        européen et du Conseil du 27 avril 2016 relatif à la protection des
        personnes physiques à l'égard du traitement des données à caractère
        personnel et à la libre circulation de ces données.
      </P>

      <H2>Durée de conservation</H2>

      <Table tableData={tableRetentionPeriod} />

      <H2>Droit des personnes concernées</H2>
      <P>
        Vous disposez des droits suivants concernant vos données à caractère
        personnel :
      </P>
      <View style={styles.ul}>
        <Li>Droit d’information et droit d’accès aux données</Li>
        <Li>
          Droit de rectification et le cas échéant de suppression des données
        </Li>
      </View>
      <P>
        Pour les exercer, faites-nous parvenir une demande en précisant la date
        et l’heure précise de la requête – ces éléments sont indispensables pour
        nous permettre de retrouver votre recherche – par voie électronique à
        l’adresse suivante :
      </P>
      <A url="mailto:contact-nos1000jours@fabrique.social.gouv.fr">
        contact-nos1000jours@fabrique.social.gouv.fr
      </A>
      <P>
        En raison de l’obligation de sécurité et de confidentialité dans le
        traitement des données à caractère personnel qui incombe au responsable
        de traitement, votre demande ne sera traitée que si vous apportez la
        preuve de votre identité.
      </P>
      <P>
        Pour vous aider dans votre démarche, vous trouverez ici, un modèle de
        courrier élaboré par la CNIL :
      </P>
      <A url="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces">
        Exercer son droit d'accès
      </A>
      <P>
        Le responsable de traitement s’engage à répondre dans un délai
        raisonnable qui ne saurait dépasser 1 mois à compter de la réception de
        votre demande.
      </P>

      <H2>Destinataires des données</H2>
      <P>
        Le responsable de traitement s’engage à ce que les données à caractères
        personnels soient traitées par les seules personnes autorisées.
      </P>

      <H2>Sécurité et confidentialité des données</H2>
      <P>
        Les mesures techniques et organisationnelles de sécurité adoptées pour
        assurer la confidentialité, l’intégrité et protéger l’accès des données
        sont notamment :
      </P>
      <View style={styles.ul}>
        <Li>Anonymisation </Li>
        <Li>Stockage des données en base de données</Li>
        <Li>Stockage des mots de passe en base sont hâchés</Li>
        <Li>Cloisonnement des données</Li>
        <Li>Mesures de traçabilité</Li>
        <Li>Surveillance</Li>
        <Li>Protection contre les virus, malwares et logiciels espions</Li>
        <Li>Protection des réseaux</Li>
        <Li>Sauvegarde</Li>
        <Li>
          Mesures restrictives limitant l’accès physiques aux données à
          caractère personnel
        </Li>
      </View>

      <H2>Sous-traitants</H2>
      <P>
        Certaines des données sont envoyées à des sous-traitants pour réaliser
        certaines missions. Le responsable de traitement s'est assuré de la mise
        en œuvre par ses sous-traitants de garanties adéquates et du respect de
        conditions strictes de confidentialité, d’usage et de protection des
        données.
      </P>

      <Table tableData={tableSubcontractors} />

      <H2>Cookies</H2>
      <P>
        Un cookie est un fichier déposé sur votre terminal lors de la visite
        d’un site. Il a pour but de collecter des informations relatives à votre
        navigation et de vous adresser des services adaptés à votre terminal
        (ordinateur, mobile ou tablette).
      </P>
      <P>
        Le site dépose des cookies de mesure d’audience (nombre de visites,
        pages consultées), respectant les conditions d’exemption du consentement
        de l’internaute définies par la recommandation « Cookies » de la
        Commission nationale informatique et libertés (CNIL). Cela signifie,
        notamment, que ces cookies ne servent qu’à la production de statistiques
        anonymes et ne permettent pas de suivre la navigation de l’internaute
        sur d’autres sites.
      </P>
      <P>
        <SecondaryText style={styles.bold}>
          Nous utilisons pour cela Matomo
        </SecondaryText>
        , un outil de mesure d’audience web libre, paramétré pour être en
        conformité avec la recommandation « Cookies » de la CNIL. Cela signifie
        que votre adresse IP, par exemple, est anonymisée avant d’être
        enregistrée. Il est donc impossible d’associer vos visites sur ce site à
        votre personne.
      </P>
      <P>Il convient d’indiquer que :</P>
      <View style={styles.ul}>
        <Li>
          Les données collectées ne sont pas recoupées avec d’autres traitements
        </Li>
        <Li>
          Les cookies ne permettent pas de suivre la navigation de l’internaute
          sur d’autres sites
        </Li>
      </View>

      <P>
        Pour aller plus loin, vous pouvez consulter les fiches proposées par la
        Commission Nationale de l'Informatique et des Libertés (CNIL) :
      </P>
      <View style={styles.ul}>
        <Li>[Cookies et traceurs : que dit la loi ?]</Li>
        <A url="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi">
          Cookies et traceurs : que dit la loi ?
        </A>
        <Li>[Cookies : les outils pour les maîtriser]</Li>
        <A url="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser">
          Cookies : les outils pour les maîtriser
        </A>
      </View>
    </View>
  );
  return <ModalHtmlContent setIsVisible={setIsVisible} content={content} />;
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: FontWeight.bold,
  },
  ul: {
    paddingLeft: Paddings.light,
    paddingTop: Paddings.light,
  },
});

export default ConditionsOfUse;
