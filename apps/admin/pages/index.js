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
    return (
        <div className={styles.container}>
            <Head>
                <title>Answerbook Admin</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>{props.t("welcomeToAnswerbook")}</h1>
                <Button color="primary">{props.t("hello")}</Button>
                <Button color="primary" onClick={() => router.push("/signup")}>
                    Sign Up
                </Button>
                <Link href="/" locale="ko">
                    <a>Translate to Korea</a>
                </Link>
            </main>
        </div>
    );
}
