import { useState, useEffect } from 'react';

export default function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 50, pauseDelay = 1500) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    let timeout;
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === "") {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === currentWord) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, words, currentWordIndex, typingSpeed, deletingSpeed, pauseDelay]);

  return currentText + (isDeleting ? "" : "|"); // Add a cursor for better effect, or just let it return text
}
