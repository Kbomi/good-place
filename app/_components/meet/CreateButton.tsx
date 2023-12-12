"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  MenuItem,
  Modal,
  Slide,
  TextField,
} from "@mui/material";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";
import { useState } from "react";
import { TMeet } from "@/app/(route)/meet/page";
import { useForm } from "react-hook-form";
import { TRestaurant } from "@/app/(route)/restaurant/list/page";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/common";

export default function CreateButton({
  restaurantList,
}: {
  restaurantList: TRestaurant[];
}) {
  const router = useRouter();

  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  const { register, handleSubmit } = useForm<TMeet>();

  const openCreateModal = () => {
    const _rootEl = document.getElementById("modal");

    if (_rootEl) {
      setRootEl(_rootEl);
    }
  };

  const onSubmitHandler = (data: TMeet) => {
    const body = {
      ...data,
      max: Number(data.max),
      joinUser: null,
      restaurant: restaurantList[Number(data.restaurant)],
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(body),
    };

    fetch("http://localhost:9999/meets", options)
      .then((response) => response.json())
      .then((result) => {
        // TODO: register이랑 toastmessage 글로벌하게 사용하도록

        // setToastMessage({
        //   message: "정상적으로 등록 되었습니다.",
        //   type: "success",
        // });
        setRootEl(null);
        router.refresh();
      })
      .catch((error) => {
        console.log("meet register error:", error);
        // setToastMessage({ message: "등록에 실패했습니다.", type: "error" });
      });
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <Button
        variant="contained"
        className={styles["create-button"]}
        color="secondary"
        onClick={openCreateModal}
      >
        점심 팟 만들기
      </Button>
      {rootEl &&
        createPortal(
          <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setRootEl(null)}
            aria-labelledby="점심 팟 만들기"
          >
            <DialogTitle>점심 모임을 만들어요.</DialogTitle>
            <DialogContent>
              <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="제목"
                  variant="standard"
                  placeholder="제목을 입력해주세요."
                  color="secondary"
                  {...register("title")}
                />
                <TextField
                  required
                  fullWidth
                  id="description"
                  variant="standard"
                  placeholder="간단하게 내용을 입력해주세요."
                  color="secondary"
                  {...register("description")}
                  sx={{ mt: 4 }}
                />
                <TextField
                  required
                  id="max"
                  label="최대 인원 수"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("max")}
                  sx={{ mt: 4 }}
                />
                <TextField
                  required
                  fullWidth
                  id="restaurant"
                  select
                  label="식당"
                  defaultValue={restaurantList[0].id}
                  helperText="오늘 점심으로 갈 식당을 선택해주세요."
                  color="secondary"
                  {...register("restaurant")}
                  sx={{ mt: 4 }}
                >
                  {restaurantList.map((restaurant) => (
                    <MenuItem key={restaurant.id} value={`${restaurant.id}`}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </TextField>

                <DialogActions sx={{ mt: 5 }}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                  >
                    등록하기
                  </Button>
                  <Button onClick={() => setRootEl(null)}>취소</Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>,
          rootEl
        )}
    </>
  );
}
