"use client";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieAnimationProps {
  src: string;
  className?: string;
}

export default function LottieAnimation({ src, className }: LottieAnimationProps) {
  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop
        autoplay
      />
    </div>
  );
}