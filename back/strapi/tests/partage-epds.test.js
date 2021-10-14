const { showAppBloc, scoreOpinion } = require("../api/reponses-epds/services/partage-epds");

describe('Page résultats', () => {

  const SCORE_UNTIL_8 = "Votre score est rassurant";
  const SCORE_BETWEEN_9_AND_12 = "Votre score présente un risque, nous vous recommandons de garder le contact avec votre professionnel";
  const SCORE_ABOVE_13 = "Votre score présente un risque, il est important de garder le contact avec votre professionnel.";

  describe('score < 9', () => {
    test('& la question 10 < 3 points', () => {
      const info = {
        score: 7,
        detail_questions: [],
        detail_score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        detail_reponses: []
      }
      expect(showAppBloc(info)).toBe(true);
      expect(scoreOpinion(info)).toBe(SCORE_UNTIL_8);
    });

    test('& la question 10 = 3 points', () => {
      const info = {
        score: 7,
        detail_questions: [],
        detail_score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        detail_reponses: []
      }
      expect(showAppBloc(info)).toBe(false);
      expect(scoreOpinion(info)).toBe(SCORE_ABOVE_13);
    });
  });

  describe('9 <= score < 13', () => {
    test('& la question 10 < 3 points', () => {
      const info = {
        score: 9,
        detail_questions: [],
        detail_score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        detail_reponses: []
      }
      expect(showAppBloc(info)).toBe(true);
      expect(scoreOpinion(info)).toBe(SCORE_BETWEEN_9_AND_12);
    });

    test('& la question 10 = 3 points', () => {
      const info = {
        score: 12,
        detail_questions: [],
        detail_score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        detail_reponses: []
      }
      expect(showAppBloc(info)).toBe(false);
      expect(scoreOpinion(info)).toBe(SCORE_ABOVE_13);
    });
  });

  describe('score >= 13', () => {
    test('& la question 10 < 3 points', () => {
      const info = {
        score: 13,
        detail_questions: [],
        detail_score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        detail_reponses: []
      }
      expect(showAppBloc(info)).toBe(false);
      expect(scoreOpinion(info)).toBe(SCORE_ABOVE_13);
    });

    test('& la question 10 = 3 points', () => {
      const info = {
        score: 20,
        detail_questions: [],
        detail_score: [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        detail_reponses: []
      }
      expect(showAppBloc(info)).toBe(false);
      expect(scoreOpinion(info)).toBe(SCORE_ABOVE_13);
    });
  });

});