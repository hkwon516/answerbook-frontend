import ko from "./ko.json";
import enUS from "./en-US.json";
import flatten from "flat";

const locales = {
  "en-US": flatten(enUS),
  ko: flatten(ko),
};
console.log(locales)
export default (key) => {
  const transaltions = locales[key];
  return (id) => {
    const translation = transaltions[id];
    return translation;
  };
};
