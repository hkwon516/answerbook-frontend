import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "@material-ui/core";
import Link from "next/link";

import Parse from "parse";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:9000/parse";

export default function Home(props) {
  console.log(props);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{props.translate("welcomeToAnswerbook")}</h1>
        <Button color="primary">{props.translate("hello")}</Button>

        <Link href="/" locale="ko">
          <a>Translate to Korea</a>
        </Link>
      </main>
    </div>
  );
}
