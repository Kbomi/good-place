"use client";

import { Button, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TMeet } from "@/app/(route)/meet/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/common";

const dummyUser = {
  id: 3,
  name: "울라",
};

export default function CardAction({ originData }: { originData: TMeet }) {
  const router = useRouter();

  const [alreadyJoin, setAlreadyJoin] = useState(false);

  useEffect(() => {
    if (originData.joinUser?.length) {
      const findUser = originData.joinUser.find(
        (user) => user.id === dummyUser.id
      );
      if (findUser) {
        setAlreadyJoin(true);
      }
    }
  }, [originData]);

  const joinMeet = () => {
    let joinUser;

    if (alreadyJoin) {
      joinUser = originData.joinUser!.filter(
        (user) => user.id !== dummyUser.id
      );
    } else {
      joinUser = originData.joinUser
        ? originData.joinUser.concat(dummyUser)
        : [dummyUser];
    }

    const body = {
      ...originData,
      joinUser,
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

        router.refresh();
      })
      .catch((error) => {
        console.log("join meet error:", error);
        // setToastMessage({ message: "등록에 실패했습니다.", type: "error" });
      });
  };

  const deleteMeet = () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };

    fetch(`http://localhost:9999/meets/${originData.id}`, options)
      .then((response) => response.json())
      .then((result) => {
        // TODO: register이랑 toastmessage 글로벌하게 사용하도록

        // setToastMessage({
        //   message: "정상적으로 등록 되었습니다.",
        //   type: "success",
        // });

        router.refresh();
      })
      .catch((error) => {
        console.log("meet delete error:", error);
        // setToastMessage({ message: "등록에 실패했습니다.", type: "error" });
      });
  };

  const checkJoin = (): boolean => {
    return false;
  };

  return (
    <CardActions>
      <Button size="small" color="primary" onClick={joinMeet}>
        {alreadyJoin ? "참여 취소" : "참여하기"}
      </Button>
      <IconButton aria-label="삭제" onClick={deleteMeet}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  );
}
