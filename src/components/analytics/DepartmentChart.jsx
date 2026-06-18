import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

/**
 * DepartmentChart
 *
 * Props:
 *  - data    (array)   Array of { name: string, count: number }
 *  - colors  (array)   Optional array of hex color strings per bar
 *  - height  (number)  Chart height in px (default: 260)
 *  - title   (string)  Card title
 *  - sub     (string)  Card subtitle
 *
 * Example data:
 *  [
 *    { name: "Engineering", count: 72 },
 *    { name: "Sales",       count: 45 },
 *  ]
 */

const DEFAULT_COLORS = [
  "#7F77DD","#1D9E75","#378ADD",
  "#D85A30","#EF9F27","#D4537E","#639922",
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
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
      <span style={{ fontWeight: 600 }}>{payload[0].value}</span>
      <span style={{ color: "#94A3B8", marginLeft: 4 }}>employees</span>
    </div>
  );
}

export default function DepartmentChart({
  data = [],
  colors = DEFAULT_COLORS,
  height = 260,
  title = "Department breakdown",
  sub = "Headcount by team",
}) {
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
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "#94A3B8" }}>{sub}</p>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 16, bottom: 0, left: 4 }}
        >
          <CartesianGrid horizontal={false} stroke="#F1F5F9" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}