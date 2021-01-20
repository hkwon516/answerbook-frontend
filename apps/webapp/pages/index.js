import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from '@material-ui/core';

import Parse from 'parse';
import MessageButton from './../component/MessageButton.js'
import { withSnackbar } from "notistack";

Parse.initialize("answerbookApi");
Parse.serverURL = 'http://localhost:9000/parse';

function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Answer Book WebApp</h1>
        <MessageButton />
      </main>

    </div>
  );
}

export default withSnackbar(Home);