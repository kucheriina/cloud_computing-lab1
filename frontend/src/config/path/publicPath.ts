import { GeneralPath } from "config/path/index";
import buildUrl from "utils/buildUrl";

enum PublicPathEnum {
  Registration = "Registration",
  Login = "Login",
}

export type PublicPath = PublicPathEnum | GeneralPath;

export const authorizationUrl = buildUrl(PublicPathEnum, {
  Registration: {},
  Login: {},
});
