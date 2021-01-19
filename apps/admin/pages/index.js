import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

import Parse from "parse";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:9000/parse";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Answer Book Admin</h1>
        <Button color="primary" onClick={() => router.push("/anon/signUp")}>
          Sign Up
        </Button>
      </main>
    </div>
  );
}
