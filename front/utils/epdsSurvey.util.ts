import { QuestionnaireEpdsFromDB } from "../types";

export function convertToQuestionsAndAnswers(
  questionnaire: QuestionnaireEpdsFromDB[]
) {
  return questionnaire.map((element) => {
    return {
      question: element.libelle,
      answers: [
        {
          id: 0,
          label: element.reponse_1_libelle,
          points: element.reponse_1_points,
          isChecked: false
        },
        {
          id: 1,
          label: element.reponse_2_libelle,
          points: element.reponse_2_points,
          isChecked: false
        },
        {
          id: 2,
          label: element.reponse_3_libelle,
          points: element.reponse_3_points,
          isChecked: false
        },
        {
          id: 3,
          label: element.reponse_4_libelle,
          points: element.reponse_4_points,
          isChecked: false
        }
      ]
    };
  });
}
