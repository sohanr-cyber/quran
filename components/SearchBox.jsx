import React, { useEffect, useState } from "react";
import styles from "../styles/SearchBox.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const SearchBox = ({ setOpen }) => {
  const [query, setQuery] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetch = async (query) => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://al-quran1.p.rapidapi.com/corpus/${query}`,
          {
            headers: {
              "x-rapidapi-host": "al-quran1.p.rapidapi.com",
              "x-rapidapi-key":
                "83712b7a59msh3c707d03b1cbf19p1b33d4jsna662d0e8fc77",
            },
          }
        );
        console.log(data);
        setLoading(false);
        setVerses(data);
      } catch (error) {
        console.log(error);
      }
    };
    query.length > 0 && fetch(query);
  }, [query]);

  useEffect(() => {}, []);
  return (
    <div
      className={styles.container}
      style={
        theme == "dark"
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor: "white" }
      }
    >
      <span onClick={() => setOpen(false)}>
        <CloseIcon />
      </span>
      <form>
        <input
          style={
            theme == "dark"
              ? { backgroundColor: "black", color: "white" }
              : { backgroundColor: "white" }
          }
          type="text"
          placeholder="Search By Word"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>
      <div className={styles.results}>
        {loading ? (
          <CircularProgress
            style={
              theme == "dark"
                ? {  backgroundColor: "black",
                color: "green",
                position: "absolute",
                top: "50%",
                right: "50%",}
                : {
                    backgroundColor: "white",
                    color: "green",
                    position: "absolute",
                    top: "50%",
                    right: "50%",
                  }
            }
          />
        ) : (
          <>
            {query.length > 0 && <h3>Total Matches :{verses.length - 1}</h3>}
            {verses.slice(1).map((verse, index) => (
              <div
                className={styles.verse}
                onClick={() => {
                  setOpen(false);
                  router.push(
                    `/surah/${verse.surah_no}/#verse-${verse.verse_no}`
                  );
                }}
                key={index}
                style={
                  theme == "dark"
                    ? { backgroundColor: "black", color: "white" }
                    : { backgroundColor: "white" }
                }
              >
                <div className={styles.verse_meaning}>{verse.content}</div>
                <div className={styles.reference}>
                  {verse.surah_no}:{verse.verse_no}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
