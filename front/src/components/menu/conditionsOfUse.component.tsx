/* eslint-disable react/no-unescaped-entities */
import type { FC } from "react";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { SCREEN_WIDTH } from "../../constants/platform.constants";
import { FontWeight, Paddings, Styles } from "../../styles";
import TextHtml from "../article/textHtml.component";
import A from "../html/a.component";
import H1 from "../html/h1.component";
import H2 from "../html/h2.component";
import Li from "../html/li.component";
import P from "../html/p.component";

const ConditionsOfUse: FC = () => {
  const iframeMatomo = `
    <iframe
      title="matomo optout"
      style={{ border: 0, width: "100%" }}
      src="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2f3b6c&fontSize=16px&fontFamily=sans-serif"
    />
  `;

  return (
    <ScrollView
      style={Styles.modalFullScreen.mainContainer}
      contentContainerStyle={Styles.modalFullScreen.scrollviewContent}
    >
      <H1>Politique de confidentialité de 1000 premiers jours</H1>

      <H2>Qui est responsable de 1000 premiers jours ?</H2>
      <P>
        Le service numérique « 1000 premiers jours » est à l’initiative de la
        Direction générale de la cohésion sociale au sein de la Fabrique
        numérique des ministères sociaux.
      </P>

      <H2>Pourquoi traitons-nous des données à caractère personnel ?</H2>
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
          Permettre une évaluation de l’état des parents pendant les 1000
          premiers jours.
        </Li>
      </View>

      <H2>
        Quelles sont les données à caractère personnel que nous traitons ?
      </H2>
      <P>1000 premiers jours traite les données suivantes :</P>
      <View style={styles.ul}>
        <Li>
          Données relatives aux parents : prénom, adresse e-mail, code postal ;
        </Li>
        <Li>Données relatives à l’enfant : prénom et date de naissance ;</Li>
        <Li>
          Données relatives aux professionnels de santé : nom et prénom,
          adresse, numéro de téléphone.
        </Li>
      </View>

      <H2>
        Qu’est-ce qui nous autorise à traiter des données à caractère personnel
        ?
      </H2>
      <P>
        1000 premiers jours traite des données à caractère personnel en se
        basant sur :
      </P>
      <View style={styles.ul}>
        <Li>
          L’exécution d’une mission d’intérêt public ou relevant de l’exercice
          de l’autorité publique dont est investi le responsable de traitement
          au sens de l’article 6-1 e) du RGPD.
        </Li>
      </View>

      <H2>Pendant combien de temps conservons-nous ces données ?</H2>
      <View style={styles.ul}>
        <Li>
          Les données relatives aux parents et à l’enfant sont conservées
          jusqu’à la suppression de l’application ou 3 ans après le
          téléchargement de l’application.
        </Li>
        <Li>
          Les données relatives aux professionnels de santé sont conservées
          jusqu’à 3 ans après toute modification relative à la situation
          professionnelle du professionnel de santé portée à la connaissance de
          Nos1000Jours ou jusqu’à 6 mois à compter du retrait du professionnel
          des listes et annuaires relatifs à l’identification des professionnels
          de santé à compter de la connaissance de ce retrait par Nos1000Jours.
        </Li>
      </View>

      <H2>Quels sont vos droits ?</H2>
      <P>Vous disposez :</P>
      <View style={styles.ul}>
        <Li>D’un droit d’information et droit d’accès ;</Li>
        <Li>D’un droit de rectification ;</Li>
        <Li>D’un droit d’opposition ;</Li>
        <Li>D’un droit à la limitation du traitement.</Li>
      </View>
      <P>Pour les exercer, contactez-nous par voie électronique :</P>
      <View style={styles.ul}>
        <A url="mailto:contact-nos1000jours@fabrique.social.gouv.fr">
          contact-nos1000jours@fabrique.social.gouv.fr
        </A>
      </View>
      <P>Par voie postale :</P>
      <View style={styles.ul}>
        <Li>Direction du Numérique des ministères sociaux</Li>
        <Li>Ministère des solidarités et de la santé</Li>
        <Li>39-43 Quai André Citroën</Li>
        <Li>75015 Paris</Li>
      </View>
      <P>
        Puisque ce sont des droits personnels, nous ne traiterons votre demande
        que si nous sommes en mesure de vous identifier. Dans le cas où nous ne
        parvenons pas à vous identifier, nous pouvons être amenés à vous
        demander une preuve de votre identité.
      </P>
      <P>
        Pour vous aider dans votre démarche, vous trouverez un modèle de
        courrier élaboré par la CNIL ici :
        <A url="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces">
          https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces
        </A>
      </P>
      <P>
        Nous nous engageons à vous répondre dans un délai raisonnable qui ne
        saurait dépasser 1 mois à compter de la réception de votre demande.
      </P>

      <H2>Qui va avoir accès à ces données ?</H2>
      <P>
        Les accès aux données sont strictement encadrés et juridiquement
        justifiés. Les personnes suivantes vont avoir accès aux données :
      </P>
      <View style={styles.ul}>
        <Li>
          Les usagers et professionnels de santé choisis par les usagers et
          suivis par eux.
        </Li>
      </View>

      <H2>Quelles mesures de sécurité mettons-nous en place ?</H2>
      <P>
        Nous mettons en place plusieurs mesures pour sécuriser les données :
      </P>
      <View style={styles.ul}>
        <Li>Stockage des données en base de données ;</Li>
        <Li>Cloisonnement des données ;</Li>
        <Li>Mesures de traçabilité ;</Li>
        <Li>Surveillance ;</Li>
        <Li>Protection contre les virus, malwares et logiciels espions ;</Li>
        <Li>Protection des réseaux ;</Li>
        <Li>Sauvegarde ;</Li>
        <Li>
          Mesures restrictives limitant l’accès physique aux données à caractère
          personnel.
        </Li>
      </View>

      <H2>Qui nous aide à traiter les données à caractère personnel ?</H2>
      <View style={styles.ul}>
        <Li>Sous-traitant : OVH</Li>
        <Li>Pays destinataire : France</Li>
        <Li>Traitement réalisé : Hébergement</Li>
        <Li>Garanties :</Li>
        <A url="https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/9e74492-OVH_Data_Protection_Agreement-FR-6.0.pdf">
          https://storage.gra.cloud.ovh.net/v1/AUTH_325716a587c64897acbef9a4a4726e38/contracts/9e74492-OVH_Data_Protection_Agreement-FR-6.0.pdf
        </A>
      </View>

      <H2>Cookies</H2>
      <P>
        Un cookie est un fichier déposé sur votre terminal lors de la visite
        d’un site. Il a pour but de collecter des informations relatives à votre
        navigation et de vous adresser des services adaptés à votre terminal
        (ordinateur, mobile ou tablette).
      </P>
      <P>
        En application de l’article 5(3) de la directive 2002/58/CE modifiée
        concernant le traitement des données à caractère personnel et la
        protection de la vie privée dans le secteur des communications
        électroniques, transposée à l’article 82 de la loi n° 78-17 du 6 janvier
        1978 relative à l’informatique, aux fichiers et aux libertés, les
        traceurs ou cookies suivent deux régimes distincts.
      </P>
      <P>
        Les cookies strictement nécessaires au service ou ayant pour finalité
        exclusive de faciliter la communication par voie électronique sont
        dispensés de consentement préalable au titre de l’article 82 de la loi
        n° 78-17 du 6 janvier 1978.
      </P>
      <P>
        Les cookies n’étant pas strictement nécessaires au service ou n’ayant
        pas pour finalité exclusive de faciliter la communication par voie
        électronique doivent être consenti par l’utilisateur.
      </P>
      <P>
        Ce consentement de la personne concernée pour une ou plusieurs finalités
        spécifiques constitue une base légale au sens du RGPD et doit être
        entendu au sens de l'article 6-a du Règlement (UE) 2016/679 du Parlement
        européen et du Conseil du 27 avril 2016 relatif à la protection des
        personnes physiques à l'égard du traitement des données à caractère
        personnel et à la libre circulation de ces données.
      </P>
      <P>
        À tout moment, vous pouvez refuser l’utilisation des cookies et
        désactiver le dépôt sur votre ordinateur en utilisant la fonction dédiée
        de votre navigateur (fonction disponible notamment sur Microsoft
        Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple Safari et
        Opera).
      </P>
      <P>
        Pour aller plus loin, vous pouvez consulter les fiches proposées par la
        Commission Nationale de l'Informatique et des Libertés (CNIL) :
      </P>
      <View style={styles.ul}>
        <A url="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/que-dit-la-loi">
          Cookies & traceurs : que dit la loi ?
        </A>
        <A url="https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-votre-navigateur">
          Cookies : les outils pour les maîtriser
        </A>
      </View>

      <P>
        Nous utilisons Matomo, une solution de mesure d’audience, configuré en
        “mode exempté” ne nécessitant pas le recueil du consentement des
        utilisateurs conformément aux recommandations de la CNIL.
      </P>
      <View>
        <TextHtml html={iframeMatomo} screenWidth={SCREEN_WIDTH * 0.9} />
      </View>
    </ScrollView>
  );
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
