import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Background.module.css";

export default function Background() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const mouse = { x: width / 2, y: height / 2, radius: 130 };
    let particles = [];
    const numParticles = 90;

    class Particle {
      constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce from edges
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        // Interact with mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          const forceX = Math.cos(angle) * force * 2;
          const forceY = Math.sin(angle) * force * 2;
          this.x -= forceX;
          this.y -= forceY;
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 3
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 2.5 + 1;
        const color = `rgba(${90 + Math.random() * 40}, ${
          40 + Math.random() * 20
        }, ${160 + Math.random() * 40}, 0.35)`;
        const speedX = (Math.random() - 0.5) * 0.4;
        const speedY = (Math.random() - 0.5) * 0.4;
        particles.push(new Particle(x, y, radius, color, speedX, speedY));
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = 0.15 - dist / 1200;
            ctx.strokeStyle = `rgba(150, 80, 220, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(9, 7, 18, 0.15)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;

      if (container) {
        const rect = container.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        // For cursor glow
        container.style.setProperty("--mouse-x", `${relX}px`);
        container.style.setProperty("--mouse-y", `${relY}px`);

        // For parallax (medium intensity)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (relX - centerX) / centerX; // -1 to 1
        const offsetY = (relY - centerY) / centerY; // -1 to 1
        container.style.setProperty("--parallax-x", offsetX.toString());
        container.style.setProperty("--parallax-y", offsetY.toString());
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Parallax star field */}
      <div className={`${styles.parallaxLayer} ${styles.starsLayer}`}>
        <div className={`${styles.star} ${styles.small}`} />
        <div className={`${styles.star} ${styles.medium}`} />
        <div className={`${styles.star} ${styles.large}`} />
        <div className={`${styles.star} ${styles.extraLarge}`} />
        <div className={`${styles.star} ${styles.small}`} />
        <div className={`${styles.star} ${styles.medium}`} />
        <div className={`${styles.star} ${styles.large}`} />
        <div className={`${styles.star} ${styles.small}`} />
        <div className={`${styles.star} ${styles.medium}`} />
        <div className={`${styles.star} ${styles.large}`} />
        <div className={`${styles.star} ${styles.small}`} />
        <div className={`${styles.star} ${styles.medium}`} />
      </div>

      {/* Soft fog / nebula layer */}
      <div className={`${styles.parallaxLayerSlow} ${styles.fogLayer}`} />

      {/* Cursor glow */}
      <div className={styles.cursorGlow} />

      {/* Existing overlay pulse */}
      <motion.div
        className={styles.overlay}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
