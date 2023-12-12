"use client";

import { Container, TextField, Box, Button } from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
import { TLoginData } from "@/app/api/login/route";

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TLoginData>();

  const onSubmitHandler = async (data: TLoginData) => {
    // TODO: 로그인 api
    // await signIn("credentials", {
    //   userId: data.userId,
    //   password: data.password,
    //   redirect: false,
    // })
    //   .then((result) => {
    //     console.log("signIn result:", result);
    //     if (result?.ok) {
    //       router.push(result.url ?? "/");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("signIn error:", error);
    //   });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box className={styles["top-area"]}>
        <Image src="/logo.svg" width={60} height={60} alt="점심먹자 로고" />
        <Box component="h2" sx={{ mt: 3 }}>
          로그인
        </Box>
      </Box>
      <Box
        className={styles.contents}
        onSubmit={handleSubmit(onSubmitHandler)}
        component="form"
        autoComplete="off"
      >
        <TextField
          id="userId"
          label="아이디"
          variant="standard"
          fullWidth
          required
          sx={{ mt: 4 }}
          {...register("userId")}
        />
        <TextField
          id="password"
          label="비밀번호"
          variant="standard"
          type="password"
          fullWidth
          required
          sx={{ mt: 4 }}
          {...register("password")}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 6 }}
          size="large"
          type="submit"
        >
          로그인
        </Button>
      </Box>
    </Container>
  );
}
