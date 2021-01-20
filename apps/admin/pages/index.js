import React from "react";
import styles from "../styles/Home.module.css";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { withSnackbar } from "notistack";

import Parse from "parse";

Parse.initialize("answerbookApi");
Parse.serverURL = "http://localhost:9000/parse";

export default function Home(props) {
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
                <Link href="/" locale="ko">
                    <a>Translate to Korea</a>
                </Link>
            </main>
        </div>
    );
}
