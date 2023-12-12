import { getCategoryLabel, getPriceLabel } from "@/utils/restaurant";
import styles from "./styles.module.css";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { cookies } from "next/headers";

export type TRestaurant = {
  id: number;
  name: string;
  address: string;
  category: string;
  price: number;
  distance: number;
  rated: number;
  description: string;
};

export default async function List() {
  const cookieStore = cookies();

  const response = await fetch("http://localhost:9999/restaurants", {
    headers: {
      Authorization: `Bearer ${cookieStore.get("accessToken")}`,
    },
  });
  const list: TRestaurant[] = await response.json();

  return (
    <>
      <Box component="h2" sx={{ pr: 4 }}>
        식당 목록
      </Box>
      <TableContainer
        component={Paper}
        sx={{ mt: 3 }}
        className={styles["table-container"]}
      >
        <Table aria-label="식당 목록 테이블" className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>식당명</TableCell>
              <TableCell align="center">음식 분류</TableCell>
              <TableCell align="center">가격대</TableCell>
              <TableCell align="center">거리</TableCell>
              <TableCell align="center">평점</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length ? (
              list.map((restaurant, index) => {
                const isOdd = index % 2 !== 0;
                return (
                  <TableRow
                    key={restaurant.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={`${isOdd ? "update/" : ""}${restaurant.id}`}>
                        {restaurant.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`${isOdd ? "update/" : ""}${restaurant.id}`}>
                        {getCategoryLabel(restaurant.category)}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`${isOdd ? "update/" : ""}${restaurant.id}`}>
                        {getPriceLabel(restaurant.price)}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        href={`${isOdd ? "update/" : ""}${restaurant.id}`}
                      >{`${restaurant.distance}분`}</Link>
                    </TableCell>
                    <TableCell align="center">
                      <Link href={`${isOdd ? "update/" : ""}${restaurant.id}`}>
                        {restaurant.rated}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    pt: 2,
                    pb: 2,
                  },
                }}
              >
                <TableCell align="center" colSpan={5}>
                  등록된 식당 정보가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
