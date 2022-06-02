import React, { useState } from "react";
import styles from "../styles/Saved.module.css";
import Link from "next/link";
const saved = () => {
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 65, 66, 67, 68, 69, 70, 71]);
  return (
    <div className={styles.container}>
      <div className={styles.left_nav}>
        <div className={styles.left_up}>
          <Link href="/">
            <div className={styles.icon}></div>
          </Link>

          <Link href="/">
            <div className={styles.icon}></div>
          </Link>
          <Link href="/">
            <div className={styles.icon}></div>
          </Link>
        </div>
        <div className={styles.left_bottom}>
          <div className={styles.icon}></div>
          <div className={styles.icon}></div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.heading}>Bookemarked Surah</div>

        <div className={styles.surahs}>
          {nums.map((each) => (
            <div className={styles.surah}>
              <div className={styles.order}>3</div>
              <div className={styles.name}>Al Imran</div>
              <div className={styles.meaning}>The Family of Imran</div>
              <span className={styles.remove}>X</span>
            </div>
          ))}
        </div>
        <div className={styles.heading}>Bookemarked Verses</div>
        <div className={styles.verses}>
          {nums.map((each) => (
            <div className={styles.verseCard}>
              <div className={styles.verse}>
                <div className={styles.verse_meaning}>
                  We will show them our signs in the horizons and within
                  themselves until it becomes clear to them that it is the
                  truth.But is it not sufficient concerning your Lord that He is
                  , over all things, a Witness?
                </div>
                <div className={styles.reference}>Surah AT-Tur,Ayah 52:17</div>
              </div>
              <div className={styles.action}>X</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default saved;
