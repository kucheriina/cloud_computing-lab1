import { useLocation } from "react-router-dom";
import searchParamsHelper, { BaseSearch } from "utils/helpers/searchParamsHelper";

const useSearchParams = <Search extends BaseSearch>(): Search => {
  const { search } = useLocation();

  return searchParamsHelper.parse<Search>(search);
};

export default useSearchParams;
