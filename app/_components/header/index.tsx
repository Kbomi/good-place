"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

const navList = [
  {
    path: "/restaurant/list",
    name: "식당 목록",
  },
  {
    path: "/restaurant/register",
    name: "식당 등록",
  },
  {
    path: "/meet",
    name: "점심 팟",
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <Box
      component="header"
      className={styles.header}
      sx={{ mt: 2, mb: 2, pt: 1, pb: 1, pr: 1, pl: 2 }}
    >
      <h1 className={styles.logo}>
        <Link href="/">
          <Image src="/logo.svg" width={40} height={40} alt="메인" />
        </Link>
      </h1>
      <nav>
        <ul className={styles["menu-list"]}>
          {navList.map((nav) => (
            <Box component="li" sx={{ pr: 2, pl: 2 }} key={nav.path}>
              <Link
                href={nav.path}
                className={nav.path === pathname ? styles["link-active"] : ""}
              >
                {nav.name}
              </Link>
            </Box>
          ))}
        </ul>
      </nav>
    </Box>
  );
};

export default Header;
