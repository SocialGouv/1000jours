export const ALL_EVENTS = `
  query GetEvents {
    evenements {
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

export const GET_EVENT_DETAILS = (eventId: string): string =>
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
