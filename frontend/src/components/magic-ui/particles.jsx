"use client";
import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI - Particles
 */
export function Particles({
  className,
  quantity = 80,
  ease = 50,
  size = 0.5,
  staticity = 50,
  color = "#4A8CFA",
  refresh = false,
}) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const hexToRgb = (h) => {
    const m = h.replace("#", "").match(/.{1,2}/g);
    if (!m) return [74, 140, 250];
    return m.map((v) => parseInt(v, 16));
  };
  const rgb = hexToRgb(color);

  const resize = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    canvasSize.current.w = parent.offsetWidth;
    canvasSize.current.h = parent.offsetHeight;
    canvas.width = canvasSize.current.w * dpr;
    canvas.height = canvasSize.current.h * dpr;
    canvas.style.width = canvasSize.current.w + "px";
    canvas.style.height = canvasSize.current.h + "px";
    contextRef.current?.scale(dpr, dpr);
  }, [dpr]);

  const circleParams = useCallback(() => {
    const x = Math.random() * canvasSize.current.w;
    const y = Math.random() * canvasSize.current.h;
    const translateX = 0;
    const translateY = 0;
    const s = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return { x, y, translateX, translateY, size: s, alpha, targetAlpha, dx, dy, magnetism };
  }, [size]);

  const drawCircle = useCallback((p, update = false) => {
    const ctx = contextRef.current;
    if (!ctx) return;
    const { x, y, translateX, translateY, size: s, alpha } = p;
    ctx.translate(translateX, translateY);
    ctx.beginPath();
    ctx.arc(x, y, s, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
    ctx.fill();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) particles.current.push(p);
  }, [dpr, rgb]);

  const clear = () => {
    contextRef.current?.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
  };

  const draw = useCallback(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    clear();
    particles.current.forEach((p, i) => {
      const edge = [
        p.x + p.translateX - p.size,
        canvasSize.current.w - p.x - p.translateX - p.size,
        p.y + p.translateY - p.size,
        canvasSize.current.h - p.y - p.translateY - p.size,
      ];
      const closest = Math.min(...edge);
      const remap = parseFloat(Math.min(Math.max(closest / 20, 0), 1).toFixed(2));
      p.alpha += 0.02;
      if (p.alpha > p.targetAlpha * remap) p.alpha = p.targetAlpha * remap;
      if (!reduce) {
        p.x += p.dx;
        p.y += p.dy;
        p.translateX += (mouse.current.x / (staticity / p.magnetism) - p.translateX) / ease;
        p.translateY += (mouse.current.y / (staticity / p.magnetism) - p.translateY) / ease;
      }
      drawCircle(p, true);
      if (
        p.x < -p.size ||
        p.x > canvasSize.current.w + p.size ||
        p.y < -p.size ||
        p.y > canvasSize.current.h + p.size
      ) {
        particles.current.splice(i, 1);
        drawCircle(circleParams());
      }
    });
    window.requestAnimationFrame(draw);
  }, [circleParams, drawCircle, ease, staticity]);

  useEffect(() => {
    if (!canvasRef.current) return;
    contextRef.current = canvasRef.current.getContext("2d");
    resize();
    particles.current = [];
    for (let i = 0; i < quantity; i++) drawCircle(circleParams());
    const raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [circleParams, drawCircle, draw, quantity, refresh, resize]);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <canvas ref={canvasRef} />
    </div>
  );
}
