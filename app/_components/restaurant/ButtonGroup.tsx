"use client";

import { TRestaurant } from "@/app/(route)/restaurant/list/page";
import { getCookie } from "@/utils/common";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ButtonGroup({
  originData,
}: {
  originData: TRestaurant;
}) {
  const router = useRouter();

  const goToUpdate = () => {
    router.push(`/restaurant/update/${originData.id}`);
  };

  const deleteRestaurant = () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    };

    fetch(`http://localhost:9999/restaurants/${originData.id}`, options)
      .then((response) => response.json())
      .then((result) => {
        // TODO: register이랑 toastmessage 글로벌하게 사용하도록

        // setToastMessage({
        //   message: "정상적으로 삭제 되었습니다.",
        //   type: "success",
        // });

        router.push(`/list`);
      })
      .catch((error) => {
        console.log("restaurants delete error:", error);
        // setToastMessage({ message: "등록에 실패했습니다.", type: "error" });
      });
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 4 }} justifyContent="flex-end">
      <Button variant="contained" size="large" onClick={goToUpdate}>
        수정
      </Button>
      <Button variant="outlined" size="large" onClick={deleteRestaurant}>
        삭제
      </Button>
    </Stack>
  );
}
