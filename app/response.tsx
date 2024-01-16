"use client";

import { useEffect, useState } from "react";

export default function Response({
  content,
  speed,
}: {
  content: string;
  speed?: number;
}) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => prevText + content[currentIndex]);
      currentIndex += 1;

      if (currentIndex === content.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [content, speed]);

  return <div>{currentText}</div>;
}
