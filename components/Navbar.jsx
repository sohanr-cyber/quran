import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { MenuBook } from "@mui/icons-material";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <div
        className={styles.nav_flex}
        style={
          theme == "dark"
            ? { backgroundColor: "black", color: "white" }
            : { backgroundColor: "white" }
        }
      >
        <div className={styles.left}>
          <div className={styles.icon}>
            <MenuBookIcon />
          </div>
          <div className={styles.quran}>Quran</div>
        </div>

        <div className={styles.searchBox}>
          <span></span>
          <input
            style={
              theme == "dark"
                ? { backgroundColor: "black", color: "white" }
                : { backgroundColor: "white" }
            }
            onClick={() => setOpen(true)}
            placeholder="Search..."
          />
        </div>
      </div>
      {open ? <SearchBox setOpen={setOpen} /> : <></>}
    </>
  );
};

export default Navbar;
