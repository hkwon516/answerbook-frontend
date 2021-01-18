import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from '@material-ui/core';

import Parse from 'parse';
import { makeStyles } from '@material-ui/core/styles';

Parse.initialize("answerbookApi");
Parse.serverURL = 'http://localhost:9000/parse';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <Head>
        <title>Answerbook Admin</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Answer Book Admin</h1>
        <Button color="primary">Hello World</Button>
      </main>

      
    </div>
  );
}
