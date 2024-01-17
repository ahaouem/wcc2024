"use client";

import { useEffect, useState } from "react";

interface ResponseProps {
  content: string;
  speed?: number;
}

export default function Response({ content, speed = 100 }: ResponseProps) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => {
        if (currentIndex < content.length) {
          return prevText + content[currentIndex++];
        }
        clearInterval(intervalId);
        return prevText;
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [content, speed]);

  return <div>{currentText}</div>;
}
