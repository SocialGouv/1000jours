export const ALL_EVENTS = /* GraphQL */ `
  query GetEvents {
    evenements(sort: "debut:ASC") {
      id
      nom
      description
      debut
      fin
      important
      thematique {
        id
        nom
      }
      etapes {
        id
        nom
      }
      typesPoi: types_poi {
        id
        nom
        categorie
      }
      articles {
        id
        titre
        resume
        visuel {
          id
          hash
          url
          height
          width
        }
        thematiques {
          nom
          id
        }
      }
    }
  }
`;

export const GET_EVENT_DETAILS = (eventId: string): string /* GraphQL */ =>
  `
    query GetEventDetails {
      evenement(id: ${eventId})
      {
        id
        nom
        description
        debut
        fin
        thematique {
          id
          nom
        }
        etapes {
          id
          nom
        }
      }
    }
  `;
