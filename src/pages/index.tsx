import Head from "next/head";
import { IndexCard } from "@/components";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Index Card</title>
        <meta name="description" content="Index card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <IndexCard />
      </div>
    </>
  );
}
