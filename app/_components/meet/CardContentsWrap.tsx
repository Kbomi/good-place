"use client";

import { TRestaurant } from "@/app/(route)/restaurant/list/page";
import { TMeet } from "@/app/(route)/meet/page";
import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/common";

export default function CardContentsWrap({
  children,
  originData,
  restaurantList,
}: {
  children: React.ReactNode;
  originData: TMeet;
  restaurantList: TRestaurant[];
}) {
  const router = useRouter();

  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);

  const { register, handleSubmit } = useForm<TMeet>();

  const openUpdateModal = () => {
    const _rootEl = document.getElementById("modal");

    if (_rootEl) {
      setRootEl(_rootEl);
    }
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const onSubmitHandler = (data: TMeet) => {
    const body = {
      ...data,
      max: Number(data.max),
      joinUser: null,
      restaurant: restaurantList[Number(data.restaurant)],
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify(body),
    };

    fetch(`http://localhost:9999/meets/${originData.id}`, options)
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
        console.log("meet update error:", error);
        // setToastMessage({ message: "등록에 실패했습니다.", type: "error" });
      });
  };

  return (
    <>
      <CardActionArea onClick={openUpdateModal}>{children}</CardActionArea>
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
                  defaultValue={originData.title}
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
                  defaultValue={originData.description}
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
                  defaultValue={originData.max}
                />
                <TextField
                  required
                  fullWidth
                  id="restaurant"
                  select
                  label="식당"
                  defaultValue={originData.restaurant.id}
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

                {originData.joinUser && (
                  <>
                    <Typography variant="body2" sx={{ mt: 3, mb: 2 }}>
                      현재 참여한 사람
                    </Typography>
                    {originData.joinUser.map((user) => {
                      const firstName = user.name.charAt(0);
                      return (
                        <Chip
                          key={user.id}
                          avatar={<Avatar>{firstName}</Avatar>}
                          label={user.name}
                        />
                      );
                    })}
                  </>
                )}

                <DialogActions sx={{ mt: 5 }}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                  >
                    수정하기
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
