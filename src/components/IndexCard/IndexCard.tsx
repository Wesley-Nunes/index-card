import React from "react";
import { IoLocationSharp } from "@react-icons/all-files/io5/IoLocationSharp";
import { IoReaderSharp } from "@react-icons/all-files/io5/IoReaderSharp";
import { IoPulseSharp } from "@react-icons/all-files/io5/IoPulseSharp";
import styles from "./IndexCard.module.css";

const IndexCard = () => (
  <main className={styles["index-card"]}>
    <span className={styles["index-card__row"]}>
      <IoLocationSharp />
      <input
        type="text"
        aria-label="Scene Heading"
        placeholder="Scene Heading"
        className={styles["index-card__header"]}
      />
    </span>
    <span
      className={`${styles["index-card__row"]} ${styles["index-card__row--full-height"]}`}
    >
      <IoReaderSharp />
      <textarea
        aria-label="Synopsis"
        placeholder="Synopsis"
        className={styles["index-card__body"]}
      />
    </span>
    <span className={styles["index-card__row"]}>
      <IoPulseSharp />
      <input
        type="text"
        aria-label="Conflict"
        placeholder="Conflict"
        className={styles["index-card__footer"]}
      />
    </span>
  </main>
);
export default IndexCard;
