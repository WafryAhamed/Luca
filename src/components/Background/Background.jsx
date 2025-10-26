import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Background.module.css";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    const numParticles = 80;
    const mouse = { x: width / 2, y: height / 2 };

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

        // Bounce effect
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
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
        const radius = Math.random() * 3 + 1;
        const color = `rgba(${90 + Math.random() * 40}, ${40 + Math.random() * 20}, ${160 + Math.random() * 40}, 0.3)`;
        const speedX = (Math.random() - 0.5) * 0.6;
        const speedY = (Math.random() - 0.5) * 0.6;
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
      ctx.fillStyle = "rgba(9, 7, 18, 0.12)"; // dark fading overlay
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
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.overlay}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
