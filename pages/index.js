import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Surah from "../components/Surah";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { removeLastRead } from "../redux/savedSlice";
import { changeToDark, changeToDefault } from "../redux/themeSlice";
import Navbar from "../components/Navbar";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import HomeIcon from "@mui/icons-material/Home";
const index = ({ chapters }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const savedVerses = useSelector((state) => state.saved.savedVerses);
  const savedSurahs = useSelector((state) => state.saved.savedSurahs);
  const theme = useSelector((state) => state.theme.theme);

  const [nums, setNums] = useState([1, 2, 22, 2, 2, 2, 2, 2]);
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
      <div
        className={styles.mid}
        style={
          theme == "dark"
            ? { backgroundColor: "rgba(59, 104, 28, 0.2);", color: "white" }
            : { backgroundColor: "rgba(59, 104, 28, 0.2);" }
        }
      >
        <div className={styles.top_menu}>
          <div className={styles.rightside}>
            <div className={styles.searchBox}>
              <input
                type="text"
                Placeholder="Search Surah"
                onChange={(e) => setQuery(e.target.value)}
                style={
                  theme == "dark"
                    ? { backgroundColor: "black", color: "white" }
                    : { backgroundColor: "white" }
                }
              />
            </div>
            <div
              className={styles.short}
              style={
                theme == "dark"
                  ? { backgroundColor: "black", color: "white" }
                  : { backgroundColor: "white" }
              }
            >
              <span>short by</span>
              <span>
                <select
                  style={
                    theme == "dark"
                      ? { backgroundColor: "black", color: "white" }
                      : { backgroundColor: "white" }
                  }
                >
                  <option value="ASC">ASC</option>
                  <option value="DESC">DESC</option>
                </select>
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.surahs}>
          {chapters
            .filter((item) =>
              item.name_simple.toLowerCase().includes(query.toLowerCase())
            )
            .map((chapter, index) => (
              <Surah chapter={chapter} index={index} key={index} />
            ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.recent}>
          <div className={styles.head}>Last Read</div>
          <div className={styles.surahs}>
            <div className={styles.surah}>
              <div className={styles.left}>
                {console.log(savedSurahs[savedSurahs.length - 1])}
                <div className={styles.surah_name}>surah Fatiha</div>
                <div className={styles.surah_ayay}>Ayay 6</div>
              </div>
              <div className={styles.icon}></div>
            </div>
          </div>
        </div>
        <div className={styles.head}>Popular</div>
        <div className={styles.popular}>
          <div className={styles.popular}>AL Mulk</div>
          <div className={styles.popular}>Yaseen</div>
          <div className={styles.popular}>AL Waqi'ah</div>
          <div className={styles.popular}>AL Kahf</div>
        </div>

        <div className={styles.head}>Recent</div>
        <div className={styles.bookmarks}>
          <div className={styles.bookmarked_surahs}>
            {savedSurahs.map((surah) => (
              <div className={styles.bookmarked_surah}>
                {/* <div className={styles.order}>3</div> */}
                <div className={styles.name}>{surah.surah_name}</div>
                <div className={styles.eng}>{surah.translation}</div>
                <div className={styles.action}>
                  <span
                    onClick={() => {
                      dispatch(removeLastRead(surah));
                    }}
                  >
                    X
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.bookmarked_verses}>
            <>
              {savedVerses?.map((verse) => {
                <div className={styles.bookmarked_verse}>
                  <div className={styles.verse}>
                    <div className={styles.verse_meaning}>
                      {verse.translation_eng}
                    </div>
                    <div className={styles.reference}>
                      {/* Chapter-{verse.id.split(".")[1]},Ayay-
                    {verse.id.split(".")[0]} */}
                      {verse.id}
                    </div>
                  </div>
                  <div className={styles.action}>X</div>
                </div>;
              })}

              <div className={styles.linkbutton}>
                <Link href="/">See All</Link>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const {
    data: { chapters },
  } = await axios.get("http://api.quran.com/api/v3/chapters");

  return {
    props: { chapters }, // will be passed to the page component as props
  };
}
