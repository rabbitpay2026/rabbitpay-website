"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Text Animate
 * Splits text and reveals character-by-character (fallback: word-by-word).
 */
export function TextAnimate({
  text,
  className,
  by = "word",
  delay = 0,
  duration = 0.5,
  as: Tag = motion.p,
}) {
  const reduce = useReducedMotion();
  const parts = by === "char" ? Array.from(text) : text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.04, delayChildren: delay },
    },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 8 },
    show: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration } },
  };

  return (
    <Tag
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          variants={item}
          className="inline-block whitespace-pre"
        >
          {p}
          {by === "word" && i < parts.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
