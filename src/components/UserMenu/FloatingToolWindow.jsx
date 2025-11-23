// FloatingToolWindow.jsx
import { useRef, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function FloatingToolWindow({ tool, children, onClose }) {
  const winRef = useRef(null);

  useEffect(() => {
    const el = winRef.current;
    if (!el) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      el.style.top = el.offsetTop - pos2 + "px";
      el.style.left = el.offsetLeft - pos1 + "px";
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const header = el.querySelector(`.${styles.FloatingHeader}`);
    if (header) {
      header.onmousedown = dragMouseDown;
    }

    return () => {
      if (header) {
        header.onmousedown = null;
      }
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }, []);

  return (
    <div ref={winRef} className={styles.FloatingWindow}>
      <div className={styles.FloatingHeader}>
        <span>{tool}</span>
        <button className={styles.FloatingCloseBtn} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.FloatingBody}>{children}</div>
    </div>
  );
}
