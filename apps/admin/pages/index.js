import React from "react";
import styles from "../styles/Home.module.css";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";

import Parse from "parse";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:9000/parse";

const Home = (props) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{props.t("welcomeToAnswerbook")}</h1>
        <Button color="primary">{props.t("hello")}</Button>
        <Button color="primary" onClick={() => router.push("/signup")}>
          Sign Up
        </Button>
        <Button color="primary" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button color="primary" variant="contained" onClick={(e) => props.showSuccess("Success Message")}>
          Success.
        </Button>
        <br />
        <Button color="primary" variant="contained" onClick={(e) => props.showError("Error Message")}>
          Error.
        </Button>
        <br />
        <Link href="/" locale="ko">
          <a>Translate to Korea</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
