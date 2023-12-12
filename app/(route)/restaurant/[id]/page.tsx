import { TRestaurant } from "@/app/(route)/restaurant/list/page";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Input,
  InputLabel,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";
import styles from "./styles.module.css";
import { getCategoryLabel, getPriceLabel } from "@/utils/restaurant";
import StarFillIcon from "@/app/_components/StarFillIcon";
import StarLineIcon from "@/app/_components/StarLineIcon";
import ButtonGroup from "@/app/_components/restaurant/ButtonGroup";
import ListButton from "@/app/_components/restaurant/ListButton";
import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: { id: string };
};

// const getData = async (id: string) => {
//   const cookieStore = cookies();

//   const response = await fetch(`http://localhost:9999/restaurants/${id}`, {
//     headers: {
//       Authorization: `Bearer ${cookieStore.get("accessToken")}`,
//     },
//   });
//   const item: TRestaurant = await response.json();
//   return item;
// };

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const cookieStore = cookies();

  const response = await fetch(
    `http://localhost:9999/restaurants/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")}`,
      },
    }
  );
  const item: TRestaurant = await response.json();

  return {
    title: item.name,
  };
};

export default async function Restaurant({ params }: Props) {
  const cookieStore = cookies();

  const response = await fetch(
    `http://localhost:9999/restaurants/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get("accessToken")}`,
      },
    }
  );
  const item: TRestaurant = await response.json();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box component="h2" sx={{ pr: 4 }}>
          식당 정보
        </Box>
        <ListButton />
      </Stack>
      <Box sx={{ mt: 3, p: 2 }} className={styles.contents}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 3, sm: 4, md: 5 }}>
          <Grid item xs={12}>
            <FormLabel htmlFor="name" color="secondary">
              식당명
            </FormLabel>
            <Input
              id="name"
              readOnly
              value={item.name}
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel htmlFor="address" color="secondary">
              주소
            </FormLabel>
            <Input
              id="address"
              readOnly
              value={item.address}
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel htmlFor="category" color="secondary">
              카테고리
            </FormLabel>
            <Input
              id="category"
              readOnly
              value={getCategoryLabel(item.category)}
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel htmlFor="price" color="secondary">
              금액 대
            </FormLabel>
            <Input
              id="price"
              readOnly
              value={getPriceLabel(item.price)}
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel htmlFor="distance" color="secondary">
              거리
            </FormLabel>
            <Input
              id="distance"
              readOnly
              value={item.distance}
              color="secondary"
              fullWidth
              sx={{ mt: 1 }}
              endAdornment={<span>분</span>}
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel color="secondary">별점 *</FormLabel>
            <Stack
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 2 }}
            >
              {[1, 2, 3, 4, 5].map((star, index) => {
                return item.rated >= star ? (
                  <StarFillIcon key={index} width={30} height={30} />
                ) : (
                  <StarLineIcon key={index} width={30} height={30} />
                );
              })}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormLabel color="secondary">내용</FormLabel>
            <Box
              dangerouslySetInnerHTML={{ __html: item.description }}
              className={styles.description}
              sx={{ mt: 2, p: 2 }}
            ></Box>
          </Grid>
        </Grid>
        <ButtonGroup originData={item} />
      </Box>
    </>
  );
}
