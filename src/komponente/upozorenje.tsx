import React, { useEffect, useState } from 'react';

interface UpozorenjeProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Upozorenje: React.FC<UpozorenjeProps> = ({
  message,
  type = 'error',
  duration = 3000,
  onClose,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#2ecc71';
      case 'warning': return '#ffcc00';
      case 'info': return '#3498db';
      case 'error':
      default: return '#e74c3c';
    }
  };

  const styles: React.CSSProperties = {
    position: 'fixed',
    top: isMobile ? 'auto' : '30px',
    bottom: isMobile ? '25vh' : 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: getBackgroundColor(),
    color: '#000000',
    padding: isMobile ? '10px 16px' : '16px 28px',
    borderRadius: '0px',
    border: isMobile ? '3px solid #000000' : '4px solid #000000',
    boxShadow: isMobile ? '3px 3px 0px #000000' : '4px 4px 0px #000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    fontFamily: 'inherit',
    fontSize: isMobile ? '13px' : '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    zIndex: 9999,
    imageRendering: 'pixelated',
    width: isMobile ? '90%' : 'auto',
    maxWidth: '450px',
    boxSizing: 'border-box',
  };

  return (
    <div style={styles}>
      <span style={{ wordBreak: 'break-word' }}>{message}</span>
      <button 
        onClick={onClose} 
        style={{
          background: '#000000',
          border: '2px solid #000000',
          color: '#ffffff',
          fontSize: isMobile ? '14px' : '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          padding: isMobile ? '0px 6px' : '2px 8px',
          lineHeight: '1',
          flexShrink: 0,
        }}
      >
        &times;
      </button>
    </div>
  );
};