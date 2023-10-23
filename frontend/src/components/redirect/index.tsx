import { publicUrl } from "config/path";
import React, { FC } from "react";
import { Navigate, Path, useLocation } from "react-router-dom";
import { SearchParams } from "types/router";
import searchParamsHelper from "utils/helpers/searchParamsHelper";

export interface RedirectProps extends Partial<Path> {
  setReturnUrl?: boolean;
  saveSearch?: boolean;
}

const Redirect: FC<RedirectProps> = ({
                                       pathname = publicUrl.NotFound.url,
                                       search,
                                       setReturnUrl = true,
                                       saveSearch = true,
                                       ...props
                                     }) => {
  const { pathname: returnPath, search: prevSearch } = useLocation();

  const filteredPrevSearch = searchParamsHelper.filter(prevSearch, ([key]) => {
    return key !== SearchParams.ReturnUrl;
  });

  return (
    <Navigate
      to={{
        pathname,
        search: `${saveSearch ? filteredPrevSearch : ""}${
          setReturnUrl ? `&${SearchParams.ReturnUrl}=${returnPath}` : ""
        }${search ? `&${search}` : ""}`,
        ...props,
      }}
      replace
    />
  );
};

export default Redirect;
