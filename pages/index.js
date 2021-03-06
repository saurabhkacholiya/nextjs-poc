import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import fs from "fs";
import Link from "next/link";

export default function Home({ slug }) {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <img src="https://brobible.com/wp-content/uploads/2021/01/50-best-memes-2021-calendar-joke.png?w=1024" />
      </main>

      <footer>
        {slug.map((fileName) => {
          return (
            <div style={{ background: "grey", margin: 20 }}>
              <Link key={fileName} href={"/blog/" + fileName}>
                <a>{"/blog/" + fileName}</a>
              </Link>
            </div>
          );
        })}
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync("post");
  return {
    props: {
      slug: files.map((fileName) => fileName.replace(".md", "")),
    },
  };
};
