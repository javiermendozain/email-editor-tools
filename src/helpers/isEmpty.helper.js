// Libraries
import isDefined from "./isDefined.helper";

export default (items) =>
  !isDefined(items) || items.length === 0 || Object.keys(items).length === 0;
