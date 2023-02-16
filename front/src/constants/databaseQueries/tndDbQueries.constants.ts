export const GET_ALL_TND_TESTS = /* GraphQL */ `
  query QuestionnaireTnds {
    questionnaireTnds(sort: "ordre") {
      nom
      id
      alerteNbNon: alerte_nb_non
      alerteNbDomaine: alerte_nb_domaine
    }
  }
`;

export const GET_TND_TEST = (id: number): string /* GraphQL */ => `
  query QuestionnaireTnd {
    questionnaireTnd(id:${id}) {
      domaines {
        nom 
        ordre
        questions {
          nom
          ordre
          image {
            url
            height
            width
          }
        }
      }
      alerteNbNon: alerte_nb_non
      alerteNbDomaine: alerte_nb_domaine
    }
  }
`;

export const ADD_TND_RESPONSES = /* GraphQL */ `
  mutation (
    $questionnaire: String!
    $reponseNon: Int!
    $reponseOui: Int!
    $domaineAvecReponseNon: Int!
    $signesAlerte: Boolean!
    $reponses: JSON!
  ) {
    createReponsesTnd(
      input: {
        data: {
          questionnaire: $questionnaire
          reponse_non: $reponseNon
          reponse_oui: $reponseOui
          domaine_avec_reponse_non: $domaineAvecReponseNon
          signes_alerte: $signesAlerte
          reponses: $reponses
        }
      }
    ) {
      reponsesTnd {
        id
        questionnaire
        reponse_oui
        reponse_non
        domaine_avec_reponse_non
        signes_alerte
        reponses
        created_at
      }
    }
  }
`;
