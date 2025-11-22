import { useEffect, useState } from "react";
import styles from "./UserMenu.module.css";

export default function DraggableWindow({
  title,
  children,
  initialX = 40,
  initialY = 80,
  isMinimized = false,
  isOnTop = false,
  onClose,
  onToggleMinimize,
  onFocus,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
    onFocus && onFocus();
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    if (!t) return;
    startDrag(t.clientX, t.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const t = e.touches[0];
      if (!t) return;
      setPosition({
        x: t.clientX - dragOffset.x,
        y: t.clientY - dragOffset.y,
      });
    };

    const handleTouchEnd = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragOffset.x, dragOffset.y]);

  return (
    <div
      className={styles.DraggableWindow}
      style={{
        left: position.x,
        top: position.y,
        zIndex: isOnTop ? 1300 : 1200,
        width: "380px",
        maxWidth: "92vw",
      }}
      onMouseDown={() => onFocus && onFocus()}
      onTouchStart={() => onFocus && onFocus()}
    >
      <div
        className={styles.WindowHeader}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className={styles.WindowTitle}>{title}</span>
        <div className={styles.WindowControls}>
          <button
            className={styles.WindowButton}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMinimize && onToggleMinimize();
            }}
            title={isMinimized ? "Restore" : "Minimize"}
          >
            {isMinimized ? "▢" : "–"}
          </button>
          <button
            className={styles.WindowButton}
            onClick={(e) => {
              e.stopPropagation();
              onClose && onClose();
            }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className={styles.WindowBody}>
          {children}
        </div>
      )}
    </div>
  );
}
