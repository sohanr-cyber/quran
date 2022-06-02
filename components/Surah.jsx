import React from "react";
import styles from "../styles/Surah.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Link from "next/link";

const Surah = ({ chapter, index }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Link href={`/surah/${chapter.chapter_number}`}>
      <div
        id={`surah-${index}`}
        className={styles.surah}
        style={
          theme == "dark"
            ? { backgroundColor: "black", color: "white" }
            : { backgroundColor: "white" }
        }
      >
        <div className={styles.surah_top}>
          <div className={styles.surah_order}>{chapter.chapter_number} </div>
          <div className={styles.surah_action}>
            <BookmarkBorderIcon style={{ fontSize: "130%" }} />
          </div>
        </div>
        <div className={styles.surah_bottom}>
          <div className={styles.surah_name}>{chapter.name_simple}</div>
          <div className={styles.surah_eng}>{chapter.translated_name.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default Surah;
