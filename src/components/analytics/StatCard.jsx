import { useState, useEffect } from "react";

/**
 * KPICard
 *
 * Props:
 *  - label   (string)      Card title, e.g. "Total Employees"
 *  - value   (number)      Numeric value to count up to
 *  - color   (string)      Hex color for the big number
 *  - icon    (ReactNode)   Any icon element (lucide, heroicons, svg, etc.)
 *  - sub     (string)      Small description below the number
 */

function useCounter(target, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let startTime = null;

    function tick(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return count;
}

export default function KPICard({ label, value, color = "#0F172A", icon, sub }) {
  const count = useCounter(value);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: 12,
        padding: "20px 20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: "#94A3B8",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: 0,
          fontSize: 36,
          fontWeight: 600,
          lineHeight: 1,
          color,
        }}
      >
        {count}
      </p>

      {(icon || sub) && (
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          {icon && <span style={{ display: "flex" }}>{icon}</span>}
          {sub}
        </p>
      )}
    </div>
  );
}