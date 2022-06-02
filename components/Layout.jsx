import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div
  
    >
      <Head>
        <title>Real Estate</title>
      </Head>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
