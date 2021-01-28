import Parse from "parse";
import config from "../config/";

Parse.initialize(config.appId);
Parse.serverURL = config.serverURL;

export default Parse;
