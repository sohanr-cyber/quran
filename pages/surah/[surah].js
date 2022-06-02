import React, { useState, useEffect } from "react";
import styles from "../../styles/SingleSurah.module.css";
import Link from "next/link";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import { addVerse, addLastRead, removeVerse } from "../../redux/savedSlice";
import { changeToDark, changeToDefault } from "../../redux/themeSlice";
import Cookies from "js-cookie";

const surah = ({ surah, chapters }) => {
  const theme = useSelector((state) => state.theme.theme);
  const localtheme = Cookies.get("theme");

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [verseQuery, setVerseQuery] = useState("");
  const router = useRouter();
  const savedVerses = useSelector((state) => state.saved.savedVerses);



  useEffect(() => {
    dispatch(
      addLastRead({
        surah_name: surah.surah_name,
        id: surah.id,
        translation: surah.translation,
      })
    );
  }, [surah]);
  return (
    <div
      className={styles.home_container}
      style={
        theme == "dark"
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor: "white" }
      }
    >
      <div className={styles.left_nav}>
        <div className={styles.left_up}>
          <Link href="/">
            <div className={styles.icon}>
              <HomeIcon />
            </div>
          </Link>
        </div>
        <div className={styles.left_bottom}>
          <div
            className={styles.icon}
            onClick={() => {
              dispatch(changeToDark());
            }}
          >
            <DarkModeIcon />
          </div>
          <div
            className={styles.icon}
            onClick={() => {
              dispatch(changeToDefault());
            }}
          >
            <LightModeIcon />
          </div>
        </div>
      </div>
      <div className={styles.mid}>
        <div className={styles.left}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search Surah"
              onChange={(e) => setQuery(e.target.value)}
              style={
                theme == "dark"
                  ? { backgroundColor: "black", color: "white" }
                  : { backgroundColor: "white" }
              }
            />
          </div>
          <div className={styles.surahs}>
            {chapters
              .filter((chapter) =>
                chapter.name_simple.toLowerCase().includes(query.toLowerCase())
              )
              .map((chapter, index) => (
                <Link href={`/surah/${chapter.chapter_number}`} key={index}>
                  <div
                    className={styles.surah}
                    style={
                      (surah.id == chapter.chapter_number
                        ? {
                            border: "2px solid green",
                            marginLeft: "3px",
                            fontSize: "110%",
                          }
                        : {},
                      theme == "dark"
                        ? { backgroundColor: "black", color: "white" }
                        : { backgroundColor: "white" })
                    }
                  >
                    <>
                      <div className={styles.order}>
                        {chapter.chapter_number}
                      </div>
                      <div className={styles.name}>{chapter.name_simple}</div>
                    </>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className={styles.details}>
          <div
            className={styles.beggining}
            style={
              theme == "dark"
                ? { backgroundColor: "black", color: "white" }
                : { backgroundColor: "white" }
            }
          >
            <div className={styles.name}>{surah.surah_name}</div>
            {surah.id != 9 && (
              <div className={styles.bism}>In the Name Of Allah</div>
            )}
          </div>
          {Object.entries(surah.verses).map(([key, verse]) => (
            <div
              className={styles.verseCard}
              key={key}
              id={`verse-${key}`}
              style={
                theme == "dark"
                  ? { backgroundColor: "black", color: "white" }
                  : { backgroundColor: "white" }
              }
            >
              <span className={styles.verse_no}>{verse.id}</span>
              <div className={styles.arabic}>{verse.content}</div>
              <div className={styles.meaning}> {verse.translation_eng}</div>
              <hr style={{ color: "lightgrey" }} />
              <div className={styles.bottom}>
                {savedVerses?.includes(verse) ? (
                  <BookmarkIcon
                    style={{ fontSize: "190%" }}
                    onClick={() => dispatch(removeVerse(verse))}
                  />
                ) : (
                  <BookmarkBorderIcon
                    style={{ fontSize: "190%" }}
                    onClick={() => dispatch(addVerse(verse))}
                  />
                )}

                <CopyToClipboard
                  text={verse.translation_eng}
                  onCopy={() => alert("Copied")}
                >
                  <div>
                    <ContentCopyOutlinedIcon style={{ fontSize: "170%" }} />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          ))}
          <div className={styles.change}>
            {surah.id > 1 && (
              <div
                className={styles.each}
                style={
                  theme == "dark"
                    ? { backgroundColor: "black", color: "white" }
                    : { backgroundColor: "white" }
                }
                onClick={() => router.push(`/surah/${surah.id - 1}`)}
              >
                Previous Surah
              </div>
            )}

            <div
              className={styles.each}
              style={
                theme == "dark"
                  ? { backgroundColor: "black", color: "white" }
                  : { backgroundColor: "white" }
              }
              onClick={() => router.push(`/surah/${surah.id}/#verse-${1}`)}
            >
              Top Of Surah
            </div>
            {surah.id < 114 && (
              <div
                className={styles.each}
                style={
                  theme == "dark"
                    ? { backgroundColor: "black", color: "white" }
                    : { backgroundColor: "white" }
                }
                onClick={() => router.push(`/surah/${surah.id + 1}`)}
              >
                Next Surah
              </div>
            )}
          </div>
        </div>

        <div className={styles.versesList}>
          <div className={styles.searchBox}>
            <input
              style={
                theme == "dark"
                  ? { backgroundColor: "black", color: "white" }
                  : { backgroundColor: "white" }
              }
              type="text"
              placeholder="Verse"
              onChange={(e) => {
                setVerseQuery(e.target.value);
              }}
            />
          </div>
          <div
            className={styles.verses}
            style={
              theme == "dark"
                ? { backgroundColor: "black", color: "white" }
                : { backgroundColor: "white" }
            }
          >
            {/* {Object.entries(surah.verses).map(([key, verse]) => ( */}

            {Array.from(Array(surah.total_verses), (_, x) => x).map((key) => (
              // <Link href={href}>
              <div
                className={styles.verse}
                key={key}
                id={`verse-${key}`}
                style={
                  router.asPath.split("#")[1] == `verse-${key}`
                    ? {
                        color: "yellowgreen",
                        fontWeight: "700",
                        fontSize: "120%",
                        paddingLeft: "7px",
                      }
                    : {}
                }
                onClick={() => {
                  router.push(`#verse-${key}`);
                }}
              >
                {key}
              </div>
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default surah;

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `https://al-quran1.p.rapidapi.com/${params.surah}`,
    {
      headers: {
        "X-RapidAPI-Host": "al-quran1.p.rapidapi.com",
        "X-RapidAPI-Key": "83712b7a59msh3c707d03b1cbf19p1b33d4jsna662d0e8fc77",
      },
    }
  );

  const {
    data: { chapters },
  } = await axios.get("http://api.quran.com/api/v3/chapters");
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { surah: data, chapters }, // will be passed to the page component as props
  };
}
