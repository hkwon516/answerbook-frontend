import config from "../config/";
import Parse from "parse";
export default () => {
  let parse = Parse;
  if (typeof window == "undefined") {
    parse = require("parse/node");
  } else {
    parse = Parse;
  }

  parse.initialize(config.appId);
  parse.serverURL = config.serverURL;
  return parse;
};
