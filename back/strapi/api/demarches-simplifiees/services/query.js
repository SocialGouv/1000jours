const DOSSIERS_QUERY = `
query getDemarche(
  $demarcheNumber: Int!,
  $state: DossierState,
  $order: Order,
  $createdSince: ISO8601DateTime,
  $first: Int
) {
  demarche(number: $demarcheNumber) {
    id
    number
    title
    dossiers(
      state: $state,
      order: $order,
      createdSince: $createdSince,
      first: $first
    ) {
      nodes {
        ...DossierFragment
      }
    }
  }
}

fragment DossierFragment on Dossier {
  id
  number
  archived
  state
  dateDerniereModification
  dateDepot
  datePassageEnConstruction
  datePassageEnInstruction
  dateTraitement
  traitements {
    state
    emailAgentTraitant
    dateTraitement
    motivation
  }
  champs {
    ...RootChampFragment
  }
  demandeur {
    ... on PersonnePhysique {
      civilite
      nom
      prenom
      dateDeNaissance
    }
    ...PersonneMoraleFragment
  }
}

fragment GeoAreaFragment on GeoArea {
  id
  source
  description
  geometry {
    type
    coordinates
  }
  ... on ParcelleCadastrale {
    commune
    numero
    section
    prefixe
    surface
  }
}

fragment RootChampFragment on Champ {
  ... on RepetitionChamp {
    champs {
      ...ChampFragment
    }
  }
  ... on SiretChamp {
    etablissement {
      ...PersonneMoraleFragment
    }
  }
  ... on CarteChamp {
    geoAreas {
      ...GeoAreaFragment
    }
  }
  ... on DossierLinkChamp {
    dossier {
      id
      state
      usager {
        email
      }
    }
  }
}

fragment ChampFragment on Champ {
  id
  label
  stringValue
  ... on DateChamp {
    date
  }
  ... on DatetimeChamp {
    datetime
  }
  ... on CheckboxChamp {
    checked: value
  }
  ... on DecimalNumberChamp {
    decimalNumber: value
  }
  ... on IntegerNumberChamp {
    integerNumber: value
  }
  ... on CiviliteChamp {
    civilite: value
  }
  ... on LinkedDropDownListChamp {
    primaryValue
    secondaryValue
  }
  ... on MultipleDropDownListChamp {
    values
  }
  ... on AddressChamp {
    address {
      ...AddressFragment
    }
  }
  ... on CommuneChamp {
    commune {
      name
      code
    }
    departement {
      name
      code
    }
  }
}

fragment PersonneMoraleFragment on PersonneMorale {
  siret
  siegeSocial
  naf
  libelleNaf
  address {
    ...AddressFragment
  }
  entreprise {
    siren
    capitalSocial
    numeroTvaIntracommunautaire
    formeJuridique
    formeJuridiqueCode
    nomCommercial
    raisonSociale
    siretSiegeSocial
    codeEffectifEntreprise
    dateCreation
    nom
    prenom
  }
  association {
    rna
    titre
    objet
    dateCreation
    dateDeclaration
    datePublication
  }
}

fragment AddressFragment on Address {
  label
  type
  streetAddress
  streetNumber
  streetName
  postalCode
  cityName
  cityCode
  departmentName
  departmentCode
  regionName
  regionCode
}
`;

module.exports.DOSSIERS_QUERY = DOSSIERS_QUERY;
