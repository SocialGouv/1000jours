import { AroundMeConstants } from "../../constants";
import { AroundMeUtils } from "..";

export const searchRegionByPostalCode = async (postalCodeInput: string) => {
  if (
    postalCodeInput.length !== AroundMeConstants.POSTAL_CODE_MAX_LENGTH ||
    isNaN(Number(postalCodeInput))
  ) {
    //postalCodeIsInvalid();
    return;
  }

  const postalCodeCoords = await AroundMeUtils.getPostalCodeCoords(
    postalCodeInput
  );
  await AroundMeUtils.getPostalCodeCoords(postalCodeInput).then((data) => {
    console.log(data);
  });

  return postalCodeCoords;
};

// const onPostalCodeInvalid = useCallback(() => {
//   setPostalCodeInvalid(true);
//   setIsLoading(false);
// }, []);
