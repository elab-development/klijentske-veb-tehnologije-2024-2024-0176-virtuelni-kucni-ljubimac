import React from 'react';
import speechBubbleSlika from '../assets/ikonice/speech_bubble.png'; 
import '../stil/speech_bubble.css';

interface SpeechBubbleProps {
  text: string;
  top?: string;
  left?: string;
  scale?: number;
  fontSize?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  top,
  left,
  scale = 1,
  fontSize,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`speech-bubble-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        top: top || 'auto',
        left: left || 'auto',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      <img src={speechBubbleSlika} alt="Speech Bubble" className="speech-bubble-img" />
      <span className="speech-bubble-text" style={{ fontSize: fontSize }}>
        {text}
      </span>
    </div>
  );
};