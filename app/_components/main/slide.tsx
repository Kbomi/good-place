"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";

import styles from "./styles.module.css";

import { list } from "@/mockdata/food_list";
import { Box, Button } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const slideHeight = 200;
const LIST_ARRAY = [list[list.length - 1], ...list, list[0]]; // 슬라이드를 위한 새로운 리스트
const initDuration = 900;

const MainSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [duration, setDuration] = useState(initDuration);
  const [transition, setTransition] = useState("transform");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timingFunction, setTimingFunction] = useState("linear");

  useLayoutEffect(() => {
    if (isAutoPlay) {
      // 0.5초마다 슬라이드 변경
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === list.length) {
            setTransition("none");
            return 0;
          }
          setTransition("transform");
          return prevIndex + 1;
        });
      }, 300);

      return () => {
        clearInterval(timerRef.current as NodeJS.Timeout);
      };
    }
  }, [isAutoPlay, duration]);

  useLayoutEffect(() => {
    if (!isAutoPlay) {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
  }, [isAutoPlay]);

  const handleAutoPlay = () => {
    setIsAutoPlay(true);

    // 속도 duration
    let count = 0;

    const durationInterval = setInterval(() => {
      // 5초 뒤 멈춤
      if (count === 50) {
        setIsAutoPlay(false);
        setDuration(initDuration);

        clearInterval(durationInterval);
        clearInterval(timerRef.current as NodeJS.Timeout);
        return;
      }

      count++;

      // 0.6초까지 duration 900ms
      if (count <= 6) {
        setDuration(initDuration);
        return;
      }

      // 1.2초 까지 duration 700ms
      if (count <= 12) {
        setDuration(700);
        return;
      }

      // 2.6초까지 duration 450ms
      if (count <= 26) {
        setDuration(450);
        return;
      }

      // 4.5초까지 duration 700ms
      if (count <= 45) {
        setDuration(700);
        return;
      }

      // 4.8초쯤에 효과주기
      if (count === 48) {
        setTimingFunction("cubic-bezier(0.47, 1.64, 1, 0.8)");
      }

      // 이후에 duration 900ms
      setDuration(initDuration);
    }, 100);
  };

  return (
    <Box sx={{ mt: 4 }} className={styles.container}>
      <Box className={styles.topbar}>
        <Button
          startIcon={<RefreshRoundedIcon />}
          variant="contained"
          size="small"
          className={styles.button}
          onClick={handleAutoPlay}
        >
          랜덤 돌리기
        </Button>
      </Box>
      <Box className={styles.contents}>
        <Box className={styles.slide}>
          <Box
            className={styles["slide-wrap"]}
            sx={{
              transform: `translateY(-${currentIndex * 200}px)`,
              transitionDuration: `${duration}ms`,
              transitionProperty: `${transition}`,
              transitionTimingFunction: `${timingFunction}`,
            }}
          >
            {LIST_ARRAY.map((food, index) => {
              return (
                <Box
                  className={`${styles.item} ${
                    currentIndex == index ? "active" : ""
                  }`}
                  key={index}
                  sx={{ height: slideHeight }}
                >
                  <i className={styles.icon}>{food.img}</i>
                  <span>{food.title}</span>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainSlide;
