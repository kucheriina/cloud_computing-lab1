import { authorizationUrl } from "config/path/publicPath";
import buildUrl from "../../utils/buildUrl";

export type AuthorizedPath = GeneralPath;

/*| HomePath
| CallsPath
| DocumentsPath
| LaboratoryPath
| PatientPath
| SchedulePath
| ServicesPath
| SettingsPath
| WarehouseModulePath*/

export enum GeneralPath {
  Index = "",
  NotFound = "/404",
  All = "*",
}

const rowUrl = buildUrl(GeneralPath, {
  Index: {},
  NotFound: {},
  All: {},
});

export const publicUrl = {
  ...rowUrl,
  Index: {
    ...rowUrl.Index,
    ...authorizationUrl,
  },
};

export const authUrl = {
  ...rowUrl,
  Index: {
    ...rowUrl.Index,
  },
};
