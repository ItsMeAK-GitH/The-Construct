'use client';
import { useRef, useEffect, useState } from 'react';
import { Network, BrainCircuit, KeyRound, Shield } from 'lucide-react';

const ParallaxIcon = ({ icon, initialTop, initialLeft, speed, blur }: { icon: React.ReactNode, initialTop: string, initialLeft: string, speed: number, blur: number }) => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
      const container = document.querySelector('.overflow-y-auto');
      const handleScroll = () => {
        if(container) {
            setOffsetY(container.scrollTop);
        }
      };
      
      container?.addEventListener('scroll', handleScroll);
      return () => container?.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <div
        className="fixed text-primary/40 z-0"
        style={{
          top: initialTop,
          left: initialLeft,
          transform: `translateY(${offsetY * speed}px) perspective(500px) translateZ(${offsetY * speed * -0.5}px)`,
          transition: 'transform 0.1s linear',
          filter: `blur(${blur}px)`,
        }}
      >
        {icon}
      </div>
    );
}

// Based on https://dev.to/gnsp/making-the-matrix-effect-in-javascript-din
export const MatrixRainingLetters = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.overflow-y-auto');
    const handleScroll = () => {
      if(container) {
          setOffsetY(container.scrollTop);
      }
    };
    
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops: number[] = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const render = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0'; // Green text
      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const intervalId = setInterval(render, 30);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div 
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{
            transform: `translateY(${offsetY * 0.1}px)`,
            transition: 'transform 0.1s linear'
        }}
    >
        <ParallaxIcon icon={<Network size={48} />} initialTop="15%" initialLeft="10%" speed={0.25} blur={3} />
        <ParallaxIcon icon={<BrainCircuit size={120} />} initialTop="70%" initialLeft="20%" speed={0.4} blur={0.5} />
        <ParallaxIcon icon={<Shield size={64} />} initialTop="45%" initialLeft="85%" speed={0.3} blur={2} />
        <ParallaxIcon icon={<KeyRound size={96} />} initialTop="10%" initialLeft="70%" speed={0.5} blur={1} />
        <canvas 
            ref={canvasRef} 
            className="w-full h-full opacity-30"
        />
    </div>
  );
};
