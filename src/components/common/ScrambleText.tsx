import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
  durationMs?: number; // default ~2000ms (2-3 seconds as requested)
  triggerOnHover?: boolean;
  autoTriggerOnMount?: boolean;
  title?: string;
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_#@&%';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as = 'span',
  durationMs = 2000,
  triggerOnHover = true,
  autoTriggerOnMount = false,
  title,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Update displayText when text prop changes
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const runScramble = useCallback(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }

    setIsScrambling(true);
    startTimeRef.current = performance.now();

    const frame = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / durationMs);

      // Characters gradually lock in from left to right as time passes
      // leaving remaining characters cycling through random letters
      const totalChars = text.length;
      const lockedLength = Math.floor(progress * totalChars);

      let scrambled = '';
      for (let i = 0; i < totalChars; i++) {
        const targetChar = text[i];
        if (targetChar === ' ' || targetChar === '\n' || targetChar === '\t') {
          scrambled += targetChar;
        } else if (i < lockedLength) {
          // Locked in final letter
          scrambled += targetChar;
        } else {
          // Rapidly cycling through alphabet/letters (zig-zagging effect)
          const randomChar = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          scrambled += randomChar;
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(frame);
  }, [text, durationMs]);

  useEffect(() => {
    if (autoTriggerOnMount) {
      runScramble();
    }
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [autoTriggerOnMount, runScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      runScramble();
    }
  };

  const Component = as;

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      title={title || 'Hover to scramble letters'}
      className={`inline-block select-none cursor-pointer transition-colors duration-150 ${className} ${
        isScrambling ? 'opacity-90 tracking-wider' : ''
      }`}
    >
      {displayText}
    </Component>
  );
};
