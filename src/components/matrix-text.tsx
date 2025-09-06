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
    let finished = false;

    const initialDelay = setTimeout(() => {
        const animate = () => {
            if (finished) return;
            
            if (iterations >= targetText.length) {
                currentText = targetText;
                setDisplayText(currentText);
                setIsAnimating(false);
                finished = true;
                cancelAnimationFrame(animationFrameId);
                return;
            } 
            
            currentText = targetText.split('').map((_, index) => {
                if (index < iterations) {
                    return targetText[index];
                }
                return characters[Math.floor(Math.random() * characters.length)];
            }).join('');
            
            iterations += 1; // Faster iteration speed
            setDisplayText(currentText);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

    }, delay)


    return () => {
      clearTimeout(initialDelay);
      cancelAnimationFrame(animationFrameId);
      finished = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  return <span className={cn(className, 'min-h-[1em] inline-block')}>{displayText}</span>;
};
