import { useState, useEffect } from 'react';

export const useTypewriter = (texts, speed = 150, delay = 2000) => {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        // Borrando
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 1) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Escribiendo
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, textIndex, isDeleting, texts, speed, delay]);

  return text;
};