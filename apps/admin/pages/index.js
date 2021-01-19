import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "@material-ui/core";
import { withSnackbar } from "notistack";

import Parse from "parse";
import MessageButton from "./../component/MessageButton.js";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:9000/parse";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Answerbook Admin</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Answer Book Admin</h1>
        <MessageButton />
      </main>
    </div>
  );
}

export default withSnackbar(Home);
