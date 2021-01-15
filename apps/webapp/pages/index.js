import Head from "next/head";
import styles from "../styles/Home.module.css";

import Parse from 'parse';

Parse.initialize("answerbookApi");
Parse.serverURL = 'http://localhost:9000/parse';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Answerbook Webapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Answer Book WebApp</h1>
      </main>

      
    </div>
  );
}
