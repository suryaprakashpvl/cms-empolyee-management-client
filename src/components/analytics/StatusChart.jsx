import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/**
 * StatusChart
 *
 * Props:
 *  - data    (array)   Array of { name: string, value: number }
 *  - total   (number)  Total employee count (used for % in tooltip)
 *  - colors  (array)   Optional hex color array per slice
 *  - height  (number)  Chart height in px (default: 220)
 *  - title   (string)  Card title
 *  - sub     (string)  Card subtitle
 *
 * Example data:
 *  [
 *    { name: "Active",   value: 214 },
 *    { name: "On Leave", value: 12  },
 *    { name: "Inactive", value: 22  },
 *  ]
 */

const DEFAULT_COLORS = ["#1D9E75", "#EF9F27", "#D85A30"];

function CustomTooltip({ active, payload, total }) {
  if (!active || !payload?.length) return null;
  const pct = total ? Math.round((payload[0].value / total) * 100) : 0;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 13,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <span style={{ fontWeight: 600 }}>{payload[0].name}</span>
      <span style={{ color: "#94A3B8", marginLeft: 6 }}>
        {payload[0].value} ({pct}%)
      </span>
    </div>
  );
}

export default function StatusChart({
  data = [],
  total,
  colors = DEFAULT_COLORS,
  height = 220,
  title = "Employee status",
  sub = "Current workforce distribution",
}) {
  const resolvedTotal = total ?? data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #F1F5F9",
        borderRadius: 12,
        padding: "20px 20px 16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <h2 style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "#0F172A" }}>
        {title}
      </h2>
      <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94A3B8" }}>{sub}</p>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginBottom: 8 }}>
        {data.map((item, i) => (
          <span
            key={item.name}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748B" }}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: 2,
                background: colors[i % colors.length],
              }}
            />
            {item.name} — {item.value}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip total={resolvedTotal} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}