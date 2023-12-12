"use client";

import { Button } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useRouter } from "next/navigation";

export default function ListButton() {
  const router = useRouter();

  const goToList = () => {
    router.push("/restaurant/list");
  };
  return (
    <Button
      variant="text"
      endIcon={<FormatListBulletedIcon />}
      color="success"
      onClick={goToList}
    >
      목록으로 이동
    </Button>
  );
}
