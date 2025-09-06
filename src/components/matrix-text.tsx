'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MatrixTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const MatrixText = ({ text, className, delay = 0 }: MatrixTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let animationFrameId: number;
    let currentText = '';
    let iterations = 0;
    const targetText = text;
    const initialDelay = setTimeout(() => {
        const animate = () => {
            if (iterations >= targetText.length * 1.5) { // Slower reveal
                currentText = targetText;
                setIsAnimating(false);
            } else {
                currentText = targetText.split('').map((_, index) => {
                    if (index < iterations) { // Reveal one character at a time
                        return targetText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join('');
                iterations += 0.5; // Slower iteration speed
            }
            
            setDisplayText(currentText);

            if (isAnimating) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        animate();

    }, delay)


    return () => {
      clearTimeout(initialDelay);
      cancelAnimationFrame(animationFrameId);
      setIsAnimating(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  useEffect(() => {
    if(!isAnimating){
        setDisplayText(text);
    }
  }, [isAnimating, text]);

  return <span className={cn(className, 'min-h-[1em] inline-block')}>{displayText}</span>;
};
