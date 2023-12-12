"use client";
import StarFillIcon from "@/app/_components/StarFillIcon";
import StarLineIcon from "@/app/_components/StarLineIcon";
import { categories, price } from "@/constants/restaurant";
import {
  Box,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { useRef, useState } from "react";
import Editor, { EditorComponentRef } from "@/app/_components/register/Editor";
import { useRouter } from "next/navigation";
import { TRestaurant } from "../list/page";
import { getCookie } from "@/utils/common";

export default function Register() {
  const router = useRouter();

  const [rated, setRated] = useState(0);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: AlertColor;
  }>({
    message: "",
    type: "success",
  });

  const { register, handleSubmit } = useForm<TRestaurant>();

  const editorRef = useRef<EditorComponentRef>(null);

  const onSubmitHandler = (data: TRestaurant) => {
    const description = editorRef.current?.getContent() ?? "";

    const body = {
      ...data,
      price: Number(data.price),
      distance: Number(data.distance),
      rated,
      description,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(body),
    };

    fetch("http://localhost:9999/restaurants", options)
      .then((response) => response.json())
      .then((result) => {
        setToastMessage({
          message: "정상적으로 등록 되었습니다.",
          type: "success",
        });
        router.push(`/restaurant/${result.id}`);
      })
      .catch((error) => {
        console.log("restaurant register error:", error);
        setToastMessage({ message: "등록에 실패했습니다.", type: "error" });
      });
  };

  return (
    <>
      <Box component="h2" sx={{ pr: 4 }}>
        식당 등록
      </Box>
      <Box sx={{ mt: 3, p: 2 }}>
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ xs: 3, sm: 4, md: 5 }}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="식당 명"
              variant="standard"
              placeholder="식당 이름을 입력해주세요."
              color="secondary"
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              label="주소"
              variant="standard"
              placeholder="식당 주소를 입력해주세요."
              color="secondary"
              {...register("address")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="category"
              select
              label="카테고리"
              defaultValue="korean"
              helperText="음식 카테고리를 설정해주세요."
              color="secondary"
              {...register("category")}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="price"
              select
              label="금액 대"
              defaultValue={0}
              helperText="메뉴의 평균 가격을 설정해주세요."
              color="secondary"
              {...register("price")}
            >
              {price.map((price) => (
                <MenuItem key={price.value} value={price.value}>
                  {price.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="distance"
              type="tel"
              label="거리 도보 {} 분"
              variant="standard"
              placeholder="식당까지 도보로 몇 분 걸리는지 입력해주세요."
              color="secondary"
              {...register("distance")}
            />
          </Grid>
          <Grid item xs={6}>
            <label>별점 *</label>
            <Stack
              spacing={{ xs: 1 }}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 2 }}
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <button
                  key={number}
                  type="button"
                  aria-label="별점"
                  onClick={() => setRated(number)}
                  className={styles.rated}
                >
                  {rated >= number ? (
                    <StarFillIcon width={30} height={30} />
                  ) : (
                    <StarLineIcon width={30} height={30} />
                  )}
                </button>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Editor ref={editorRef} />
          </Grid>
          <Grid item xs={12} className={styles["submit-grid"]}>
            <Button
              variant="contained"
              size="large"
              className={styles.submit}
              type="submit"
              color="secondary"
              sx={{ mt: 2 }}
            >
              등록하기
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!toastMessage.message}
        onClose={() => setToastMessage({ message: "", type: "success" })}
        message={toastMessage.message}
        autoHideDuration={6000}
      >
        <Alert severity={toastMessage.type}>{toastMessage.message}</Alert>
      </Snackbar>
    </>
  );
}
