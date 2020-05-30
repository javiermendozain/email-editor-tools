// Libaries
import isDefined from "./isDefined.helper";
import isEmpty from "./isEmpty.helper";
import {
  useFormInput,
  UpperCaseFirstLetter,
  isEqual,
  getDiffObjects,
  GetDateComplete,
  GetDate,
  sumScore,
  GenerateHash,
  getExtensionFile,
  GetDifferenceDateOnChallenge,
  IsStatusChallenge,
  NameToURLName,
} from "./common.function.helper";
import { getHandleAPIService } from "./api.handle.helper";
import { DB_PATHS } from "./paths.firebase";
import { STORAGE_PATHS } from "./paths.firebase.storage";
import { isNickName } from "./valid.helper";

export {
  isDefined,
  isEmpty,
  NameToURLName,
  STORAGE_PATHS,
  DB_PATHS,
  GetDateComplete,
  GenerateHash,
  getExtensionFile,
  GetDate,
  GetDifferenceDateOnChallenge,
  sumScore,
  getDiffObjects,
  isEqual,
  isNickName,
  useFormInput,
  getHandleAPIService,
  UpperCaseFirstLetter,
  IsStatusChallenge,
};
