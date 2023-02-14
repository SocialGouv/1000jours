export const GET_ALL_TND_TESTS = /* GraphQL */ `
  query QuestionnaireTnds {
    questionnaireTnds(sort: "ordre") {
      nom
      id
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
        }
      }
      alerte_nb_non
      alerte_nb_domaine
    }
  }
`;

export const ADD_TND_RESPONSES = /* GraphQL */ `
  mutation ($test: String!, $non: Int!, $oui: Int!, $reponses: JSON!) {
    createReponsesTnd(
      input: {
        data: { test: $test, non: $non, oui: $oui, reponses: $reponses }
      }
    ) {
      reponsesTnd {
        id
        test
        oui
        non
        reponses
        created_at
      }
    }
  }
`;
