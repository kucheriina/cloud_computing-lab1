import Redirect, { RedirectProps } from "components/redirect";
import { authUrl } from "config/path";
import useSearchParams from "hooks/useSearchParams";
import React, { FC } from "react";

interface RedirectToReturnUrlProps extends Omit<RedirectProps, "setReturnUrl" | "pathname"> {}

const RedirectToReturnUrl: FC<RedirectToReturnUrlProps> = ({ ...props }) => {
  const { returnUrl = authUrl.Index.url } = useSearchParams();

  return <Redirect setReturnUrl={false} pathname={returnUrl} {...props} />;
};

export default RedirectToReturnUrl;
