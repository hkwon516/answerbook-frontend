import Parse from "parse";
import config from "../config/development.json";

Parse.initialize(config.appId);
Parse.serverURL = config.serverURL;

export default Parse;
