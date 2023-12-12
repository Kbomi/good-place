import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import styles from "./styles.module.css";
import { TRestaurant } from "@/app/(route)/restaurant/list/page";
import CreateButton from "@/app/_components/meet/CreateButton";
import CardContentsWrap from "@/app/_components/meet/CardContentsWrap";
import CardAction from "@/app/_components/meet/CardAction";
import { cookies } from "next/headers";

export type TMeet = {
  id: number;
  title: string;
  description: string;
  max: number;
  joinUser: { id: number; name: string }[] | null;
  restaurant: TRestaurant;
};

export default async function Meet() {
  const cookieStore = cookies();

  const urls = [
    "http://localhost:9999/meets",
    "http://localhost:9999/restaurants",
  ];
  const res = await Promise.all(
    urls.map((url) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${cookieStore.get("accessToken")}`,
        },
      })
    )
  );
  const resJson = await Promise.all(res.map((_res) => _res.json()));

  const list: TMeet[] = resJson[0];
  const restaurantList: TRestaurant[] = resJson[1];

  return (
    <>
      <Box component="h2" sx={{ pr: 4 }}>
        점심 팟<br />
        오늘 점심 같이 먹을 사람?
        <Image
          src="/meet-img.svg"
          alt="손들고 있는 사람 이미지"
          width={35}
          height={35}
          loading="lazy"
          className={styles.image}
        />
      </Box>
      <CreateButton restaurantList={restaurantList} />
      <Box sx={{ mt: 1, p: 2 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {list?.map((meet) => {
            return (
              <Grid item xs={6} key={meet.id}>
                <Card>
                  <CardContentsWrap
                    originData={meet}
                    restaurantList={restaurantList}
                  >
                    <CardMedia
                      component="img"
                      height="280"
                      image="/card-default-img.jpg"
                      alt={`${meet.restaurant.name} 이미지`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {meet.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {meet.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        모집 마감 인원: {meet.max}명<br />
                        <b>현재 모인 인원: {meet.joinUser?.length ?? 0}명</b>
                      </Typography>
                    </CardContent>
                  </CardContentsWrap>
                  <CardAction originData={meet} />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
