import ko from "./ko.json";
import enUS from "./en-US.json";

const locales = {
  "en-US": enUS,
  ko,
};

export default (key) => {
  const transaltions = locales[key];
  return (id) => {
    return transaltions[id];
  };
};
