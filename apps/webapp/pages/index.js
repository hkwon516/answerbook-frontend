import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from '@material-ui/core';

import Parse from 'parse';

Parse.initialize("answerbookApi");
Parse.serverURL = 'http://localhost:9000/parse';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Answer Book WebApp</h1>
        <Button color="primary">Hello World</Button>
      </main>

      
    </div>
  );
}
