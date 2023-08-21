import { useUrlSearchParams } from "../../../utils/url";

export const useIsGuestView = () => {
  const urlSearchParams = useUrlSearchParams();

  return urlSearchParams.has("guest");
};
