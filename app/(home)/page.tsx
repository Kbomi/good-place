"use client"; // 서버와 통신하지 않는 페이지
import styles from "./page.module.css";
import MainSlide from "../_components/main/slide";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box component="h2" sx={{ pr: 4 }} className={styles.heading}>
        TODAY
        <br />
        점메추~🧡
      </Box>
      <MainSlide />
    </main>
  );
}
